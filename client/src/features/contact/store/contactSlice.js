import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactService } from '../services/contactService';

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await contactService.submitMessage(formData);
      return result;
    } catch (err) {
      console.error('[ContactSlice] Submission failed:', err);
      return rejectWithValue(
        err?.message ||
          'Failed to send message. Please connect directly via LinkedIn or GitHub.'
      );
    }
  }
);

const initialState = {
  status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  feedback: '',
  lastSubmittedAt: null,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    resetContactState: (state) => {
      state.status = 'idle';
      state.feedback = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'submitting';
        state.feedback = '';
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = 'success';
        state.feedback = action.payload.message;
        state.lastSubmittedAt = Date.now();
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'error';
        state.feedback =
          action.payload ||
          'Failed to send message. Please connect directly via LinkedIn or GitHub.';
      });
  },
});

export const { setStatus, setFeedback, resetContactState } = contactSlice.actions;

export const selectContactStatus = (state) => state.contact.status;
export const selectContactFeedback = (state) => state.contact.feedback;

export default contactSlice.reducer;

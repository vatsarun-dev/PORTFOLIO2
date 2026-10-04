import { useSelector, useDispatch } from 'react-redux';
import {
  selectContactStatus,
  selectContactFeedback,
  submitContactForm,
  resetContactState,
} from '../store/contactSlice';

export const useContact = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectContactStatus);
  const feedback = useSelector(selectContactFeedback);

  const handleSubmit = async (formElement) => {
    const formData = new FormData(formElement);
    const resultAction = await dispatch(submitContactForm(formData));
    if (submitContactForm.fulfilled.match(resultAction)) {
      formElement.reset();
      setTimeout(() => {
        dispatch(resetContactState());
      }, 6000);
    } else {
      setTimeout(() => {
        dispatch(resetContactState());
      }, 7000);
    }
  };

  const resetFormState = () => {
    dispatch(resetContactState());
  };

  return {
    status,
    feedback,
    handleSubmit,
    resetFormState,
  };
};

export default useContact;

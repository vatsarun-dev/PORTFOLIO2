/**
 * Base API client configuration and helper utilities.
 * Handles standardized requests, error handling, and payload parsing.
 */
class ApiClient {
  constructor(
    baseUrl = import.meta.env.VITE_API_BASE_URL ||
      (import.meta.env.PROD ? 'https://portfolio2-3qya.onrender.com' : '')
  ) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        credentials: 'include',
        ...options,
        headers,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.message ||
          (Array.isArray(data?.errors) ? data.errors[0]?.msg : null) ||
          `HTTP error! status: ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.warn(`[ApiClient] Request to ${url} failed:`, error);
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers });
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;


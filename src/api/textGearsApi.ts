const API_KEY = import.meta.env.VITE_APP_TEXTGEARS_API_KEY;
const URL = 'https://api.textgears.com/grammar';

export type ErrorItem = {
  id?: string;
  offset?: number;
  length?: number;
  description?: Record<string, string>;
  bad?: string;
  better?: string[];
  type?: 'grammar' | 'spelling' | string;
};

type ResponseResult = {
  result: boolean;
  errors?: ErrorItem[];
};

type ApiResponce = {
  status: boolean;
  response?: ResponseResult;
};

class ApiError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  status: number;
}

export async function fetchTextCheck(text: string): Promise<ApiResponce> {
  try {
    console.log('fetch called on', text);
    const response = await fetch(
      `${URL}?key=${API_KEY}&text=${encodeURIComponent(text)}`
    );
    console.log('response', response);
    const json = await response.json();
    console.log('json', json);

    return response.ok
      ? json
      : Promise.reject(new ApiError(json.message, response.status));
  } catch (e) {
    console.log('API error', e);
    throw e;
  }
}

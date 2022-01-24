import axios from 'axios';

const getErrorMessage = (error: unknown) => {
  let message = 'Something went wrong!';

  if (axios.isAxiosError(error)) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return message;
};

export default getErrorMessage;

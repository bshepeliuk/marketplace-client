import { toast, ToastOptions } from 'react-toastify';

const notifications = {
  _options: {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  } as ToastOptions,
  error(message: string, options?: ToastOptions) {
    toast.error(message, { ...this._options, autoClose: 5000, ...(options ?? {}) });
  },

  info(message: string) {
    toast.info(message, {
      ...this._options,
    });
  },
  success(message: string) {
    toast.success(message, {
      ...this._options,
      autoClose: 2000,
    });
  },
};

export default notifications;

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const notifySuccess = (message) => toast.success(message, toastOptions);
const notifyError = (message) => toast.error(message, toastOptions);
const notifyInfo = (message) => toast.info(message, toastOptions);
const notifyWarning = (message) => toast.warn(message, toastOptions);

export { notifySuccess, notifyError, notifyInfo, notifyWarning };

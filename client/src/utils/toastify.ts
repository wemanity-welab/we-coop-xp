import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notifySuccess = (message: string) => {
  toast.success(message);
};

const notifyError = (message: string) => {
  toast.error(message);
};

export { notifySuccess, notifyError };

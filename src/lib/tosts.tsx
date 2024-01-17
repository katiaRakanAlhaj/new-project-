import { toast } from "react-toastify";

export const shawSuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
export const shawError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};

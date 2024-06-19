// packages
import reactHotToast from "react-hot-toast";

export default function reactHotToastHelper({ text }) {
  const toastId = reactHotToast.loading(text);

  function success({ text }) {
    reactHotToast.success(text, {
      id: toastId,
    });
  }

  function error({ text }) {
    reactHotToast.error(text, {
      id: toastId,
    });
  }

  return {
    success,
    error,
  };
}

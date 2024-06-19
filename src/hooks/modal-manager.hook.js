// packages
import react from "react";

export default function useModalManager({ id }) {
  const [modal, setModal] = react.useState();

  react.useEffect(() => {
    if (bootstrap) {
      const _element = document.getElementById(id);
      const _modal = bootstrap.Modal.getOrCreateInstance(_element);
      setModal(_modal);
    }
  }, []);

  function show() {
    if (modal) {
      modal.show(false);
    }
  }

  function hide() {
    if (modal) {
      modal.hide();
    }
  }

  return [show, hide];
}

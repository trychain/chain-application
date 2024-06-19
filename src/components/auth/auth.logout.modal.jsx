// packages
import react from "react";

// helpers
import apiHelpers from "../../helpers/api-request.helper";
import reactHotToastHelper from "../../helpers/react-hot-toast.helper";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";

// contexts
import { useAuthContext } from "../../context/auth.context";

export default function AuthLogoutModal({ id, issuer, label }) {
  // contexts
  const { logout } = useAuthContext();

  // states
  const [formBlock, setFormBlock] = react.useState(false);
  const [formData, setFormData] = react.useState({
    email: "",
    password: "",
  });

  // hooks
  const [showAuthLogoutModal, hideAuthLogoutModal] = useModalManager({
    id: "modal-auth-logout",
  });

  async function handleAuthLogin(event) {
    event.preventDefault();

    if (formBlock) {
      return;
    }

    const toast = reactHotToastHelper({
      text: "loading",
    });

    setFormBlock(true);

    logout()
      .then((response) => {
        hideAuthLogoutModal();

        toast.success({
          text: response.message,
        });
      })
      .catch((error) => {
        toast.error({
          text: error.message,
        });
      })
      .finally(() => {
        setFormBlock(false);
      });
  }

  return (
    <form onSubmit={handleAuthLogin}>
      <div className="modal fade" id="modal-auth-logout" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Logout</h5>
              <button onClick={hideAuthLogoutModal} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>by pressing the Logout button will result in you logging out of your account and disabling all synchronization systems</p>
            </div>
            <div className="modal-footer">
              <button onClick={hideAuthLogoutModal} type="button" className="btn btn-sm btn-secondary">
                Close
              </button>
              <button disabled={formBlock} type="submit" className="btn btn-sm btn-primary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

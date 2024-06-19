// packages
import react from "react";

// helpers
import apiHelpers from "../../helpers/api-request.helper";
import reactHotToastHelper from "../../helpers/react-hot-toast.helper";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";

// contexts
import { useAuthContext } from "../../context/auth.context";

export default function AuthLoginModal({ id, issuer, label }) {
  const { login } = useAuthContext();

  const [formBlock, setFormBlock] = react.useState(false);
  const [formData, setFormData] = react.useState({
    email: "",
    password: "",
  });

  const [showAuthLoginModal, hideAuthLoginModal] = useModalManager({
    id: "modal-auth-login",
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

    login({
      email: formData.email,
      password: formData.password,
    })
      .then((response) => {
        hideAuthLoginModal();
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
      <div className="modal fade" id="modal-auth-login" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button onClick={hideAuthLoginModal} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="m-4">
                <h2 className="text-center">Welcome Back!</h2>
                <p className="text-center">We'll never share your email with anyone else.</p>
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="example@ex.com"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="12345678"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={hideAuthLoginModal} type="button" className="btn btn-sm btn-secondary">
                Close
              </button>
              <button disabled={formBlock} type="submit" className="btn btn-sm btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

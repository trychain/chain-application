// packages
import react from "react";

// contexts
import { useAuthContext } from "../../context/auth.context";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";

// helpers
import apiRequestHelpers from "../../helpers/api-request.helper";
import reactHotToastHelper from "../../helpers/react-hot-toast.helper";

export default function AuthRegisterModal({ id, issuer, label }) {
  // contexts
  const { register } = useAuthContext();

  // states
  const [emailInput, setEmailInput] = react.useState("");
  const [passwordInput, setPasswordInput] = react.useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = react.useState("");

  // hooks
  const [, hideAuthRegisterModal] = useModalManager({
    id: "modal-auth-register",
  });

  async function handleAuthRegister(event) {
    event.preventDefault();

    const toast = reactHotToastHelper({
      text: "registering",
    });

    register({
      email: emailInput,
      password: passwordInput,
      repeatPassword: repeatPasswordInput,
    })
      .then((response) => {
        hideAuthRegisterModal();
        toast.success({
          text: response.message,
        });
      })
      .catch((error) => {
        toast.error({
          text: error.message,
        });
      });
  }

  return (
    <>
      <div className="modal fade" id={`modal-auth-register`} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="m-4">
                <h2 className="text-center">Join Us!</h2>
                <p className="text-center">We'll never share your email with anyone else.</p>
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" onChange={(e) => setEmailInput(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="example@ex.com" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" onChange={(e) => setPasswordInput(e.target.value)} placeholder="12345678" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3">
                <label className="form-label">Repeat Password</label>
                <input type="password" onChange={(e) => setRepeatPasswordInput(e.target.value)} placeholder="12345678" className="form-control" id="exampleInputPassword1" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleAuthRegister} type="button" className="btn btn-sm btn-primary">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

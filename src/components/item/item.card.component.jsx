// packages
import react from "react";
import toast from "react-hot-toast";
import { TOTP } from "otpauth";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";
import useOneTimePassword from "../../hooks/one-time-password.hook";
import useClipBoard from "../../hooks/clipboard.hook";

export default function ItemComponent({ id, issuer, label, algorithm, secret, digits, period }) {
  const [saveIntoClipboard] = useClipBoard();
  const [oneTimePassword, timeRemaining, platformImage] = useOneTimePassword({
    issuer: issuer,
    label: label,
    secret: secret,
    algorithm: algorithm,
    digits: digits,
    period: period,
  });

  const [showUpdateModal] = useModalManager({
    id: `model_update_${id}`,
  });
  const [showDeleteModal] = useModalManager({
    id: `model_delete_${id}`,
  });

  function handleCopyOtp() {
    saveIntoClipboard({ text: oneTimePassword }).then(() => {
      toast.success("code copied into your clipboard");
    });
  }

  return (
    <>
      <div className="bg-body-tertiary p-3 rounded mb-3">
        <div className="d-flex gap-2">
          <img
            className="rounded"
            src={require(`../../assets/platforms/${platformImage}`)}
            style={{
              aspectRatio: "1/1",
              height: "34px",
            }}
          />
          <div>
            <h4 style={{ marginBottom: "-5px" }}>{issuer}</h4>
            <span>{label}</span>
          </div>
          <div className="ms-auto">
            <div className="dropdown">
              <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a onClick={showUpdateModal} className="dropdown-item" href="#">
                    Edit
                  </a>
                </li>
                <li>
                  <a onClick={showDeleteModal} className="dropdown-item" href="#">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <h4 className="my-auto cursor-hand" onClick={handleCopyOtp}>
            {oneTimePassword}
          </h4>

          <span className="my-auto ms-auto">{timeRemaining / 1000}s</span>
        </div>
      </div>
    </>
  );
}

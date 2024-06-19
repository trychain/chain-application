// packages
import react from "react";
import toast from "react-hot-toast";

// contexts
import { useItemsContext } from "../../context/items.context";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";
import useOneTimePassword from "../../hooks/one-time-password.hook";

// helpers
import reactHotToastHelper from "../../helpers/react-hot-toast.helper";

export default function ItemUpdateModal({ id, issuer, label, algorithm, secret, digits, period }) {
  // contexts
  const { updateItem } = useItemsContext();

  // states
  const [formBlock, setFormBlock] = react.useState();
  const [formData, setFormData] = react.useState({
    issuer: issuer,
    label: label,
    secret: secret,
    algorithm: algorithm,
    digits: digits,
    period: period,
  });

  // hooks
  const [, hideItemUpdateModal] = useModalManager({
    id: `model_update_${id}`,
  });
  const [oneTimePassword, timeRemaining, platformImage] = useOneTimePassword({
    issuer: formData.issuer,
    label: formData.label,
    secret: "fakesecrettoken",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
  });

  async function handleUpdate(event) {
    event.preventDefault();

    const toast = reactHotToastHelper({
      text: "loading",
    });
    setFormBlock(true);

    updateItem({
      id: id,
      issuer: formData.issuer,
      label: formData.label,
      secret: formData.secret,
      algorithm: formData.algorithm,
      digits: formData.digits,
      period: formData.period,
    })
      .then((response) => {
        hideItemUpdateModal();
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
    <form onSubmit={handleUpdate}>
      <div className="modal fade" id={`model_update_${id}`} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Edit {issuer}: {label}
              </h5>
              <button type="button" className="btn-close" onClick={hideItemUpdateModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                    <h4 style={{ marginBottom: "-5px" }}>{formData.issuer ?? "Example"}</h4>
                    <span>{formData.label ?? "example@ex.com"}</span>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <h4 className="my-auto cursor-hand">000000</h4>

                  <span className="my-auto ms-auto">{0 / 1000}s</span>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Issuer</label>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="staticEmail"
                    value={formData.issuer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        issuer: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Label</label>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        label: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Secret</label>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.secret}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secret: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Algorithm</label>
                <div className="col-9">
                  <select
                    className="form-select form-select-sm"
                    value={formData.algorithm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        algorithm: e.target.value,
                      })
                    }
                  >
                    <option value="SHA1">SHA1</option>
                    <option value="SHA256">SHA256</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Period</label>
                <div className="col-9">
                  <select
                    className="form-select form-select-sm"
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        period: e.target.value,
                      })
                    }
                  >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                    <option value="160">160</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-3 my-auto">Digits</label>
                <div className="col-9">
                  <select
                    className="form-select form-select-sm"
                    value={formData.digits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        digits: e.target.value,
                      })
                    }
                  >
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={hideItemUpdateModal} type="button" className="btn btn-sm btn-secondary">
                Close
              </button>
              <button disabled={formBlock} type="submit" className="btn btn-sm btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

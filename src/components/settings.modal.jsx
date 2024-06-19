// packages
import react from "react";
import toast from "react-hot-toast";

// helpers
import apiRequestHelper from "../helpers/api-request.helper";
import reactHotToastHelper from "../helpers/react-hot-toast.helper";

// context
import { useSettingsContext } from "../context/settings.context";
import { useAuthContext } from "../context/auth.context";

// hooks
import useModalManager from "../hooks/modal-manager.hook";

const packageJson = require("../../package.json")

export default function SettingsModal() {
  // contexts
  const { changePassword } = useAuthContext();
  const { settingsData, updateSettingsData } = useSettingsContext();

  // states
  const [formData, setFormData] = react.useState({
    currentPassword: "",
    newPassword: "",
    itemBeautifier: settingsData.itemBeautifier,
    logsSaver: settingsData.logsSaver,
    fastCopier: settingsData.fastCopier,
    darkMode: settingsData.darkMode,
  });

  // hooks
  const [, hideModalSettings] = useModalManager({ id: "modal-application-settings" });

  async function handleUpdate(event) {
    event.preventDefault();

    if (formData.currentPassword && formData.newPassword) {
      const toast = reactHotToastHelper({
        text: "changing password",
      });

      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
        .then((response) => {
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

    const toast = reactHotToastHelper({
      text: "settings is saving",
    });

    await updateSettingsData({
      itemBeautifier: formData.itemBeautifier,
      logsSaver: formData.logsSaver,
      fastCopier: formData.fastCopier,
      darkMode: formData.darkMode,
    })
      .then((response) => {
        hideModalSettings();

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
    <form onSubmit={handleUpdate}>
      <div className="modal fade" id="modal-application-settings" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Settings</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex flex-column gap-5">
              <div className="">
                <div className="mb-3">
                  <h3 className="mb-3">Account Settings</h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex">
                      <h5 className="mb-auto">Change Password</h5>
                      <div className="d-flex flex-column gap-2 my-auto ms-auto">
                        <input
                          className="form-control form-control-sm"
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              currentPassword: event.target.value,
                            })
                          }
                          type="password"
                          placeholder="current password"
                          role="switch"
                        />
                        <input
                          className="form-control form-control-sm"
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              newPassword: event.target.value,
                            })
                          }
                          type="password"
                          placeholder="new password"
                          role="switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="mb-3">Application Settings</h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex">
                      <h5 className="my-auto">Item beautifier</h5>
                      <div className="form-check form-switch my-auto ms-auto">
                        <input
                          className="form-check-input"
                          onChange={() =>
                            setFormData({
                              ...formData,
                              itemBeautifier: !formData.itemBeautifier,
                            })
                          }
                          checked={formData.itemBeautifier}
                          type="checkbox"
                          role="switch"
                        />
                      </div>
                    </div>
                    <div className="d-flex">
                      <h5 className="my-auto">Dark mode</h5>
                      <div className="form-check form-switch my-auto ms-auto">
                        <input
                          className="form-check-input"
                          onChange={() =>
                            setFormData({
                              ...formData,
                              darkMode: !formData.darkMode,
                            })
                          }
                          checked={formData.darkMode}
                          type="checkbox"
                          role="switch"
                        />
                      </div>
                    </div>
                    <div className="d-flex">
                      <h5 className="my-auto">Fast copier</h5>
                      <div className="form-check form-switch my-auto ms-auto">
                        <input
                          className="form-check-input"
                          onChange={() =>
                            setFormData({
                              ...formData,
                              fastCopier: !formData.fastCopier,
                            })
                          }
                          checked={formData.fastCopier}
                          type="checkbox"
                          role="switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="mb-3">Application About</h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex">
                      <h5 className="my-auto">Application Version</h5>
                      <div className="form-check form-switch my-auto ms-auto">
                        <span>
                          {packageJson.version}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary">
                Close
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

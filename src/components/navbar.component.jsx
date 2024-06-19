// packages
import react from "react";
import toast from "react-hot-toast";

// modals
import ItemCreateModal from "./item/item.create.modal";
import AuthLoginModal from "./auth/auth.login.modal";
import AuthRegisterModal from "./auth/auth.register.modal";
import SettingsModal from "./settings.modal";

// helpers
import apiHelpers from "../helpers/api-request.helper";
import reactHotToastHelper from "../helpers/react-hot-toast.helper";

// hooks
import useModalManager from "../hooks/modal-manager.hook";

// context
import { useSettingsContext } from "../context/settings.context";
import { useAuthContext } from "../context/auth.context";

export default function NavbarComponent() {
  const { userData, deauthorize } = useAuthContext();
  const { settingsData } = useSettingsContext();

  const [showItemCreateModal] = useModalManager({
    id: "modal-item-create",
  });
  const [showAuthLoginModal] = useModalManager({
    id: "modal-auth-login",
  });
  const [showAuthRegisterModal] = useModalManager({
    id: "modal-auth-register",
  });
  const [showAuthLogoutModal] = useModalManager({
    id: "modal-auth-logout",
  });
  const [showApplicationSettingsModal] = useModalManager({
    id: "modal-application-settings",
  });

  react.useEffect(() => {
    if (settingsData.darkMode) {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.removeAttribute("data-bs-theme");
    }
  }, [settingsData]);

  return (
    <section className="px-3 pt-3 mb-3">
      <div className="">
        {/* <label for="staticEmail" className="col-3 my-auto">
              Label
            </label> */}
        <div className="d-flex gap-2">
          <div className="dropdown">
            <img
              className="rounded"
              src={require("../assets/platforms/account.png")}
              style={{
                aspectRatio: "1/1",
                height: "34px",
              }}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu">
              {!userData && (
                <>
                  <li>
                    <a onClick={showAuthLoginModal} className="dropdown-item" href="#">
                      Login
                    </a>
                  </li>
                  <li>
                    <a onClick={showAuthRegisterModal} className="dropdown-item" href="#">
                      Register
                    </a>
                  </li>
                </>
              )}
              {userData && (
                <>
                  <li>
                    <a onClick={showApplicationSettingsModal} className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a onClick={showAuthLogoutModal} className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="d-flex gap-2 ms-auto">
            <button onClick={showItemCreateModal} className="btn btn-sm btn-primary rounded">
              Create
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

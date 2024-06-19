// package
import react from "react";

// components
import LoadingComponent from "../components/loading.component";

// helpers
import apiRequestHelper from "../helpers/api-request.helper";
import * as applicationStorage from "../helpers/storage.helper";

export const AuthContext = react.createContext();

export function AuthProvider({ children }) {
  const [isLoaded, setIsLoaded] = react.useState(false);
  const [userData, setUserData] = react.useState(undefined);

  react.useEffect(() => {
    apiRequestHelper({
      endpoint: "/user",
      method: "GET",
    })
      .then((response) => {
        setUserData(response.data);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
        return;
      });
  }, []);

  async function register({ email, password, repeatPassword }) {
    return new Promise(async (resolve, reject) => {
      apiRequestHelper({
        endpoint: "/auth/register",
        method: "POST",
        body: {
          email: email,
          password: password,
          repeatPassword: repeatPassword,
        },
      })
        .then(async (response) => {
          await applicationStorage.createAuthorization({
            token: response.data,
          });

          apiRequestHelper({
            endpoint: "/user",
            method: "GET",
          }).then((userResponse) => {
            setUserData(userResponse.data);
          });

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function login({ email, password }) {
    return new Promise(async (resolve, reject) => {
      apiRequestHelper({
        endpoint: "/auth/login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      })
        .then(async (response) => {
          await applicationStorage.createAuthorization({
            token: response.data,
          });

          apiRequestHelper({
            endpoint: "/user",
            method: "GET",
          }).then((userResponse) => {
            setUserData(userResponse.data);
          });

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function changePassword({ currentPassword, newPassword }) {
    return new Promise((resolve, reject) => {
      apiRequestHelper({
        endpoint: "/user/password",
        method: "PUT",
        body: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function logout() {
    return new Promise(async (resolve) => {
      await applicationStorage.deleteAuthorization();

      setUserData(undefined);

      resolve({
        status: 200,
        success: true,
        message: "logout successfully",
      });
      return;
    });
  }

  if (!isLoaded) {
    return <LoadingComponent text={"Loading user"} />;
  }

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        register: register,
        login: login,
        logout: logout,
        changePassword: changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = react.useContext(AuthContext);
  return context;
}

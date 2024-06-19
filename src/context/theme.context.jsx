// package
import react from "react";

// components
import LoadingComponent from "../components/loading.component";

// contexts
import { useSettingsContext } from "./settings.context";

// helpers
import apiRequestHelper from "../helpers/api-request.helper";
import * as applicationStorage from "../helpers/storage.helper";

export const ThemeContext = react.createContext();

export function ThemeProvider({ children }) {
  const { settingsData } = useSettingsContext();

  const [isLoaded, setIsLoaded] = react.useState(false);

  react.useEffect(() => {
    if (settingsData.darkMode) {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.removeAttribute("data-bs-theme");
    }

    setIsLoaded(true);
  }, [settingsData]);

  if (!isLoaded) {
    return <LoadingComponent text={"Loading theme"} />;
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode: settingsData.darkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = react.useContext(ThemeContext);
  return context;
}

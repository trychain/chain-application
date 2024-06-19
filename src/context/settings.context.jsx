// package
import react from "react";

// components
import LoadingComponent from "../components/loading.component";

// helpers
import * as applicationStorage from "../helpers/storage.helper";

export const SettingsContext = react.createContext();

export function SettingsProvider({ children }) {
  // states
  const [settingsData, setSettingsData] = react.useState({});
  const [isLoaded, setIsLoaded] = react.useState(false);

  react.useEffect(() => {
    (async () => {
      const _fetchApplicationSettings = await applicationStorage.fetchSettings();

      setSettingsData(_fetchApplicationSettings);
      setIsLoaded(true);
    })();
  }, []);

  async function updateSettingsData({ itemBeautifier, logsSaver, fastCopier, darkMode }) {
    return new Promise(async (resolve, reject) => {
      await applicationStorage.createSettings({
        itemBeautifier: itemBeautifier,
        logsSaver: logsSaver,
        fastCopier: fastCopier,
        darkMode: darkMode,
      });

      setSettingsData({
        itemBeautifier: itemBeautifier,
        logsSaver: logsSaver,
        fastCopier: fastCopier,
        darkMode: darkMode,
      });

      resolve({
        status: 201,
        success: true,
        message: "settings saved successfully",
      });
    });
  }

  if (!isLoaded) {
    return <LoadingComponent text="Loading settings" />;
  }

  return <SettingsContext.Provider value={{ settingsData, updateSettingsData }}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext() {
  const context = react.useContext(SettingsContext);
  return context;
}

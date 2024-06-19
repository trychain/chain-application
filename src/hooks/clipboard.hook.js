// packages
import react from "react";

// contexts
import { useSettingsContext } from "../context/settings.context";

export default function useClipBoard() {
  const { settingsData } = useSettingsContext();

  function saveIntoClipboard({ text }) {
    return new Promise((resolve, reject) => {
      if (!settingsData.fastCopier) {
        return;
      }

      window.navigator.clipboard.writeText(text);

      resolve()
    });
  }

  return [saveIntoClipboard];
}

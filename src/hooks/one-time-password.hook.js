// packages
import react from "react";
import * as otpauth from "otpauth";

// contexts
import { useSettingsContext } from "../context/settings.context";

export default function useOneTimePassword({ issuer, label, secret, algorithm, digits, period }) {
  // contexts
  const { settingsData } = useSettingsContext();

  const time = period - Math.floor((new Date().getTime() / 1000.0) % period);

  // states
  const [oneTimePassword, setOneTimePassword] = react.useState("000000");
  const [timeRemaining, setTimeRemaining] = react.useState(time * 1000);
  const [platformImage, setPlatformImage] = react.useState("unkown.png");

  const gifs = ["r6s"];
  const pngs = [
    "account",
    "amazon",
    "coursera",
    "discord",
    "ea",
    "edx",
    "facebook",
    "figma",
    "firefox",
    "g2a",
    "github",
    "godaddy",
    "google",
    "instagram",
    "jetbrains",
    "linkedin",
    "medium",
    "mega",
    "microsoft",
    "noon",
    "nord",
    "npm",
    "nvidia",
    "pastebin",
    "paypal",
    "pinterest",
    "postman",
    "quora",
    "reddit",
    "riot",
    "roblox",
    "snapshot",
    "spotify-1",
    "spotify",
    "telegram",
    "tiktok",
    "toptal",
    "tumblr",
    "twitch",
    "uber",
    "ubisoft",
    "udemy",
    "unkown",
    "upwork",
    "vimeo",
    "x",
    "xbox",
    "youtube",
  ];
  const totp = new otpauth.TOTP({
    secret: secret,
    algorithm: algorithm,
    digits: digits,
    period: period,
  });

  react.useEffect(() => {
    if (!settingsData.itemBeautifier) {
      setPlatformImage("unkown.png");
      return;
    }

    for (const issuerKeyword of issuer.toLowerCase().split(" ")) {
      if (gifs.includes(issuerKeyword)) {
        setPlatformImage(`${issuerKeyword}.gif`);
        return;
      }

      if (pngs.includes(issuerKeyword)) {
        setPlatformImage(`${issuerKeyword}.png`);
        return;
      }

      setPlatformImage("unkown.png");
    }
  }, [issuer, settingsData]);

  react.useEffect(() => {
    setTimeout(function () {
      if (timeRemaining === period * 1000 || timeRemaining === time * 1000) {
        const otp = totp.generate();
        setOneTimePassword(otp);
      }

      if (timeRemaining === 0) {
        setTimeRemaining(period * 1000);
        return;
      }

      setTimeRemaining(timeRemaining - 1000);
    }, 1000);
  }, [timeRemaining]);

  return [oneTimePassword, timeRemaining, platformImage];
}

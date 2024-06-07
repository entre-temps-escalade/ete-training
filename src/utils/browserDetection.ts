import UAParser from "ua-parser-js";

export function parseBrowser() {
  let browser = "chrome";
  const parser = new UAParser();

  const detected = parser.getBrowser().name?.toLowerCase() || "chrome";

  if (detected.includes("brave")) browser = "brave";
  if (detected.includes("chrome")) browser = "chrome";
  if (detected.includes("firefox")) browser = "firefox";
  if (detected.includes("edge")) browser = "edge";
  if (detected.includes("opera")) browser = "opera";
  if (detected.includes("samsung")) browser = "samsung internet";
  if (detected.includes("safari")) browser = "safari";

  return browser;
}

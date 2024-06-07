import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function useInstallPrompt(): [
  BeforeInstallPromptEvent | null,
  () => void,
] {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  function promptToInstall() {
    if (prompt) {
      return prompt.prompt();
    }

    return Promise.reject(
      new Error("Tried installing before sent 'beforeinstallprompt' event"),
    );
  }

  useEffect(() => {
    function ready(e: BeforeInstallPromptEvent) {
      e.preventDefault();
      setPrompt(e);
    }

    window.addEventListener("beforeinstallprompt", ready);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);

  return [prompt, promptToInstall];
}

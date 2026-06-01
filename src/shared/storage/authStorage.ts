const VERIFIER_KEY = "auth_code_verifier";
const APP_KEY_NAME = "appKey";
const isClient = typeof window !== "undefined";

export const authStorageService = {
  saveVerifier(code_verifier: string): void {
    if (!isClient) return;

    try {
      sessionStorage.setItem(VERIFIER_KEY, code_verifier);
    } catch (error) {
      console.error("Не удалось сохранить ключ в sessionStorage:", error);
    }
  },

  getVerifier(): string | null {
    if (!isClient) return null;

    return sessionStorage.getItem(VERIFIER_KEY);
  },

  clearVerifier(): void {
    if (!isClient) return;
    sessionStorage.removeItem(VERIFIER_KEY);
  },

  getAppKey(): string | null {
    if (!isClient) return null;
    return localStorage.getItem(APP_KEY_NAME);
  },

  saveAppKey(key: string): void {
    if (!isClient) return;
    try {
      localStorage.setItem(APP_KEY_NAME, key);
    } catch (error) {
      console.error(
        "Не удалось сохранить рабочий API-ключ в localStorage:",
        error,
      );
    }
  },
};

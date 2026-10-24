const TOKEN = "token";
const REFRESH_TOKEN = "refresh_token";
const PROFILE = "profile";

export function setStorage(data) {
  if (typeof window === "undefined") return;

  try {
    if (data.refreshToken) localStorage?.setItem(REFRESH_TOKEN, data.refreshToken);
    if (data.token) localStorage?.setItem(TOKEN, data.token);
    const currentProfile = getUserData() || {};
    localStorage?.setItem(
      PROFILE,
      JSON.stringify({ ...currentProfile, ...data }),
    );
    window.dispatchEvent(new Event("authchange"));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function setAuthTokens(tokens) {
  if (typeof window === "undefined") return;

  try {
    localStorage?.setItem(TOKEN, tokens.token);
    localStorage?.setItem(REFRESH_TOKEN, tokens.refreshToken);
    window.dispatchEvent(new Event("authchange"));
  } catch (error) {
    console.error("Error saving authentication tokens:", error);
  }
}
  
export function getToken() {
  if (typeof window === "undefined") return null;

  try {
    return localStorage?.getItem(TOKEN);
  } catch (error) {
    console.error("Error reading token:", error);
    return null;
  }
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;

  try {
    return localStorage?.getItem(REFRESH_TOKEN);
  } catch (error) {
    console.error("Error reading refresh token:", error);
    return null;
  }
}

export function getUserData() {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage?.getItem(PROFILE);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

export function getUserId() {
  if (typeof window === "undefined") return null;

  const data = getUserData();

  return data?.id ?? null;
}

export function getRole() {
  if (typeof window === "undefined") return null;

  const data = getUserData();

  return data?.role ?? null;
}

export function clearStorage() {
  if (typeof window === "undefined") return;

  try {
    localStorage?.removeItem(TOKEN);
    localStorage?.removeItem(REFRESH_TOKEN);
    localStorage?.removeItem(PROFILE);
    window.dispatchEvent(new Event("authchange"));
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}

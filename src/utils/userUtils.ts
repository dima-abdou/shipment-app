const USE_TOKEN_KEY = 'jwtToken';

/**
 * Returns the user token
 * @return {string} The user token
 * If the token is not defined returns an empty string
 */
export function getUserToken(): string {
  const token = window.localStorage.getItem(USE_TOKEN_KEY);
  return token || '';
}

/**
 * Sets the user token
 * @param {string} token The user token
 */
export function setUserToken(token: string): void {
  window.localStorage.setItem(USE_TOKEN_KEY, token);
}

/**
 * Removes the user token
 */
export function clearUserToken(): void {
  window.localStorage.removeItem(USE_TOKEN_KEY);
}

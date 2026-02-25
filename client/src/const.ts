export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// No external OAuth - admin login is handled via /admin with email/password
export const getLoginUrl = () => "/admin/login";

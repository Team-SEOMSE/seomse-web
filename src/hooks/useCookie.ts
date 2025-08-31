import { Cookies } from "react-cookie";

const cookies = new Cookies();

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
};

export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  return cookies.set(name, value, {
    path: "/",
    secure: true,
    sameSite: "strict",
    ...options,
    expires,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: "/" });
};

import { auth } from "./app/auth";

export const proxy = auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

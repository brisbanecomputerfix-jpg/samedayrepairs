import { Metadata } from "next";
import { LoginClient } from "./login-client";

export const metadata: Metadata = {
  title: "Account Login & Access Portal",
  description:
    "Sign in to your SameDayRepairs service seeker or verified service provider account. Track active dispatches or manage emergency tradie rosters.",
};

export default function LoginPage() {
  return <LoginClient />;
}


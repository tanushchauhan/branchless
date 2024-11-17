export const metadata = {
  title: appendWebsiteName("Sign Up"),
  description: "Page description",
};

import { appendWebsiteName } from "@/utils/config";
import SignUp from "./SignUp";

export default function SignUpPage() {
  return (
    <SignUp />
  );
}

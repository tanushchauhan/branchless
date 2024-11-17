export const metadata = {
  title: appendWebsiteName("Sign In"),
  description: "Page description",
};

import { appendWebsiteName } from "@/utils/config";
import SignIn from "./SignIn";

export default function SignInPage() {
  return (
    <SignIn />
  );
}

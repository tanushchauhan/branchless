import { createClient } from "@/utils/supabase/supabase";
import crypto from "crypto";

function hashTo10DigitNumber(inputString: string) {
  // Create a SHA-256 hash of the input string
  const hash = crypto.createHash("sha256").update(inputString).digest("hex");

  // Convert the hash to an integer and take modulo 10^10 to get a 10-digit number
  const tenDigitHash = parseInt(hash, 16) % Math.pow(10, 10);

  return tenDigitHash;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { email, password, name, phone_number } = await request.json();

  const acc_num = hashTo10DigitNumber(email);

  const { data: user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return Response.json(
      { message: "Signup failed", code: "1", error },
      {
        status: 400,
      }
    );
  }

  const { error: error2 } = await supabase
    .from("users")
    .insert([
      { id: user.user?.id, name, account_number: acc_num, phone_number },
    ]);

  if (error2) {
    if (error2.code === "23505") {
      return Response.json(
        {
          message: "Signup failed",
          error: "Email already in use",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      { message: "Signup failed", code: "2", error: error2 },
      {
        status: 400,
      }
    );
  }

  return Response.json({ message: "Signup successful" });
}

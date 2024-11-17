import crypto from "crypto";
import supabase from "../supabase";

function hashTo10DigitNumber(inputString) {
  // Create a SHA-256 hash of the input string
  const hash = crypto.createHash("sha256").update(inputString).digest("hex");

  // Convert the hash to an integer and take modulo 10^10 to get a 10-digit number
  const tenDigitHash = parseInt(hash, 16) % Math.pow(10, 10);

  return tenDigitHash;
}

export async function POST(request) {
  const { email, password, name, phone_number } = await request.json();

  const acc_num = hashTo10DigitNumber(email);

  const { data: user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return new Response(JSON.stringify({ message: "Signup failed", error }), {
      status: 400,
    });
  }

  const { error: error2 } = await supabase
    .from("users")
    .insert([
      { id: user.user.id, name, account_number: acc_num, phone_number },
    ]);

  if (error2) {
    if (error2.code === "23505") {
      return new Response(
        JSON.stringify({
          message: "Signup failed",
          error: "Email already in use",
        }),
        {
          status: 400,
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Signup failed", error: error2 }),
      {
        status: 400,
      }
    );
  }

  return new Response(JSON.stringify({ message: "Signup successful" }), {
    status: 200,
  });
}

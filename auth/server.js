import { createClient } from "@supabase/supabase-js";
import cookie from "cookie";


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const loginUserSupabase = async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const supabaseRes = await fetch(
      `${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: `${NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await strapiRes.json();

    if (supabaseRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

// ({ req, res, email, password }) => {
//     try {
//         let { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (data) {
//             console.log(data)
//             res.setHeader(
//                 'Set-Cookie',
//                 cookie.serialize('token', data.session.access_token, {
//                   httpOnly: true,
//                   secure: process.env.NODE_ENV !== 'development',
//                   maxAge: 60 * 60 * 24 * 7, // 1 week
//                   sameSite: 'strict',
//                   path: '/',
//                 })
//             )
//         } else {
//           return error;
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         return error;
//       }
//     };

export const logOutUserSupabase = async () => {
  let { error } = await supabase.auth.signOut();
  return error;
};

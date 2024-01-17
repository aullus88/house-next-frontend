import cookie from "cookie";
import { supabaseUrl } from "@/config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const supabaseRes = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    

    const data = await supabaseRes.json();
    // console.log(data)

        if (supabaseRes.ok) {
          // Set Cookie
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", data.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: "strict",
              path: "/",
            })
          );
        //   console.log(data.access_token)

          res.status(200).json({ data:data });
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

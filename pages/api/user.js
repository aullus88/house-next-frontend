import cookie from 'cookie'
import { supabaseUrl } from "@/config";

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)
    // console.log(token)

    const supabaseRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await supabaseRes.json()
    

    if (supabaseRes) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
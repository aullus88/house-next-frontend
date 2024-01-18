import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';

export default function Layout({ title, keywords, description, children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if there's no user
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  

  return (
    <div>
      {user ? <Sidebar title={title}>{(children)}</Sidebar> : ""}
      <ToastContainer />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
    </div>
  );
}

Layout.defaultProps = {
  title: "HOUSE ERP",
  description: "House ERP",
  keywords: "House",
};

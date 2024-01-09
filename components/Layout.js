import Head from "next/head";
import Sidebar from "./Sidebar";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
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

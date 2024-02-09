import Navigation from "./Navigation";
import Footer from "./Footer";
 
const Layout2 = ({ children }) => (
  <div className="bg-white">
    <Navigation/>
      {children}
    {/* <Footer /> */}
  </div>
);
 
export default Layout2;
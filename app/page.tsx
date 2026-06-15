import type { Metadata } from "next";
import Footer from "./footer/Footer"
import HomePage from "./home/home";
import Navbar from "./navbar/Navbar";
import StickyContactIcons from "./stickyicons/stickyIcons";

export const metadata: Metadata = {
  title: "Servani Safety Nets Bangalore | Balcony Nets, Pigeon Nets & Invisible Grills",
  description:
    "Servani Safety Nets provides balcony safety nets, pigeon nets, invisible grills, duct area nets, and industrial safety solutions in Bangalore with professional installation.",
  alternates: {
    canonical: "https://servanisafetynets.com/",
  },
};

const Home =()=> {
  return(
    <>
      <Navbar/>
      <HomePage/>
      <StickyContactIcons/>
      <Footer/>
      </>
  )
}

export default Home;

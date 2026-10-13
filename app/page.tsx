import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import GetInTouch from "@/components/GetInTouch";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Gallery />
        <GetInTouch />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}

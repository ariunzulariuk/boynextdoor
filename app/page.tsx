import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MemberLineup from "./components/MemberLineup";
import QuoteSection from "./components/QuoteSection";
import MusicGrid from "./components/MusicGrid";
import MiniGallery from "./components/MiniGallery";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <MemberLineup />
     
      <MusicGrid />
      
      <Footer />
    </main>
  );
}
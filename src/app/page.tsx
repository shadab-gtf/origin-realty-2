import Hero from "@/components/Hero";
import Header from '@/components/Header/index'
import ProjectGallery from "@/components/ProjectGallery";
import LiveParallaxBackground from "@/components/ImageLive";
import About from "@/components/Sections/About";
import BreathingSpaces from "@/components/Sections/BreathingSpaces";
import Vision from "@/components/Sections/Vision";
import Purpose from "@/components/Sections/Purpose";
// import VideoSection from "@/components/Sections/VideoSection";
import ScrollVideoCanvas from "@/components/UI/ScrollVideoCanvas";
import Footer from "@/components/Footer/Footer";
import Beyond from "@/components/Sections/Beyond";
import Integrity from "@/components/Sections/Integrity";
import OurValues from "@/components/Sections/OurValues";
import OurExpertise from "@/components/Sections/OurExpertise";
import Advantage from "@/components/Sections/Advantage";
// import VideoSection from "@/components/Sections/VideoSection";


export default function Home() {
  return (
    <>
     <Header/>
     <Hero/>
     <About/>
     {/* <ScrollVideoCanvas/> */}
     <LiveParallaxBackground/>
     <Vision/>
     <Purpose/>
     {/* <BreathingSpaces/> */}
     {/* <VideoSection/> */}
     {/* <ProjectGallery/> */}
     {/* <OurExpertise/> */}
     <OurValues/>
     <Advantage/>
     <Beyond/>
     {/* <Integrity/> */}
     <Footer/>

    </>
  );
}

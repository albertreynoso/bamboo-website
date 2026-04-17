import { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { Footer } from "./components/Footer";

// Lazy-loaded components for better initial performance
const Trust = lazy(() => import("./components/Trust").then(m => ({ default: m.Trust })));
const TestimonioVideo = lazy(() => import("./components/TestimonioVideo").then(m => ({ default: m.TestimonioVideo })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));

function SectionLoading() {
  return <div className="min-h-[400px] flex items-center justify-center bg-background/50" />;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full m-0 pt-[72px]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Services />

        <Suspense fallback={<SectionLoading />}>
          <Trust />
          <TestimonioVideo />
          <Contact />
        </Suspense>
      </main>

      <Footer />

      <WhatsAppFloat />
    </div>
  );
}

export default App;

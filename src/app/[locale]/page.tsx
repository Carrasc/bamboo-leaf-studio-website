import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { ScrollThread } from "@/components/ui/ScrollThread";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    // The thread is a sibling of the sections, not a child of any one of them,
    // so it can run the whole height of the document uninterrupted. It sits at
    // z-5: above every section's flat background, below every text block
    // (which carry `relative z-10`).
    <div className="relative">
      <ScrollThread />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Process />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

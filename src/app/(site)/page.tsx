import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { getSettings } from "@/lib/store";

export default async function HomePage() {
  const settings = await getSettings();
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Features />
      <Testimonials />
      <CTABanner settings={settings} />
    </>
  );
}

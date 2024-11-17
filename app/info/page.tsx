export const metadata = {
  title: "User Info",
  description: "Here's the relevant information regarding this user, in order for you to make more secure decisions.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import InfoFeatures from "@/components/infoFeatures";

export default function Home() {
  return (
    <>
      {/*<PageIllustration />*/}
      {/*<Hero />*/}
      {/*<Workflows />*/}
      <InfoFeatures />
      {/*<Testimonials />*/}
      {/*<Cta />*/}
    </>
  );
}

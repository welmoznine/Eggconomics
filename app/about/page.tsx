import React from "react";
import { Mail } from "lucide-react";
import FAQSection from "@/app/about/components/FAQSection";
import EggFlipWrapper from "./components/EggFlipWrapper";

const AboutPage = () => {
  return (
    <main className="w-full flex flex-col items-center px-4 md:px-8 bg-background pt-4 md:pt-10 flex-grow">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mb-4">
            Got egg-citing questions or feedback? We'd love to hear from you.
          </p>
          <div className="inline-flex items-center text-primary hover:text-[#ffc579]">
            <Mail className="w-5 h-5 mr-2" />
            <a href="mailto:contact@eggprices.com">contact@eggconomics.com</a>
          </div>
        </div>

        <EggFlipWrapper />

        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="w-full mb-6">
          <FAQSection />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;

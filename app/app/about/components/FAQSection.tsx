"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is this website about?",
      answer:
        "Eggconomics is a platform that tracks and displays egg prices across the United States to help consumers compare prices and find the best deals. Eggconomics is an independent website that provides publicly available pricing information for eggs across various stores and locations. The site is not affiliated, associated, authorized, endorsed by, or in any way officially connected with any grocery chains, brands, or retailers mentioned on this site. All trademarks, logos, and brand names are the property of their respective owners.",
    },
    {
      question: "How often is the egg price data updated?",
      answer:
        "The data is updated daily to ensure accuracy and reflect any price changes from different stores and locations.",
    },
    {
      question: "Where do you get your price data from?",
      answer:
        "The price data and all other information is obtained from a variety of sources, primarily grocery store websites and APIs.",
    },
    {
      question: "Why do egg prices vary between stores and locations?",
      answer:
        "Egg prices fluctuate due to factors like supply and demand, transportation costs, store pricing policies, and regional market conditions.",
    },
    {
      question: "How can I support this website?",
      answer:
        "You can support Eggconomics by sharing the site with others, reporting inaccurate data, and providing feedback to improve the platform.",
    },
    {
      question: "Which came first? The chicken or the egg?",
      answer:
        "The egg! Evolution happens gradually, with small genetic mutations over generations. At some point, a bird very similar to a chicken (a proto-chicken) laid an egg containing a genetic mutation that resulted in the first true chicken. Since the mutation occurred at the embryonic stage, the first chicken existed inside an egg before it hatched. So, from an evolutionary perspective, the egg came first! ",
    },
  ].filter((item) => item.question && item.answer);

  return (
    <div className="w-full max-w-4xl mx-auto bg-background rounded-lg shadow-md p-6 ">
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left py-4 flex justify-between items-start hover:text-[#ffc579]"
            >
              <span className="font-medium pr-8">{item.question}</span>
              <span className="flex-shrink-0 mt-1">
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openItems.includes(index) ? "max-h-96 pb-4" : "max-h-0"
              )}
            >
              <p className="text-gray-600 dark:text-gray-300 my-2">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

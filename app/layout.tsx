import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/context";

const raleway = Chakra_Petch({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Green Scan Techs | Caring for Our Environment, Simplifying Recycling with Green Scan",
  description:
    "Green Scan Techs, we're dedicated to revolutionizing waste management and recycling through innovative tech solutions. Our commitment to sustainability drives us to create eco-friendly practices, conserving resources and protecting the environment. We envision a cleaner, greener future, transforming waste into a valuable resource using cutting-edge tech like blockchain, AI, and IoT. Our core principles are innovation, sustainability, efficiency, transparency, and customer focus. By choosing us, you actively contribute to environmental protection. Join us in building a more sustainable future. Green Scan Techs – Your reliable partner in waste management and recycling.",
  icons: {
    icon: "/favicon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#051517]">
      <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
          <link rel="icon" href="/icons/icon-512x512.png" sizes="512x512" />
      <body className={raleway.className}>
        <ContextProvider>{children} </ContextProvider>
      </body>
    </html>
  );
}
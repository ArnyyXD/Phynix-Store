import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./providers";
import CursorGlow from "../components/CursorGlow";
import ValorantBG from "../components/ValorantBG";

export const metadata = {
  title: "Phynix Store — Valorant, Clash of Clans, BGMI & Free Fire Account Marketplace",
  description:
    "Buy, sell or EMI Valorant, Clash of Clans, BGMI, and Free Fire accounts, with a middleman escrow flow and seller KYC before payout.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Bebas+Neue&family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <ValorantBG />
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

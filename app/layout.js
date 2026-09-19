import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./providers";
import CursorGlow from "../components/CursorGlow";
import EmberParticles from "../components/EmberParticles";
import WingWisps from "../components/WingWisps";

export const metadata = {
  title: "Phynix Store — Valorant, Clash of Clans & BGMI Account Marketplace",
  description:
    "Buy, sell, rent or EMI Valorant, Clash of Clans, and BGMI accounts, with a middleman escrow flow and seller KYC before payout.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <WingWisps />
          <EmberParticles />
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

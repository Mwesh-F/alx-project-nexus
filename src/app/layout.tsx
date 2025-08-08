import "../../styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "CrownVote - Miss Kenya Pageant Polls",
  description: "Vote for your favorite Miss County & Miss Kenya contestants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-white">
        <Navbar />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

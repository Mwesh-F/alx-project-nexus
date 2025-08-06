import "../../styles/globals.css";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "CrownVote - Miss Kenya Pageant Polls",
  description: "Vote for your favorite Miss County & Miss Kenya contestants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body 
        className="min-h-screen flex flex-col font-sans"
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

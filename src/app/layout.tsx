import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CrownVote - Vote Miss County & Miss Kenya",
  description: "Cast your vote and help crown the next queen!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <Navbar />
        <main className="px-4 md:px-8">{children}</main>
      </body>
    </html>
  );
}

'use client';

import "../../styles/globals.css";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "CrownVote - Miss Kenya Pageant Polls",
  description: "Vote for your favorite Miss County & Miss Kenya contestants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ...other head tags... */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-papm6N4QK3pQk8Q8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ8z8pQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning={true}>
        <ClientProviders>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import Footer from "@/components/Footer";
import ConversionCTA from "@/components/ConversionCTA";

export const metadata: Metadata = {
  title: "ID Evaluators | Independent Project Evaluation, Research & Training",
  description:
    "ID Evaluators is an independent consultancy specialising in project and programme evaluation, research and training across development and environmental sectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex flex-col min-h-screen">
          {/* Header / Navigation */}
          <Header />

          {/* Page content */}
          <main className="flex-1">{children}</main>
          <ConversionCTA />

          {/* Footer */}
         <footer>
          <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
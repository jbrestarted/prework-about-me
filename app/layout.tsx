import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Beatsmith — MPC + Elektron Hip-Hop Copilot",
  description:
    "A guided hip-hop production assistant for the Akai MPC Live III, Elektron Analog Rytm MKII, and Analog Four MKII.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 text-gray-100 antialiased">
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0">
              <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">{children}</div>
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "A minimal dark theme todo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen max-h-screen">
          <header className="w-full bg-black py-16 mb-1">
            <div className="flex justify-center items-center">
              <Image
                src="/logo.svg"
                alt="Todo app logo"
                width={226}
                height={48}
              />
            </div>
          </header>
          <div className="relative -mt-7 max-w-2xl mx-auto px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

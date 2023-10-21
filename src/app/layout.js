import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "InsBy Task",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.className} `}>
        <div className="max-w-[1536px] mx-auto">{children}</div>
      </body>
    </html>
  );
}

import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { TokenContextProvider } from "@/context/TokenContext";
import { AuthProvider } from "@/context/AuthContext";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "InsBy Task",
  description: "This is a task for InsBy done by Nikola Muncan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.className} `}>
        <AuthProvider>
          <TokenContextProvider>
            <div className="max-w-[1536px] mx-auto">{children}</div>
          </TokenContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

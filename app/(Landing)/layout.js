import { Inter } from "next/font/google";
import "../globals.css";
import { OmniProvider } from "../Context/Omnipresent";
import Notification from "../Compenents/Notification/notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Health Medica",
  description: "Taking Care of your Health",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <OmniProvider>
      <body className={inter.className}><Notification/>{children}</body>
      </OmniProvider>
    </html>
  );
}

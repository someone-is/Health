import { Inter } from "next/font/google";
import "../globals.css";
import { OmniProvider } from "../Context/Omnipresent";
import Navigation from "./Account/Navigation/Navigation";
import Notification from "../Compenents/Notification/notification";
import design from "./account.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Account",
    description: "Manage your Profile",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <OmniProvider>
                <body className={inter.className}>
                    <Notification />
                    <div className={design.container}>
                        <Navigation />
                        {children}
                    </div>
                </body>
            </OmniProvider>
        </html>
    );
}

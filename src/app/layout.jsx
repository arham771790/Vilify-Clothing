import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
    title: "Vilify Clothing | Redefine Your Style",
    description: "Premium streetwear and modern fashion for the bold. Shop exclusive collections with worldwide shipping.",
    keywords: ["streetwear", "fashion", "clothing", "premium", "urban"],
    authors: [{ name: "Vilify Clothing" }],
    openGraph: {
        title: "Vilify Clothing | Redefine Your Style",
        description: "Premium streetwear and modern fashion for the bold.",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
                <ThemeProvider>
                    <CartProvider>
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

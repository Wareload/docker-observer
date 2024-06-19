import "wl/styles/globals.css";

import {GeistSans} from "geist/font/sans";

import {TRPCReactProvider} from "wl/trpc/react";
import Navbar from "wl/app/_components/Navbar";

export const metadata = {
    title: "Docker Observer",
    description: "Monitor your local docker",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <TRPCReactProvider>
            <main
                className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="flex flex-col justify-center gap-12 py-16 px-16 items-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem] text-shadow-h1 underline-offset-2">
                        Docker Observer
                    </h1>
                    <Navbar></Navbar>
                    {children}
                </div>
            </main>
        </TRPCReactProvider>
        </body>
        </html>
    );
}

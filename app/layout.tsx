import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Geist, Gasoek_One } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { CircleHelp, Map } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Eggconomics.com",
  description:
    "Compare egg prices across thousands of locations and stores nationwide to find the best deals.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const gasoekOne = Gasoek_One({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* NavBar */}
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-2 px-4 text-xs">
                {/* Left Side */}
                <div className="flex items-center gap-1 font-medium">
                  <Link href={"/"}>
                    {/* Logo SVG  */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 500 500"
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black dark:text-white"
                    >
                      <g
                        transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                        fill="currentColor"
                        stroke="none"
                      >
                        <path d="M2530 4134 c-114 -22 -218 -71 -327 -153 -283 -213 -556 -655 -723 -1167 -144 -444 -169 -810 -74 -1109 120 -377 422 -682 804 -809 125 -42 229 -56 405 -56 175 0 280 14 402 55 446 149 772 524 854 985 18 99 15 317 -6 455 -84 558 -367 1181 -689 1514 -131 135 -249 215 -382 261 -58 20 -211 34 -264 24z m120 -774 c15 -15 20 -33 20 -74 0 -61 -6 -57 105 -71 105 -14 189 -63 224 -132 14 -28 14 -98 0 -126 -21 -41 -62 -77 -95 -83 -24 -4 -52 3 -113 30 -127 56 -121 60 -121 -99 0 -120 2 -136 18 -142 112 -39 186 -73 248 -115 97 -65 139 -125 160 -232 47 -231 -81 -448 -308 -525 -34 -12 -75 -21 -90 -21 -27 0 -28 -1 -28 -57 0 -65 -18 -93 -61 -93 -39 0 -59 33 -59 97 l0 53 -34 0 c-64 0 -211 31 -266 56 -106 48 -150 118 -131 204 19 87 93 142 163 122 18 -6 65 -23 103 -40 39 -17 91 -33 118 -37 l47 -7 0 155 0 156 -57 16 c-92 27 -223 96 -273 145 -63 61 -92 126 -98 214 -8 127 34 240 125 337 62 67 136 103 276 133 25 6 27 10 27 61 0 60 22 95 60 95 11 0 29 -9 40 -20z m1110 -1146 c11 -12 11 -40 2 -142 -51 -575 -409 -962 -1001 -1082 -57 -12 -120 -20 -140 -18 -30 3 -36 7 -36 27 0 31 11 36 130 57 280 48 501 157 675 333 179 180 275 402 301 695 6 67 12 127 14 134 6 17 40 15 55 -4z" />
                        <path d="M2486 2906 c-31 -29 -36 -39 -36 -80 0 -26 5 -56 10 -67 10 -19 59 -49 80 -49 6 0 10 41 10 115 0 131 -5 137 -64 81z" />
                        <path d="M2670 2204 l0 -135 23 7 c57 17 91 76 84 148 -4 41 -10 55 -41 83 -62 57 -66 51 -66 -103z" />
                      </g>
                    </svg>
                  </Link>
                  <Link
                    href={"/"}
                    className={`${gasoekOne.className} text-md sm:text-xl md:text-2xl text-black dark:text-white`}
                  >
                    <span className="text-[#ffc579]">Eggconomics</span>.com
                  </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                  {/* Map Button */}
                  <Link href={"/locations"}>
                    <Button variant="ghost" size="sm">
                      <Map size={16} className="text-muted-foreground" />
                    </Button>
                  </Link>

                  {/* About Button */}
                  <Link href={"/about"}>
                    <Button variant="ghost" size="sm">
                      <CircleHelp size={16} className="text-muted-foreground" />
                    </Button>
                  </Link>

                  {/* Theme Switcher */}
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">{children}</div>

            {/* Footer */}
            <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs text-muted-foreground py-6">
              <p>
                © {new Date().getFullYear()} Eggconomics.com | All rights
                reserved
              </p>

              {/* Disclaimer */}
              <p className="max-w-2xl text-[10px] mt-2 px-4">
                <strong>Disclaimer:</strong> Eggconomics is an independent
                website that provides publicly available pricing information for
                eggs across various stores and locations. We are{" "}
                <strong>
                  not affiliated, associated, authorized, endorsed by, or in any
                  way officially connected
                </strong>{" "}
                with any grocery chains, brands, or retailers mentioned on this
                site. All trademarks, logos, and brand names are the property of
                their respective owners.
              </p>

            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://www.rajan-lamichhane.com.np";
const description =
  "Portfolio of Rajan Lamichhane — mechanical engineering student, robotics builder, and co-founder of Dhruva Academy in Pokhara, Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Rajan Lamichhane",
    "robotics",
    "mechatronics",
    "mechanical engineering",
    "Pokhara",
    "Nepal",
    "Dhruva Academy",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.role}`,
    description,
    url: siteUrl,
    siteName: profile.name,
    images: [{ url: profile.photo, width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  icons: {
    icon: "/assets/images/faviconnew.png",
    apple: "/assets/images/faviconnew.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // never cap zoom — pinch-to-zoom must keep working
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1017" },
  ],
};

/**
 * Applies the saved / system theme before first paint so the page never
 * flashes the wrong colour scheme.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  sameAs: [profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Pokhara", addressCountry: "NP" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Pashchimanchal Campus, Pokhara" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

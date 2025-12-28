import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "../globals.css";

// Maruburi 폰트 - 여러 weight를 하나의 font-family로 관리
const maruburi = localFont({
  src: [
    {
      path: "../../../public/fonts/maruburi_extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/maruburi_light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/maruburi_regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/maruburi_semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/maruburi_bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-maruburi",
});

// La Paloma 폰트
const laPaloma = localFont({
  src: "../../../public/fonts/la_paloma.ttf",
  variable: "--font-la-paloma",
});

// Matsury 폰트
const matsury = localFont({
  src: "../../../public/fonts/matsury.ttf",
  variable: "--font-matsury",
});

export const metadata: Metadata = {
  title: "범순과 승주의 모바일 청첩장",
  description: "범순과 승주의 결혼식에 여러분을 초대합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${maruburi.variable} ${laPaloma.variable} ${matsury.variable}`}>
        <Script
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=0qse53sk6j"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}

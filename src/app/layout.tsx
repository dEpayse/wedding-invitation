import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
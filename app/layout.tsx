import "./globals.css";

export const metadata = {
  title: "UnivGeeks",
  description: "Study Notes, PYQs and useful resources for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
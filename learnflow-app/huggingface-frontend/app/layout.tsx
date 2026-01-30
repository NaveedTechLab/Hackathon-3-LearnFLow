import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LearnFlow - AI-Powered Python Tutoring',
  description: 'Interactive Python learning platform with AI tutors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
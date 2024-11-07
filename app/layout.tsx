import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Indie_Flower } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

const indieFlower = Indie_Flower({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-indie'
});

export const metadata: Metadata = {
  title: 'Letter for Bias - Express Through Song',
  description: 'Express your untold message through the song',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${indieFlower.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
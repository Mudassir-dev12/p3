import { Irish_Grover } from '@next/font/google';
import './globals.css';

const inter = Irish_Grover({
  subsets: ['latin'],
  weight: '400',
});


export const metadata = {
  title: 'Protfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

import './globals.css';
import { ReactNode } from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import ThemeRegistry from '@/providers/ThemeRegistry';

export const metadata = {
  title: 'Dynamic Data Table Manager',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}

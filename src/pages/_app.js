import '@/src/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useThemeContext } from '@/src/lib/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppWrapper({ children }) {
  const { muiTheme } = useThemeContext();

  useEffect(() => {
    document.documentElement.classList.remove('no-fouc');
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
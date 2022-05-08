import '../styles/globals.css';
import '../public/fonts/style.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { padWidth } from '../widget/utils';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Helvetica Neue',
      'PingFang SC',
      'Microsoft YaHei',
      'Source Han Sans SC',
      'Noto Sans CJK SC',
      'WenQuanYi Micro Hei',
      'Roboto',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
});

theme.typography.h3 = {
  fontFamily:'Montserrat',
  fontSize: '3.2rem',
  fontWeight: 'normal',
  [`@media (max-width: ${padWidth})`]: {
    fontSize: '2rem',
  },
};
theme.typography.h4 = {
  fontFamily:'Montserrat',
  fontSize: '2.4rem',
  fontWeight: 'normal',
  [`@media (max-width: ${padWidth})`]: {
    fontSize: '1.8rem',
  },
};

theme.typography.faqtitle = {
  fontFamily:'Montserrat',
  fontSize: '1.9rem',
  fontWeight: 'normal',
  [`@media (max-width: ${padWidth})`]: {
    fontSize: '1.1rem',
  },
};

theme.typography.body1 = {
  fontFamily:'Montserrat',
  fontSize: '1.8rem',
  [`@media (max-width: ${padWidth})`]: {
    fontSize: '1.1rem',
  },
};

theme.typography.body2 = {
  fontFamily:'Montserrat',
  fontSize: '1.3rem',
  [`@media (max-width: ${padWidth})`]: {
    fontSize: '1rem',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7E57C2', // رنگ بنفش از فرم
    },
    secondary: {
      main: '#7c5dfa', // رنگ بنفش روشن‌تر
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"gandom", sans-serif',
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#000000',
          transition: 'color 0.3s ease',
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiInputBase-root': {
    //         transition: 'background-color 0.3s ease, color 0.3s ease',
    //       },
    //       '& .MuiInputLabel-root': {
    //         transition: 'color 0.3s ease',
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse', // تنظیم جهت راست‌چین
          marginBottom: '8px',
          '& .MuiListItemIcon-root': {
            minWidth: 0,
            marginLeft: '8px',
            color: 'black', // تنظیم رنگ ایکون‌ها
          },
          '& .css-rizt0-MuiTypography-root': {
            textAlign: 'right', // متن راست‌چین
            fontFamily: 'Gandom',
          },
          borderRadius: '12px', // گوشه‌های گرد
        },
      },
    },
  },
  breakpoints: {
    values: {
      lg:1300,
      LaptopL:1100,
      md:1030,
      Laptop:840,
      Tablet:780,
      sm: 710,
      mobileL:560,
      xs:0,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c5dfa', // بنفش روشن‌تر برای دارک مود
    },
    secondary: {
      main: '#bb86fc', // رنگ ثانویه در دارک مود
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  typography: {
    fontFamily: '"gandom", sans-serif',
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#1d1d1d',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          transition: 'color 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: '#2d2d2d',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
          '& .MuiInputLabel-root': {
            color: '#bbbbbb',
            transition: 'color 0.3s ease',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse', // تنظیم جهت راست‌چین
          marginBottom: '8px',
          '& .MuiListItemIcon-root': {
            minWidth: 0,
            marginLeft: '8px',
            color: 'black', // تنظیم رنگ ایکون‌ها
          },
          '& .css-rizt0-MuiTypography-root': {
            textAlign: 'right', // متن راست‌چین
            fontFamily: 'Gandom',
          },
          borderRadius: '12px', // گوشه‌های گرد
        },
      },
    },
  },
  breakpoints: {
    values: {
      lg:1300,
      LaptopL:1100,
      md:1030,
      Laptop:840,
      Tablet:780,
      sm: 710,
      mobileL:560,
      xs:0,
    },
  },
});

export { lightTheme, darkTheme };
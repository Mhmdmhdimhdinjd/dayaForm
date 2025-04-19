import NavbarComp from "../components/layout/navBar"
import NestedList from "../components/layout/sideBar"
import Form from "../components/users/form";
import TableComp from "../components/users/table/TableComp";

import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Link } from "@mui/material";

const theme = createTheme({
  components: {
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
});

export async function getServerSideProps() {
  try {
    // اتصال مستقیم به دیتابیس فقط برای SSR
    const { default: ConnectDb } = await import('../lib/db.js');
    const { default: User } = await import('../models/users');

    await ConnectDb();
    const users = await User.find({}).lean();

    return {
      props: {
        initialUsers: JSON.parse(JSON.stringify(users)),
      },
    };

  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        initialUsers: []
      },
    };
  }
}

const Home = ({ initialUsers }) => {

  const queryClient = useQueryClient();

  // دریافت داده‌ها با React Query
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api');
      return res.json();
    },
    initialData: initialUsers, // استفاده از داده SSR اولیه
  });

  return (
    <ThemeProvider theme={theme}>

      <div style={{ display: 'flex', width: '100%' }}>

        <div style={{ width: '100%', height: '100%', margin: ' 1rem' }}>


          <NavbarComp />

          <Form />


          <TableComp data={data} />

          {console.log(data)}

          <Box
            sx={{
              width: '100%',
              padding: '16px',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '.5rem',
            }}
          >

            <Box sx={{ display: 'flex', gap: 2, minWidth: 292 }}>
              <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
                <Typography fontFamily={'gandom'}>
                  پشتیبانی
                </Typography>
              </Link>
              <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
                <Typography fontFamily={'gandom'}>
                  مستندات
                </Typography>
              </Link>
              <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
                <Typography fontFamily={'gandom'}>
                  شرایط استفاده
                </Typography>
              </Link>
              <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
                <Typography fontFamily={'gandom'}>
                  قوانین
                </Typography>
              </Link>
            </Box>

            <Typography variant="body2" sx={{
              fontFamily:'gandom',
              color: 'gray',
               '@media (min-width: 844px)': { mr: 'auto', },
                display: 'block',
                 textAlign: 'center'
            }}>
              © طراحی و توسعه توسط دانا تدبیر یسر
            </Typography>

          </Box>

        </div>


        <NestedList />


      </div>


    </ThemeProvider>
  )

}

export default Home
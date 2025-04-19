import NavbarComp from '../components/layout/navBar';
import NestedList from '../components/layout/sideBar';
import Form from '../components/users/form';
import TableComp from '../components/users/table/TableComp';
import { useQuery } from '@tanstack/react-query';
import { useThemeContext } from '@/src/lib/ThemeContext';
import { Box, Typography, Link } from '@mui/material';

export async function getServerSideProps() {
  try {
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
        initialUsers: [],
      },
    };
  }
}

const Home = ({ initialUsers }) => {
  const { toggleTheme , toggleOffcanvas} = useThemeContext();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api');
      return res.json();
    },
    initialData: initialUsers,
  });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '100%', height: '100%', margin: '1rem' }}>
        <NavbarComp toggleOffcanvas={toggleOffcanvas} toggleTheme={toggleTheme} />

        <Box
          component="div"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            m: 1,
            mt: 3,
            p: 4,
          }}
        >
          <Form />
          <TableComp data={data} />
        </Box>

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
              <Typography fontFamily="gandom">پشتیبانی</Typography>
            </Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
              <Typography fontFamily="gandom">مستندات</Typography>
            </Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
              <Typography fontFamily="gandom">شرایط استفاده</Typography>
            </Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'blue' }}>
              <Typography fontFamily="gandom">قوانین</Typography>
            </Link>
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontFamily: 'gandom',
              color: 'text.secondary',
              '@media (min-width: 844px)': { mr: 'auto' },
              display: 'block',
              textAlign: 'center',
            }}
          >
            © طراحی و توسعه توسط دانا تدبیر یسر
          </Typography>
        </Box>
      </div>

      <NestedList />
    </div>
  );
};

export default Home;
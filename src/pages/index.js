import NavbarComp from '../components/layout/navBar';
import NestedList from '../components/layout/sideBar';
import Form from '../components/users/form';
import TableComp from '../components/users/table/TableComp';
import { useThemeContext } from '@/src/lib/ThemeContext';
import { Box, CircularProgress } from '@mui/material';
import useLoadUser from '../hooks/useLoadUser';
import Footer from '../components/layout/footer';



const Home = () => {
  const { toggleTheme, toggleOffcanvas } = useThemeContext();

  const { data } = useLoadUser();


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%', margin: '1rem', flex: '1', overflow: 'hidden' }}>
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
          <TableComp data={data || []} />
        </Box>

        <Footer/>
      </div>

      <NestedList />
    </div>
  );
};

export default Home;
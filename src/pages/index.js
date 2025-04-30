import NavbarComp from '../components/template/navBar/index';
import NestedList from '../components/template/sideBar/index';
import Form from '../components/template/form/index';
import TableComp from '../components/template/table/TableComp';
import { useThemeContext } from '@/src/lib/ThemeContext';
import { Box } from '@mui/material';
import useLoadUser from '../hooks/useLoadUser';
import Footer from '../components/template/footer/index';
import{ Toaster } from 'react-hot-toast';


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
      <Toaster />
    </div>
  );
};

export default Home;
import NavbarComp from '../components/template/navBar';
import Footer from '../components/template/footer';
import{ Toaster } from 'react-hot-toast';
import { useThemeContext } from '@/src/lib/ThemeContext';
import NestedList from '../components/template/sideBar';
import { Box } from '@mui/material';


export default function Layout({ children }) {
  const { toggleTheme, toggleOffcanvas } = useThemeContext();

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
          <main>
            {children}
          </main>
        </Box>

        <Footer/>
      </div>

      <NestedList />
      <Toaster />
    </div>
  );
}
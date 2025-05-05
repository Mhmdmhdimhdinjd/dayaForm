import NavbarComp from '../components/template/navBar';
import Footer from '../components/template/footer';
import{ Toaster } from 'react-hot-toast';
import { useThemeContext } from '@/src/lib/ThemeContext';
import NestedList from '../components/template/sideBar';
import { Box } from '@mui/material';


export default function Layout({ children }) {
  const { theme , toggleTheme, toggleOffcanvas } = useThemeContext();

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%', margin: '1rem 0', flex: '1', overflow: 'hidden' }}>
        <NavbarComp toggleOffcanvas={toggleOffcanvas} toggleTheme={toggleTheme} />

        <Box
          component="div"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: theme === "dark" ? "grey.900" : "white",
            m: 1,
            mt: 2,
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
import NavbarComp from "./components/navBar";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";
import { useThemeContext } from "@/src/lib/ThemeContext";
import NestedList from "./components/sideBar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  const { theme, toggleTheme, toggleOffcanvas } = useThemeContext();

  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          margin: { xs: "1rem 0", sm: "1rem" },
          flex: "1",
          overflow: "hidden",
        }}
      >
        <NavbarComp
          toggleOffcanvas={toggleOffcanvas}
          toggleTheme={toggleTheme}
        />

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
          <main>{children}</main>
        </Box>

        <Footer />
      </Box>

      <NestedList />
      <Toaster />
    </div>
  );
}

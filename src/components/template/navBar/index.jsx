import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  styled,
  alpha,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { TbApps } from "react-icons/tb";
import { RiTranslate2 } from "react-icons/ri";
import { CiMenuFries } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { useThemeContext } from "@/src/lib/ThemeContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "fit-content",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "auto",
    width: "fit-content",
  },
  direction: "rtl",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "rgb(0, 0, 0)" : '#fffff',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    "&::placeholder": {
      color: theme.palette.mode === "light" && "rgb(106, 106, 106)",
    },
  },
}));

const NavbarComp = ({ toggleTheme, toggleOffcanvas }) => {
  const { theme } = useThemeContext();
  const [onsearch, setOnsearch] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: theme === "dark" ? "grey.900" : "white",
          boxShadow: 2,
          m: 1,
          borderRadius: 2,
          width: "auto",
        }}
      >
        {!onsearch ? (
          <Toolbar>
            <IconButton edge="start">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                color="success"
              >
                <img
                  style={{
                    width: "2.5rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    gap: 1,
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-FuNTRMOa9731WMn4gdr8oSwSGBg3EepvA&s"
                  alt="profile"
                />
              </Badge>
            </IconButton>

            <IconButton>
              <HiOutlineBell
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
            </IconButton>

            <IconButton onClick={toggleTheme}>
              <RxMoon color={theme === "dark" ? "white" : "black"} size={20} />
            </IconButton>

            <IconButton>
              <TbApps color={theme === "dark" ? "white" : "black"} size={20} />
            </IconButton>

            <IconButton>
              <RiTranslate2
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
            </IconButton>

            <IconButton
              sx={{
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => setOnsearch(true)}
            >
              <HiOutlineSearch
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
            </IconButton>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                direction: "rtl",
                flexGrow: 1,
              }}
            >
              <IconButton onClick={toggleOffcanvas}>
                <CiMenuFries
                  color={theme === "dark" ? "white" : "black"}
                  size={20}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <HiOutlineSearch
                    color={theme === "dark" ? "white" : "black"}
                    size={20}
                  />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={"جستجو کنید... "}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Toolbar>
        ) : (
          <Toolbar>
            <IconButton onClick={() => setOnsearch(false)}>
              <IoArrowBack
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
            </IconButton>

            <Search
              sx={{
                flexGrow: 1,
              }}
            >
              <SearchIconWrapper>
                <HiOutlineSearch size={20} color={theme === "dark" ? "white" : "black"} />
              </SearchIconWrapper>
              <StyledInputBase
                fullWidth
                placeholder={"جستجو کنید... "}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default NavbarComp;

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  styled,
  alpha,
  Box,
} from '@mui/material';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import { TbApps } from 'react-icons/tb';
import { RiTranslate2 } from 'react-icons/ri';
import { CiMenuFries } from 'react-icons/ci';
import { RxMoon } from 'react-icons/rx';
import { useThemeContext } from '@/src/lib/ThemeContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  direction: 'rtl',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontFamily: 'gandom',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavbarComp = ({ toggleTheme, toggleOffcanvas }) => {
  const { theme } = useThemeContext();

  return (
    <Toolbar
      sx={{
        bgcolor: theme === 'dark' ? 'grey.900' : 'white',
        justifyContent: 'space-between',
        boxShadow: 2,
        m: 1,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ mx: 1 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color="success"
          >
            <img
              style={{
                width: '3rem',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              }}
              src="https://mhmdmhdimhdinjd.github.io/AdvancedForm/assets/%D8%A8%D8%B1%D9%86%D8%AC%20%D9%86%DB%8C%20%D9%86%DB%8C%202-DRoyfaGZ.jpg"
              alt="profile"
            />
          </Badge>
        </IconButton>
        <IconButton sx={{ mx: 1 }}>
          <HiOutlineBell color={theme === 'dark' ? 'white' : 'black'} size={24} />
        </IconButton>
        <IconButton sx={{ mx: 1 }} onClick={toggleTheme}>
          <RxMoon color={theme === 'dark' ? 'white' : 'black'} size={24} />
        </IconButton>
        <IconButton sx={{ mx: 1 }}>
          <TbApps color={theme === 'dark' ? 'white' : 'black'} size={24} />
        </IconButton>
        <IconButton sx={{ mx: 1 }}>
          <RiTranslate2 color={theme === 'dark' ? 'white' : 'black'} size={24} />
        </IconButton>
        <IconButton
          sx={{
            mx: 1,
            display: { xs: 'block', sm: 'none' },
          }}
          onClick={toggleOffcanvas}
        >
          <CiMenuFries color={theme === 'dark' ? 'white' : 'black'} size={24} />
        </IconButton>
      </Box>
      <Search>
        <SearchIconWrapper>
          <HiOutlineSearch color={theme === 'dark' ? 'white' : 'black'} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="جستجو کنید..."
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Toolbar>
  );
};

export default NavbarComp;
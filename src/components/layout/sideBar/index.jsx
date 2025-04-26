import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Avatar, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useThemeContext } from '@/src/lib/ThemeContext';
import Drawer from '@mui/material/Drawer';
import { CiCircleInfo } from "react-icons/ci";


export default function NestedList() {
  const { theme, isOpen, toggleOffcanvas } = useThemeContext();
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isDark = theme === 'dark';

  const [open, setOpen] = React.useState({
    users: true,
    userss: true,
    dashboard: false,
    management: false,
    security: false
  });

  const handleClick = (key) => {
    setOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const menuContent = (
    <List
      sx={{
        boxShadow: isSmallScreen ? 0 : 3,
        px: 1,
        width: 200,
        minHeight: isSmallScreen ? 'auto' : '100vh',
        bgcolor: isDark ? 'grey.900' : 'background.paper',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid size={3}
          sx={{
          //   // border: '2px solid',
          //   // borderColor: isDark ? 'white' : 'black',
          //   // borderRadius: '50%',
          //   // width: 20,
          //   // height: 20,
            ml: 'auto',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   ml: 3,
          }}
        >
         <CiCircleInfo size={24} />
          {/* <Typography color={isDark ? 'white' : 'black'} fontSize={12}>1</Typography> */}
        </Grid>
        <Grid size={9}>
          <img style={{ width: '100%', margin: 'auto' }} src="https://dayatadbir.com/wp-content/uploads/2024/02/DayaTadbir_Logo_White.png" alt="" />
        </Grid>
      </Grid>

      <ListItemButton selected={open.dashboard} sx={{ flexDirection: 'row-reverse' }} onClick={() => handleClick('dashboard')}>
        <ListItemIcon>
          <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
        </ListItemIcon>
        <ListItemText primary="مدیریت" />
        <Avatar sx={{
          bgcolor: '#EF5350',
          width: 30,
          height: 30,
          fontSize: 12
        }}>5</Avatar>
        {open.dashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open.dashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              color: 'white',
              backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
              '&:hover': {
                backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
              },
            }}>
            <ListItemIcon>
              <PanoramaFishEyeIcon sx={{ color: 'white', fontSize: '1rem' }} />
            </ListItemIcon>
            <ListItemText primary="جزییات" />
          </ListItemButton>
        </List>
      </Collapse>

      <List
        subheader={
          <ListSubheader sx={{ textAlign: 'right', color: isDark ? 'white' : 'black' }} component="div" id="nested-list-subheader">
            بخش‌های سامانه
          </ListSubheader>
        }
      >
        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <LocalGroceryStoreOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="فروشگاه" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <SchoolOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="آموزش" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }} onClick={() => handleClick('users')}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText selected={open.users} primary="کاربران" />
          {open.users ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open.users} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="لیست" />
            </ListItemButton>

            <ListItemButton selected={open.userss} sx={{ flexDirection: 'row-reverse' }} onClick={() => handleClick('userss')}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="مشاهده" />
              {open.userss ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open.userss} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    color: 'white',
                    backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                    '&:hover': {
                      backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                    },
                  }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon sx={{ color: 'white', fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText primary="جزییات" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="امنیت" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="اخبار" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <EmailOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="ایمیل" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <MessageOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="پیام" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <CalendarMonthOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="تقویم" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: 'row-reverse' }}>
          <ListItemIcon>
            <NoteAltOutlinedIcon sx={{ color: isDark ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="تسک ها" />
        </ListItemButton>

        <List
          subheader={
            <ListSubheader sx={{ textAlign: 'right', color: isDark ? 'white' : 'black' }} component="div" id="nested-list-subheader">
              مدیریت
            </ListSubheader>
          }
        >
          <ListItemButton selected={open.management} sx={{ flexDirection: 'row-reverse' }} onClick={() => handleClick('management')}>
            <ListItemIcon>
              <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="مدیریت" />
            {open.management ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.management} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: 'white',
                  backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                  },
                }}>
                <ListItemIcon>
                  <PanoramaFishEyeIcon sx={{ color: 'white', fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary="جزییات" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton selected={open.security} sx={{ flexDirection: 'row-reverse' }} onClick={() => handleClick('security')}>
            <ListItemIcon>
              <PanoramaFishEyeIcon sx={{ fontSize: '1rem', color: isDark ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="امنیت" />
            {open.management ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.security} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: 'white',
                  backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, darkviolet, violet)',
                  },
                }}>
                <ListItemIcon>
                  <PanoramaFishEyeIcon sx={{ color: 'white', fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary="جزییات" />
              </ListItemButton>
            </List>
          </Collapse>
         </List>
      </List>
    </List>
  );

  if (isSmallScreen) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleOffcanvas}
        sx={{
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            bgcolor: isDark ? 'grey.900' : 'background.paper',
          },
        }}
      >
        {menuContent}
      </Drawer>
    );
  }

  return menuContent;
}
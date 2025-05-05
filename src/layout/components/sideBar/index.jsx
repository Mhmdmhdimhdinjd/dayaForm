import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "@/src/lib/ThemeContext";
import Drawer from "@mui/material/Drawer";
import { CiCircleInfo } from "react-icons/ci";
import { TbSmartHome } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

export default function NestedList() {
  const { theme, isOpen, toggleOffcanvas } = useThemeContext();
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isDark = theme === "dark";

  const [open, setOpen] = React.useState({
    users: true,
    userss: true,
    dashboard: false,
    management: false,
    security: false,
    news: false,
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
        width: 270,
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "scroll",
        bgcolor: isDark ? "grey.900" : "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Grid container mb={1} sx={{ alignItems: "center" }}>
        <Grid
          size={3}
          sx={{
            ml: "auto",
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <CiCircleInfo size={24} />
          </Box>

          <IconButton sx={{ display: { xs: "block", sm: "none" } }}>
            <RxCross2  size={24} onClick={toggleOffcanvas} />
          </IconButton>

        </Grid>

        <Grid size={9}>
          <Box
            component="img"
            src="https://dayatadbir.com/wp-content/uploads/2024/02/DayaTadbir_Logo_White.png"
            alt="DayaTadbir Logo"
            sx={{
              width: "100%",
              margin: "auto",
              filter: "drop-shadow(0 0  3px rgba(0, 0, 0, 0.8))",
            }}
          />
        </Grid>
      </Grid>

      <ListItemButton
        selected={open.dashboard}
        sx={{ flexDirection: "row-reverse" }}
        onClick={() => handleClick("dashboard")}
      >
        <ListItemIcon>
          <TbSmartHome
            color={isDark ? "white" : muiTheme.palette.text.primary}
            size={24}
          />
        </ListItemIcon>
        <ListItemText primary="داشبورد" />
        <Avatar
          sx={{
            bgcolor: "#EF5350",
            width: 30,
            height: 30,
            fontSize: 12,
          }}
        >
          5
        </Avatar>
        {open.dashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open.dashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              color: "white",
              backgroundImage: "linear-gradient(to right, darkviolet, violet)",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(to right, darkviolet, violet)",
              },
            }}
          >
            <ListItemIcon>
              <PanoramaFishEyeIcon sx={{ color: "white", fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText primary="جزییات" />
          </ListItemButton>
        </List>
      </Collapse>

      <List
        subheader={
          <ListSubheader
            sx={{
              textAlign: "right",
              color: muiTheme.palette.text.disabled,
              bgcolor: isDark && "#212121",
              my: 1,
            }}
            component="div"
            id="nested-list-subheader"
          >
            <Typography variant="subtitle1">بخش‌های سامانه</Typography>
          </ListSubheader>
        }
      >
        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <LocalGroceryStoreOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="فروشگاه" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <SchoolOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="آموزش" />
        </ListItemButton>

        <ListItemButton
          sx={{ flexDirection: "row-reverse" }}
          onClick={() => handleClick("users")}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText selected={open.users} primary="کاربران" />
          {open.users ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open.users} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pr: 4 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon
                  sx={{
                    fontSize: "1rem",
                    color: isDark ? "white" : muiTheme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="لیست" />
            </ListItemButton>

            <ListItemButton
              selected={open.userss}
              sx={{ flexDirection: "row-reverse" }}
              onClick={() => handleClick("userss")}
            >
              <ListItemIcon>
                <PanoramaFishEyeIcon
                  sx={{
                    fontSize: "1rem",
                    color: isDark ? "white" : muiTheme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="مشاهده" />
              {open.userss ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open.userss} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, darkviolet, violet)",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(to right, darkviolet, violet)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <PanoramaFishEyeIcon
                      sx={{ color: "white", fontSize: "1rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="جزییات" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon
                      sx={{
                        fontSize: "1rem",
                        color: isDark ? "white" : muiTheme.palette.text.primary,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="امنیت" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleClick("news")}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <PanoramaFishEyeIcon
                      sx={{
                        fontSize: "1rem",
                        color: isDark ? "white" : muiTheme.palette.text.primary,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText selected={open.news} primary="اخبار" />
                </ListItemButton>

                <Collapse in={open.news} timeout="auto" unmountOnExit>
                  <List>
                    <ListItemButton sx={{ pr: 4 }}>
                      <ListItemIcon>
                        <PanoramaFishEyeIcon
                          sx={{
                            fontSize: "1rem",
                            color: isDark
                              ? "white"
                              : muiTheme.palette.text.primary,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="اعلانات" />
                    </ListItemButton>

                    <ListItemButton sx={{ pr: 4 }}>
                      <ListItemIcon>
                        <PanoramaFishEyeIcon
                          sx={{
                            fontSize: "1rem",
                            color: isDark
                              ? "white"
                              : muiTheme.palette.text.primary,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="ارتباطات" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <EmailOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="ایمیل" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <MessageOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="پیام" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <CalendarMonthOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="تقویم" />
        </ListItemButton>

        <ListItemButton sx={{ flexDirection: "row-reverse" }}>
          <ListItemIcon>
            <NoteAltOutlinedIcon
              sx={{ color: isDark ? "white" : muiTheme.palette.text.primary }}
            />
          </ListItemIcon>
          <ListItemText primary="تسک ها" />
        </ListItemButton>

        <List
          subheader={
            <ListSubheader
              sx={{
                textAlign: "right",
                color: muiTheme.palette.text.disabled,
                bgcolor: isDark && "#212121",
              }}
              component="div"
              id="nested-list-subheader"
            >
              مدیریت
            </ListSubheader>
          }
        >
          <ListItemButton
            selected={open.management}
            sx={{ flexDirection: "row-reverse" }}
            onClick={() => handleClick("management")}
          >
            <ListItemIcon>
              <PanoramaFishEyeIcon
                sx={{
                  fontSize: "1rem",
                  color: isDark ? "white" : muiTheme.palette.text.primary,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="مدیریت" />
            {open.management ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.management} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, darkviolet, violet)",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, darkviolet, violet)",
                  },
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon
                    sx={{ color: "white", fontSize: "1rem" }}
                  />
                </ListItemIcon>
                <ListItemText primary="جزییات" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            selected={open.security}
            sx={{ flexDirection: "row-reverse" }}
            onClick={() => handleClick("security")}
          >
            <ListItemIcon>
              <PanoramaFishEyeIcon
                sx={{
                  fontSize: "1rem",
                  color: isDark ? "white" : muiTheme.palette.text.primary,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="امنیت" />
            {open.security ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.security} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, darkviolet, violet)",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, darkviolet, violet)",
                  },
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon
                    sx={{ color: "white", fontSize: "1rem" }}
                  />
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
          "& .MuiDrawer-paper": {
            width: 270,
            boxSizing: "border-box",
            bgcolor: isDark ? "grey.900" : "background.paper",
          },
        }}
      >
        {menuContent}
      </Drawer>
    );
  }

  return menuContent;
}

import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Signup from "../signup/signup";
import Login from "../login/login";
import ResetEmail from "../resetEmail/resetEmail";
import ResetPassword from "../resetPassword/resetPassword";
import Home from "../../pages/home";
// import Navbar from "../navbar/navbar";
import NavBar from "../dashboard/dashboard";
import Country from "../../pages/country/country";
import City from "../../pages/city/city";
import Boins from "../../pages/boins/boins";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import Article from "../../pages/article/article";
import Category from "../../pages/category/category";
import FAQ from "../../pages/faq/faq";
import ProfilePage from "../../pages/profile/index";
import Service from "../../pages/service/service";
import Users from "../../pages/users/users";

const drawerWidth = 240;

const Layout = () => {
  const location = useLocation();
  const showDashboard =
    location.pathname !== "/login" &&
    location.pathname !== "/" &&
    location.pathname !== "/reset-email" &&
    !location.pathname.includes("reset-password/");

  const { i18n } = useTranslation();
  const [themeMode, setThemeMode] = useState("light");

  const handleMoonClick = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isLarge = useMediaQuery("(min-width:725px)");

  return (
    <Box dir={i18n.language === "ar" ? "rtl" : "ltr"} sx={{ width: "100%" }}>
      {/* {showDashboard && <Navbar onMoonClick={handleMoonClick} />} */}
      <Box sx={{ display: "flex" }}>
        {/* {showDashboard && ( */}
        <NavBar themeMode={themeMode} onMoonClick={handleMoonClick} />
        {/* )}{" "} */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        ></Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
      {/* <Box>
          {showDashboard && (
            <NavBar themeMode={themeMode} onMoonClick={handleMoonClick} />
          )}{" "}
        </Box>
        <Box>
          <Box>
            <Drawer
              sx={{
                width: drawerWidth,
                // flexShrink: 0,
                height: 400,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  height: 400,
                  boxSizing: "border-box",
                  background: "#f00",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronRightIcon />
                </IconButton>
              </DrawerHeader>
            </Drawer>
          </Box> */}
      {/* <Box>page</Box> */}
      {/* <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-email" element={<ResetEmail />} />
            <Route path="/reset-password/:email" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/country"
              element={<Country themeMode={themeMode} />}
            />
            <Route path="/city" element={<City themeMode={themeMode} />} />
            <Route path="/boins" element={<Boins themeMode={themeMode} />} />
            <Route
              path="/article"
              element={<Article themeMode={themeMode} />}
            />
            <Route
              path="/category"
              element={<Category themeMode={themeMode} />}
            />
            <Route path="/faq" element={<FAQ themeMode={themeMode} />} />
            <Route
              path="/service"
              element={<Service themeMode={themeMode} />}
            />
            <Route path="/user" element={<Users themeMode={themeMode} />} />
            <Route
              path="/profile"
              element={<ProfilePage themeMode={themeMode} />}
            />
          </Routes> */}
      {/* </Box> */}
    </Box>
  );
};

export default Layout;

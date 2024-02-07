import { useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  SwipeableDrawer,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Article from "../../pages/article/article";
import Category from "../../pages/category/category";
import FAQ from "../../pages/faq/faq";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProfilePage from "../../pages/profile/index";
import Service from "../../pages/service/service";
import Users from "../../pages/users/users";
import {
  CountryIcon,
  HomeIcon,
  IconArticle,
  IconCategory,
  IconFaq,
  IconService,
  IconUser,
  LogoutIcon,
  MoneyIcon,
} from "../../icons/icon";
import { shawSuccess } from "../../lib/tosts";

const drawerWidth = 240;

const Layout = () => {
  const { i18n, t } = useTranslation();

  const location = useLocation();
  const sideBarLinks = [
    { id: 0, to: "/home", icon: <HomeIcon />, text: t("Home") },
    { id: 1, to: "/country", icon: <CountryIcon />, text: t("Country") },
    { id: 2, to: "/city", icon: <CountryIcon />, text: t("City") },
    { id: 3, to: "/boins", icon: <MoneyIcon />, text: t("Boins") },
    { id: 4, to: "/article", icon: <IconArticle />, text: t("Article") },
    { id: 5, to: "/category", icon: <IconCategory />, text: t("category") },
    { id: 6, to: "/faq", icon: <IconFaq />, text: t("FAQ") },
    { id: 7, to: "/service", icon: <IconService />, text: t("Service") },
    { id: 8, to: "/user", icon: <IconUser />, text: t("User") },
    { id: 9, to: "/logout", icon: <LogoutIcon />, text: t("Logout") },
  ];

  const theme = useTheme();
  const navigate = useNavigate();

  const showDashboard =
    location.pathname !== "/login" &&
    location.pathname !== "/" &&
    location.pathname !== "/reset-email" &&
    !location.pathname.includes("reset-password/");

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    shawSuccess(t("logout successfully"));
    navigate("login");
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const isLarge = useMediaQuery("(min-width:725px)");

  return (
    <Box dir={i18n.language === "ar" ? "rtl" : "ltr"} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        {showDashboard && (
          <>
            <NavBar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              themeMode={themeMode}
              onMoonClick={handleMoonClick}
            />
            <Drawer
              sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: open ? drawerWidth : 0,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon
                      sx={{
                        color:
                          themeMode == "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                    />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider sx={{ width: "100%" }} />
              <List>
                {sideBarLinks.map((sideBarlink) => (
                  <ListItem
                    key={sideBarlink.id}
                    button
                    component={Link}
                    to={
                      sideBarlink.to === "/logout" ? "/login" : sideBarlink.to
                    }
                    onClick={
                      sideBarlink.to === "/logout" ? handleLogout : undefined
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor: "gray",
                        opacity: "0.7",
                        transition: "all 500ms ease-in-out",
                        borderRadius: "5px",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                        "& .MuiTypography-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: "#475569" }}
                      style={{
                        color:
                          themeMode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                    >
                      {sideBarlink.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color:
                            themeMode === "dark"
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark,
                          fontSize: "14px",
                        }}
                      >
                        {sideBarlink.text}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            {/* <SwipeableDrawer
              anchor="right"
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              open={open}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon
                      sx={{
                        color:
                          themeMode == "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                    />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {sideBarLinks.map((sideBarlink) => (
                  <ListItem
                    key={sideBarlink.id}
                    button
                    component={Link}
                    to={
                      sideBarlink.to === "/logout" ? "/login" : sideBarlink.to
                    }
                    onClick={
                      sideBarlink.to === "/logout" ? handleLogout : undefined
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor: "gray",
                        opacity: "0.7",
                        transition: "all 500ms ease-in-out",
                        borderRadius: "5px",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                        "& .MuiTypography-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: "#475569" }}
                      style={{
                        color:
                          themeMode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                    >
                      {sideBarlink.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color:
                            themeMode === "dark"
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark,
                          fontSize: "14px",
                        }}
                      >
                        {sideBarlink.text}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </SwipeableDrawer> */}
          </>
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default" }}
        >
          <Toolbar />
          <Routes>
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
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Signup from "../signup/signup";
import Login from "../login/login";
import ResetEmail from "../resetEmail/resetEmail";
import ResetPassword from "../resetPassword/resetPassword";
import NavBar from "../dashboard/dashboard";
import Country from "../../pages/country/country";
import City from "../../pages/city/city";
import Boins from "../../pages/boins/boins";
import { Box, useMediaQuery } from "@mui/material";
import Article from "../../pages/article/article";
import Category from "../../pages/category/category";
import FAQ from "../../pages/faq/faq";
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
import MobileDrawer from "./swipeableDrawer";
import DesktopDrawer from "./desktopDrawer";
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

  const isMobile = useMediaQuery("(max-width: 725px)");
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
            {isMobile ? (
              <MobileDrawer
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                handleLogout={handleLogout}
                sideBarLinks={sideBarLinks}
                themeMode={themeMode}
              />
            ) : (
              <DesktopDrawer
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleLogout={handleLogout}
                sideBarLinks={sideBarLinks}
                themeMode={themeMode}
              />
            )}
          </>
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default" }}
        >
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-email" element={<ResetEmail />} />
            <Route path="/reset-password/:email" element={<ResetPassword />} />
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

import { useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Signup from "../signup/signup";
import Login from "../login/login";
import ResetEmail from "../resetEmail/resetEmail";
import ResetPassword from "../resetPassword/resetPassword";
import Home from "../../pages/home";
import Navbar from "../navbar/navbar";
import Dashboard from "../dashboard/dashboard";
import Country from "../../pages/country/country";
import City from "../../pages/city/city";
import Boins from "../../pages/boins/boins";
import { Box } from "@mui/material";
import Article from "../../pages/article/article";
import Category from "../../pages/category/category";
import FAQ from "../../pages/faq/faq";
import ProfilePage from "../../pages/profile/index";
import Service from "../../pages/service/service";
import Users from "../../pages/users/users";

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
  const { id } = useParams();
  return (
    <Box dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      {showDashboard && <Navbar onMoonClick={handleMoonClick} />}
      <div className={`${showDashboard ? "flex" : ""} w-full`}>
        {showDashboard && <Dashboard themeMode={themeMode} />}{" "}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country" element={<Country themeMode={themeMode} />} />
          <Route path="/city" element={<City themeMode={themeMode} />} />
          <Route path="/boins" element={<Boins themeMode={themeMode} />} />
          <Route path="/article" element={<Article themeMode={themeMode} />} />
          <Route
            path="/category"
            element={<Category themeMode={themeMode} />}
          />
          <Route path="/faq" element={<FAQ themeMode={themeMode} />} />
          <Route path="/service" element={<Service themeMode={themeMode} />} />
          <Route path="/user" element={<Users themeMode={themeMode} />} />
          <Route
            path="/profile"
            element={<ProfilePage themeMode={themeMode} />}
          />
        </Routes>
      </div>
    </Box>
  );
};

export default Layout;

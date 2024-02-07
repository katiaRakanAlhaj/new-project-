import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import i18next from "i18next";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Icon } from "../style/style";
import Avatar from "@mui/material/Avatar";
import Modal from "./logout";
import { shawSuccess } from "../../lib/tosts";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";
import { buttonIcon } from "../style/style";
import { CiDark, CiLight } from "react-icons/ci";
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const Dashboard = ({
  themeMode,
  onMoonClick,
  handleDrawerOpen,
  open,
}: {
  themeMode: string;
  onMoonClick: Function;
  handleDrawerOpen: () => void;
  open: boolean;
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const handleLogout = () => {
    localStorage.removeItem("user");
    shawSuccess(t("logout successfully"));
    navigate("login");
  };
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(
    theme.palette.mode === "dark"
  );
  const handleChange = () => {
    if (i18next.language === "ar") {
      i18next.changeLanguage("en");
      localStorage.setItem("language", "en");
    } else {
      i18next.changeLanguage("ar");
      localStorage.setItem("language", "ar");
    }
  };
  const handleClick = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    theme.palette.mode = newMode;
    setIsDarkMode(!isDarkMode);
    onMoonClick(newMode);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: i18n.language === "ar" ? 0 : `${drawerWidth}px`,
      marginRight: i18n.language === "ar" ? `${drawerWidth}px` : 0,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const isMobile = useMediaQuery("(max-width:600px)");
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor:
            themeMode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mx: 2,
              ...(open && { display: "none" }),
              color:
                themeMode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: isMobile ? "flex-end" : "space-between",
              width: "100%",
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                component="div"
              >
                <img src="../images/favicon.cbd04736.svg" alt="" />
                <Typography
                  style={{
                    color:
                      themeMode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                  }}
                  variant="h6"
                  color="black"
                  sx={{ marginInlineStart: "1rem" }}
                >
                  {t("DashBoard")}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                justifyItems: "flex-start",
                alignItems: "center",
              }}
            >
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  onChange={handleChange}
                  value={i18next.language}
                  size={"small"}
                  style={{
                    marginRight: "1rem",
                  }}
                  inputProps={{
                    sx: {
                      color:
                        theme.palette.mode == "dark"
                          ? theme.palette.primary.light
                          : "grey",
                    },
                  }}
                >
                  <MenuItem value="ar">{t("arabic")}</MenuItem>
                  <MenuItem value="en">{t("english")}</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={handleClick} sx={buttonIcon}>
                {isDarkMode ? (
                  <Box sx={Icon}>
                    <CiLight />
                  </Box>
                ) : (
                  <Box sx={Icon}>
                    <CiDark />
                  </Box>
                )}
              </IconButton>
              <Link to="/profile">
                <img
                  src="../images/person.png"
                  className="w-8 h-8 mx-3 rounded-full"
                  alt=""
                />
              </Link>
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  width: "35px",
                  height: "35px",
                  marginLeft: "1rem",
                  marginTop: "-0.3rem",
                  backgroundColor: "#EFF6FF",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                lg
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal onClose={handleModalClose} openModal={isModalOpen}>
        <Box
          sx={{
            width: "500px",
            height: "200px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("Are you sure you want to logout?")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              onClick={handleModalClose}
            >
              {t("No")}
            </Button>
            <Button variant="contained" onClick={handleLogout}>
              {t("Yes")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default Dashboard;

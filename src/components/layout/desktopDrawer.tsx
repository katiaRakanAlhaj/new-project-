import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  styled,
  useTheme,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";

interface DesktopDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleLogout: () => void;
  sideBarLinks: {
    id: number;
    to: string;
    icon: JSX.Element;
    text: string;
  }[];
  themeMode: string;
}

const drawerWidth = 240;

const DesktopDrawer: React.FC<DesktopDrawerProps> = ({
  open,
  handleDrawerClose,
  handleLogout,
  sideBarLinks,
  themeMode,
}) => {
  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const { i18n } = useTranslation();
  return (
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
      anchor={i18n.language === "ar" ? "right" : "left"}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor:
            themeMode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronRightIcon
              sx={{
                color:
                  themeMode == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            />
          ) : (
            <ChevronLeftIcon
              sx={{
                color:
                  themeMode == "dark"
                    ? theme.palette.primary.light //"#fff"
                    : theme.palette.primary.dark,
              }}
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ width: "100%" }} />
      <List
        sx={{
          backgroundColor:
            themeMode == "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        {sideBarLinks.map((sideBarlink) => (
          <ListItem
            key={sideBarlink.id}
            button
            component={Link}
            to={sideBarlink.to === "/logout" ? "/login" : sideBarlink.to}
            onClick={sideBarlink.to === "/logout" ? handleLogout : undefined}
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
  );
};

export default DesktopDrawer;

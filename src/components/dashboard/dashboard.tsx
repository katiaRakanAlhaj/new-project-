import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import i18next from 'i18next';
import { useTheme } from '@mui/material';
import { Icon } from '../style/style';

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
} from '../../icons/icon';
import { shawSuccess } from '../../lib/tosts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormControl, MenuItem, Select } from '@mui/material';
import { buttonIcon } from '../style/style';
import { CiDark, CiLight } from 'react-icons/ci';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Dashboard = ({
  themeMode,
  onMoonClick,
}: {
  themeMode: string;
  onMoonClick: Function;
}) => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor:
      themeMode == 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  }));

  const { t } = useTranslation();
  const handleLogout = () => {
    localStorage.removeItem('user');
    shawSuccess(t('logout successfully'));
  };
  const theme = useTheme();

  const [isDarkMode, setIsDarkMode] = React.useState(
    theme.palette.mode === 'dark'
  );

  const handleChange = () => {
    if (i18next.language === 'ar') {
      i18next.changeLanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      i18next.changeLanguage('ar');
      localStorage.setItem('language', 'ar');
    }
  };
  const handleClick = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
    theme.palette.mode = newMode;
    setIsDarkMode(!isDarkMode);
    onMoonClick(newMode);
  };
  const sideBarLinks = [
    { id: 0, to: '/home', icon: <HomeIcon />, text: t('Home') },
    { id: 1, to: '/country', icon: <CountryIcon />, text: t('Country') },
    { id: 2, to: '/city', icon: <CountryIcon />, text: t('City') },
    { id: 3, to: '/boins', icon: <MoneyIcon />, text: t('Boins') },
    { id: 4, to: '/logout', icon: <LogoutIcon />, text: t('Logout') },
    { id: 5, to: '/article', icon: <IconArticle />, text: t('Article') },
    { id: 6, to: '/category', icon: <IconCategory />, text: t('category') },
    { id: 6, to: '/faq', icon: <IconFaq />, text: t('FAQ') },
    { id: 7, to: '/service', icon: <IconService />, text: t('Service') },
    { id: 8, to: '/user', icon: <IconUser />, text: t('User') },
  ];

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor:
            themeMode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: '40rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component="div"
            >
              <img src="../images/favicon.cbd04736.svg" alt="" />
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                color="black"
                sx={{ marginLeft: '1rem' }}
              >
                {t('DashBoard')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                justifyItems: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  onChange={handleChange}
                  value={i18next.language}
                  size={'small'}
                  style={{
                    marginRight: '1rem',
                  }}
                  inputProps={{
                    sx: {
                      color:
                        theme.palette.mode == 'dark'
                          ? theme.palette.primary.light
                          : 'grey',
                    },
                  }}
                >
                  <MenuItem value="ar">{t('arabic')}</MenuItem>
                  <MenuItem value="en">{t('english')}</MenuItem>
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
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:
              themeMode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon
                sx={{
                  color:
                    themeMode == 'dark'
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
              to={sideBarlink.to === '/logout' ? '/login' : sideBarlink.to}
              onClick={sideBarlink.to === '/logout' ? handleLogout : undefined}
              sx={{
                '&:hover': {
                  backgroundColor: 'gray',
                  opacity: '0.7',
                  transition: 'all 500ms ease-in-out',
                  borderRadius: '5px',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '& .MuiTypography-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{ color: '#475569' }}
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
              >
                {sideBarlink.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color:
                      themeMode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                    fontSize: '14px',
                  }}
                >
                  {sideBarlink.text}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Dashboard;

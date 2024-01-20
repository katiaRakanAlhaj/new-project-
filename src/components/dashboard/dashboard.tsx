import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
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

const Dashboard = ({ themeMode }: { themeMode: string }) => {
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    shawSuccess(t('logout successfully'));
  };

  const theme = useTheme();

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

  return (
    <div className="flex-1">
      <aside
        id="default-sidebar"
        className="w-56  transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
        style={{
          backgroundColor:
            themeMode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          height: '100%',
        }}
      >
        <Box sx={{ px: 2 }}></Box>
        <Box>
          <List className="space-y-2">
            {sideBarLinks.map((sideBarlink) => (
              <ListItem
                key={sideBarlink.id}
                button
                component={Link}
                to={sideBarlink.to === '/logout' ? '/login' : sideBarlink.to}
                onClick={
                  sideBarlink.to === '/logout' ? handleLogout : undefined
                }
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
        </Box>
      </aside>
    </div>
  );
};

export default Dashboard;

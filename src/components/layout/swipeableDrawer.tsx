import { Link } from 'react-router-dom';
import {
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';

interface MobileDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  handleLogout: () => void;
  sideBarLinks: {
    id: number;
    to: string;
    icon: JSX.Element;
    text: string;
  }[];
  themeMode: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  handleLogout,
  handleDrawerClose,
  open,
  handleDrawerOpen,
  sideBarLinks,
  themeMode,
}) => {
  const theme = useTheme();
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  const { i18n } = useTranslation();
  const drawerWidth = 240;
  return (
    <SwipeableDrawer
      anchor={i18n.language === 'ar' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      open={open}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      PaperProps={{
        sx: {
          backgroundColor:
            themeMode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        },
      }}
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
            <ChevronRightIcon
              sx={{
                color:
                  themeMode == 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            />
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
    </SwipeableDrawer>
  );
};

export default MobileDrawer;

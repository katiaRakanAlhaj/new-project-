import { useState } from 'react';
import {
  AppBar,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Box,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import {
  IconEnvelope,
  IconNotifications,
  IconPainting,
  IconTrolley,
} from '../../icons/icon';
import { CiDark, CiLight } from 'react-icons/ci';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Icon, avatarLogout, buttonIcon } from '../style/style';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';

const Navbar = ({ onMoonClick }: { onMoonClick: Function }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = () => {
    if (i18next.language === 'ar') {
      i18next.changeLanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      i18next.changeLanguage('ar');
      localStorage.setItem('language', 'ar');
    }
  };
  const icons = [
    { id: 1, icon: <IconPainting /> },
    { id: 2, icon: <IconTrolley /> },
    { id: 3, icon: <IconEnvelope /> },
    { id: 4, icon: <IconNotifications /> },
  ];
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark');

  const handleClick = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
    theme.palette.mode = newMode;
    setIsDarkMode(!isDarkMode);
    onMoonClick(newMode);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
      }}
    >
      <Toolbar>
        <img src="../images/favicon.cbd04736.svg" alt="" />
        <Typography
          style={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
          }}
          variant="h6"
          color="black"
          sx={{ marginLeft: '1rem' }}
        >
          {t('DashBoard')}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={i18next.language}
              size={'small'}
            >
              <MenuItem value="ar">{t('arabic')}</MenuItem>
              <MenuItem value="en">{t('english')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ px: 2, ml: 1 }}>
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
        </Box>
        {icons.map((icon, index) => (
          <IconButton key={index} sx={buttonIcon}>
            <Box sx={Icon}>{icon.icon}</Box>
          </IconButton>
        ))}

        <Link to="/profile">
          <img
            src="../images/person.png"
            className="w-8 h-8 mx-3 rounded-full"
            alt=""
          />
        </Link>

        <Avatar sx={avatarLogout} onClick={toggleModal}>
          lg
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

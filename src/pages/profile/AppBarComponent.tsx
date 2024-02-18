import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import { personProfileImage } from '../../components/style/style';
import { IconProfile } from '../../icons/icon';
import { useTheme } from '@mui/material';

interface AppBarComponentProps {
  themeMode: string;
  otherUser: any;
  t: (key: string) => string;
  handleUpdate: (modal: string, id?: number) => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  themeMode,
  otherUser,
  t,
  handleUpdate,
}) => {
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: '#0F172A',
          height: '25vh',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: 'white',
          height: 400,
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
        }}
        style={{
          backgroundColor:
            themeMode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.background.default,
          border: themeMode === 'dark' ? 'solid 1px white' : 'none',
        }}
      >
        <Toolbar>
          <Avatar src="../images/user-1.ad58ce72.jpg" sx={personProfileImage} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '7rem',
            }}
          >
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: 'black' }}
              >
                {otherUser?.name}
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                front end developer
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: 'black' }}
              >
                $32,400
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                {t('Total Balance')}
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: 'black' }}
              >
                200
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                {t('Board Card')}
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: 'black' }}
              >
                3200
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                {t('Calender Events')}
              </Typography>
            </Box>
            <Button onClick={() => handleUpdate('name', otherUser?.id)}>
              <IconProfile />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComponent;

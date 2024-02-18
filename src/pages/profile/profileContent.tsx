import React from 'react';
import { Box, Button, Grid, Icon, TextField, Typography } from '@mui/material';
import PieChart from './pieChart';
import BarChart from './Bar';
import LineChart from './Line';
import Modal from '../models/model';
import { cardInfo, formInput, popup } from '../../components/style/style';
import { IconProfile } from '../../icons/icon';
import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { TProfileUser } from '../../api/profile/interfaces';
interface ProfileContentProps {
  themeMode: string;
  otherUser: any;
  isModalOpen: boolean;
  currentModal: string;
  toggleModal: (modal: string) => void;
  handleUpdate: (modal: string, id?: number) => void;
  handleSubmit: any; // Update the type as per your form data type
  control: any; // Update the type as per your form control type
  setValue: any; // Update the type as per your form value type
  t: (key: string) => string;
  inputs: { name: string; label: string }[];
  inputsTwo: { name: string; label: string }[];
  handleFormSubmit: any;

  handleSubmitFormTwo: any; // Update the type as per your form data type
  icons: {
    id: string;
    label: string;
    icon: JSX.Element;
    text: JSX.Element;
  }[];
  isMobile: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  themeMode,
  otherUser,
  isModalOpen,
  currentModal,
  toggleModal,
  handleUpdate,
  handleSubmit,
  handleFormSubmit,
  control,

  t,
  inputs,
  inputsTwo,
  handleSubmitFormTwo,
  icons,
  isMobile,
}) => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Box
            sx={cardInfo}
            style={{
              backgroundColor:
                themeMode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === 'dark' ? 'solid 1px white' : 'none',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  style={{
                    color:
                      themeMode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                  }}
                  variant="h6"
                >
                  {t('Info')}
                </Typography>
              </Box>
              <Box>
                <Icon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleUpdate('email', otherUser?.id)}
                >
                  <IconProfile />
                </Icon>
              </Box>
            </Box>

            <>
              {icons.map((item) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}
                >
                  <Box>
                    <Icon
                      sx={{
                        cursor: 'pointer',
                        marginTop: '0.7rem',
                        color:
                          themeMode === 'dark'
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                      key={item.id}
                    >
                      {item.icon}
                    </Icon>
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>
                    <Typography color={'#64748B'} key={item.id}>
                      {item.label}
                    </Typography>
                    <Typography color={'#64748B'} key={item.id}>
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </>
          </Box>

          <Box
            sx={{
              backgroundColor:
                themeMode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              marginTop: '2rem',
            }}
          >
            <PieChart />
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sm={6}
          xs={12}
          container
          sx={{ width: '100%', borderRadius: '5px' }}
        >
          <Box
            sx={{
              marginTop: '2rem',
              borderRadius: '5px',
              width: '100%',
              height: isMobile ? 'fit-content' : '',
            }}
            style={{
              backgroundColor:
                themeMode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === 'dark' ? 'solid 1px white' : 'none',
            }}
          >
            <BarChart themeMode={themeMode} />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
              borderRadius: '5px',
              width: '100%',
              height: isMobile ? 'fit-content' : '',
            }}
            style={{
              backgroundColor:
                themeMode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === 'dark' ? 'solid 1px white' : 'none',
            }}
          >
            <LineChart themeMode={themeMode} />
          </Box>
        </Grid>
      </Grid>
      <Modal
        onClose={() => toggleModal('name')}
        openModal={isModalOpen && currentModal === 'name'}
      >
        <Box
          component="form"
          sx={popup(isMobile)}
          onSubmit={handleSubmit(handleSubmitFormTwo)}
          style={{
            backgroundColor:
              themeMode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === 'dark' ? 'solid 1px white' : 'none',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}
            style={{
              color:
                themeMode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            {t('Update Profile')}
          </Typography>
          <Grid container spacing={2}>
            {inputs.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" size="small">
              {t('Submit')}
            </Button>
            <Button
              onClick={() => toggleModal('name')}
              variant="contained"
              size="small"
            >
              {t('Close')}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        onClose={() => toggleModal('email')}
        openModal={isModalOpen && currentModal === 'email'}
      >
        <Box
          component="form"
          sx={popup(isMobile)}
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{
            backgroundColor:
              themeMode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === 'dark' ? 'solid 1px white' : 'none',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}
            style={{
              color:
                themeMode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            {t('Update Profile')}
          </Typography>
          <Grid container spacing={2}>
            {inputsTwo.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" size="small">
              {t('Submit')}
            </Button>
            <Button
              onClick={() => toggleModal('email')}
              variant="contained"
              size="small"
            >
              {t('Close')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileContent;

import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { container } from '../../components/style/style';
import { IconEmail, IconLocation, IconPhone } from '../../icons/icon';
import 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { shawError, shawSuccess } from '../../lib/tosts';
import { theme } from '../../../theme';
import { userProfileApi } from '../../api/profile/api';
import { TProfileUser } from '../../api/profile/interfaces';
import { userQueries } from '../../api/profile/query';
import AppBarComponent from './AppBarComponent';
import ProfileContent from './profileContent';

const ProfilePage = ({ themeMode }: { themeMode: string }) => {
  const [otherUser, setUser] = useState<TProfileUser>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [currentModal, setCurrentModal] = useState('');

  const toggleModal = (modal: string) => {
    setCurrentModal(modal);
    setIsModalOpen(!isModalOpen);
  };
  const { data: user } = userQueries.useGetUser(selectedId);

  const { handleSubmit, control, setValue } = useForm<TProfileUser>({
    defaultValues: {
      name: otherUser?.name,
      email: otherUser?.email,
      phone: otherUser?.phone,
      location: otherUser?.location,
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const getUser = async () => {
        const users = await userProfileApi.getUsers();
        const parsedUser = JSON.parse(user);
        const filterUser = users.find(
          (_user) => _user.name === parsedUser.name
        );
        setUser(filterUser);
        setValue('name', filterUser?.name || '');
        setValue('email', filterUser?.email || '');
        setValue('phone', filterUser?.phone || '');
        setValue('location', filterUser?.location || '');
      };
      getUser();
    }
  }, [user, setValue]);

  const { t } = useTranslation();

  const inputs = [
    {
      name: 'name',
      label: t('Name'),
    },
  ];

  const inputsTwo = [
    {
      name: 'email',
      label: t('Email'),
    },
    {
      name: 'phone',
      label: t('Phone'),
    },
    {
      name: 'location',
      label: t('location'),
    },
  ];

  const handleUpdate = (modal: string, id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    toggleModal(modal);
  };

  const handleFormSubmit = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        name: data.name,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t('Profile updated successfully'));
    } catch (error) {
      shawError('Error updating profile');
    }
  };

  const handleSubmitFormTwo = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        email: data.email,
        phone: data.phone,
        location: data.location,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t('Profile updated successfully'));
    } catch (error) {
      shawError('Error updating profile');
    }
  };
  const icons = [
    {
      id: '0',
      label: t('Email'),
      icon: <IconEmail />,
      text: <Typography>{otherUser?.email}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: '1',
      label: t('Phone'),
      icon: <IconPhone />,
      text: <Typography>{otherUser?.phone}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: '2',
      label: t('location'),
      icon: <IconLocation />,
      text: <Typography>{otherUser?.location}</Typography>, // Include the otherUser?.name value here
    },
  ];

  const isMobile = useMediaQuery('max-width:900px');
  return (
    <Box
      sx={[container, { minHeight: '100vh', height: '100%' }]}
      style={{
        backgroundColor:
          themeMode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.background.default,
      }}
    >
      <AppBarComponent
        themeMode={themeMode}
        otherUser={otherUser}
        t={t}
        handleUpdate={handleUpdate}
      />
      <ProfileContent
        themeMode={themeMode}
        otherUser={otherUser}
        isModalOpen={isModalOpen}
        currentModal={currentModal}
        toggleModal={toggleModal}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        t={t}
        inputs={inputs}
        inputsTwo={inputsTwo}
        handleSubmitFormTwo={handleSubmitFormTwo}
        icons={icons}
        isMobile={isMobile}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default ProfilePage;

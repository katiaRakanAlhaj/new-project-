import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUsers, { userQueries } from '../../api/auth/query';
import { useForm } from 'react-hook-form';
import { TUser } from '../../api/auth/interfaces';
import { userApi } from '../../api/auth/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box, Button, TextField, Typography } from '@mui/material';
import {
  AddButton,
  container,
  flexContainer,
  formInput,
  popup,
} from '../../components/style/style';
import Modal from '../models/model';
import Table from '../../components/Table/table';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_user } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import MyForm from '../form/formInput';

const Users = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useUsers();

  const { data: user, isLoading: isLoadingBoin } =
    userQueries.useGetUser(selectedId);

  console.log('boin', user);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TUser>({
    resolver: yupResolver(schema_user),
    defaultValues: {
      name: '',
      email: '',
      phone: 0,
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('id', user.id);
    }
  }, [selectedId, user]);

  const handleFormSubmit = async (data: TUser) => {
    try {
      if (selectedId > 0) {
        await userApi.updateUserInfo({ data: data, id: selectedId });
        shawSuccess(t('user updated successfully'));
      } else {
        await userApi.postUsers({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('user added sucessfully'));
      }
      refetch();
      console.log('data', data);
    } catch (error) {
      shawSuccess('error');
    }
  };

  const handleUpdate = (id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const filteredData =
    response?.filter((item) => item.name?.includes(searchValue)) ?? [];
  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        userApi.deleteUser(id);
      }
      refetch();
      shawSuccess(t('user deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete user'));
    }
  };

  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Name'), key: 'name' },
    { th: t('Email'), key: 'email' },
    { th: t('Phone'), key: 'phone' },
    { th: t('Actions'), key: 'actions' },
  ];
  const inputs = [
    {
      name: 'name',
      label: t('name'),
      error: errors.name,
      errorMassage: errors.name,
    },
    {
      name: 'email',
      label: t('email'),
      error: errors.email,
      errorMassage: errors.email,
    },
    {
      name: 'phone',
      label: t('phone'),
      error: errors.phone,
      errorMassage: errors.phone,
    },
  ];
  const theme = useTheme();
  return (
    <Box
      sx={container}
      style={{
        backgroundColor:
          themeMode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.background,
      }}
    >
      <Box sx={flexContainer}>
        <Box>
          <Typography
            style={{
              color:
                themeMode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
            variant="h6"
            sx={{ fontWeight: 'bold' }}
          >
            {t('My Boin')}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t('Search For Boin')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={AddButton} onClick={toggleModal}>
            {t('Add New User')}
          </Button>
        </Box>
      </Box>
      <Table
        columns={columns}
        data={filteredData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal} openModal={isModalOpen}>
          {isLoadingBoin ? (
            <div>loading...</div>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={popup}
              style={{
                backgroundColor:
                  themeMode === 'dark'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
                border: themeMode === 'dark' ? 'solid 1px white' : 'none',
              }}
            >
              <Typography
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}
              >
                {selectedId > 0 ? t('Update User') : t('Add New User')}
              </Typography>
              <MyForm control={control} formInput={formInput} inputs={inputs} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" size="small">
                  {t('Submit')}
                </Button>
                <Button onClick={toggleModal} variant="contained" size="small">
                  {t('Close')}
                </Button>
              </Box>
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default Users;

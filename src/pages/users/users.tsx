import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUsers, { userQueries } from '../../api/profile/query';
import { TProfileUser } from '../../api/profile/interfaces';
import { useForm } from 'react-hook-form';
import { userProfileApi } from '../../api/profile/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { container, formInput } from '../../components/style/style';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_user } from '../../components/schema/shcema';
import Header from '../../components/Header/Header';
import Body from '../../components/body/body';
import ButtonComponent from '../../components/addNewModal/AddNewModal';

const Users = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useUsers();

  const { data: user, isLoading: isLoading } =
    userQueries.useGetUser(selectedId);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TProfileUser>({
    resolver: yupResolver(
      schema_user({
        name: t('name is required'),
        email: t('email is required'),
        phone: t('phone is required'),
        location: t('location is rquired'),
      })
    ),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
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
      setValue('location', user.location);
      setValue('id', user.id);
    }
  }, [selectedId, user]);

  const handleFormSubmit = async (data: TProfileUser) => {
    try {
      if (selectedId > 0) {
        await userProfileApi.updateUser({ data: data, id: selectedId });
        shawSuccess(t('user updated successfully'));
      } else {
        await userProfileApi.postUser({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('user added sucessfully'));
      }
      refetch();
      setSelectedId(0);
      toggleModal();
      reset();
      console.log('data', data);
    } catch (error) {
      shawSuccess('error');
    }
  };
  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        userProfileApi.deleteUser(id);
      }
      refetch();
      shawSuccess(t('user deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete user'));
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

  const filteredData = response.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Name'), key: 'name' },
    { th: t('Email'), key: 'email' },
    { th: t('Phone'), key: 'phone' },
    { th: t('Location'), key: 'location' },
    { th: t('Actions'), key: 'actions' },
  ];
  const inputs = [
    {
      name: 'name',
      label: t('Name'),
      error: errors.name,
      errorMassage: errors.name?.message,
    },
    {
      name: 'email',
      label: t('email'),
      error: errors.email,
      errorMassage: errors?.email?.message,
    },
    {
      name: 'phone',
      label: t('phone'),
      error: errors.phone,
      errorMassage: errors.phone?.message,
    },
    {
      name: 'location',
      label: t('location'),
      error: errors.location,
      errorMassage: errors.location?.message,
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
            : theme.palette.background.default,
      }}
    >
      <Header
        themeMode={themeMode}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        label={t('Search For User')}
        title={t('My User')}
        toggleModal={toggleModal}
        titleButton={t('Add New User')}
      />
      <Body
        columns={columns}
        data={filteredData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      <ButtonComponent
        themeMode={themeMode}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        handleFormSubmit={handleFormSubmit}
        control={control}
        formInput={formInput}
        inputs={inputs}
        errors={errors}
        selectedId={selectedId}
        isLoading={isLoading}
        reset={reset}
        type="User"
      />
    </Box>
  );
};

export default Users;

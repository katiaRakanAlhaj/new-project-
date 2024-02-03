import { useEffect, useState } from 'react';
import useCities, { cityQueries } from '../../api/cities/query';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { container, formInput } from '../../components/style/style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  addCity,
  deleteCity,
  fetchCity,
  updateCity,
} from '../../slices/city/citySlice';
import { ICity } from '../../api/cities/interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_city } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import Header from '../../components/Header/Header';
import Body from '../../components/body/body';
import ButtonComponent from './addNewCity';

const City = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const { data: response = [], refetch } = useCities();

  const { data: city, isLoading: isLoadingCity } =
    cityQueries.useGetCity(selectedId);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<ICity>({
    resolver: yupResolver(schema_city),
    defaultValues: { name: '', description: '' },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && city) {
      setValue('name', city.name);
      setValue('description', city.description);
      setValue('id', city.id);
    }
  }, [selectedId, city]);

  const handleFormSubmit = async (data: ICity) => {
    try {
      if (selectedId > 0) {
        await dispatch(updateCity({ data: data, id: selectedId }));
        shawSuccess(t('city updated successfully'));
      } else {
        await dispatch(
          addCity({
            data: { ...data, id: generateRandomNumber(1, 100) },
          })
        );
        await dispatch(fetchCity());
        shawSuccess(t('city added successfully'));
      }
      refetch();
      setSelectedId(0);
      toggleModal();
      reset();
    } catch (error) {
      console.error('Error:', error);
      shawError('failed');
    }
  };
  const handleDelete = async (selectedId?: number) => {
    try {
      if (selectedId) {
        await dispatch(deleteCity(selectedId));
        shawSuccess(t('city deleted successfully'));
        refetch();
      }
    } catch (error) {
      console.error('Error:', error);
      shawError('error');
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
  const SelectedCities = useSelector((state: RootState) => state.city.cities);

  // [] first load

  const dispatch = useDispatch<AppDispatch>();

  const filteredData = SelectedCities.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // => []

  useEffect(() => {
    if (SelectedCities) {
      dispatch(fetchCity());
    }
  }, [dispatch]);

  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Name'), key: 'name' },
    { th: t('Description'), key: 'description' },
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
      name: 'description',
      label: t('Description'),
      error: errors.description,
      errorMassage: errors.description?.message,
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
        label={t('Search For City')}
        title={t('My City')}
        toggleModal={toggleModal}
        titleButton={t('Add New City')}
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
        isLoadingCity={isLoadingCity}
        reset={reset}
      />
    </Box>
  );
};

export default City;

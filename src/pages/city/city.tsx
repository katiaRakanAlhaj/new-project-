import { useEffect, useState } from 'react';
import useCities, { cityQueries } from '../../api/cities/query';
import { shawError, shawSuccess } from '../../lib/tosts';
import Table from '../../components/Table/table';
import { Box, Button, TextField, Typography } from '@mui/material';
import Modal from '../models/model';
import { useTranslation } from 'react-i18next';
import {
  AddButton,
  container,
  flexContainer,
  formInput,
  popup,
} from '../../components/style/style';
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
import MyForm from '../form/formInput';

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
      errorMassage: errors.name,
    },
    {
      name: 'description',
      label: t('Description'),
      error: errors.description,
      errorMassage: errors.description,
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
            {t('My City')}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t('Search For City')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Button
            style={{ backgroundColor: theme.palette.primary.main }}
            variant="contained"
            sx={AddButton}
            onClick={toggleModal}
          >
            {t('Add New City')}
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
          {isLoadingCity ? (
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
                {selectedId > 0 ? t('Update City') : t('Add New City')}
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

export default City;

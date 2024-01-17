import { useEffect, useState } from 'react';
import Modal from '../models/model';
import useCountries, { countryQueries } from '../../api/countries/query';
import { shawError, shawSuccess } from '../../lib/tosts';
import Table from '../../components/Table/table';
import { Button, Box, Typography, TextField } from '@mui/material';
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
  addCountry,
  deleteCountry,
  fetchCountry,
  updateCountry,
} from '../../slices/country/countrySlice';
import { useForm } from 'react-hook-form';
import { ICountry } from '../../api/countries/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_country } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import MyForm from '../form/formInput';

const Country = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const countries = useSelector((state: RootState) => state.country.countries);

  const filteredData = countries.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);
  const { data: response = [], refetch } = useCountries();
  const { data: country, isLoading: isLoadingCountry } =
    countryQueries.useGetCountry(selectedId);
  const SelectedCountries = useSelector(
    (state: RootState) => state.country.countries
  );
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ICountry>({
    resolver: yupResolver(schema_country),
    defaultValues: { name: '', description: '' },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && country) {
      setValue('name', country.name);
      setValue('description', country.description);
      setValue('id', country.id);
    }
  }, [selectedId, country]);

  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = async (data: ICountry) => {
    try {
      if (selectedId > 0) {
        await dispatch(updateCountry({ data: data, id: selectedId }));
        shawSuccess(t('country updated successfully'));
      } else {
        await dispatch(
          addCountry({
            data: { ...data, id: generateRandomNumber(1, 100) },
          })
        );
        shawSuccess(t('country added sucessfully'));
      }
      refetch();
      dispatch(fetchCountry());
    } catch (error) {
      console.error('Error:', error);
      shawError('error');
    }
  };

  const handleDelete = async (selectedId?: number) => {
    try {
      if (selectedId) {
        await dispatch(deleteCountry(selectedId));
      }
      refetch();
      shawSuccess(t('country deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete country'));
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

  useEffect(() => {
    if (SelectedCountries) {
      dispatch(fetchCountry());
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
            {t('My Country')}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t('Search For Country')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={AddButton} onClick={toggleModal}>
            {t('Add New Country')}
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
          {isLoadingCountry ? (
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
                {selectedId > 0 ? t('Update Country') : t('Add New Country')}
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

export default Country;

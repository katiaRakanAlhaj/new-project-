import { useEffect, useState } from 'react';
import useCountries, { countryQueries } from '../../api/countries/query';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { container, formInput } from '../../components/style/style';
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
import Header from '../../components/Header/Header';
import Body from '../../components/body/body';
import ButtonComponent from '../../components/addNewModal/AddNewModal';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: { text: any }) => <div>{text}</div>;

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
  const { data: country, isLoading: isLoading } =
    countryQueries.useGetCountry(selectedId);
  const SelectedCountries = useSelector(
    (state: RootState) => state.country.countries
  );
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ICountry>({
    resolver: yupResolver(
      schema_country({
        name: t('name is required'),
        description: t('description is required'),
      })
    ),
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
      setSelectedId(0);
      toggleModal();
      dispatch(fetchCountry());
      reset();
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
      errorMassage: errors.name?.message,
    },
    {
      name: 'description',
      label: t('Description'),
      error: errors.description,
      errorMassage: errors.description?.message,
    },
  ];

  const defaultProps = {
    center: {
      lat: 35.374434470284584,
      lng: 39.35426389433192,
    },
    zoom: 6,
  };

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
        label={t('Search For Country')}
        title={t('My Country')}
        toggleModal={toggleModal}
        titleButton={t('Add New Country')}
      />
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          onChange={(e) => console.log('e', e)}
          bootstrapURLKeys={{ key: 'AIzaSyDJnvi8ZRNpxooOoPPXad7Gy9v4E1Db0Oo' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={(e) => console.log('click', e)}
        />
      </div>
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
        type="Country"
      />
    </Box>
  );
};

export default Country;

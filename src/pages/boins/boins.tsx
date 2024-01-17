import { useEffect, useState } from 'react';
import useBoins, { boinQueries } from '../../api/boins/query';
import { BoinApi } from '../../api/boins/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import Modal from '../models/model';
import Table from '../../components/Table/table';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  flexContainer,
  container,
  AddButton,
  popup,
  formInput,
} from '../../components/style/style';
import { IBoins } from '../../api/boins/interfaces';
import { useForm } from 'react-hook-form';
import { schema_boin } from '../../components/schema/shcema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import MyForm from '../form/formInput';

const Boins = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useBoins();

  const { data: boin, isLoading: isLoadingBoin } =
    boinQueries.useGetBoin(selectedId);

  console.log('boin', boin);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IBoins>({
    resolver: yupResolver(schema_boin),
    defaultValues: {
      name: '',
      details: '',
      price: 0,
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && boin) {
      setValue('name', boin.name);
      setValue('details', boin.details);
      setValue('price', boin.price);
      setValue('id', boin.id);
    }
  }, [selectedId, boin]);

  const handleFormSubmit = async (data: IBoins) => {
    try {
      if (selectedId > 0) {
        await BoinApi.updateBoins({ data: data, id: selectedId });
        shawSuccess(t('boin updated successfully'));
      } else {
        await BoinApi.postBoins({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('boin added sucessfully'));
      }
      refetch();
      console.log('data', data);
    } catch (error) {
      shawSuccess('error');
    }
  };
  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        BoinApi.deleteBoins(id);
      }
      refetch();
      shawSuccess(t('boin deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete boin'));
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
    { th: t('Details'), key: 'details' },
    { th: t('Price'), key: 'price' },
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
      name: 'details',
      label: t('Details'),
      error: errors.details,
      errorMassage: errors.details,
    },
    {
      name: 'price',
      label: t('Price'),
      error: errors.price,
      errorMassage: errors.price,
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
            {t('Add New Boin')}
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
                {selectedId > 0 ? t('Update Boin') : t('Add New Boin')}
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

export default Boins;

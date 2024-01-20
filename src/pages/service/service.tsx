import { useEffect, useState } from 'react';
import {
  flexContainer,
  container,
  AddButton,
  popup,
  formInput,
} from '../../components/style/style';
import { useTranslation } from 'react-i18next';
import useServices, { serviceQueries } from '../../api/services/query';
import { serviceApi } from '../../api/services/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box, Button, Typography } from '@mui/material';
import Table from '../../components/Table/table';
import { useForm } from 'react-hook-form';
import { IService } from '../../api/services/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_service } from '../../components/schema/shcema';
import Modal from '../models/model';
import { useTheme } from '@mui/material';
import MyForm from '../form/formInput';
import Search from '../boins/search';

const Service = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useServices();

  const { data: service, isLoading: isLoadingService } =
    serviceQueries.useGetService(selectedId);
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<IService>({
    resolver: yupResolver(schema_service),
    defaultValues: { title: '', description: '' },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && service) {
      setValue('title', service.title);
      setValue('description', service.description);
      setValue('id', service.id);
    }
  }, [selectedId, service]);

  const handleFormSubmit = async (data: IService) => {
    try {
      if (selectedId > 0) {
        await serviceApi.updateService({ data: data, id: selectedId });
        shawSuccess(t('boin updated successfully'));
      } else {
        await serviceApi.postService({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('boin added sucessfully'));
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
        serviceApi.deleteService(id);
      }
      refetch();
      shawSuccess(t('service deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete service'));
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
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Tilte'), key: 'title' },
    { th: t('Description'), key: 'description' },
    { th: t('Actions'), key: 'actions' },
  ];
  const inputs = [
    {
      name: 'title',
      label: t('Title'),
      error: errors.title,
      errorMassage: errors.title?.message,
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
            {t('My Service')}
          </Typography>
        </Box>
        <Box>
          <Search
            label={t('Search For Service')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
            themeMode={themeMode}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={AddButton} onClick={toggleModal}>
            {t('Add New Service')}
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
          {isLoadingService ? (
            <div>Loading...</div>
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
                {selectedId > 0 ? t('Update Service') : t('Add New Service')}
              </Typography>
              <MyForm
                control={control}
                formInput={formInput}
                inputs={inputs}
                themeMode={themeMode}
              />

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

export default Service;

import { useEffect, useState } from 'react';
import { container, formInput } from '../../components/style/style';
import { useTranslation } from 'react-i18next';
import useServices, { serviceQueries } from '../../api/services/query';
import { serviceApi } from '../../api/services/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IService } from '../../api/services/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_service } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import Header from '../../components/Header/Header';
import Body from '../../components/body/body';
import ButtonComponent from '../../components/addNewModal/AddNewModal';

const Service = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useServices();

  const { data: service, isLoading: isLoading } =
    serviceQueries.useGetService(selectedId);
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<IService>({
    resolver: yupResolver(
      schema_service({
        title: t('title is required'),
        description: t('description is required'),
      })
    ),
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
      <Header
        themeMode={themeMode}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        label={t('Search For service')}
        title={t('My Service')}
        toggleModal={toggleModal}
        titleButton={t('Add New Service')}
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
        type="Service"
      />
    </Box>
  );
};

export default Service;

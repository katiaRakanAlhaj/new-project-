import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoryQueries } from '../../api/categories/query';
import { CategoryApi } from '../../api/categories/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box } from '@mui/material';
import { container, formInput } from '../../components/style/style';
import { useForm } from 'react-hook-form';
import { ICategory } from '../../api/categories/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_category } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import Header from '../../components/Header/Header';
import Body from '../../components/body/body';
import ButtonComponent from '../../components/addNewModal/AddNewModal';
const Category = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = categoryQueries.useCategories();

  const { data: category, isLoading: isLoading } =
    categoryQueries.useGetCategory(selectedId);

  const handleUpdate = (id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    setIsModalOpen(true);
  };
  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(schema_category),
    defaultValues: {
      name: '',
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && category) {
      setValue('name', category.name);

      setValue('id', category.id);
    }
  }, [selectedId, category]);

  const handleFormSubmit = async (data: ICategory) => {
    try {
      if (selectedId > 0) {
        await CategoryApi.updateCategories({ data: data, id: selectedId });
        shawSuccess(t('category updated successfully'));
      } else {
        await CategoryApi.postCategories({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('category added sucessfully'));
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
        CategoryApi.deleteCategories(id);
      }
      refetch();
      shawSuccess(t('category deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete category'));
    }
  };
  const filteredData = response.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Name'), key: 'name' },
    { th: t('Actions'), key: 'actions' },
  ];
  const inputs = [
    {
      name: 'name',
      label: t('Name'),
      error: errors.name,
      errorMassage: errors.name?.message,
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
        label={t('Search For Category')}
        title={t('My Category')}
        toggleModal={toggleModal}
        titleButton={t('Add New Category')}
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
        type="Category"
      />
    </Box>
  );
};

export default Category;

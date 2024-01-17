import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoryQueries } from '../../api/categories/query';
import { CategoryApi } from '../../api/categories/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { Box, Button, TextField, Typography } from '@mui/material';
import {
  AddButton,
  container,
  flexContainer,
  formInput,
  popup,
} from '../../components/style/style';
import Table from '../../components/Table/table';
import Modal from '../models/model';
import { useForm } from 'react-hook-form';
import { ICategory } from '../../api/categories/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_category } from '../../components/schema/shcema';
import { useTheme } from '@mui/material';
import MyForm from '../form/formInput';
const Category = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = categoryQueries.useCategories();

  const { data: category, isLoading: isLoadingCategory } =
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
      errorMassage: errors.name,
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
            {t('My Category')}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t('Search For Category')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={AddButton} onClick={toggleModal}>
            {t('Add New Category')}
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
          {isLoadingCategory ? (
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
                {selectedId > 0 ? t('Update Category') : t('Add New category')}
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

export default Category;

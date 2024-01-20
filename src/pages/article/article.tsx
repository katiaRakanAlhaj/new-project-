import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useArticles, { articleQueries } from '../../api/articles/query';
import { ArticleApi } from '../../api/articles/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Modal from '../models/model';
import {
  AddButton,
  container,
  formInput,
  popup,
} from '../../components/style/style';
import { Table } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import { categoryQueries } from '../../api/categories/query';
import { IArticle } from '../../api/articles/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_article } from '../../components/schema/shcema';
import { ICategory } from '../../api/categories/interfaces';
import { useTheme } from '@mui/material';
import Search from '../boins/search';

const Article = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);
  const { data: response = [], refetch } = useArticles();
  const { data: article, isLoading: isLoadingArticle } =
    articleQueries.useGetArticle(selectedId);
  const { data: categories = [] } = categoryQueries.useCategories();

  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        ArticleApi.deleteArticles(id);
      }
      refetch();
      shawSuccess(t('article deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete article'));
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

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<IArticle>({
    resolver: yupResolver(schema_article),
    defaultValues: {
      title: '',
      description: '',
      category: [],
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset();
    setSelectedId(0);
  };
  useEffect(() => {
    if (selectedId > 0 && article) {
      const selecedCata = article.category.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setValue('title', article.title);
      setValue('description', article.description);
      setValue('category', selecedCata);
      setValue('id', article.id);
    }
  }, [selectedId, article]);

  const handleFormSubmit = async (data: IArticle) => {
    try {
      if (selectedId > 0) {
        await ArticleApi.updateArticles({ data: data, id: selectedId });
        shawSuccess(t('article updated successfully'));
      } else {
        await ArticleApi.postArticles({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('article added sucessfully'));
      }
      refetch();
      setSelectedId(0);
      toggleModal();
      reset();
    } catch (error) {
      shawSuccess('error');
    }
  };

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
    {
      name: 'category',
      label: t('Category'),
      error: errors.category,
      errorMassage: errors.category?.message,
    },
  ];

  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Title'), key: 'title' },
    { th: t('Description'), key: 'description' },
    { th: t('Category'), key: 'category' },
    { th: t('Actions'), key: 'actions' },
  ];

  const newData = response
    .filter((value) => value.title.includes(searchValue))
    .map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category.map((category) => (
          <div key={category.id}>{category.name}</div>
        )),
      };
    });

  const isMobile = useMediaQuery('(max-width:600px)');
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
      <Grid container spacing={4} alignItems="center" mb={2} sx={{}}>
        <Grid item md={6} xs={12}>
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
            {t('My Article')}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box display={isMobile ? 'grid' : 'flex'} gap={1} alignItems="center">
            <Search
              label={t('Search For Article')}
              size={'small'}
              value={searchValue}
              onChange={handleSearchChange}
              themeMode={themeMode}
            />
            <Button
              variant="contained"
              sx={[
                AddButton,
                { width: isMobile ? '100%' : 400, height: '100%' },
              ]}
              onClick={toggleModal}
            >
              {t('Add New Article')}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Table
        columns={columns}
        data={newData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal} openModal={isModalOpen}>
          {isLoadingArticle ? (
            <div>loading....</div>
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
                {selectedId > 0 ? t('Update Article') : t('Add New Article')}
              </Typography>
              <Grid container spacing={2}>
                {inputs.map((input) => (
                  <Grid item xs={12} key={input.name}>
                    <Controller
                      name={input.name as keyof IArticle}
                      control={control}
                      render={({ field }) => {
                        if (input.name === 'category') {
                          return (
                            <Autocomplete
                              options={categories ?? []}
                              getOptionLabel={(option) => option.name}
                              multiple
                              value={field.value as ICategory[]}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  sx={formInput}
                                  helperText={input.errorMassage}
                                  fullWidth
                                  error={!!input.error}
                                  label={input.label}
                                />
                              )}
                              onChange={(e, value) => field.onChange(value)}
                            />
                          );
                        }
                        return (
                          <TextField
                            variant="outlined"
                            sx={formInput}
                            fullWidth
                            error={!!input.error}
                            label={input.label}
                            value={field.value}
                            helperText={input.errorMassage}
                            onChange={field.onChange}
                          />
                        );
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
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

export default Article;

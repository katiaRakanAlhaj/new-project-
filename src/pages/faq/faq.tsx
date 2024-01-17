import Modal from '../models/model';
import Table from '../../components/Table/table';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  flexContainer,
  container,
  AddButton,
  popup,
  formInput,
} from '../../components/style/style';
import { useEffect, useState } from 'react';
import useFAQS, { faqQueries } from '../../api/FAQ/query';
import { FaqApi } from '../../api/FAQ/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { IFAQ } from '../../api/FAQ/interfaces';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_faq } from '../../components/schema/shcema';
import { categoryQueries } from '../../api/categories/query';
import { useTheme } from '@mui/material';

const FAQ = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useFAQS();

  const { data: faq, isLoading: isLoadingFaq } =
    faqQueries.useGetFAQ(selectedId);

  const { data: categories = [] } = categoryQueries.useCategories();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFAQ>({
    resolver: yupResolver(schema_faq),
    defaultValues: { title: '', description: '', category: [] },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && faq) {
      setValue('title', faq.title);
      setValue('description', faq.description);
      setValue('category', faq.category);
      setValue('id', faq.id);
    }
  }, [selectedId, faq]);

  const handleFormSubmit = async (data: IFAQ) => {
    try {
      if (selectedId > 0) {
        await FaqApi.updateFAQ({ data: data, id: selectedId });
        shawSuccess(t('faq updated successfully'));
      } else {
        await FaqApi.postFAQ({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t('faq added sucessfully'));
      }
      refetch();
    } catch (error) {
      shawSuccess('error');
    }
  };
  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        FaqApi.deleteFAQ(id);
      }
      refetch();
      shawSuccess(t('faq deleted successfully'));
    } catch (err) {
      shawError(t('failed in delete faq'));
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

  const columns = [
    { th: t('ID'), key: 'id' },
    { th: t('Title'), key: 'title' },
    { th: t('Description'), key: 'description' },
    { th: t('Category'), key: 'category' },
    { th: t('Actions'), key: 'actions' },
  ];
  const inputs = [
    {
      name: 'title',
      label: t('Title'),
      error: errors.title,
      errorMassage: errors.title,
    },
    {
      name: 'description',
      label: t('Description'),
      error: errors.description,
      errorMassage: errors.description,
    },
    {
      name: 'category',
      label: t('Category'),
      error: errors.category,
      errorMassage: errors.category,
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
            {t('My Faq')}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t('Search For Faq')}
            size={'small'}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={AddButton} onClick={toggleModal}>
            {t('Add New Faq')}
          </Button>
        </Box>
      </Box>
      <Table
        columns={columns}
        data={newData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal} openModal={isModalOpen}>
          {isLoadingFaq ? (
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
                {selectedId > 0 ? t('Update Faq') : t('Add New Faq')}
              </Typography>
              <Grid spacing={2}>
                {inputs.map((input) => (
                  <Grid item xs={12} key={input.name}>
                    <Controller
                      name={input.name as keyof IFAQ}
                      control={control}
                      render={({ field }) => {
                        if (input.name === 'category') {
                          return (
                            <Autocomplete
                              options={categories ?? []}
                              getOptionLabel={(option) => option.name}
                              multiple
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  sx={formInput}
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

export default FAQ;

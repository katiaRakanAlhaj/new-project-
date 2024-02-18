import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import MyForm from '../form/formInput';
import { useTranslation } from 'react-i18next';
import Modal from '../models/model';
import { popup } from '../../components/style/style';
import { useTheme } from '@mui/material';

interface ButtonComponentProps {
  themeMode: string;
  isModalOpen: boolean;
  isLoadingCountry: boolean;
  toggleModal: () => void;
  handleSubmit: any;
  handleFormSubmit: any;
  control: any;
  formInput: any;
  inputs: any;
  errors: any;
  reset: any;
  selectedId: number;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  themeMode,
  isModalOpen,
  toggleModal,
  handleSubmit,
  isLoadingCountry,
  handleFormSubmit,
  control,
  formInput,
  inputs,
  selectedId,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {isModalOpen && (
        <Modal onClose={toggleModal} openModal={isModalOpen}>
          {isLoadingCountry ? (
            <div>loading...</div>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={popup(isMobile)}
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
    </>
  );
};

export default ButtonComponent;

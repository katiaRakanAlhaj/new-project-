import { useForm } from 'react-hook-form';
import { TEmail } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_email } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { form } from '../style/style';
import SubmitButtons from './resetEmailButton';
import GridComponent from './resetEmailGrid';

interface IResetEmailInputSide {}

const ResetEmailInputSide = ({}: IResetEmailInputSide) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEmail>({
    resolver: yupResolver(schema_email),
    defaultValues: { email: '' },
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: TEmail) => {
    try {
      const response = await userApi.getUsers();
      const emailExists = response.find(
        (user: TEmail) => user.email === data.email
      );
      if (emailExists) {
        navigate(`/reset-password/${data.email}`);
      } else {
        console.log('Email not found');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const { t } = useTranslation();

  const inputs = [
    {
      name: 'email',
      label: t('Email'),
      error: errors.email,
      errorMassage: errors.email,
    },
  ];
  const isMobile = useMediaQuery('(max-width:630px)');

  return (
    <Box sx={{ flex: 2 }}>
      <Container
        sx={[
          form,
          {
            height: isMobile ? '100vh' : '100%',
          },
        ]}
      >
        <TitleWithIcons title={t('Sign in to Account')} />
        <Box
          component="form"
          sx={{ width: isMobile ? '100%' : '50%' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <GridComponent inputs={inputs} control={control} />
          <SubmitButtons isSubmitting={isSubmitting} />
        </Box>
      </Container>
    </Box>
  );
};

export default ResetEmailInputSide;

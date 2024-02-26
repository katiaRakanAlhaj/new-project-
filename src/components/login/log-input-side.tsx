import { useForm } from 'react-hook-form';
import { TLogin } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_login } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { shawError, shawSuccess } from '../../lib/tosts';
import { useTranslation } from 'react-i18next';
import { form } from '../style/style';
import SubmitButtons from '../login/loginButton';
import GridComponent from './loginGrid';

interface ILogInInputSide {}

const LogInInputSide = ({}: ILogInInputSide) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TLogin>({
    resolver: yupResolver(schema_login),
    defaultValues: { email: '', name: '', password: '' },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleFormSubmit = async (data: TLogin) => {
    try {
      const response = await userApi.getUsers();
      const user = response.find((user) => {
        return user.email === data.email && user.password === data.password;
      });
      if (user) {
        const userinfo = { name: user.name, email: user.email };
        localStorage.setItem('user', JSON.stringify(userinfo));
        shawSuccess(t('login successfully'));
        navigate('/home');
      } else {
        shawError(t('failed in login'));
      }
    } catch (err) {
      shawError(t('failed in login'));
    }
  };

  const inputs = [
    {
      name: 'name',
      label: t('Name'),
      error: errors.name,
      errorMassage: errors.name,
    },
    {
      name: 'email',
      label: t('Email'),
      error: errors.email,
      errorMassage: errors.email,
    },
    {
      name: 'password',
      label: t('Password'),
      error: errors.password,
      errorMassage: errors.password,
    },
  ];
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Box
      sx={{
        flex: 2,
        background: '#fff',
      }}
    >
      <Container
        sx={[
          form,
          {
            height: isMobile ? '100vh' : '100vh',
          },
        ]}
      >
        <TitleWithIcons title={t('Sign in to Account')} />
        <Box
          sx={{ width: isMobile ? '100%' : '50%' }}
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <GridComponent inputs={inputs} control={control} />
          <SubmitButtons isSubmitting={isSubmitting} />
        </Box>
      </Container>
    </Box>
  );
};
export default LogInInputSide;

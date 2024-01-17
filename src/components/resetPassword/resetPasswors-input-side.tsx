import { useForm } from 'react-hook-form';
import { TPassword } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_password } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { form } from '../style/style';
import SubmitButtons from './resetPasswordButton';
import GridComponent from './resetPasswordGrid';

interface IResetPasswordInputSide {}

const ResetPasswordInputSide = ({}: IResetPasswordInputSide) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPassword>({
    resolver: yupResolver(schema_password),
    defaultValues: { password: '', newpassword: '' },
  });
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.pathname.split('/')[2];

  const handleResetPassword = async (data: TPassword) => {
    try {
      const response = await userApi.getUsers();
      const user = response.find((_user) => _user.email === email);
      if (user) {
        await userApi.resetPassword({
          password: data.password,
          email: email,
          confirmPassword: data.newpassword,
          id: user?.id,
          name: user?.name,
        });
        navigate('/login');
        console.log('user', user);
      } else {
        console.log('User not found');
      }
    } catch (err) {
      console.log('eee', err);
    }
  };
  const { t } = useTranslation();
  const inputs = [
    {
      name: 'password',
      label: t('Password'),
      error: errors.password,
      errorMassage: errors.password,
    },
    {
      name: 'newpassword',
      label: t('New Password'),
      error: errors.newpassword,
      errorMassage: errors.newpassword,
    },
  ];
  return (
    <Box
      sx={{
        flex: 2,
      }}
    >
      <Container sx={form}>
        <TitleWithIcons title={t('Sign in to Account')} />
        <Box
          component="form"
          sx={{ width: '50%' }}
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <GridComponent inputs={inputs} control={control} />
          <SubmitButtons isSubmitting={isSubmitting} />
        </Box>
      </Container>
    </Box>
  );
};
export default ResetPasswordInputSide;

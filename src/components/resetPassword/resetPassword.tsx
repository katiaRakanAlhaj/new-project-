import { useTranslation } from 'react-i18next';
import HelloFriendSide from '../hello-friend-side';
import ResetPasswordInputSide from './resetPasswors-input-side';
import { Box } from '@mui/material';

function ResetPassword() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex' }}>
      <ResetPasswordInputSide />
      <HelloFriendSide buttonText={t('sign in')} navigateTo="/login" />
    </Box>
  );
}

export default ResetPassword;

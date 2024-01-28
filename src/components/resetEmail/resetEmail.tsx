import { useTranslation } from 'react-i18next';
import HelloFriendSide from '../hello-friend-side';
import ResetEmailInputSide from './resetEmail-input-side';
import { Box } from '@mui/material';

function ResetEmail() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex' }}>
      <ResetEmailInputSide />
      <HelloFriendSide buttonText={t('sign in')} navigateTo="/login" />
    </Box>
  );
}
export default ResetEmail;

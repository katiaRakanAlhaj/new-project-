import '../index.css';
import HelloFriendSide from '../hello-friend-side';
import SignupInputSide from './signup-input-side';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

function Signup() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex' }}>
      <SignupInputSide />
      <HelloFriendSide buttonText={t('sign in')} navigateTo="/login" />
    </Box>
  );
}
export default Signup;

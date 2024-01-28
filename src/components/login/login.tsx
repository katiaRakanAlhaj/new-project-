import { Box } from '@mui/material';
import HelloFriendSide from '../hello-friend-side';
import LogInInputSide from './log-input-side';

function Login() {
  return (
    <Box sx={{ display: 'flex' }}>
      <LogInInputSide />
      <HelloFriendSide buttonText="sign up" navigateTo="/" />
    </Box>
  );
}

export default Login;

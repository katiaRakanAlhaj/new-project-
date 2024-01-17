import HelloFriendSide from '../hello-friend-side';
import LogInInputSide from './log-input-side';

function Login() {
  return (
    <div className="flex">
      <LogInInputSide />
      <HelloFriendSide buttonText="sign up" navigateTo="/" />
    </div>
  );
}

export default Login;

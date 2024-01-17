import { useTranslation } from 'react-i18next';
import HelloFriendSide from '../hello-friend-side';
import ResetPasswordInputSide from './resetPasswors-input-side';

function ResetPassword() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <ResetPasswordInputSide />
      <HelloFriendSide buttonText={t('sign in')} navigateTo="/login" />
    </div>
  );
}

export default ResetPassword;

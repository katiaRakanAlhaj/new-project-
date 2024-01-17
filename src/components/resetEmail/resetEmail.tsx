import { useTranslation } from 'react-i18next';
import HelloFriendSide from '../hello-friend-side';
import ResetEmailInputSide from './resetEmail-input-side';

function ResetEmail() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <ResetEmailInputSide />
      <HelloFriendSide buttonText={t('sign in')} navigateTo="/login" />
    </div>
  );
}
export default ResetEmail;

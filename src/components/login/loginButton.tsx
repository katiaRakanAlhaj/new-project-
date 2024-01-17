import { Button } from '@mui/material';
import { signinButton } from '../style/style';
import { useTranslation } from 'react-i18next';
interface SubmitButtonsProps {
  isSubmitting: boolean;
}
const SubmitButtons = ({ isSubmitting }: SubmitButtonsProps) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      sx={signinButton}
      type="submit"
      disabled={isSubmitting}
    >
      {t('sign in')}
    </Button>
  );
};
export default SubmitButtons;

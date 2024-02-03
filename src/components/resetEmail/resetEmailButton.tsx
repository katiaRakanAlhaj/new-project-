import { Button, Box } from '@mui/material';
import { backtoLoginButton, signinButton } from '../style/style';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SubmitButtonsProps {
  isSubmitting: boolean;
}

const SubmitButtons = ({ isSubmitting }: SubmitButtonsProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        sx={signinButton}
        type="submit"
        disabled={isSubmitting}
      >
        {t('reset email')}
      </Button>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={backtoLoginButton}
          type="submit"
          disabled={isSubmitting}
        >
          {t('back to login')}
        </Button>
      </Link>
    </Box>
  );
};

export default SubmitButtons;

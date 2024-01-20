import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { signinButton } from '../style/style';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface SubmitButtonsProps {
  isSubmitting: boolean;
}

const SubmitButtons = ({ isSubmitting }: SubmitButtonsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          control={<Checkbox sx={{ fontWeight: 'bold' }} />}
          label={t('remember me')}
        />
        <Link to="/reset-email">
          <Typography
            sx={{
              fontWeight: 'bold',
              marginTop: '11px',
              cursor: 'pointer',
            }}
          >
            {t('forget password')}
          </Typography>
        </Link>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={signinButton}
          type="submit"
          disabled={isSubmitting}
        >
          {t('sign up')}
        </Button>
      </Box>
    </>
  );
};
export default SubmitButtons;

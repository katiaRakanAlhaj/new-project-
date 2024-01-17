import { Button, Box, Typography, Modal as MuiModal } from '@mui/material';
import { logout } from '../style/style';
import { useTranslation } from 'react-i18next';
import { shawSuccess } from '../../lib/tosts';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    shawSuccess(t('logout successfully'));
  };

  return (
    <MuiModal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component="form" sx={logout}>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}
        >
          {t('Are you sure you want to logout?')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleLogout}
          >
            {t('YES')}
          </Button>
          <Button onClick={onClose} variant="contained" size="small">
            {t('NO')}
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};
export default Modal;

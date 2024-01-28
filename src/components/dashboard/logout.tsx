import { Modal as MuiModal } from '@mui/material';
import { PropsWithChildren } from 'react';
interface ModalProps {
  onClose: () => void;
  openModal: boolean;
}
const Modal = ({
  children,
  onClose,
  openModal,
}: { children: PropsWithChildren<JSX.Element> } & ModalProps) => {
  return (
    <MuiModal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </MuiModal>
  );
};
export default Modal;

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ButtonComponentProps extends ButtonProps {
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onClick,
  variant,
  size,
  children,
}) => {
  return (
    <Button variant={variant} size={size} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonComponent;

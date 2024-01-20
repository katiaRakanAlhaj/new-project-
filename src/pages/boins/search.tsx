import React from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material';

interface SearchProps {
  label: string;
  size: any;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  themeMode: string;
}

const Search = ({ label, size, value, onChange, themeMode }: SearchProps) => {
  const theme = useTheme();

  return (
    <TextField
      label={label}
      size={size}
      value={value}
      onChange={onChange}
      inputProps={{
        sx: {
          color: themeMode === 'dark' ? theme.palette.primary.light : 'grey',
        },
      }}
      InputLabelProps={{
        sx: {
          color: themeMode === 'dark' ? theme.palette.primary.light : 'grey',
        },
      }}
    />
  );
};

export default Search;

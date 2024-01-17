import { TextField } from '@mui/material';
import { FieldValues, Control, Controller, FieldPath } from 'react-hook-form';
import { formInput } from '../style/style';

type TControlledInput<T extends FieldValues> = {
  control: Control<T, FieldPath<T>>;
  name: FieldPath<T>;
  label: string;
  message?: string;
  hasError?: boolean;
};

const ControlledInput = <T extends FieldValues>({
  control,
  label,
  message,
  name,
  hasError,
}: TControlledInput<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextField
            label={label}
            fullWidth
            variant="outlined"
            sx={formInput}
            error={hasError}
            helperText={message}
            value={field.value as T} // assert the type of value as T
            onChange={field.onChange} // assert the type of onChange
          />
        );
      }}
    />
  );
};

export default ControlledInput;

import { useTheme } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface GridComponentProps {
  inputs: {
    name: string;
    label: string;
    error: any;
    errorMassage: any;
  }[];
  control: any;
  formInput: any;
  themeMode: string;
}
const MyForm = ({
  inputs,
  control,
  formInput,
  themeMode,
}: GridComponentProps) => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      {inputs.map((input) => (
        <Grid item xs={12} key={input.name}>
          <Controller
            name={input.name}
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                sx={formInput}
                fullWidth
                helperText={input.errorMassage}
                inputProps={{
                  sx: {
                    color:
                      themeMode == 'dark'
                        ? theme.palette.primary.light
                        : 'grey',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color:
                      themeMode == 'dark'
                        ? theme.palette.primary.light
                        : 'grey',
                  },
                }}
                error={!!input.error}
                label={input.label}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyForm;

import { Grid } from '@mui/material';
import { TPassword } from '../../api/auth/interfaces';
import ControlledInput from '../controlledInput';

interface GridComponentProps {
  inputs: {
    name: string;
    label: string;
    error: any;
    errorMassage: any;
  }[];
  control: any;
}

const GridComponent = ({ inputs, control }: GridComponentProps) => {
  return (
    <Grid container sx={{ marginY: 2 }} spacing={1.5}>
      {inputs.map((input) => (
        <Grid item xs={12} key={input.name}>
          <ControlledInput
            control={control}
            label={input.label}
            hasError={!!input.error}
            message={input.errorMassage?.message}
            name={input.name as keyof TPassword}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;

import React from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { ICategory } from "../../api/categories/interfaces";

interface FormField {
  name: string;
  label: string;
  error: any;
  errorMassage: any;
}

interface MyFormProps {
  inputs: FormField[];
  control: any;
  formInput: any;
  categories: ICategory[] | undefined;
}

const MyForm: React.FC<MyFormProps> = ({
  inputs,
  control,
  formInput,
  categories,
}) => {
  return (
    <Grid container spacing={2}>
      {inputs.map((input) => (
        <Grid item xs={12} key={input.name}>
          <Controller
            name={input.name}
            control={control}
            render={({ field }) => {
              if (input.name === "category") {
                return (
                  <Autocomplete
                    options={categories ?? []}
                    getOptionLabel={(option) => option.name}
                    multiple
                    value={field.value as ICategory[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        helperText={input.errorMassage}
                        error={!!input.error}
                        label={input.label}
                      />
                    )}
                    onChange={(e, value) => field.onChange(value)}
                  />
                );
              } else {
                return (
                  <TextField
                    variant="outlined"
                    sx={formInput}
                    helperText={input.errorMassage}
                    fullWidth
                    error={!!input.error}
                    label={input.label}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyForm;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countryApi } from '../../api/countries/api';
import {
  ICountry,
  IUpdateCountry,
  IAddCountry,
} from '../../api/countries/interfaces';

export interface CountryState {
  countries: ICountry[];
}

const initialState: CountryState = {
  countries: [],
};

export const fetchCountry = createAsyncThunk(
  'country/fetchCountry',
  async () => {
    const response = await countryApi.getCountries();
    return response;
  }
);

export const addCountry = createAsyncThunk(
  'country/addCountry',
  async (country: IAddCountry) => {
    const response = await countryApi.postCountry(country);
    return response;
  }
);

export const updateCountry = createAsyncThunk(
  'country/updateCountry',
  async (updatedCountry: IUpdateCountry) => {
    const response = await countryApi.updateCountry(updatedCountry);
    return response;
  }
);

export const deleteCountry = createAsyncThunk(
  'country/deleteCountry',
  async (countryId: number) => {
    await countryApi.deleteCountry(countryId);
    return countryId;
  }
);

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(addCountry.fulfilled, (state, action) => {
      state.countries.push(action.payload);
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
      const updatedCountry = action.payload;
      const index = state.countries.findIndex(
        (c) => c.id === updatedCountry.id
      );
      if (index !== -1) {
        state.countries[index] = updatedCountry;
      }
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      const countryId = action.payload;
      state.countries = state.countries.filter((c) => c.id !== countryId);
    });
  },
});

export default countrySlice.reducer;

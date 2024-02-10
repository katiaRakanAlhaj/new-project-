import { IAddCity, ICity, IUpdateCity } from "../../api/cities/interfaces";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cityApi } from "../../api/cities/api";

export interface CityState {
  value: number;
  cities: ICity[];
  theme: string;
}

const initialState: CityState = {
  value: 0,
  cities: [],
  theme: "light",
};

export const fetchCity = createAsyncThunk(
  "city/fetchCity", //unique
  async () => {
    const res = cityApi.getCities();
    const data = await res;
    return data;
  }
);
export const addCity = createAsyncThunk(
  "city/addCity",
  async (city: IAddCity) => {
    const response = await cityApi.postCity(city);
    return response;
  }
);

export const updateCity = createAsyncThunk(
  "city/updateCity",
  async (updateCity: IUpdateCity) => {
    const response = await cityApi.updateCity(updateCity);
    return response;
  }
);
export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async (cityId: number) => {
    await cityApi.deleteCity(cityId);
    return cityId;
  }
);
// changeTheme('#000');
// changeTheme('#fff');
export const cityState = createSlice({
  name: "city",
  initialState,
  reducers: {
    // changeTheme: (state, action: PayloadAction<string>) => {
    //   state.theme = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.cities = action.payload;
    });
    builder.addCase(addCity.fulfilled, (state, action) => {
      state.cities.push(action.payload);
    });
    builder.addCase(updateCity.fulfilled, (state, action) => {
      const updatedCity = action.payload;
      const index = state.cities.findIndex((c) => c.id === updatedCity.id);
      if (index !== -1) {
        state.cities[index] = updatedCity;
      }
    });
    builder.addCase(deleteCity.fulfilled, (state, action) => {
      const cityId = action.payload;
      state.cities = state.cities.filter((c) => c.id !== cityId);
    });
  },
});

export default cityState.reducer;

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../Api';
import { userProfileRequired } from './users';

export const activeCategoryPage = createAction('active/category-page', (page) => {
  return {
    payload: {
      page,
    },
  };
});
export const removeStateKeys = createAction('remove/state-key', (name = '') => {
  return {
    payload: {
      name,
    },
  };
});
export const removeFavoritesStateItem = createAction('remove/favorites-item', (id) => {
  return {
    payload: {
      id,
    },
  };
});
export const destinationListRequired = createAsyncThunk('tour/destination-list', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.getDestination();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const tourCategoriseListRequired = createAsyncThunk('tour/categorise-list', async (arg = {}, thunkAPI) => {
  try {
    const { data: { categories } } = await Api.getTourCategoriseList();
    return categories;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const toursListRequired = createAsyncThunk('tour/tours-list', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.getToursList(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const tourGetItemRequired = createAsyncThunk('tour/get-item', async (tourId = 0, thunkAPI) => {
  try {
    const { data } = await Api.getToursItem(tourId);
    const { tour } = data;
    return tour;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const tourFilterListRequired = createAsyncThunk('tour/filter-list', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.getTourFilterDestination(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const tourFavoritesRequired = createAsyncThunk('tour/user-favorites', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.addTourFavorites(arg);
    thunkAPI.dispatch(userProfileRequired());
    thunkAPI.dispatch(tourFavoritesListRequired(1));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const tourRatingRequired = createAsyncThunk('tour/user-rating', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.addTourRating(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const tourFavoritesListRequired = createAsyncThunk('tour/user-favorites-list', async (arg = 1, thunkAPI) => {
  try {
    const { data } = await Api.getFavoritesList(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const tourPopularsListRequired = createAsyncThunk('tour/populars-list', async (arg = 1, thunkAPI) => {
  try {
    const { data } = await Api.getPopularsList(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const tourSearchRequired = createAsyncThunk('tour/search', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.searchTour(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const orderTourRequired = createAsyncThunk('tour/order', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.orderTour(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const orderListRequired = createAsyncThunk('tour/order-list', async (page = 1, thunkAPI) => {
  try {
    const { data } = await Api.orderList(page);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const checkoutOrderRequired = createAsyncThunk('tour/order-checkout', async (payload = 1, thunkAPI) => {
  try {
    const { data } = await Api.checkout(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

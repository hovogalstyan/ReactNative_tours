import { createReducer } from '@reduxjs/toolkit';
import {
  activeCategoryPage,
  destinationListRequired,
  orderListRequired,
  orderTourRequired,
  removeFavoritesStateItem,
  removeStateKeys,
  tourCategoriseListRequired,
  tourFavoritesListRequired,
  tourFilterListRequired,
  tourGetItemRequired,
  tourPopularsListRequired, tourSearchRequired,
  toursListRequired,
} from '../actions/tours';

const initialState = {
  categoryNavDate: ['Popular', 'Destination', 'Tour', 'Services'],
  favoritesList: [],
  orderList: [],
  tourSearchList: [],
  tourSearchRegulation: {},
  ordersRegulation: {},
  tourCategoryList: [],
  tourFilterRegulation: {},
  tourRegulation: {},
  categoryPage: 0,
  destinationList: [],
  tourItem: {},
  loading: false,
  errors: {},
  favoritesRegulation: {},
  popularsList: [],
  orderItem: {},
};
export const tours = createReducer(initialState, (builder) => {
  builder
    .addCase(removeStateKeys, (state, action) => {
      const { name } = action.payload;
      if (name === 'Destination') {
        state.destinationList = [];
      }
      if (name === 'search') {
        state.tourSearchList = [];
      }
    })
    .addCase(activeCategoryPage, (state, action) => {
      state.categoryPage = action.payload.page;
    })
    .addCase(removeFavoritesStateItem, (state, action) => {
      state.favoritesList = state.favoritesList.filter((item) => item?.id !== action.payload.id);
    })
    .addCase(destinationListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(destinationListRequired.fulfilled, (state, action) => {
      const { destinations } = action.payload;
      state.loading = false;
      state.destinationList = destinations;
    })
    .addCase(tourCategoriseListRequired.fulfilled, (state, action = {}) => {
      state.tourCategoryList = action.payload;
    })
    .addCase(tourFavoritesListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(tourFavoritesListRequired.fulfilled, (state, action) => {
      state.loading = false;
      const {
        fovorites,
        ...date
      } = action.payload;
      state.favoritesRegulation = date;
      const data = [...state.favoritesList, ...fovorites];
      const uniqueData = data.reduce((unique, current) => {
        if (!unique.has(current.id)) {
          unique.set(current.id, current);
        }
        return unique;
      }, new Map());
      state.favoritesList = Array.from(uniqueData.values());
    })
    .addCase(toursListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(toursListRequired.fulfilled, (state, action) => {
      state.loading = false;
      const {
        tours,
        ...date
      } = action.payload;
      state.tourRegulation = date;
    })
    .addCase(toursListRequired.rejected, (state, action) => {
      const { errors: { error } } = action.payload;
      state.errors.tourNodeFound = error;
      state.loading = false;
      state.toursList = [];
    })
    .addCase(tourGetItemRequired.pending, (state) => {
      state.loading = true;
      state.tourItem = {};
    })
    .addCase(tourGetItemRequired.fulfilled, (state, action) => {
      state.loading = false;
      state.tourItem = action.payload;
    })
    .addCase(tourFilterListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(tourFilterListRequired.fulfilled, (state, action = {}) => {
      state.loading = false;
      const {
        tours,
        ...data
      } = action.payload;
      state.tourFilterRegulation = data;
    })
    .addCase(tourFilterListRequired.rejected, (state, action = {}) => {
      const { errors: { error } } = action.payload;
      state.errors.tourFilterNodeFound = error;
      state.loading = false;
      state.tourFilterRegulation = {};
    })
    .addCase(tourPopularsListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(tourPopularsListRequired.fulfilled, (state, action = {}) => {
      const { tours } = action.payload;
      state.popularsList = tours;
      state.loading = false;
    })
    .addCase(orderTourRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(orderTourRequired.fulfilled, (state, action = 0) => {
      state.loading = false;
      state.orderItem = action.payload;
    })
    .addCase(orderTourRequired.rejected, (state) => {
      state.loading = false;
      state.totalAmount = 0;
    })
    .addCase(orderListRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(orderListRequired.fulfilled, (state, action) => {
      state.loading = false;
      const {
        orders,
        ...date
      } = action.payload;
      state.ordersRegulation = date;
      const data = [...state.orderList, ...orders];
      const uniqueData = data.reduce((unique, current) => {
        if (!unique.has(current.id)) {
          unique.set(current.id, current);
        }
        return unique;
      }, new Map());
      state.orderList = Array.from(uniqueData.values());
    })
    .addCase(tourSearchRequired.pending, (state) => {
      state.errors = {};
    })
    .addCase(tourSearchRequired.fulfilled, (state, action) => {
      const {
        tours,
        ...date
      } = action.payload;
      state.tourSearchRegulation = date;
      const data = [...state.tourSearchList, ...tours];
      const uniqueData = data.reduce((unique, current) => {
        if (!unique.has(current.id)) {
          unique.set(current.id, current);
        }
        return unique;
      }, new Map());
      state.tourSearchList = Array.from(uniqueData.values());
    })
    .addCase(tourSearchRequired.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
});

import { configureStore } from '@reduxjs/toolkit';
import { users } from './reducters/users';
import { tours } from './reducters/tours';

const root = {
  users,
  tours,
};
export const store = configureStore({ reducer: root });

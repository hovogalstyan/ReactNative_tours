import axios from 'axios';
import Config from 'react-native-config';
import { Profile } from '../helper/profile';

const api = axios.create({
  baseURL: Config.API_URL,
  Accept: 'application/json',
  ContentType: 'application/json',
});
api.interceptors.request.use(async (config) => {
  const token = await Profile.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, async (error) => {
  if (error.response.status === 401) {
    await Profile.clear();
  }
  return Promise.reject(error);
});

export class Api {
  static register(arg) {
    return api.post('users/register', arg);
  }

  static login(arg) {
    return api.post('users/login', arg);
  }

  static profile() {
    return api.get('users/profile');
  }

  static sendEmailForgotPassword(email) {
    return api.post('users/send-password-recovery-code', email);
  }

  static sendCodeForgotPassword(code) {
    return api.post('users/validate-password-recovery-code', code);
  }

  static updatePassword(password) {
    return api.post('users/password-update', password);
  }

  static profileUpdate(arg) {
    return api.put('users/profile-update', arg, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static profilePasswordUpdate(arg) {
    return api.put('users/update-password', arg);
  }

  static onAuthFacebook(token) {
    return api.post('users/oauth-google', token);
  }

  static onAuthGoogle(token) {
    return api.post('users/oauth', token);
  }

  static getDestination() {
    return api.get('destinations/list');
  }

  static getTourCategoriseList() {
    return api.get('categories/list');
  }

  static getToursList(arg) {
    const {
      catId,
      page,
    } = arg;
    return api.get(`toures/toures-by-category/${catId}?page=${page}`);
  }

  static getToursItem(tourId) {
    return api.get(`toures/get-tour/${tourId}`);
  }

  static getTourFilterDestination(arg) {
    const {
      destinationId,
      page,
    } = arg;
    return api.get(`toures/tours-by-destination/${destinationId}?page=${page}`);
  }

  static addTourFavorites(tourId) {
    return api.post('favorites/add', tourId);
  }

  static addTourRating(arg) {
    return api.post('rates/add', arg);
  }

  static getFavoritesList(page) {
    return api.get(`favorites/get-favorites?page=${page}`);
  }

  static getPopularsList(page) {
    return api.get(`toures/populars?page=${page}`);
  }

  static searchTour(arg) {
    const { page, search } = arg;
    return api.get(`toures/search?page=${page}&search=${search}`);
  }

  static orderTour(arg) {
    const {
      id,
      ...payload
    } = arg;
    return api.post(`orders/order/${id}`, payload);
  }

  static orderList(page) {
    return api.get(`orders/orders-list?page=${page}`);
  }

  static checkout(payload) {
    return api.post('orders/checkout', payload);
  }
}

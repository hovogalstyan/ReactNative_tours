import AsyncStorage from '@react-native-async-storage/async-storage';

export class Profile {
  static async sendToken(value) {
    await AsyncStorage.setItem('token', value);
  }

  static async sendUser(value) {
    await AsyncStorage.setItem('profile', value);
  }

  static async getToken() {
    const token = await AsyncStorage.getItem('token');
    return token;
  }

  static async getUser() {
    const user = await AsyncStorage.getItem('profile');
    return user;
  }

  static async remove(key) {
    await AsyncStorage.removeItem(key);
  }

  static async clear() {
    await AsyncStorage.clear();
  }
}

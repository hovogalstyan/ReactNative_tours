import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text, ToastAndroid, ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { activeOption, globalStyles } from '../../assets/styles/globalStyles';
import TextField from '../custom/TextField';
import FormButton from '../custom/FormButton';
import useChanges from '../hooks/useChanges';
import {
  clearUsersState,
  userProfileUpdateRequired,
} from '../../store/actions/users';
import CheckModal from './CheckModal';
import { Profile } from '../../helper/profile';
import { screenNames } from '../../helper/screenNames';

function ProfileUpload() {
  const [photo, setPhoto] = useState(useSelector((state) => state.users.profile.photo));
  const {
    values,
    handleChange,
  } = useChanges(useSelector((state) => state.users.profile) || {});
  const [controllersCheckModal, setControllersCheckModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(null);
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const emailEditableCheck = useMemo(() => {
    return profile?.isOauth === false;
  }, [profile]);

  useEffect(() => {
    if (profile.status === 'active' && controllersCheckModal) {
      setAlertVisible(true);
    }
    if (profile.status === 'pending') {
      setAlertVisible(false);
    }
  }, [profile, controllersCheckModal]);

  const closeCheckModal = useCallback(() => {
    setAlertVisible(null);
    navigate.navigate(screenNames.home);
  }, []);

  const closeCheckModalToBack = useCallback(async () => {
    await Profile.clear();
    dispatch(clearUsersState());
    setAlertVisible(null);
  }, []);

  const handleUploadPhoto = useCallback(async () => {
    const options = {
      storageOptions: {
        path: 'images',
      },
    };

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('User cancelled image picker', ToastAndroid.SHORT);
      } else {
        const source = { uri: response.assets[0] };
        setPhoto({
          fileSize: source.uri.fileSize,
          type: source.uri.type,
          uri: source.uri.uri,
          name: source.uri.fileName,
        });
      }
    });
  }, []);

  const handleUpdateProfile = useCallback(async () => {
    const {
      email,
      firstName,
      lastName,
    } = values;
    const formData = new FormData();
    setLoading(true);
    if (photo.uri) {
      formData.append('photo', {
        ...photo,
      });
    }
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    const { payload } = await dispatch(userProfileUpdateRequired(formData))
      .finally(() => setLoading(false));
    if (payload.errors) {
      setErrors(payload.errors);
      setControllersCheckModal(false);
    } else {
      setControllersCheckModal(true);
    }
  }, [photo, values]);

  const handleRemoveImages = useCallback(() => {
    if (photo.uri) {
      setPhoto(profile.photo);
    }
  }, [photo]);
  return (
    <View style={styles.container}>
      {
        isAlertVisible === true
          ? (
            <CheckModal
              isVisible
              message="Profile uploaded successfully !"
              onClose={closeCheckModal}
            />
          )
          : null
      }
      {
        isAlertVisible === false
          ? (
            <CheckModal
              isVisible
              message="Email uploaded You didn't activate your account"
              onClose={closeCheckModalToBack}
            />
          )
          : null
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.photoRow}>
          {
            photo.uri
              ? <Image source={{ uri: photo.uri }} style={styles.images} />
              : (
                <Image
                  source={{ uri: photo.search('https') > -1 ? photo : `${Config.API_URL}${photo}` }}
                  style={styles.images}
                />
              )
          }
          <TouchableOpacity
            style={styles.btnUpload}
            activeOpacity={activeOption}
            onPress={handleUploadPhoto}
          >
            <Text style={styles.textUpload}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveImages}
            activeOpacity={activeOption}
          >
            <Text style={styles.textRemove}>Remove Images</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.inputItem}>
            <Text style={styles.inputTitle}>First name </Text>
            <TextField
              onChangeText={handleChange('firstName')}
              value={values.firstName}
              style={globalStyles.settingsProfileInput}
            />
            {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputTitle}>Last name </Text>
            <TextField
              onChangeText={handleChange('lastName')}
              value={values.lastName}
              style={globalStyles.settingsProfileInput}
            />
            {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputTitle}>E-mail </Text>
            <TextField
              onChangeText={handleChange('email')}
              value={values.email}
              style={globalStyles.settingsProfileInput}
              editable={emailEditableCheck}
            />
            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
            {!emailEditableCheck
              ? (
                <Text style={styles.helpMessage}>
                  We warn you in advance that you cannot change your
                  email address because you are registered through another
                  application.
                  {' '}
                </Text>
              ) : null}
          </View>
          <FormButton
            title="Save"
            loading={loading}
            style={[globalStyles.formButton, { marginTop: 20 }]}
            onPress={handleUpdateProfile}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  btnUpload: {
    paddingVertical: 18,
    paddingHorizontal: 78,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#FF9500',
    marginTop: 10,
  },
  textUpload: {
    fontWeight: '600',
    fontSize: 16,
    color: '#052243',
  },
  textRemove: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flex: 1,
  },
  inputItem: {
    marginBottom: 18,
  },
  inputTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#052243',
    marginBottom: 8,
  },
  helpMessage: {
    backgroundColor: 'rgba(0,0,0,0.29)',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 7,
    marginBottom: 5,
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },

});
export default ProfileUpload;

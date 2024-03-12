import React from 'react';
import {
  View, StyleSheet, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import Dropdown from 'react-native-input-select';
import FormButton from '../custom/FormButton';
import { globalStyles } from '../../assets/styles/globalStyles';

function Document() {
  const [country, setCountry] = React.useState('');
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.textContent}>
          <Text style={styles.text_1}>
            To confirm passport data in your account, you
            must upload a scan/photo of your main (2-3)
            pages of your passport. Please ensure that all
            edges of the document are visible in the
            photographs.
          </Text>
          <Text style={styles.text_2}>
            When uploading photos, make sure they meet the following criteria:
          </Text>
          <Text style={styles.text_3}>
            * The file is in JPG, PNG or GIF format and
            does not exceed 15 MB.
          </Text>
          <Text style={styles.text_3}>
            * The document has not expired.
          </Text>
          <Text style={styles.text_3}>
            * The image must be in real colors, not black
            and white.
          </Text>
          <Text style={styles.text_3}>
            * The scan/photo must be taken from the
            original document; the use of any digital photo
            editing is not permitted.
          </Text>
        </View>
        <View style={styles.dropdown_view}>
          <Dropdown
            label="Document tupe"
            placeholder="Select document"
            options={[
              { label: 'Nigeria', value: 'NG' },
              { label: 'Åland Islands', value: 'AX' },
              { label: 'Algeria', value: 'DZ' },
              { label: 'American Samoa', value: 'AS' },
              { label: 'Andorra', value: 'AD' },
            ]}
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
            primaryColor="green"
          />
        </View>
        <TouchableOpacity
          style={styles.btDoc}
        >
          <Image source={require('../../assets/png/documentBtnIcon.png')} />
          <Text style={styles.btText}>Choose document</Text>
        </TouchableOpacity>
        <FormButton
          title="Downloand"
          loading={false}
          style={[globalStyles.formButton, { marginTop: 30 }]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContent: {
    backgroundColor: '#EDECEC',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  text_1: {
    fontWeight: '400',
    fontSize: 16,
    color: '#002059',
  },
  text_2: {
    fontWeight: '600',
    fontSize: 16,
    color: '#002059',
    marginVertical: 10,
  },
  text_3: {
    fontWeight: '400',
    fontSize: 16,
    color: '#002059',
    marginBottom: 3,
  },
  dropdown_view: {
    marginTop: 30,
  },
  btDoc: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#002059',
    marginLeft: 10,
  },
});
export default Document;

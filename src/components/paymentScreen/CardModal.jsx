import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  View, StyleSheet, Text, Image, TextInput, ScrollView, Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import {
  regexCardNumber,
  regexCardNumberMin, validUnitCVV,
  validUnitMM,
  validUnitYear,
} from '../../helper/regexp';
import FormButton from '../custom/FormButton';
import { globalStyles } from '../../assets/styles/globalStyles';

function CardModal() {
  const [values, setValues] = useState({
    cardNum_1: '',
    cardNum_2: '',
    cardNum_3: '',
    cardNum_4: '',
    cardHolder: '',
    mm: '',
    year: '',
    cvv: '',
  });

  const totalAmount = useSelector((state) => state.tours.totalAmount);
  const cardItem = useSelector((state) => state.tours.cardType);
  const cardNum1Ref = useRef(null);
  const cardNum2Ref = useRef(null);
  const cardNum3Ref = useRef(null);
  const cardNum4Ref = useRef(null);
  const nameRef = useRef(null);
  const mmRef = useRef(null);
  const yearRef = useRef(null);
  const cvvRef = useRef(null);
  const stripe = useStripe();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleChange = useCallback((key, text) => {
    setValues({
      ...values,
      [key]: text,
    });
  }, [values]);

  const handlePay = useCallback(async () => {
    console.log(paymentMethod);
  }, [paymentMethod]);

  return (
    <View
      style={
        styles.container
      }
    >
      {/* <ScrollView */}
      {/*   style={{ */}
      {/*     flex: 1, */}
      {/*   }} */}
      {/*   showsVerticalScrollIndicator={false} */}
      {/* > */}
      {/*   <View style={styles.lineRow}> */}
      {/*     <View style={styles.line} /> */}
      {/*   </View> */}
      {/*   <View style={styles.cardItem}> */}
      {/*     <Text style={styles.cardItemText}>DATA CARD</Text> */}
      {/*     <View style={styles.cardLogoVi}> */}
      {/*       {cardItem ? <Image source={cardItem?.logo} style={styles.cardLogo} /> : null} */}
      {/*     </View> */}
      {/*   </View> */}
      {/*   <View style={styles.cardForm}> */}
      {/*     <Text style={styles.cardNumberTitle}>Card Number</Text> */}
      {/*     <View style={styles.cardNumInputRow}> */}
      {/*       <TextInput */}
      {/*         ref={cardNum1Ref} */}
      {/*         maxLength={4} */}
      {/*         keyboardType="numeric" */}
      {/*         placeholder="1234" */}
      {/*         style={styles.cardNumberInput} */}
      {/*         value={values.cardNum_1} */}
      {/*         onChangeText={(text) => { */}
      {/*           handleChange('cardNum_1', text); */}
      {/*           if (regexCardNumber.test(text)) { */}
      {/*             cardNum2Ref?.current.focus(); */}
      {/*           } */}
      {/*         }} */}
      {/*       /> */}
      {/*       <TextInput */}
      {/*         ref={cardNum2Ref} */}
      {/*         maxLength={4} */}
      {/*         keyboardType="numeric" */}
      {/*         placeholder="1234" */}
      {/*         style={styles.cardNumberInput} */}
      {/*         value={values.cardNum_2} */}
      {/*         onChangeText={(text) => { */}
      {/*           handleChange('cardNum_2', text); */}
      {/*           if (regexCardNumber.test(text)) { */}
      {/*             cardNum3Ref?.current.focus(); */}
      {/*           } */}
      {/*           if (regexCardNumberMin.test(text)) { */}
      {/*             cardNum1Ref?.current.focus(); */}
      {/*           } */}
      {/*         }} */}
      {/*       /> */}
      {/*       <TextInput */}
      {/*         maxLength={4} */}
      {/*         ref={cardNum3Ref} */}
      {/*         keyboardType="numeric" */}
      {/*         placeholder="1234" */}
      {/*         style={styles.cardNumberInput} */}
      {/*         value={values.cardNum_3} */}
      {/*         onChangeText={(text) => { */}
      {/*           handleChange('cardNum_3', text); */}
      {/*           if (regexCardNumber.test(text)) { */}
      {/*             cardNum4Ref?.current.focus(); */}
      {/*           } */}
      {/*           if (regexCardNumberMin.test(text)) { */}
      {/*             cardNum2Ref?.current.focus(); */}
      {/*           } */}
      {/*         }} */}
      {/*       /> */}
      {/*       <TextInput */}
      {/*         ref={cardNum4Ref} */}
      {/*         maxLength={4} */}
      {/*         keyboardType="numeric" */}
      {/*         placeholder="1234" */}
      {/*         style={styles.cardNumberInput} */}
      {/*         value={values.cardNum_4} */}
      {/*         onChangeText={(text) => { */}
      {/*           handleChange('cardNum_4', text); */}
      {/*           if (regexCardNumber.test(text)) { */}
      {/*             nameRef?.current.focus(); */}
      {/*           } */}
      {/*           if (regexCardNumberMin.test(text)) { */}
      {/*             cardNum3Ref?.current.focus(); */}
      {/*           } */}
      {/*         }} */}
      {/*       /> */}
      {/*     </View> */}
      {/*   </View> */}
      {/*   <View style={styles.cardHolder}> */}
      {/*     <Text style={[styles.cardNumberTitle, { */}
      {/*       marginBottom: 12, */}
      {/*     }]} */}
      {/*     > */}
      {/*       Card Holder */}
      {/*     </Text> */}
      {/*     <TextInput */}
      {/*       ref={nameRef} */}
      {/*       style={styles.cardHolderInput} */}
      {/*       placeholder="Enter the first and last name of the cardholder" */}
      {/*       value={values.cardHolder} */}
      {/*       onChangeText={(text) => { */}
      {/*         handleChange('cardHolder', text); */}
      {/*       }} */}
      {/*     /> */}
      {/*   </View> */}
      {/*   <View style={styles.validUnit}> */}
      {/*     <View style={styles.validUnitItem}> */}
      {/*       <Text style={styles.validUnitTitle}>Valid Unitl</Text> */}
      {/*       <View style={styles.validUnitItemInput}> */}
      {/*         <TextInput */}
      {/*           ref={mmRef} */}
      {/*           placeholder="MM" */}
      {/*           style={styles.input} */}
      {/*           maxLength={2} */}
      {/*           onChangeText={(text) => { */}
      {/*             handleChange('mm', text); */}
      {/*             if (validUnitMM.test(text)) { */}
      {/*               yearRef?.current.focus(); */}
      {/*             } */}
      {/*             if (regexCardNumberMin.test(text)) { */}
      {/*               nameRef?.current.focus(); */}
      {/*             } */}
      {/*           }} */}
      {/*         /> */}
      {/*       </View> */}
      {/*     </View> */}
      {/*     <View style={styles.validUnitItem}> */}
      {/*       <View style={styles.validUnitItemInput}> */}
      {/*         <TextInput */}
      {/*           ref={yearRef} */}
      {/*           style={styles.input} */}
      {/*           maxLength={4} */}
      {/*           keyboardType="numeric" */}
      {/*           placeholder="2024" */}
      {/*           onChangeText={(text) => { */}
      {/*             handleChange('year', text); */}
      {/*             if (validUnitYear.test(text)) { */}
      {/*               cvvRef?.current.focus(); */}
      {/*             } */}
      {/*             if (regexCardNumberMin.test(text)) { */}
      {/*               mmRef?.current.focus(); */}
      {/*             } */}
      {/*           }} */}
      {/*         /> */}
      {/*       </View> */}
      {/*     </View> */}
      {/*     <View style={styles.validUnitItem}> */}
      {/*       <Text style={styles.validUnitTitle}>CVV2\CV2</Text> */}
      {/*       <View style={styles.validUnitItemInput}> */}
      {/*         <TextInput */}
      {/*           ref={cvvRef} */}
      {/*           placeholder="CVV" */}
      {/*           style={styles.input} */}
      {/*           maxLength={3} */}
      {/*           onChangeText={(text) => { */}
      {/*             handleChange('cvv', text); */}
      {/*             if (validUnitCVV.test(text)) { */}
      {/*               cvvRef?.current.blur(); */}
      {/*             } */}
      {/*             if (regexCardNumberMin.test(text)) { */}
      {/*               yearRef?.current.focus(); */}
      {/*             } */}
      {/*           }} */}
      {/*         /> */}
      {/*       </View> */}
      {/*     </View> */}
      {/*   </View> */}
      {/*   <Text style={styles.allPrice}> */}
      {/*     Payout amount */}
      {/*     {' '} */}
      {/*     {totalAmount} */}
      {/*     {' '} */}
      {/*     AMD */}
      {/*   </Text> */}
      {/*   <FormButton */}
      {/*     title="Pay" */}
      {/*     onPress={handlePay} */}
      {/*     loading={false} */}
      {/*     style={[globalStyles.formButton, { */}
      {/*       marginTop: 20, */}
      {/*     }]} */}
      {/*   /> */}
      {/* </ScrollView> */}
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: 'Card Number',
          expiration: 'MM/YY',
          cvc: 'CVC',
        }}
        onCardChange={(cardDetails) => {
          setPaymentMethod(cardDetails);
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button title="Pay" onPress={handlePay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  lineRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  line: {
    width: 50,
    height: 3,
    backgroundColor: '#A7A7A7',
  },
  cardItem: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 21,
    backgroundColor: 'rgba(0,122,255,0.15)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardItemText: {
    fontWeight: '600',
    fontSize: 22,
    color: '#052243',
  },
  cardLogoVi: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(217,217,217,0.67)',
  },
  cardForm: {
    paddingTop: 45,
  },
  cardNumberTitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#002059',
  },
  cardNumInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cardHolder: {
    paddingBottom: 23,
  },
  cardNumberInput: {
    width: 76,
    height: 39,
    backgroundColor: '#EDEDED',
    paddingHorizontal: 22,
    borderRadius: 5,
  },
  cardHolderInput: {
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    paddingLeft: 10,
  },
  validUnit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  validUnitItem: {},
  validUnitItemInput: {
    width: 102,
    height: 39,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  validUnitTitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#002059',
    marginBottom: 12,
  },
  allPrice: {
    fontWeight: '400',
    fontSize: 16,
    color: '#002059',
    textAlign: 'center',
  },
});
export default CardModal;

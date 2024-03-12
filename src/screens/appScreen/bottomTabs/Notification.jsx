import React, { useCallback } from 'react';
import {
  SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import * as PropTypes from 'prop-types';
import SwipeToDelete from '../../../components/SwipeToDelete';
import TabScreenHeader from '../../../components/TabScreenHeader';

function Tetx(props) {
  return null;
}

Tetx.propTypes = { children: PropTypes.node };

function Notification() {
  const handleDelete = useCallback(() => {
    console.log('hello');
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader title="Notification" />
      <SwipeToDelete onDelete={handleDelete}>
        <View style={styles.item}>
          <Text style={styles.days}>Today - 7 January</Text>
          <View style={styles.messageRow}>
            <View style={styles.textContext}>
              <View style={styles.textTop}>
                <Text style={styles.title}>Hello, your booking for is Pending</Text>
                <Text style={styles.days}>16:45</Text>
              </View>
              <Text
                style={styles.desc}
              >
                Book in next 2 hours to avail discount of flat 15% Use (FLAT15)
              </Text>
            </View>
            <View style={styles.deleteButton}>
              <Image source={require('../../../assets/png/deleteF.png')} />
            </View>
          </View>
        </View>
      </SwipeToDelete>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    alignItems: 'center',
  },
  textContext: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
  },
  textTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#052243',
    maxWidth: 220,
  },
  desc: {
    marginTop: 7,
    lineHeight: 18,
    maxWidth: 270,
  },
  messageRow: {
    width: '100%',
    position: 'relative',
  },
  deleteButton: {
    width: 80,
    height: 80,
    backgroundColor: 'red',
    marginRight: 50,
    position: 'absolute',
    borderRadius: 10,
    top: 15,
    right: -150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Notification;

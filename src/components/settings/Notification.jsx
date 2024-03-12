import React, { useCallback, useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';
import CheckBox from '../CheckBox';
import { activeOption } from '../../assets/styles/globalStyles';

function Notification() {
  const [notification, setNotification] = useState([
    {
      name: 'email',
      status: true,
    },
    {
      name: 'Inbox',
      status: false,
    },
    {
      name: 'SMS',
      status: false,
    },
  ]);

  const handleToggle = useCallback((item) => () => {
    notification.map((not) => {
      if (not.name === item.name) {
        not.status = !item.status;
      }
      return not;
    });
    setNotification(notification);
  }, [notification]);

  // useEffect(() => {
  //   console.log(notification);
  // }, [notification]);

  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <View style={styles.header}>
          <Text>Allow notifications</Text>
        </View>
        <Text style={styles.text}>
          Here you have full control over how you receive
          and interact with notifications, so that you will
          stay up to date and in touch according to your
          preferences and needs.
        </Text>
        <View style={styles.typesNot}>
          {
            notification
            && notification.map((item) => (
              <TouchableOpacity
                activeOpacity={activeOption}
                key={item.name}
                style={styles.checkItem}
                onPress={handleToggle(item)}
              >
                <TouchableOpacity
                  onPress={handleToggle(item)}
                  activeOpacity={activeOption}
                  style={[styles.checkBox, {
                    backgroundColor: item.status ? '#FF9500' : '#fff',
                  }]}
                >
                  {item.status
                    ? <Image source={require('../../assets/png/checkBoxIcon.png')} />
                    : null}
                </TouchableOpacity>
                <Text style={styles.checkTitle}>Inbox</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  textContent: {
    backgroundColor: '#EDECEC',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    color: '#002059',
  },
  typesNot: {
    paddingTop: 23,
  },
  checkItem: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#002059',
  },
  checkBox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Notification;

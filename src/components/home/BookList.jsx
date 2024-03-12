import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  BookBusIcon, BookCarsIcon, BookFootIcon, BookHotelsIcon,
} from '../../assets';

const arr = [
  {
    id: 1,
    name: 'Food',
    desc: 'More than 500 coffe shop',
    Icon: <BookFootIcon />,
  },
  {
    id: 2,
    name: 'Hotels',
    desc: 'More than 30 hotels',
    Icon: <BookHotelsIcon />,
  },
  {
    id: 3,
    name: 'Cars',
    desc: 'More than 30 hotels',
    Icon: <BookCarsIcon />,
  },
  {
    id: 4,
    name: 'Bus',
    desc: 'More than 80 bus',
    Icon: <BookBusIcon />,
  },
];
function RenderItem({ item }) {
  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      style={styles.item}
    >
      <View style={styles.icon}>
        {item.Icon}
      </View>
      <View style={styles.textContent}>
        <Text style={styles.name}>{item.name}</Text>
        {/* eslint-disable-next-line react/prop-types */}
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );
}
RenderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    Icon: PropTypes.element.isRequired,
  }).isRequired,
};
function BookList() {
  return (
    <View style={styles.book}>
      <Text style={styles.title}>Book whit us</Text>
      {arr.map((item) => <RenderItem key={item.id} item={item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  book: {
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#002059',
  },
  flotStyle: {
    paddingVertical: 20,
  },
  item: {
    backgroundColor: '#FF9500',
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 9,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    paddingLeft: 20,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 15,
    color: '#fff',
  },
  desc: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
  },
});

export default BookList;

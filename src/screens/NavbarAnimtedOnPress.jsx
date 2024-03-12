// // import React, { useCallback, useState } from 'react';
// // import {
// //   SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,
// // } from 'react-native';
// // import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// //
// // // Navbar animated item onPress left center right button position absolute
// // function NavbarAnimtedOnPress() {
// //   const [data, setData] = useState(['Left', 'Center', 'Right']);
// //   const [getTextIndex, setGetTextIndex] = useState('Left');
// //   const { width } = useWindowDimensions();
// //   const animateEffectWidth = (width - 40) / data.length;
// //
// //   const navbarButtonSharedValue = useSharedValue({
// //     left: animateEffectWidth * data.indexOf(data[0]),
// //   });
// //
// //   const navbarButtonAnimatedStyles = useAnimatedStyle(() => {
// //     return {
// //       left: withTiming(navbarButtonSharedValue.value.left, {
// //         duration: 600,
// //       }),
// //     };
// //   });
// //
// //   const handleGetDataItemPress = useCallback((item) => () => {
// //     navbarButtonSharedValue.value = {
// //       left: animateEffectWidth * data.indexOf(item),
// //     };
// //     console.log(animateEffectWidth, data.indexOf(item));
// //   }, []);
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={[
// //         styles.navbar,
// //         {
// //           width: width - 40,
// //         },
// //       ]}
// //       >
// //         <Animated.View style={[
// //           {
// //             width: animateEffectWidth,
// //           },
// //           navbarButtonAnimatedStyles,
// //           styles.animateEffect,
// //         ]}
// //         />
// //         {
// //            data.map((item) => (
// //              <TouchableOpacity
// //                key={item}
// //                onPress={handleGetDataItemPress(item)}
// //              >
// //                <Text style={styles.navbarItemText}>{item}</Text>
// //              </TouchableOpacity>
// //            ))
// //         }
// //       </View>
// //     </SafeAreaView>
// //   );
// // }
// //
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   navbar: {
// //     backgroundColor: 'rgba(0,0,0,0.32)',
// //     height: 55,
// //     borderRadius: 10,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     position: 'relative',
// //   },
// //   navbarItemText: {
// //     fontWeight: '600',
// //     color: '#fff',
// //     fontSize: 15,
// //     zIndex: 10,
// //   },
// //   animateEffect: {
// //     position: 'absolute',
// //     backgroundColor: 'rgba(45,32,32,0.22)',
// //     height: '80%',
// //     top: '10%',
// //     borderRadius: 10,
// //   },
// // });
// // export default NavbarAnimtedOnPress;
//
// /* ----------------------- pages view navigate animated --------------------------*/
//
// import React, {
//   useCallback, useEffect, useRef, useState,
// } from 'react';
// import {
//   FlatList,
//   SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,
// } from 'react-native';
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import PagerView from 'react-native-pager-view';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   activeCategoryPage,
//   destinationListRequired,
//   removeStateKeys,
// } from '../store/actions/tours';
// import Destination from '../components/home/Destination';
//
// // function RenderNavbarItem({
// //   item,
// //   navActiveIndex,
// //   setNavActiveIndex,
// //   activeNavItemWidth,
// //   setActiveNavItemWidth,
// // }) {
// //   const navSharedValue = useSharedValue({
// //     color: '#000',
// //   });
// //   const nacAnimatedStyles = useAnimatedStyle(() => {
// //     return {
// //       color: withTiming(navSharedValue.value.color, {
// //         duration: 450,
// //       }),
// //     };
// //   });
// //
// //   const handleItemPress = useCallback((item) => () => {
// //     setNavActiveIndex(item);
// //   }, [navItemRef]);
// //
// //   const handleLayout = useCallback((event) => {
// //     setActiveNavItemWidth([...activeNavItemWidth, event.nativeEvent.layout.width]);
// //   }, [activeNavItemWidth]);
// //
// //   useEffect(() => {
// //     if (item === navActiveIndex) {
// //       navSharedValue.value = {
// //         color: '#F79F1A',
// //       };
// //     } else {
// //       navSharedValue.value = {
// //         color: '#000',
// //       };
// //     }
// //   }, [navActiveIndex, item]);
// //
// //   return (
// //     <TouchableOpacity
// //       onLayout={handleLayout}
// //       style={{
// //         paddingVertical: 3,
// //       }}
// //       onPress={handleItemPress(item)}
// //     >
// //       <Animated.Text
// //         style={[{
// //           fontWeight: '500',
// //           fontSize: 17,
// //         }, nacAnimatedStyles]}
// //       >
// //         {item}
// //       </Animated.Text>
// //     </TouchableOpacity>
// //   );
// // }
//
// function NavbarAnimtedOnPress() {
//   const navItems = ['Popular', 'Destination', 'Tour', 'Services'];
//   const [navActiveIndex, setNavActiveIndex] = useState('Popular');
//   const [activeNavItemWidth, setActiveNavItemWidth] = useState([]);
//   const categoryPage = useSelector((state) => state.tours.categoryPage);
//   const destinationList = useSelector((state) => state.tours.destinationList);
//   const { width } = useWindowDimensions();
//   const animateEffectWidth = (width - 16) / navItems.length;
//   const dispatch = useDispatch();
//
//   const lineSharedValue = useSharedValue({
//     left: animateEffectWidth * navItems.indexOf(navItems[navActiveIndex]),
//     width: activeNavItemWidth,
//   });
//   const lineAnimatedStyles = useAnimatedStyle(() => {
//     return {
//       width: withTiming(lineSharedValue.value.width, {
//         duration: 350,
//       }),
//       left: withTiming(lineSharedValue.value.left, {
//         duration: 450,
//       }),
//     };
//   });
//
//   useEffect(() => {
//     const getIndexItem = navItems.indexOf(navActiveIndex);
//     const navItemWidth = activeNavItemWidth[getIndexItem];
//     const balanceNumber = Math.floor(animateEffectWidth - navItemWidth);
//     // eslint-disable-next-line no-nested-ternary
//     const checkBalanceNumber = animateEffectWidth * navItems.indexOf(navActiveIndex) !== 0
//       ? navActiveIndex === 'Tour' ? balanceNumber / 2 + 6 : balanceNumber / 2 : 0;
//     lineSharedValue.value = {
//       left: Math.floor(animateEffectWidth * getIndexItem + checkBalanceNumber),
//       width: navItemWidth,
//     };
//   }, [navActiveIndex, activeNavItemWidth]);
//
//   const handlePageChange = useCallback((event) => {
//     const page = event.nativeEvent.position;
//     setNavActiveIndex(navItems[page]);
//     dispatch(activeCategoryPage(page));
//   }, [navItems]);
//   useEffect(() => {
//     if (categoryPage === 0) {
//       dispatch(destinationListRequired());
//     } else {
//       dispatch(removeStateKeys('Destination'));
//     }
//   }, [categoryPage]);
//   const isLoading = useSelector((state) => state.tours.loading);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.navbar}>
//         <View style={styles.navRow}>
//           {
//             navItems.map((item) => (
//               <RenderNavbarItem
//                 navActiveIndex={navActiveIndex}
//                 setNavActiveIndex={setNavActiveIndex}
//                 setActiveNavItemWidth={setActiveNavItemWidth}
//                 activeNavItemWidth={activeNavItemWidth}
//                 key={item}
//                 item={item}
//               />
//             ))
//           }
//           <Animated.View style={[
//             lineAnimatedStyles,
//             {
//               height: 1,
//               backgroundColor: '#F79F1A',
//               position: 'absolute',
//               bottom: -0.3,
//               borderRadius: 10,
//             },
//           ]}
//           />
//         </View>
//       </View>
//       <PagerView
//         initialPage={0}
//         style={{ flex: 1 }}
//         onPageSelected={handlePageChange}
//       >
//         <View
//           key={1}
//           style={{
//             paddingVertical: 15,
//           }}
//         >
//           {
//             isLoading ? <Text>HEllo</Text> : (
//               <FlatList
//                 data={destinationList} // Sample data
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => item.id}
//               />
//             )
//           }
//         </View>
//         <View key={2}>
//           <Text>Hello</Text>
//         </View>
//         <View key={3}>
//           <Text>Hello</Text>
//         </View>
//         <View key={4}>
//           <Text>Hello</Text>
//         </View>
//       </PagerView>
//     </SafeAreaView>
//   );
// }
// const renderItem = ({ item }) => (
//   <View style={{
//     height: 250,
//     backgroundColor: 'red',
//     marginBottom: 15,
//   }}
//   />
// );
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 14,
//   },
//   navbar: {
//     paddingHorizontal: 16,
//   },
//   navRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     borderBottomWidth: 0.8,
//     borderBottomColor: 'rgba(0,0,0,0.38)',
//     overflow: 'hidden',
//   },
//   navbarTitle: {
//     fontWeight: '500',
//     fontSize: 17,
//     color: '#000',
//   },
// });
// export default NavbarAnimtedOnPress;

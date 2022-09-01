import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../assets/color';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.navbarText}>
        <Text style={styles.text}>Welcome to </Text>
        <Text style={styles.brandName}>Clane News!</Text>
      </View>

      <Image source={require('../assets/Images/winkEmoji.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  navbarText: {
    width: '50%',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
});
export default Navbar;

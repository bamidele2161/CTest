import {View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export const BackArrow = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.icon}>
      <Icon
        name="chevron-left"
        size={20}
        color="black"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 50,
    flex: 1,
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#878686',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 40,
    position: 'absolute',
    top: 10,
    left: 20,
  },
});
export default BackArrow;

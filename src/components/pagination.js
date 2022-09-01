import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../assets/color';
import PrimaryButton from './button';

const Pagination = ({page, setPage, dataLength}) => {
  const handleChangePage = type => {
    if (type === 'next') {
      setPage(page + 1);
      return;
    } else {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryButton
        title="BACK"
        textStyle={styles.primaryButtonTitle}
        disabled={page === 1}
        onPress={() => handleChangePage('prev')}
        buttonStyle={[styles.buttonStyle, {backgroundColor: colors.grey}]}
      />
      <PrimaryButton
        title="NEXT"
        buttonStyle={styles.buttonStyle}
        onPress={() => handleChangePage('next')}
        disabled={dataLength === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    width: 100,
    borderRadius: 8,
  },
  primaryButtonTitle: {
    color: 'black',
  },
});

export default Pagination;

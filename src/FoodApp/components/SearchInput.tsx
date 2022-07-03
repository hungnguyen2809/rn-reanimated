import React from 'react';
import {Image, StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import icons from '../../assets/icons';

interface Props extends TextInputProps {}

const SearchInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search in Hung Food..."
        autoFocus
        {...props}
      />
      <Image source={icons.search} style={styles.iconSearch} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  textInput: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
  },
  iconSearch: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
  },
});

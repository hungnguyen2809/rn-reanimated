import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../utils';

interface Props {
  title: string;
}

const Menu: React.FC<Props> = ({title, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 15,
    color: '#333',
    marginBottom: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.QuickSand,
  },
});

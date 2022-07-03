import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FONTS} from '../../utils';

interface Props {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
  description: string;
  style?: ViewStyle;
}

const MenuItem = ({name, image, price, description, style}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.dishInfo}>
        <View>
          <Text style={styles.dishName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.dishDescription} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View>
          <Text style={styles.dishPrice}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eaeaea',
    paddingVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  dishInfo: {
    flex: 1,
    flexWrap: 'wrap',
  },
  dishName: {
    color: '#333',
    fontSize: 14,
    marginBottom: 16,
    fontWeight: '700',
    fontFamily: FONTS.QuickSand,
  },
  dishDescription: {
    fontSize: 12,
    fontFamily: FONTS.QuickSand,
    color: 'rgba(51, 51, 51, 0.9)',
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 13,
    color: '#fe4a00',
    fontWeight: '700',
    fontFamily: FONTS.QuickSand,
  },
});

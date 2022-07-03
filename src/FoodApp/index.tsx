import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import imgs from '../assets/images';
import {menu1Data, menu2Data, menu3Data} from './../assets/data';
import icons from './../assets/icons';
import {FONTS} from './../utils';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import SearchInput from './components/SearchInput';
import SearchModal from './components/SearchModal';

const BANNER_HEIGHT = 244;

const FoodApp = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  const handleScrollView = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    animatedValue.setValue(event.nativeEvent.contentOffset.y);
  };

  const bannerStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchBarStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
  };

  const searchIconStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Animated.View style={[styles.searchBar, searchBarStyle]}>
        <SafeAreaView />
        <TouchableOpacity onPress={() => setShowSearchModal(true)}>
          <SearchInput editable={false} pointerEvents={'none'} />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.btnSearch}
        onPress={() => setShowSearchModal(true)}>
        <Animated.Image
          source={icons.search}
          style={[styles.iconSearch, searchIconStyle]}
        />
      </TouchableOpacity>
      <SearchModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
      <Animated.View style={[styles.bannerContainer, bannerStyle]}>
        <Image source={imgs.foodBanner} style={styles.imgBanner} />
        <Svg style={styles.gradient} height={BANNER_HEIGHT} width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0" stopColor="black" stopOpacity="0.6" />
              <Stop offset="1" stopColor="black" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={'100%'}
            height={BANNER_HEIGHT}
            fill="url(#grad)"
          />
        </Svg>
      </Animated.View>
      <ScrollView
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: {y: animatedValue},
        //       },
        //     },
        //   ],
        //   {useNativeDriver: false},
        // )}
        onScroll={handleScrollView}
        scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />

        <View style={styles.scrollViewContainer}>
          <View style={styles.showDetailCard}>
            <Text style={styles.shopName}>Hung Food</Text>
            <Text style={styles.shopDistanceAddress}>
              <Text style={styles.shopDistance}>0.7km</Text>
              <Text> - </Text>
              <Text style={styles.shopAddress}>133, 79 Cau Giay, HN</Text>
            </Text>
            <View style={styles.ratingsRow}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingPoint}>5</Text>
              <Text style={styles.numberOfRating}>(999+)</Text>
            </View>
          </View>

          <Menu title="Recommended Menu">
            {menu1Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Crispy Chicken">
            {menu2Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Dessert">
            {menu3Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
        </View>
      </ScrollView>
    </View>
  );
};

export default FoodApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 5},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 0.8,
        shadowRadius: 8,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  btnSearch: {
    position: 'absolute',
    right: 48,
    top: 48,
    height: 48,
    width: 48,
    zIndex: 10,
  },
  iconSearch: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
  },
  imgBanner: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    flex: 1,
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  showDetailCard: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: -40,
    marginBottom: 40,
    ...Platform.select({
      android: {elevation: 5},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 0.8,
        shadowRadius: 8,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  shopName: {
    color: '#101825',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: FONTS.QuickSand,
  },
  shopDistanceAddress: {
    fontSize: 13,
    fontFamily: FONTS.QuickSand,
    marginVertical: 16,
  },
  shopDistance: {
    fontWeight: '700',
    color: '#706d8b',
  },
  shopAddress: {
    color: '#586065',
  },
  ratingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    color: '#f6be00',
    fontSize: 16,
  },
  ratingPoint: {
    fontSize: 13,
    fontFamily: FONTS.QuickSand,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 2,
  },
  numberOfRating: {
    color: '#607d8b',
    fontSize: 13,
    fontFamily: FONTS.QuickSand,
  },
});

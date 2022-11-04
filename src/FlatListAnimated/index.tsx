/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import ListItem from './components/ListItem';

const data = new Array(100).fill(1).map((_, idx) => ({id: idx, value: idx}));

const FlatListAnimated: React.FC = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingTop: 40}}
        renderItem={({item}) => (
          <ListItem item={item} viewableItems={viewableItems} />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        onViewableItemsChanged={info => {
          viewableItems.value = info.viewableItems;
        }}
      />
    </View>
  );
};

export default FlatListAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemSeparator: {
    height: 20,
  },
});

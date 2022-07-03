import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchInput from './SearchInput';

interface SearchModalProp {
  visible: boolean;
  onClose: () => void;
}

const SearchModal = ({visible, onClose}: SearchModalProp) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.content}>
        <SafeAreaView />
        <SearchInput />
      </View>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  content: {
    height: 100,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import NormalOptionItem from '../components/option/NormalOptionItem'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppDispatch } from '../redux/Hook';
import { setDefaultLanguage } from '../redux/Slice';

const data = [
  { label: 'Vietnamese', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
 
];
export default function ApplicationOptionScreen() {
  const dispatch = useAppDispatch()
  const [language, setLanguage] = useState('vi')
  
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  // 
  const handleChangeLangue = () => {
    dispatch(setDefaultLanguage(language))
    setModalVisible(false);
  }


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Ngôn ngữ
        </Text>
      );
    }
    return null;
  };
  // 

  const containerStyle = { backgroundColor: 'white', padding: 20, marginLeft: 20, marginRight: 20, marginBottom: 100, height: 230 };
  return (

    <View style={styles.body}>
      <PaperProvider>
        <View style={styles.option}>
          <NormalOptionItem iconName='globe' title='Ngôn ngữ' onItemPress={openModal} />
          <NormalOptionItem iconName='user' title='Thông tin cá nhân' />
          <NormalOptionItem iconName='key' title='Mật khẩu' />
        </View>
        <Portal>
          <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={containerStyle}>
            <View style={styles.header}>
              <Text style={styles.txtHeader}>Ngôn ngữ</Text>
            </View>
            <View style={styles.container}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Chọn ngôn ngữ' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setLanguage(item.value)
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={styles.button}>
              <Pressable style={styles.btn}><Text style={{fontWeight: 'bold'}} onPress={closeModal}>Hủy</Text></Pressable>
              <Pressable style={styles.btn}><Text style={{fontWeight: 'bold'}} onPress={handleChangeLangue}>Thay đổi</Text></Pressable>
            </View>
          </Modal>
        </Portal>
      </PaperProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    borderBottomWidth: 0.7
  },
  txtHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 15
  },
  option: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    
  },
  btn: {
    borderWidth: 0.8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 30,
    borderRadius: 10,
    borderColor: 'blue'
  },
  container: {
    backgroundColor: 'white',
    padding: 14,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
import { Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NormalOptionItem from '../components/option/NormalOptionItem'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppDispatch } from '../redux/Hook';
import { setDefaultLanguage } from '../redux/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LABEL_LANGUAGE } from '../constants/KeyValue';
import { useTranslation } from 'react-multi-lang';
const data = [
  { label: 'Vietnamese', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
  
];
export default function ApplicationOptionScreen() {
  const dispatch = useAppDispatch()
  const [language, setLanguage] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [label, setLabel] = useState('Vietnamese');
  const t = useTranslation()

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  }


  const handleChangeLangue = () => {
    dispatch(setDefaultLanguage(language))
    // AsyncStorage.setItem(LABEL_LANGUAGE, JSON.stringify(label))
    setModalVisible(false)
  }

  useEffect(() => {
    AsyncStorage.getItem(LABEL_LANGUAGE)
      .then((json) => {
        if (json) {
          const label_ = JSON.parse(json)
          
          if (label_) {
            setLabel(label_)
          }
        }
      })
  },[])

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {t('ApplicationOptionComponent.language')}
        </Text>
      );
    }
    return null;
  }


  const containerStyle = { backgroundColor: 'white', padding: 20, marginLeft: 20, marginRight: 20, marginBottom: 100, height: 230 };
  return (

    <View style={styles.body}>
      <PaperProvider>
        <View style={styles.option}>
          <NormalOptionItem iconName='globe' title={t('ApplicationOptionComponent.language')} onItemPress={openModal} />
          <NormalOptionItem iconName='user' title={t('ApplicationOptionComponent.info')} />
          <NormalOptionItem iconName='key' title={t('ApplicationOptionComponent.password')} />
        </View>
        <Portal>
          <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={containerStyle}>
            <View style={styles.header}>
              <Text style={styles.txtHeader}>{t('ApplicationOptionComponent.language')}</Text>
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
                placeholder={!isFocus ? label : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setLanguage(item.value)
                  setLabel(item.label)
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={styles.button}>
              <Pressable style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'white'
                },
                styles.btn
              ]} onPress={closeModal}>
                {({ pressed }) => (
                  <Text style={{ fontWeight: 'bold' }} >{t('ApplicationOptionComponent.cancel')}</Text>
                )}
              </Pressable>
              <Pressable style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'white'
                },
                styles.btn
              ]}  onPress={handleChangeLangue}>
                {({ pressed }) => (
                  <Text style={{ fontWeight: 'bold' }}>{t('ApplicationOptionComponent.change')}</Text>
                )}
              </Pressable>
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
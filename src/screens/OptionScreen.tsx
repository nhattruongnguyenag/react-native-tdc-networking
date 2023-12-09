import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { LIST_FOLLOW_SCREEN, LIST_POST_SAVED_SCREEN, UPDATE_PROFILE } from '../constants/Screen'
import { ScrollView } from 'react-native-gesture-handler'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { COLOR_GREY, COLOR_GREY_FEEBLE, COLOR_WHITE } from '../constants/Color'
import { useTranslation } from 'react-multi-lang'

export default function OptionScreen({ route }: any) {
    const t = useTranslation();
    const { userData } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const handleFollowItem = () => {
        navigation.navigate(LIST_FOLLOW_SCREEN)
    }
    const handleSaveItem = () => {
        navigation.navigate(LIST_POST_SAVED_SCREEN)
    }

    const handleUpdateProfile = () => {
        navigation.navigate(UPDATE_PROFILE, { userData: userData })
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Pressable style={[styles.item, styles.firstItem]} onPress={handleFollowItem}>
                    <View style={styles.wrapperIcon}><Icon1 name='account-eye' size={21} color={COLOR_GREY} /></View>
                    <Text style={styles.txt}>{t("OptionScreen.optionScreenFollowText")}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={handleSaveItem}>
                    <View style={styles.wrapperIcon}><Icon2 name='bookmark-alt' size={21} color={COLOR_GREY} /></View>
                    <Text style={styles.txt}>{t("OptionScreen.optionScreenSaveText")}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={handleUpdateProfile}>
                    <View style={styles.wrapperIcon}><FontAwesomeIcon name='pencil-square-o' size={21} color={COLOR_GREY} /></View>
                    <Text style={styles.txt}>{t("OptionScreen.optionScreenUpdateProfileText")}</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLOR_WHITE
    },
    firstItem: {
        marginTop: 15,
    },
    item: {
        height: 50,
        backgroundColor: COLOR_GREY_FEEBLE,
        paddingLeft: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
        flex: 1,
    },
    txt: {
        fontSize: 15,
        color: COLOR_GREY,
        flex: 0.9
    },
    wrapperIcon: {
        flex: 0.1,
    }
})
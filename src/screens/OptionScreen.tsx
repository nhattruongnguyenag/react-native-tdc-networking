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
import { TEXT_FOLLOW, TEXT_SAVE, TEXT_UPDATE_PROFILE } from '../constants/StringVietnamese'
import { COLOR_BLACK, COLOR_WHITE } from '../constants/Color'

export default function OptionScreen({ route }: any) {
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
                <Pressable style={styles.item} onPress={handleFollowItem}>
                    <Icon1 name='account-eye' size={21} color='red' />
                    <Text style={styles.txt}>{TEXT_FOLLOW}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={handleSaveItem}>
                    <Icon2 name='bookmark-alt' size={21} color='#8a2be2' />
                    <Text style={styles.txt}>{TEXT_SAVE}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={handleUpdateProfile}>
                    <FontAwesomeIcon name='pencil-square-o' size={21} color={COLOR_BLACK} />
                    <Text style={styles.txt}>{TEXT_UPDATE_PROFILE}</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'grey'
    },
    item: {
        height: 50,
        backgroundColor: COLOR_WHITE,
        marginBottom: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontSize: 15,
        color: COLOR_BLACK,
        paddingLeft: 10
    }
})
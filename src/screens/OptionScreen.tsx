import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { LIST_FOLLOW_SCREEN, LIST_POST_SAVED_SCREEN } from '../constants/Screen'
import { ScrollView } from 'react-native-gesture-handler'

export default function OptionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const handleFollowItem = () => {
        navigation.navigate(LIST_FOLLOW_SCREEN)
    }
    const handleSaveItem = () => {
        navigation.navigate(LIST_POST_SAVED_SCREEN)
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Pressable style={styles.item} onPress={handleFollowItem}>
                    <Text style={styles.txt}><Icon1 name='account-eye' size={26} color='red' />   Theo dõi</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={handleSaveItem}>
                    <Text style={styles.txt}><Icon2 name='bookmark-alt' size={26} color='#8a2be2' />     Lưu</Text>
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
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        marginBottom: 1,
        justifyContent: 'center',
        paddingLeft: 30
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})
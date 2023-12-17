import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'

interface NormalOptionItemProps {
    title?: string
    iconName?: string
    onItemPress?: () => void
}

export default function NormalOptionItem(props: NormalOptionItemProps) {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#0088ff1A' : 'white',
            },
            styles.body
        ]} onPress={() => props.onItemPress && props.onItemPress()}>
            <FontAwesome6Icon style={styles.icon} name={props.iconName ?? ''} size={22} color={'#0088ff'} />
            <Text style={styles.textItem}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5
    },
    icon: {
        width: 50
    },
    textItem: {
        color: '#000',
        fontSize: 16
    }
})
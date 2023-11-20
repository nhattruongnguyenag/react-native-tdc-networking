import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'

interface AccordionItemProps {
    title?: string
    iconName?: string
}

export default function AccordionItem(props: AccordionItemProps) {
    return (
        <View style={styles.body}>
            <FontAwesome6Icon style={styles.icon} name={props.iconName ?? ''} size={16} color={'#0088ff'} />
            <Text style={styles.textItem}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 50
    },
    textItem: {
        color: '#0088ff',
        fontWeight: '500'
    }
})
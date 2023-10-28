import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import Pdf from 'react-native-pdf'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { BACKGROUND_BLUE } from '../constants/Color'
import { WebView } from 'react-native-webview'

interface CVSource {
    uri: string
    type: string
    cache: boolean
}

export default function JobApplyScreen() {
    const [cvSource, setCVSource] = useState<CVSource>({

        uri: '',
        type: '',
        cache: true
    })

    const onBtnAddCVPress = async () => {
        DocumentPicker.pick({
            type: [
                DocumentPicker.types.pdf,
                DocumentPicker.types.images
            ],
            copyTo: 'cachesDirectory'

        })
            .then(result => {
                setCVSource({
                    uri: result[0].fileCopyUri ?? '',
                    cache: true,
                    type: result[0].type ?? ''
                })
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        console.log(cvSource)
    }, [cvSource])

    const renderCVDocumentView = () => {
        if (cvSource.type.includes('image')) {
            return <Image
                style={{flex: 1}}
                source={{ uri: cvSource.uri }}
            />
        }

        return <Pdf
            trustAllCerts={false}
            source={cvSource}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={{ flex: 1 }} />
    }

    return (
        <View style={styles.body}>
            <Pressable style={({ pressed }) => [styles.btnContainer, { opacity: pressed ? .7 : 1 }]}
                onPress={() => {
                    onBtnAddCVPress()
                }} >
                <Text style={styles.btnTitle}>Thêm CV</Text>
                <FontAwesome6Icon style={styles.btnIcon} name='upload' size={20} color='#fff' />
            </Pressable>

            <View style={styles.cvSource}>
                {renderCVDocumentView()}
                {/* <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} /> */}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonFullWith
                    textColor='#000'
                    btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
                    onPress={() => {

                    }}
                    iconName='arrow-left-thin'
                    title='Quay lại'
                />

                <ButtonFullWith
                    btnStyle={{ marginLeft: 10, width: 140 }}
                    onPress={() => {

                    }}
                    iconName='plus'
                    title='Hoàn tất'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    btnContainer: {
        width: 120,
        backgroundColor: BACKGROUND_BLUE,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 5
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    btnIcon: {
        marginStart: 'auto'
    },
    cvSource: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#eee',
        paddingBottom: 5
    }
})
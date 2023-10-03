import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR_WHITE } from '../constants/Color';
// Definition props
export interface ImagePost {
    images: {
        id: number,
        image: string
    }[],
}

const { width, height } = Dimensions.get('screen');
// Constant
const TYPE_LAYOUT_WIDTH_GREATER_HEIGHT = 1
const TYPE_LAYOUT_HEIGHT_GREATER_WIDTH = 2
const TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT = 3
const CustomizeImagePost = (props: ImagePost) => {

    const [typeImageLayout, setTypeImageLayout] = useState(-1)
    const [numberImageRemaining, setNumberImageRemaining] = useState(0)
    const imageQty = props.images?.length
    // Dam bao bang cach kiem tra o post call ham nay toi phai !=null

    useEffect(() => {
        Image.getSize(props.images[0].image, (width, height) => {
            if (width > height) {
                setTypeImageLayout(TYPE_LAYOUT_WIDTH_GREATER_HEIGHT)
            } else if (height > width) {
                setTypeImageLayout(TYPE_LAYOUT_HEIGHT_GREATER_WIDTH)
            } else {
                setTypeImageLayout(TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT)
            }
            setNumberImageRemaining(props.images.length - 5)
        })
    }, [])
    switch (imageQty) {
        // 1 dieu kien sap xep
        case 1:
            return (
                <TouchableOpacity style={styles.wrapImage}>
                    <Image style={styles.imageOnePost}
                        key={props.images[0].id}
                        source={{ uri: props.images[0].image }} />
                </TouchableOpacity>
            )
        case 2:
            // co 3 kieu sap xep
            if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
                return (
                    <View style={styles.wrapImage}>
                        {
                            props.images.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.widthGreaterHeight}
                                >
                                    <Image
                                        style={styles.imageOnePost} source={{ uri: item.image }} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            } else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
                return (
                    <View style={[styles.wrapImage, styles.wrapImageRow]}>
                        {
                            props.images.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.heightGreaterWidth}
                                >
                                    <Image
                                        style={styles.imageOnePost}
                                        source={{ uri: item.image }} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            } else {
                return (
                    <View style={[styles.wrapImageSquare, styles.wrapImageRow, styles.justifyContent]}>
                        {
                            props.images.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.heightGreaterWidth}
                                >
                                    <Image
                                        style={styles.imageOnePost}
                                        source={{ uri: item.image }} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            }
        case 3:
            // chi co 2 kieu sap xep
            if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
                return (
                    <View style={styles.wrapImage}>
                        <TouchableOpacity
                            key={props.images[0].id}
                            style={styles.widthGreaterHeight}
                        >
                            <Image
                                style={styles.imageOnePost}
                                source={{ uri: props.images[0].image }} />
                        </TouchableOpacity>
                        <View style={[styles.widthGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
                            {
                                props.images.slice(1, 3).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.heightGreaterWidth}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={[styles.wrapImage, styles.wrapImageRow]}>
                        <TouchableOpacity
                            key={props.images[0].id}
                            style={styles.heightGreaterWidth}
                        >
                            <Image
                                style={styles.imageOnePost}
                                source={{ uri: props.images[0].image }} />
                        </TouchableOpacity>
                        <View style={[styles.heightGreaterWidth, styles.justifyContent]}>
                            {
                                props.images.slice(1, 3).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.widthGreaterHeight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
        case 4:
            // co 3 kieu sap xep
            if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
                return (
                    <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                            key={props.images[0].id}
                            style={styles.biggestWithGreaterHeight}
                        >
                            <Image
                                style={styles.imageOnePost}
                                source={{ uri: props.images[0].image }} />
                        </TouchableOpacity>
                        <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                            {
                                props.images.slice(1, 4).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageBottom}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
            else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
                return (
                    <View style={[styles.wrapImage, styles.wrapImageRow]}>
                        <TouchableOpacity
                            key={props.images[0].id}
                            style={styles.biggestHeightGreaterWidth}
                        >
                            <Image
                                style={styles.imageOnePost}
                                source={{ uri: props.images[0].image }} />
                        </TouchableOpacity>
                        <View style={styles.rightWrapImageFour}>
                            {
                                props.images.slice(1, 4).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageRight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={[styles.wrapImage, { flexWrap: 'wrap' }]}>
                        {
                            props.images.slice(0, 4).map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.imageSquare, index % 2 === 0 ? styles.marginRight : null]}
                                >
                                    <Image
                                        style={styles.imageOnePost}
                                        source={{ uri: item.image }} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            }
        case 5:
            // co 2 kieu sap xep
            if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
                return (
                    <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
                        <View style={[styles.biggestWithGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
                            {
                                props.images.slice(0, 2).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.heightGreaterWidth}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                            {
                                props.images.slice(2, 5).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageBottom}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={[styles.wrapImage, styles.wrapImageRow]}>
                        <View style={[styles.biggestHeightGreaterWidth, styles.justifyContent]}>
                            {
                                props.images.slice(0, 2).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.widthGreaterHeight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.rightWrapImageFour}>
                            {
                                props.images.slice(2, 5).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageRight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                )
            }
        default:
            //  Co 2 dieu kien
            if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
                return (
                    <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
                        <View style={[styles.biggestWithGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
                            {
                                props.images.slice(0, 2).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.heightGreaterWidth}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                            {
                                props.images.slice(2, 4).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageBottom}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }

                            <TouchableOpacity
                                style={[styles.smallImageBottom, styles.wrapperLastImageButRemaining]}
                                key={props.images[4].id}
                            >
                                <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                                <Image
                                    style={styles.imageOnePost}
                                    source={{ uri: props.images[4].image }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={[styles.wrapImage, styles.wrapImageRow]}>
                        <View style={[styles.biggestHeightGreaterWidth, styles.justifyContent]}>
                            {
                                props.images.slice(0, 2).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.widthGreaterHeight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.rightWrapImageFour}>
                            {
                                props.images.slice(2, 4).map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.smallImageRight}
                                    >
                                        <Image
                                            style={styles.imageOnePost}
                                            source={{ uri: item.image }} />
                                    </TouchableOpacity>
                                ))
                            }
                            <TouchableOpacity style={[styles.smallImageRight, styles.wrapperLastImageButRemaining]}>
                                <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                                <Image
                                    key={props.images[4].id}
                                    style={styles.imageOnePost} source={{ uri: props.images[4].image }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
    }
}

const styles = StyleSheet.create({
    wrapImage: {
        justifyContent: 'space-between',
        width: '100%',
        height: height * 0.4,
    },
    wrapImageSquare: {
        justifyContent: 'space-between',
        aspectRatio: 2 / 1
    },
    imageOnePost: {
        width: '100%',
        height: '100%',
    },
    widthGreaterHeight: {
        width: '100%',
        height: '49.5%'
    },
    heightGreaterWidth: {
        width: '49.5%',
        height: '100%',
    },
    imageSquare: {
        width: '49.5%',
        height: '49.5%'
    },
    biggestWithGreaterHeight: {
        width: '100%',
        height: '59.5%'
    },
    biggestHeightGreaterWidth: {
        height: '100%',
        width: '59.5%'
    },
    justifyContent: {
        justifyContent: 'space-between',
    },
    smallImageBottom: {
        width: '32.83%',
        height: '100%'
    },
    smallImageRight: {
        height: '32.83%',
        width: '100%'
    },
    // Two image area
    wrapImageRow: {
        flexDirection: 'row'
    },
    // Three image area
    bottomWrapImageThree: {
        justifyContent: 'space-between',
        width: '100%',
        height: '39.5%'
    },
    // four image area
    bottomWrapImageFour: {
        justifyContent: 'space-between',
        width: '100%',
        height: '34.5%',
    },
    rightWrapImageFour: {
        justifyContent: 'space-between',
        height: '100%',
        width: '39.5%',
    },
    wrapImageFourSquare: {
        height: '49.5%',
        width: '100%'
    },
    wrapperLastImageButRemaining: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberImageRemaining: {
        zIndex: 999,
        position: 'absolute',
        color: COLOR_WHITE,
        fontSize: 35
    },
    marginRight: {
        marginRight: '0.5%'
    }
})

export default CustomizeImagePost
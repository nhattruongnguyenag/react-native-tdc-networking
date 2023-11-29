import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR_BTN_BLUE, COLOR_GREY, COLOR_GREY_FEEBLE, COLOR_WHITE } from '../constants/Color'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from '../constants/Variables'
import { TEXT_PLACEHOLDER_CREATE_ANY_POST, TYPE_NORMAL_POST_TEXT, TYPE_POST_FACULTY, TYPE_POST_STUDENT, TYPE_RECRUITMENT_POST_TEXT, TYPE_SURVEY_POST_TXT } from '../constants/StringVietnamese'
import DefaultAvatar from './common/DefaultAvatar'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useTranslation } from 'react-multi-lang'

export interface CreatePostToolbarType {
    role: string,
    image: string | null,
    name: string,
    handleClickToCreateButtonEvent: (type: string) => void,
    handleClickIntoAvatar: () => void
}

export default function CustomizeCreatePostToolbar(props: Readonly<CreatePostToolbarType>) {
    const [typeChoose, setTypeChoose] = useState(TYPE_NORMAL_POST);
    const t = useTranslation();
    const handleClickChooseTypePost = (typePost: string) => {
        setTypeChoose(typePost);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity
                        onPress={() => props.handleClickIntoAvatar()}
                    >
                        {
                            Boolean(props.image) ?
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: SERVER_ADDRESS + `api/images/${props.image}` }}
                                />
                                :
                                <DefaultAvatar
                                    identifer={props.name[0]}
                                    size={40}
                                />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity
                        onPress={() => props.handleClickToCreateButtonEvent(typeChoose)}
                        style={styles.wrapInput}>
                        <Text style={styles.txtInput}>
                            {
                                t("CreatePostSelector.createPostSelectorPlaceHolder")
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonChooseTypePost}>
                <TouchableOpacity
                    onPress={() => handleClickChooseTypePost(TYPE_SURVEY_POST)}
                    style={[typeChoose == TYPE_SURVEY_POST ? styles.activeButton : styles.unActiveButton, styles.button]}
                >
                    <FontAwesome5Icon
                        name='poll'
                        size={20}
                        color={typeChoose == TYPE_SURVEY_POST ? COLOR_WHITE : COLOR_GREY}
                    />
                    <Text
                        style={typeChoose == TYPE_SURVEY_POST ? styles.txtButtonChooseTypePostActive : styles.txtButtonChooseTypePostUnActive}
                    >{t("CreatePostSelector.createPostSelectorSurveyText")}</Text>
                </TouchableOpacity>
                {
                    (props.role === TYPE_POST_STUDENT || props.role === TYPE_POST_FACULTY) ?
                        null
                        : <TouchableOpacity
                            onPress={() => handleClickChooseTypePost(TYPE_RECRUITMENT_POST)}
                            style={[typeChoose == TYPE_RECRUITMENT_POST ? styles.activeButton : styles.unActiveButton, styles.button]}
                        >
                            <FontAwesomeIcon
                                name='shopping-bag'
                                size={20}
                                color={typeChoose == TYPE_RECRUITMENT_POST ? COLOR_WHITE : COLOR_GREY}
                            />
                            <Text
                                style={typeChoose == TYPE_RECRUITMENT_POST ? styles.txtButtonChooseTypePostActive : styles.txtButtonChooseTypePostUnActive}
                            >{t("CreatePostSelector.createPostSelectorRecruitmentText")}</Text>
                        </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => handleClickChooseTypePost(TYPE_NORMAL_POST)}
                    style={[typeChoose == TYPE_NORMAL_POST ? styles.activeButton : styles.unActiveButton, styles.button]}
                >
                    <IoniconsIcon
                        name='create' size={20}
                        color={typeChoose == TYPE_NORMAL_POST ? COLOR_WHITE : COLOR_GREY}
                    />
                    <Text
                        style={typeChoose == TYPE_NORMAL_POST ? styles.txtButtonChooseTypePostActive : styles.txtButtonChooseTypePostUnActive}
                    >{t("CreatePostSelector.createPostSelectorNormalText")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        borderBottomWidth: 2,
        borderColor: COLOR_GREY_FEEBLE
    },
    left: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width: '85%',
        justifyContent: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    wrapInput: {
        width: '90%',
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR_GREY_FEEBLE
    },
    txtInput: {
        paddingLeft: 5
    },
    buttonChooseTypePost: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    activeButton: {
        flexDirection: 'row',
        backgroundColor: COLOR_BTN_BLUE
    },
    unActiveButton: {
        flexDirection: 'row',
        backgroundColor: COLOR_GREY_FEEBLE
    },
    txtButtonChooseTypePostUnActive: {
        color: COLOR_GREY,
        paddingLeft: 5
    },
    txtButtonChooseTypePostActive: {
        color: COLOR_WHITE,
        paddingLeft: 5,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 5,
        marginRight: 10,
    }
})
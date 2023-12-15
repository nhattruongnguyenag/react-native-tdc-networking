
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTranslation } from 'react-multi-lang';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange, isPhone } from '../../../utils/ValidateUtils';
import ActionSheet from 'react-native-actionsheet';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Business } from '../../../types/Business';
import axios, { AxiosResponse } from 'axios';
import { Data } from '../../../types/Data';
import { Token } from '../../../types/Token';
import { SERVER_ADDRESS } from '../../../constants/SystemConstant';
import { Student } from '../../../types/Student';
import { Faculty } from '../../../types/Faculty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY, USER_LOGIN_KEY } from '../../../constants/KeyValue';
import { setUserLogin } from '../../../redux/Slice';
import TextInputWithTitle from '../../inputs/TextInputWithTitle';
import TextValidate from '../../common/TextValidate';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { COLOR_BTN_BLUE, COLOR_GREY } from '../../../constants/Color';
import ImagePicker from '../../ImagePicker';
import { Asset } from 'react-native-image-picker';
import { handleUploadImage } from '../../../utils/ImageHelper';



interface FacultyUpdate {
    name: InputTextValidate
    phone: InputTextValidate
    address: InputTextValidate
}

interface UpdateType {
    userData: any
    _navigation: NativeStackNavigationProp<ParamListBase>
}

const isAllFieldsValidFaculty = (validate: FacultyUpdate): boolean => {
    let key: keyof FacultyUpdate

    for (key in validate) {
        if (validate[key].isError) {
            return false
        }
    }

    return true
}

export function UpdateFaculty(props: Readonly<UpdateType>) {
    const t = useTranslation();
    const dispatch = useDispatch();
    const [passValidate, setPassValidate] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imagePicker, setImagePicker] = useState<Asset[] | null>(null);
    const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()

    const [faculty, setFaculty] = useState({
        id: props.userData?.id ?? 0,
        email: props.userData?.email ?? '',
        name: props.userData?.name ?? '',
        image: props.userData?.image ?? '',
        background: props.userData?.background ?? '',
        phone: props.userData?.phone ?? '',
    });

    useEffect(() => {
        setPhone(props.userData?.phone ?? "");
        setName(props.userData?.name ?? "");
        setFaculty({ ...faculty, image: props.userData?.image })
        props.userData?.image ? setImageAvatarTemporary(props.userData?.image) : setImageAvatarTemporary("");
    }, [props.userData]);

    const [validate, setValidate] = useState<FacultyUpdate>({
        name: {
            textError: t("Validate.validateNameNull"),
            isVisible: false,
            isError: true
        },
        phone: {
            textError: t("Validate.validatePhoneNull"),
            isVisible: false,
            isError: true
        },
        address: {
            textError: t("Validate.validateAddressNull"),
            isVisible: false,
            isError: false
        },
    })

    const handlePhoneChange = useCallback(
        (value: string) => {
            setPhone(value)
            return new Promise<void>((resolve) => {
                if (isBlank(value)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: true,
                            textError: t("Validate.validatePhoneNull"),
                            isVisible: true
                        }
                    }));
                    resolve();
                } else if (!isPhone(value)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: true,
                            textError: t("Validate.validatePhoneUnCorrectFormat"),
                            isVisible: true
                        }
                    }));
                    resolve();
                } else {
                    setFaculty((prevBusiness) => ({
                        ...prevBusiness,
                        phone: value
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: false,
                            isVisible: false
                        }
                    }));
                    resolve();
                }
            });
        },
        [validate]
    );

    const handleNameChange = useCallback(
        (value: string) => {
            setName(value)
            return new Promise<void>((resolve) => {
                if (isBlank(value)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: t("Validate.validateNameNull"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (isContainSpecialCharacter(value)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: t("Validate.validateNameSpecialCharacter"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(value, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: t("Validate.validateNameMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setFaculty((prevBusiness) => ({
                        ...prevBusiness,
                        name: value,
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: false,
                            isVisible: false,
                        },
                    }));
                    resolve();
                }
            });
        },
        [validate]
    );
    const showAlert = () => {
        Alert.alert(t("UpdateProfile.updateProfileAlertSuccess"));
    }

    useEffect(() => {
        if (Boolean(imagePicker)) {
            setIsUploadingImage(true);
        }
        handleUploadImage(imagePicker ?? [], (data) => {
            setFaculty({ ...faculty, image: imagePicker ? data[0] : imageAvatarTemporary })
            setIsUploadingImage(false)
        })
    }, [imagePicker, imageAvatarTemporary])

    const asyncForValidate = async () => {
        const validationPromises = [
            handlePhoneChange(phone),
            handleNameChange(name),
        ];
        await Promise.all(validationPromises);
    }

    const onSubmit = useCallback(async (faculty: any) => {
        setIsUploading(true);
        asyncForValidate();
        setPassValidate(!passValidate)
    }, [validate, imagePicker])

    useEffect(() => {
        if (isAllFieldsValidFaculty(validate)) {
            axios
                .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/faculty', faculty)
                .then((responseUpdate: any) => {
                    const token = responseUpdate.data.data.token;
                    axios
                        .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
                        .then((response) => {
                            if (response.status === 200 || response.status === 201) {
                                AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                                AsyncStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                                dispatch(setUserLogin(response.data.data))
                                setImagePicker([]);
                                props._navigation.pop(2);
                            } else {
                                showAlert();
                            }
                            setIsUploading(false);
                        })
                        .catch((error) => {
                            showAlert();
                            setIsUploading(false);
                        });
                })
                .catch((error) => {
                    showAlert();
                    setIsUploading(false);
                });
        } else {
            let key: keyof FacultyUpdate;
            for (key in validate) {
                if (validate[key].isError) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        [key]: {
                            ...prevValidate[key],
                            isVisible: true,
                        },
                    }));
                }
            }
            setIsUploading(false);
        }
    }, [passValidate])

    return (
        <ScrollView>
            <SafeAreaView>
                <View>
                    <TextInputWithTitle
                        defaultValue={name}
                        title={t("FacultyUpdate.facultyUpdateName")}
                        placeholder={t("FacultyUpdate.facultyUpdateNamePlaceholder")}
                        onChangeText={(value) => handleNameChange(value)}
                        textInputStyle={!validate.name?.isError ? styles.textInput : styles.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.name?.textError}
                        isError={validate.name?.isError}
                        isVisible={validate.name?.isVisible}
                    />
                    <TextInputWithTitle
                        defaultValue={phone}
                        title={t("Update.updatePhoneNumber")}
                        placeholder={t("Update.updatePhoneNumberPlaceholder")}
                        onChangeText={(value) => handlePhoneChange(value)}
                        textInputStyle={!validate.phone?.isError ? styles.textInput : styles.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.phone?.textError}
                        isError={validate.phone?.isError}
                        isVisible={validate.phone?.isVisible}
                    />
                    <View style={styles.group}>
                        <View style={styles.logo}>
                            <Text style={styles.txt}>{t("Update.updateAvatarTitle")}</Text>
                            <TouchableOpacity style={styles.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <ImagePicker
                                    optionsRef={(ref) => setImagePickerOption(ref)}
                                    onResult={(result) => {
                                        setImagePicker(result)
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {Boolean(imagePicker) ? (
                                <Image style={styles.img} source={{ uri: (imagePicker?.[0]?.uri) ?? '' }} />
                            ) : (
                                <Image style={styles.img} source={{ uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}` }} />
                            )}
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    disabled={isUploading || isUploadingImage}
                    style={[styles.btnRegister, (isUploading || isUploadingImage) ? styles.btnDisable : styles.btnAble]}
                    onPress={() => onSubmit(faculty)}
                >
                    {
                        isUploading && <ActivityIndicator size={25} color='white' style={styles.spinner} />
                    }
                    <Text style={styles.txtRegister}>{t("Update.updateProfileButtonTitle")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    header: { backgroundColor: COLOR_BTN_BLUE, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    txtHeader: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },

    group: {
        marginTop: 20,
        marginHorizontal: 10
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    ip: {
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#97A1B0',
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 10
    },
    btnRegister: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnAble: {
        backgroundColor: COLOR_BTN_BLUE,
    },
    btnDisable: {
        backgroundColor: COLOR_GREY,
    },
    txtRegister: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10
    },
    icon: {
        fontSize: 20,
        position: 'absolute',
        padding: 50,
        right: -20
    },
    icon1: {
        fontSize: 20
    },
    img: {
        width: 100,
        height: 100,
        marginTop: 10
    },
    error: {
        color: 'red',
        marginTop: 10,
        marginLeft: 10
    },
    btnImg: {
        marginRight: 30
    },

    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    textInput: {
        borderColor: '#228b22',
        borderWidth: 2
    },
    spinner: {
        position: 'absolute',
        left: '10%'
    }
})

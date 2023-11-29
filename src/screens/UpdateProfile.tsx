import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LOGIN_SCREEN } from '../constants/Screen'
import { COLOR_BTN_BLUE } from '../constants/Color'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { ActivityIndicator } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import {
    InputTextValidate,
    isBlank,
    isContainSpecialCharacter,
    isEmail,
    isLengthInRange,
    isPassword,
    isPhone,
    isTime,
    isType
} from '../utils/ValidateUtils'
import { Business } from '../types/Business';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Student } from '../types/Student';
import { Dropdown } from 'react-native-element-dropdown';
import { TEXT_UPDATE_PROFILE_ACTIVITY, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese';
import TextValidate from '../components/common/TextValidate';
import { Faculty } from '../types/Faculty';
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserLogin } from '../redux/Slice';
import { useTranslation } from 'react-multi-lang';
import { useDispatch } from 'react-redux';



const UpdateProfile = ({ route }: any) => {
    const { userData } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const handleIdentifyTypeUpdate = () => {
        switch (userData?.roleCodes) {
            case TYPE_POST_STUDENT:
                return <UpdateStudent userData={userData} _navigation={navigation} />
            case TYPE_POST_BUSINESS:
                return <UpdateBusiness userData={userData} _navigation={navigation} />
            case TYPE_POST_FACULTY:
                return <UpdateFaculty userData={userData} _navigation={navigation} />
            default:
                break;
        }
    }
    return (
        <View>
            {
                handleIdentifyTypeUpdate()
            }
        </View>
    )
}

const stylesBusiness = StyleSheet.create({
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
        backgroundColor: COLOR_BTN_BLUE,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
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
    }
})


export default UpdateProfile;

interface UpdateType {
    userData: any
    _navigation: NativeStackNavigationProp<ParamListBase>
}

// Business
interface BusinessUpdate {
    name: InputTextValidate
    email: InputTextValidate
    phone: InputTextValidate
    representor: InputTextValidate
    taxCode: InputTextValidate
    address: InputTextValidate
    activeTime: InputTextValidate
}

const isAllFieldsValidBusiness = (validate: BusinessUpdate): boolean => {
    let key: keyof BusinessUpdate

    for (key in validate) {
        if (validate[key].isError) {
            return false
        }
    }

    return true
}

export function UpdateBusiness(props: Readonly<UpdateType>) {
    const t = useTranslation();
    const dispatch = useDispatch();
    let submit = 0;
    const [passValidate, setPassValidate] = useState(false);
    const [timeStart, setTimeStart] = useState(props.userData?.activeTime.split("-")[0])
    const [timeEnd, setTimeEnd] = useState(props.userData?.activeTime.split("-")[1])
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [representor, setRepresentor] = useState('');
    const [taxCode, setTaxCode] = useState('');
    const [address, setAddress] = useState('');
    const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
    // const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');

    const [business, setBusiness] = useState({
        id: props.userData?.id ?? 0,
        email: props.userData?.email ?? '',
        name: props.userData?.name ?? '',
        image: props.userData?.image ?? '',
        background: props.userData?.background ?? '',
        representor: props.userData?.representor ?? '',
        taxCode: props.userData?.taxCode ?? '',
        address: props.userData?.address ?? '',
        activeTime: props.userData?.activeTime ?? '',
        phone: props.userData?.phone ?? '',
    });

    useEffect(() => {
        // Faculty
        setPhone(props.userData?.phone ?? "");
        setEmail(props.userData?.email ?? "");
        // Business
        setName(props.userData?.name ?? "");
        setRepresentor(props.userData?.representor ?? "");
        setTaxCode(props.userData?.taxCode ?? "");
        setAddress(props.userData?.address ?? "");
        setBusiness({ ...business, image: props.userData?.image })
        props.userData?.image ? setImageAvatarTemporary(props.userData?.image) : setImageAvatarTemporary("");
        // props.userData?.background ? setImageBackgroundTemporary(props.userData?.avatar) : setImageBackgroundTemporary("");
    }, [props.userData]);

    const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
    const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)

    const [validate, setValidate] = useState<BusinessUpdate>({
        name: {
            textError: t("Validate.validateNameNull"),
            isVisible: false,
            isError: true
        },
        representor: {
            textError: t("Validate.validatePresentorNull"),
            isVisible: false,
            isError: true
        },
        email: {
            textError: t("Validate.validateEmailNull"),
            isVisible: false,
            isError: true
        },
        taxCode: {
            textError: t("Validate.validateTaxCodeNull"),
            isVisible: false,
            isError: true
        },
        address: {
            textError: t("Validate.validateAddressNull"),
            isVisible: false,
            isError: true
        },
        phone: {
            textError: t("Validate.validatePhoneNull"),
            isVisible: false,
            isError: true
        },
        activeTime: {
            textError: t("Validate.validateNameTimeActiveUnCorrect"),
            isVisible: false,
            isError: true
        }
    })
    const [showDatePickerStart, setShowDatePickerStart] = useState<boolean>(false)
    const [showDatePickerEnd, setShowDatePickerEnd] = useState<boolean>(false)
    const timeStartRef = useRef<TextInput | null>(null)
    const timeEndRef = useRef<TextInput | null>(null)

    const handleCheckEmail = useCallback(() => {
        axios
            .post(SERVER_ADDRESS + `api/users/check?email=${business.email}`)
            .then((response) => {
                if (response.data.data == 0) {
                    setValidate({
                        ...validate,
                        email: {
                            ...validate.email,
                            isError: true,
                            textError: t("Validate.validateEmailHadUsed"),
                            isVisible: true
                        }
                    })
                }
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [business.email])

    const handleEmailChange = useCallback(
        (event: string) => {
            setEmail(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailNull")
                        }
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailHasMaxLength")
                        }
                    }));
                    resolve();
                } else if (!isEmail(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailUnCorrectFormat")
                        }
                    }));
                    resolve();
                } else {
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        email: event
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
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

    const handlePhoneChange = useCallback(
        (event: string) => {
            setPhone(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (!isPhone(event)) {
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
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        phone: event
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
        (event: string) => {
            setName(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (isContainSpecialCharacter(event)) {
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
                } else if (!isLengthInRange(event, 1, 255)) {
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
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        name: event,
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

    const handleRepresentoreChange = useCallback(
        (event: string) => {
            setRepresentor(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        representor: {
                            ...prevValidate.representor,
                            isError: true,
                            textError: t("Validate.validatePresentorNull"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (isContainSpecialCharacter(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        representor: {
                            ...prevValidate.representor,
                            isError: true,
                            textError: t("Validate.validateRepresentorSpecialCharacter"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        representor: {
                            ...prevValidate.representor,
                            isError: true,
                            textError: t("Validate.validateRepresentorMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        representor: event,
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        representor: {
                            ...prevValidate.representor,
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

    const handleTaxCodeChange = useCallback(
        (event: string) => {
            setTaxCode(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        taxCode: {
                            ...prevValidate.taxCode,
                            isError: true,
                            textError: t("Validate.validateTaxCodeNull"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        taxCode: {
                            ...prevValidate.taxCode,
                            isError: true,
                            textError: t("Validate.validateTaxCodeMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isType(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        taxCode: {
                            ...prevValidate.taxCode,
                            isError: true,
                            textError: t("Validate.validateTaxCodeFormat"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        taxCode: event,
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        taxCode: {
                            ...prevValidate.taxCode,
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

    const handleAddressChange = useCallback(
        (event: string) => {
            setAddress(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        address: {
                            ...prevValidate.address,
                            isError: true,
                            textError: t("Validate.validateAddressNull"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        address: {
                            ...prevValidate.address,
                            isError: true,
                            textError: t("Validate.validateAddressMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setBusiness((prevBusiness) => ({
                        ...prevBusiness,
                        address: event,
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        address: {
                            ...prevValidate.address,
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
    // Dont focus
    useEffect(() => {
        if (!isTime(timeStart, timeEnd)) {
            setValidate({
                ...validate,
                activeTime: {
                    ...validate.activeTime,
                    isError: true,
                    textError: t("Validate.validateNameTimeActiveUnCorrect"),
                    isVisible: true
                }
            })
        } else {
            setBusiness({ ...business, activeTime: timeStart + '-' + timeEnd })
            setValidate({
                ...validate,
                activeTime: {
                    ...validate.activeTime,
                    isError: false,
                    isVisible: false
                }
            })
        }
    }, [timeStart, timeEnd])
    // Dont focus
    useEffect(() => {
        setBusiness({ ...business, image: imagesUpload ? imagesUpload[0] : imageAvatarTemporary })
        // background dont have backend side
        // setBusiness({ ...business, background: imagesUpload ? imagesUpload[0] : '' })
    }, [imagesUpload])

    const showAlert = () => {
        Alert.alert("Cập nhật thất bại vui lòng thử lại")
    }

    useEffect(() => {
        setBusiness({ ...business, image: imagesUpload ? imagesUpload[0] : imageAvatarTemporary })
    }, [imagesUpload, imageAvatarTemporary])

    const asyncForValidate = async () => {
        const validationPromises = [
            handleEmailChange(email),
            handlePhoneChange(phone),
            handleAddressChange(address),
            handleTaxCodeChange(taxCode),
            handleRepresentoreChange(representor),
            handleNameChange(name),
        ];
        await Promise.all(validationPromises);
    }

    const onSubmit = useCallback(async (business: any) => {
        asyncForValidate();
        setPassValidate(!passValidate)
    }, [validate, imagesUpload])

    useEffect(() => {
        if (isAllFieldsValidBusiness(validate)) {
            axios
                .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business', business)
                .then((responseUpdate: any) => {
                    const token = responseUpdate.data.data.token;
                    axios
                        .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
                        .then((response) => {
                            if (response.status === 200 || response.status === 201) {
                                AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                                AsyncStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                                dispatch(setUserLogin(response.data.data))
                                props._navigation.pop(2);
                            } else {
                                showAlert();
                            }
                        })
                        .catch((error) => {
                            showAlert();
                        });
                })
                .catch((error) => {
                    showAlert();
                });
        } else {
            let key: keyof BusinessUpdate;
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
        }
    }, [passValidate])
    return (
        <ScrollView>
            <SafeAreaView>
                <View>
                    <TextInputWithTitle
                        value={name}
                        title={t("BusinessUpdate.businessUpdateCompanyName")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyNamePlaceholder")}
                        onChangeText={(value) => handleNameChange(value)}
                        textInputStyle={!validate.name?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.name?.textError}
                        isError={validate.name?.isError}
                        isVisible={validate.name?.isVisible}
                    />
                    <TextInputWithTitle
                        value={email}
                        title={t("BusinessUpdate.businessUpdateEmail")}
                        placeholder={t("BusinessUpdate.businessUpdateEmailPlaceholder")}
                        onChangeText={(value) => handleEmailChange(value)}
                        onBlur={() => handleCheckEmail()}
                        textInputStyle={!validate.email?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.email?.textError}
                        isError={validate.email?.isError}
                        isVisible={validate.email?.isVisible}
                    />
                    <TextInputWithTitle
                        value={representor}
                        title={t("BusinessUpdate.businessUpdateRepresentorFullName")}
                        placeholder={t("BusinessUpdate.businessUpdateRepresentorFullNamePlaceholder")}
                        onChangeText={(value) => handleRepresentoreChange(value)}
                        textInputStyle={!validate.representor?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.representor?.textError}
                        isError={validate.representor?.isError}
                        isVisible={validate.representor?.isVisible}
                    />

                    <TextInputWithTitle
                        value={taxCode}
                        title={t("BusinessUpdate.businessUpdateCompanyTaxId")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyTaxIdPlaceholder")}
                        onChangeText={(value) => handleTaxCodeChange(value)}
                        textInputStyle={!validate.taxCode?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.taxCode?.textError}
                        isError={validate.taxCode?.isError}
                        isVisible={validate.taxCode?.isVisible}
                    />

                    <TextInputWithTitle
                        value={address}
                        title={t("BusinessUpdate.businessUpdateCompanyAddress")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyAddressPlaceholder")}
                        onChangeText={(value) => handleAddressChange(value)}
                        textInputStyle={!validate.address?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.address?.textError}
                        isError={validate.address?.isError}
                        isVisible={validate.address?.isVisible}
                    />
                    <TextInputWithTitle
                        value={phone}
                        title={t("BusinessUpdate.businessUpdateCompanyPhoneNumber")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyPhoneNumberPlaceholder")}
                        onChangeText={(value) => handlePhoneChange(value)}
                        textInputStyle={!validate.phone?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.phone?.textError}
                        isError={validate.phone?.isError}
                        isVisible={validate.phone?.isVisible}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ width: '45%' }}>
                            <TextInputWithTitle
                                value={timeStart}
                                textInputRef={timeStartRef}
                                onFocus={() => {
                                    setShowDatePickerStart(true)
                                }}
                                textInputStyle={!validate.activeTime?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                                title={t("BusinessUpdate.businessUpdateCompanyTimeActiveStart")}
                                placeholder={moment().format('HH:mm')}
                            />
                            <DatePicker
                                modal
                                mode='time'
                                locale='vi'
                                open={showDatePickerStart}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setTimeStart(moment(time).format('HH:mm'))
                                    timeStartRef.current?.blur()
                                    setShowDatePickerStart(false)
                                }}
                                onCancel={() => {
                                    timeStartRef.current?.blur()
                                    setShowDatePickerStart(false)
                                }}
                            />
                        </View>
                        <View style={{ width: '45%' }}>
                            <TextInputWithTitle
                                value={timeEnd}
                                textInputRef={timeEndRef}
                                onFocus={() => {
                                    setShowDatePickerEnd(true)
                                }}
                                textInputStyle={!validate.activeTime?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                                title={t("BusinessUpdate.businessUpdateCompanyTimeActiveEnd")}
                                placeholder={moment().format('HH:mm')}
                            />

                            <DatePicker
                                modal
                                mode='time'
                                locale='vi'
                                open={showDatePickerEnd}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setTimeEnd(moment(time).format('HH:mm'))
                                    timeEndRef.current?.blur()
                                    setShowDatePickerEnd(false)
                                }}
                                onCancel={() => {
                                    timeEndRef.current?.blur()
                                    setShowDatePickerEnd(false)
                                }}
                            />
                        </View>
                    </View>
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.activeTime?.textError}
                        isError={validate.activeTime?.isError}
                        isVisible={validate.activeTime?.isVisible}
                    />
                    <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>{t("BusinessUpdate.businessUpdateCompanyAvatar")}</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center'}}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload[0]}` }} />
                            ) : (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}` }} />
                            )}
                        </View>
                    </View>
                    {/* Background */}
                    {/* <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>Ảnh bìa</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
                            ) : (
                                ''
                            )}
                        </View>
                    </View> */}
                </View>

                <TouchableOpacity style={stylesBusiness.btnRegister} onPress={() => onSubmit(business)}>
                    <Text style={stylesBusiness.txtRegister}>{t("BusinessUpdate.businessUpdateCompanyButton")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

// Faculty
interface FacultyUpdate {
    name: InputTextValidate
    email: InputTextValidate
    phone: InputTextValidate
    address: InputTextValidate
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

export function UpdateFaculty(props: UpdateType) {
    const t = useTranslation();
    const dispatch = useDispatch();
    const [passValidate, setPassValidate] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
    // const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');

    const [faculty, setFaculty] = useState({
        id: props.userData?.id ?? 0,
        email: props.userData?.email ?? '',
        name: props.userData?.name ?? '',
        image: props.userData?.image ?? '',
        background: props.userData?.background ?? '',
        phone: props.userData?.phone ?? '',
    });

    useEffect(() => {
        // Faculty
        setPhone(props.userData?.phone ?? "");
        setEmail(props.userData?.email ?? "");
        // Business
        setName(props.userData?.name ?? "");
        setFaculty({ ...faculty, image: props.userData?.image })
        props.userData?.image ? setImageAvatarTemporary(props.userData?.image) : setImageAvatarTemporary("");
        // props.userData?.background ? setImageBackgroundTemporary(props.userData?.avatar) : setImageBackgroundTemporary("");
    }, [props.userData]);


    const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
    const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)

    const [validate, setValidate] = useState<FacultyUpdate>({
        name: {
            textError: 'Tên không được để trống',
            isVisible: false,
            isError: true
        },
        email: {
            textError: 'Email không được để trống',
            isVisible: false,
            isError: true
        },
        phone: {
            textError: 'Số điện thoại không được để trống',
            isVisible: false,
            isError: true
        },
        address: {
            textError: 'Địa chỉ không được để trống',
            isVisible: false,
            isError: false
        },

    })

    const handleCheckEmail = useCallback(() => {
        axios
            .post(SERVER_ADDRESS + `api/users/check?email=${faculty.email}`)
            .then((response) => {
                if (response.data.data == 0) {
                    setValidate({
                        ...validate,
                        email: {
                            ...validate.email,
                            isError: true,
                            textError: t("Validate.validateEmailHadUsed"),
                            isVisible: true
                        }
                    })
                }
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [faculty.email])

    const handleEmailChange = useCallback(
        (event: string) => {
            setEmail(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailNull")
                        }
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailHasMaxLength")
                        }
                    }));
                    resolve();
                } else if (!isEmail(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailUnCorrectFormat")
                        }
                    }));
                    resolve();
                } else {
                    setFaculty((prevBusiness) => ({
                        ...prevBusiness,
                        email: event
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
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

    const handlePhoneChange = useCallback(
        (event: string) => {
            setPhone(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (!isPhone(event)) {
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
                        phone: event
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
        (event: string) => {
            setName(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (isContainSpecialCharacter(event)) {
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
                } else if (!isLengthInRange(event, 1, 255)) {
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
                        name: event,
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
        Alert.alert("Cập nhật thất bại vui lòng thử lại")
    }

    useEffect(() => {
        setFaculty({ ...faculty, image: imagesUpload ? imagesUpload[0] : imageAvatarTemporary })
    }, [imagesUpload, imageAvatarTemporary])

    const asyncForValidate = async () => {
        const validationPromises = [
            handleEmailChange(email),
            handlePhoneChange(phone),
            handleNameChange(name),
        ];
        await Promise.all(validationPromises);
    }

    const onSubmit = useCallback(async (faculty: any) => {
        asyncForValidate();
        setPassValidate(!passValidate)
    }, [validate, imagesUpload])

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
                                props._navigation.pop(2);
                            } else {
                                showAlert();
                            }
                        })
                        .catch((error) => {
                            showAlert();
                        });
                })
                .catch((error) => {
                    showAlert();
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
        }
    }, [passValidate])
    return (
        <ScrollView>
            <SafeAreaView>
                <View>
                    <TextInputWithTitle
                        value={name}
                        title={t("BusinessUpdate.businessUpdateCompanyName")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyNamePlaceholder")}
                        onChangeText={(value) => handleNameChange(value)}
                        textInputStyle={!validate.name?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.name?.textError}
                        isError={validate.name?.isError}
                        isVisible={validate.name?.isVisible}
                    />
                    <TextInputWithTitle
                        value={email}
                        title={t("BusinessUpdate.businessUpdateEmail")}
                        placeholder={t("BusinessUpdate.businessUpdateEmailPlaceholder")}
                        onChangeText={(value) => handleEmailChange(value)}
                        onBlur={() => handleCheckEmail()}
                        textInputStyle={!validate.email?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.email?.textError}
                        isError={validate.email?.isError}
                        isVisible={validate.email?.isVisible}
                    />
                    <TextInputWithTitle
                        value={phone}
                        title={t("BusinessUpdate.businessUpdateCompanyPhoneNumber")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyPhoneNumberPlaceholder")}
                        onChangeText={(value) => handlePhoneChange(value)}
                        textInputStyle={!validate.phone?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.phone?.textError}
                        isError={validate.phone?.isError}
                        isVisible={validate.phone?.isVisible}
                    />
                    <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>{t("BusinessUpdate.businessUpdateCompanyAvatar")}</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
                            ) : (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}` }} />
                            )}
                        </View>
                    </View>
                    {/* Background */}
                    {/* <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>Ảnh bìa</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
                            ) : (
                                ''
                            )}
                        </View>
                    </View> */}
                </View>

                <TouchableOpacity style={stylesBusiness.btnRegister} onPress={() => onSubmit(faculty)}>
                    <Text style={stylesBusiness.txtRegister}>{t("BusinessUpdate.businessUpdateCompanyButton")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

// Student
interface StudentUpdate {
    name: InputTextValidate
    email: InputTextValidate
    phone: InputTextValidate
    address: InputTextValidate
}

const isAllFieldsValidStudent = (validate: StudentUpdate): boolean => {
    let key: keyof StudentUpdate

    for (key in validate) {
        if (validate[key].isError) {
            return false
        }
    }

    return true
}

export function UpdateStudent(props: Readonly<UpdateType>) {
    const t = useTranslation();
    const dispatch = useDispatch();
    const [passValidate, setPassValidate] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
    // const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');

    const [student, setStudent] = useState({
        id: props.userData?.id ?? 0,
        email: props.userData?.email ?? '',
        name: props.userData?.name ?? '',
        image: props.userData?.image ?? '',
        background: props.userData?.background ?? '',
        phone: props.userData?.phone ?? '',
        studentCode: props.userData?.studentCode
    });

    useEffect(() => {
        // Faculty
        setPhone(props.userData?.phone ?? "");
        setEmail(props.userData?.email ?? "");
        // Business
        setName(props.userData?.name ?? "");
        setStudent({ ...student, image: props.userData?.image })
        props.userData?.image ? setImageAvatarTemporary(props.userData?.image) : setImageAvatarTemporary("");
        // props.userData?.background ? setImageBackgroundTemporary(props.userData?.avatar) : setImageBackgroundTemporary("");
    }, [props.userData]);


    const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
    const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)


    const [validate, setValidate] = useState<StudentUpdate>({
        name: {
            textError: t("Validate.validateNameNull"),
            isVisible: false,
            isError: true
        },
        email: {
            textError: t("Validate.validateEmailNull"),
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

    const handleCheckEmail = useCallback(() => {
        axios
            .post(SERVER_ADDRESS + `api/users/check?email=${student.email}`)
            .then((response) => {
                if (response.data.data == 0) {
                    setValidate({
                        ...validate,
                        email: {
                            ...validate.email,
                            isError: true,
                            textError: t("Validate.validateEmailHadUsed"),
                            isVisible: true
                        }
                    })
                }
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [student.email])

    const handleEmailChange = useCallback(
        (event: string) => {
            setEmail(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailNull")
                        }
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailHasMaxLength")
                        }
                    }));
                    resolve();
                } else if (!isEmail(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
                            isError: true,
                            isVisible: true,
                            textError: t("Validate.validateEmailUnCorrectFormat")
                        }
                    }));
                    resolve();
                } else {
                    setStudent((prevBusiness) => ({
                        ...prevBusiness,
                        email: event
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        email: {
                            ...prevValidate.email,
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

    const handlePhoneChange = useCallback(
        (event: string) => {
            setPhone(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (!isPhone(event)) {
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
                    setStudent((prevBusiness) => ({
                        ...prevBusiness,
                        phone: event
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
        (event: string) => {
            setName(event)
            return new Promise<void>((resolve) => {
                if (isBlank(event)) {
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
                } else if (isContainSpecialCharacter(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: t("Validate.validateNameHasSpecialCharacter"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: t("Validate.validateNameHasMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setStudent((prevBusiness) => ({
                        ...prevBusiness,
                        name: event,
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
        Alert.alert("Cập nhật thất bại vui lòng thử lại")
    }

    useEffect(() => {
        setStudent({ ...student, image: imagesUpload ? imagesUpload[0] : imageAvatarTemporary })
    }, [imagesUpload, imageAvatarTemporary])

    const asyncForValidate = async () => {
        const validationPromises = [
            handleEmailChange(email),
            handlePhoneChange(phone),
            handleNameChange(name),
        ];
        await Promise.all(validationPromises);
    }

    const onSubmit = useCallback(async (student: any) => {
        asyncForValidate();
        setPassValidate(!passValidate)
    }, [validate, imagesUpload])

    useEffect(() => {
        if (isAllFieldsValidStudent(validate)) {
            axios
                .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student', student)
                .then((responseUpdate: any) => {
                    const token = responseUpdate.data.data.token;
                    axios
                        .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
                        .then((response) => {
                            if (response.status === 200 || response.status === 201) {
                                AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                                AsyncStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                                dispatch(setUserLogin(response.data.data))
                                props._navigation.pop(2);
                            } else {
                                showAlert();
                            }
                        })
                        .catch((error) => {
                            showAlert();
                        });
                })
                .catch((error) => {
                    showAlert();
                });
        } else {
            let key: keyof StudentUpdate;
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
        }
    }, [passValidate])
    return (
        <ScrollView>
            <SafeAreaView>
                <View>
                    <TextInputWithTitle
                        value={name}
                        title={t("BusinessUpdate.businessUpdateCompanyName")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyNamePlaceholder")}
                        onChangeText={(value) => handleNameChange(value)}
                        textInputStyle={!validate.name?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.name?.textError}
                        isError={validate.name?.isError}
                        isVisible={validate.name?.isVisible}
                    />
                    <TextInputWithTitle
                        value={email}
                        title={t("BusinessUpdate.businessUpdateEmail")}
                        placeholder={t("BusinessUpdate.businessUpdateEmailPlaceholder")}
                        onChangeText={(value) => handleEmailChange(value)}
                        onBlur={() => handleCheckEmail()}
                        textInputStyle={!validate.email?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />
                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.email?.textError}
                        isError={validate.email?.isError}
                        isVisible={validate.email?.isVisible}
                    />
                    <TextInputWithTitle
                        value={phone}
                        title={t("BusinessUpdate.businessUpdateCompanyPhoneNumber")}
                        placeholder={t("BusinessUpdate.businessUpdateCompanyPhoneNumberPlaceholder")}
                        onChangeText={(value) => handlePhoneChange(value)}
                        textInputStyle={!validate.phone?.isError ? stylesBusiness.textInput : stylesBusiness.ip}
                    />

                    <TextValidate
                        customStyle={{ marginLeft: 10 }}
                        textError={validate.phone?.textError}
                        isError={validate.phone?.isError}
                        isVisible={validate.phone?.isVisible}
                    />
                    <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>{t("BusinessUpdate.businessUpdateCompanyAvatar")}</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
                            ) : (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}` }} />
                            )}
                        </View>
                    </View>
                    {/* Background */}
                    {/* <View style={stylesBusiness.group}>
                        <View style={stylesBusiness.logo}>
                            <Text style={stylesBusiness.txt}>Ảnh bìa</Text>
                            <TouchableOpacity style={stylesBusiness.btnImg} onPress={() => imagePickerOption?.show()}>
                                <Icon name='camera-retro' size={20}></Icon>
                                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {imagesUpload ? (
                                <Image style={stylesBusiness.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
                            ) : (
                                ''
                            )}
                        </View>
                    </View> */}
                </View>

                <TouchableOpacity style={stylesBusiness.btnRegister} onPress={() => onSubmit(student)}>
                    <Text style={stylesBusiness.txtRegister}>{t("BusinessUpdate.businessUpdateCompanyButton")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

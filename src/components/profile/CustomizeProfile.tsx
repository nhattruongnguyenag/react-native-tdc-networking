import CustomizeHeaderProfile from './CustomizeHeaderProfile'
import { StyleSheet, View } from 'react-native'
import { COLOR_WHITE } from '../../constants/Color'
import CustomizeBodyFacultyProfile from './CustomizeBodyFacultyProfile'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/Variables'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeBodyBusinessProfile from './CustomizeBodyBusinessProfile'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useAppSelector } from '../../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../../utils/GetFacultyTranslated '
import { memo } from 'react'

export interface CustomizeProfileType {
    isFollow: boolean
    data: Object[]
    role: string
    userData: any
    handleClickButtonEvent: (a: number) => void
    handleClickIntoHeaderComponentEvent: (a: number) => void
}

const CustomizeProfile = (props: CustomizeProfileType) => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { userLogin, conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const getBody = () => {
        let body;
        switch (props.role) {
            case TYPE_POST_STUDENT:
                body = <CustomizeBodyStudentProfile
                    t={t}
                    isFollow={props.isFollow}
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    position={t("Profile.profileRole") ?? t("Profile.unUpdate")}
                    phone={props.userData.phone ?? t("Profile.unUpdate")}
                    email={props.userData.email ?? t("Profile.unUpdate")}
                    numberPost={props.data ? props.data.length : 0}
                    name={getFacultyTranslated(props.userData.name, t) ?? t("Profile.unUpdate")}
                    isSameUser={props.userData?.id === userLogin?.id}
                />
                break;
            case TYPE_POST_BUSINESS:
                body = <CustomizeBodyBusinessProfile
                    t={t}
                    isFollow={props.isFollow}
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.activeTime ?? t("Profile.unUpdate")}
                    TaxIdentificationNumber={props.userData.taxCode ?? t("Profile.unUpdate")}
                    representor={props.userData.representor ?? t("Profile.unUpdate")}
                    address={props.userData.address ?? t("Profile.unUpdate")}
                    phone={props.userData.phone ?? t("Profile.unUpdate")}
                    email={props.userData.email ?? t("Profile.unUpdate")}
                    name={getFacultyTranslated(props.userData.name, t) ?? t("Profile.unUpdate")}
                    numberPost={props.data ? props.data.length : 0}
                    isSameUser={props.userData?.id === userLogin?.id}
                />
                break;
            case TYPE_POST_FACULTY:
                body = <CustomizeBodyFacultyProfile
                    t={t}
                    isFollow={props.isFollow}
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    phone={props.userData.phone ?? t("Profile.unUpdate")}
                    email={props.userData.email ?? t("Profile.unUpdate")}
                    name={getFacultyTranslated(props.userData.name, t) ?? t("Profile.unUpdate")}
                    numberPost={props.data ? props.data.length : 0}
                    isSameUser={props.userData?.id === userLogin?.id}
                />
                break;
            default:
                break;
        }
        return body
    }

    return (
        <View>
            {
                props.userData && <View style={styles.container}>
                    <CustomizeHeaderProfile
                        isSameUser={props.userData?.id === userLogin?.id}
                        background={props.userData.background}
                        avatar={props.userData.image}
                        name={getFacultyTranslated(props.userData.name, t)}
                        handleClickIntoHeaderComponentEvent={
                            props.handleClickIntoHeaderComponentEvent
                        } />
                    {
                        getBody()
                    }
                </View >
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        marginBottom: 1,
    },

})

export default memo(CustomizeProfile)
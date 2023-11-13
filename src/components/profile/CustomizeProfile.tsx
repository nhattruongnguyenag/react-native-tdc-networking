import CustomizeHeaderProfile from './CustomizeHeaderProfile'
import { StyleSheet, View } from 'react-native'
import { COLOR_WHITE } from '../../constants/Color'
import CustomizeBodyFacultyProfile from './CustomizeBodyFacultyProfile'
import { TEXT_UN_UPDATE, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeBodyBusinessProfile from './CustomizeBodyBusinessProfile'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

export interface CustomizeProfileType {
    data: Object[]
    role: string
    userData: any
    handleClickButtonEvent: (a: number) => void
    handleClickIntoHeaderComponentEvent: (a: number) => void
}

const CustomizeProfile = (props: CustomizeProfileType) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const getBody = () => {
        let body;
        switch (props.role) {
            case TYPE_POST_STUDENT:
                body = <CustomizeBodyStudentProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    position={props.userData.position ?? TEXT_UN_UPDATE}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    numberPost={props.data.length ?? 0}
                    name={props.userData.name ?? TEXT_UN_UPDATE} />
                break;
            case TYPE_POST_BUSINESS:
                body = <CustomizeBodyBusinessProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? TEXT_UN_UPDATE}
                    TaxIdentificationNumber={props.userData.TaxIdentificationNumber ?? TEXT_UN_UPDATE}
                    representative={props.userData.representative ?? TEXT_UN_UPDATE}
                    address={props.userData.address ?? TEXT_UN_UPDATE}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    name={props.userData.name}
                    numberPost={props.data.length ?? 0} />
                break;
            case TYPE_POST_FACULTY:
                body = <CustomizeBodyFacultyProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? TEXT_UN_UPDATE}
                    address={props.userData.address ?? TEXT_UN_UPDATE}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    name={props.userData.name ?? TEXT_UN_UPDATE}
                    numberPost={props.data.length ?? 0} />
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
                        background={props.userData.image}
                        avatar={props.userData.image}
                        name={props.userData.name}
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

export default CustomizeProfile
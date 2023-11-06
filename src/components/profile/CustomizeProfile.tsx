import CustomizeHeaderProfile from './CustomizeHeaderProfile'
import { StyleSheet, View } from 'react-native'
import { COLOR_WHITE } from '../../constants/Color'
import CustomizeBodyFacultyProfile from './CustomizeBodyFacultyProfile'
import { TEXT_UN_UPDATE, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeBodyBusinessProfile from './CustomizeBodyBusinessProfile'
import { CALL_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND } from '../../constants/Variables'

export interface CustomizeProfileType {
    data: Object[]
    role: string
    userData: any
}

const CustomizeProfile = (props: CustomizeProfileType) => {
    // Variable
    let body;
    // Function
    const handleClickButtonEvent = (flag: number) => {
        if (flag === MESSENGER_ACTION) {
            console.log('chat');
        } else if (flag === FOLLOW_ACTION) {
            console.log('follow');
        } else if (flag === CALL_ACTION) {
            console.log('call');
        } else {
            console.log('menu');
        }
    }

    const handleClickIntoHeaderComponentEvent = (flag: number) => {
        switch (flag) {
            case CLICK_CAMERA_AVATAR_EVENT:
                console.log('CLICK_CAMERA_AVATAR_EVENT');
                break;
            case CLICK_CAMERA_BACKGROUND_EVENT:
                console.log('CLICK_CAMERA_BACKGROUND_EVENT');
                break;
            case SEE_AVATAR:
                console.log('SEE_AVATAR');
                break;
            case SEE_BACKGROUND:
                console.log('SEE_BACKGROUND');
                break;
            default:
                break;
        }
    }

    switch (props.role) {
        case TYPE_POST_STUDENT:
            body = <CustomizeBodyStudentProfile
                handleClickButtonEvent={handleClickButtonEvent}
                position={props.userData.position ?? TEXT_UN_UPDATE}
                phone={props.userData.phone ?? TEXT_UN_UPDATE}
                email={props.userData.email ?? TEXT_UN_UPDATE}
                numberPost={props.data.length ?? 0}
                name={props.userData.name ?? TEXT_UN_UPDATE} />
            break;
        case TYPE_POST_BUSINESS:
            body = <CustomizeBodyBusinessProfile
                handleClickButtonEvent={handleClickButtonEvent}
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
                handleClickButtonEvent={handleClickButtonEvent}
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

    return (
            <View style={styles.container}>
                <CustomizeHeaderProfile
                    background={'https://tramhoa.com/wp-content/uploads/2022/09/bo-hoa-huong-duong-dep2-2.jpg'}
                    avatar={props.userData.image}
                    name={props.userData.name}
                    handleClickIntoHeaderComponentEvent={
                        handleClickIntoHeaderComponentEvent
                    } />
                {
                    body
                }
            </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        marginBottom: 1,
    },

})

export default CustomizeProfile
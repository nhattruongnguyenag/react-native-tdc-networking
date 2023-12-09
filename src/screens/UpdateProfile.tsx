import React from 'react'
import { View } from 'react-native'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/Variables';
import { UpdateStudent } from '../components/update/updateProfile/UpdateStudent';
import { UpdateBusiness } from '../components/update/updateProfile/BusinessUpdate';
import { UpdateFaculty } from '../components/update/updateProfile/UpdateFaculty';



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

export default UpdateProfile;
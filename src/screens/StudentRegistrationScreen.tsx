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
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LOGIN_SCREEN } from '../constants/Screen'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { Student } from '../types/Student'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { ActivityIndicator } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useAppSelector } from '../redux/Hook'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword
} from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'

// man hinh dang ky danh cho sinh vien
export default function StudentRegistrationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin, imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [student, setStudent] = useState<
    Omit<Student, 'status' | 'roleCodes' | 'createdAt' | 'updatedAt' | 'isTyping' | 'isMessageConnect'>
  >({
    id: 0,
    password: '',
    code: Date.now().toString(),
    email: '',
    name: '',
    image: '',
    facultyName: '',
    major: '',
    studentCode: '',
    confimPassword: ''
  })
  const [dataRequest, setDataRequest] = useState([
    {
      id: '',
      name: '',
      majors: [
        {
          id: '',
          name: ''
        }
      ]
    }
  ])
  const datas = [{ id: '', name: '' }]
  const [dataNganhRequest, setDataNganhRequest] = useState([{ id: '', name: '' }])
  const [isLoading, setIsLoading] = useState(false)
  const [studentNameValidate, setStudentNameValidate] = useState<InputTextValidate>({
    textError: 'Tên sinh viên không được để trống',
    isVisible: false,
    isError: true
  })
  const [studentCodeValidate, setStudentCodeValidate] = useState<InputTextValidate>({
    textError: 'Mã số sinh viên không được để trống',
    isVisible: false,
    isError: true
  })
  const [emailValidate, setEmailValidate] = useState<InputTextValidate>({
    textError: 'Email không được để trống',
    isVisible: false,
    isError: true
  })
  const [facultyNameValidate, setFacultyNameValidate] = useState<InputTextValidate>({
    textError: 'Tên khoa không được để trống',
    isVisible: false,
    isError: true
  })
  const [majorValidate, setMajorValidate] = useState<InputTextValidate>({
    textError: 'Tên ngành không được để trống',
    isVisible: false,
    isError: true
  })
  const [passwordValidate, setPasswordValidate] = useState<InputTextValidate>({
    textError: 'Mật khẩu không được để trống',
    isVisible: false,
    isError: true
  })
  const [confirmPasswordValidate, setConfirmPasswordValidate] = useState<InputTextValidate>({
    textError: 'Nhập lại mật khẩu không được để trống',
    isVisible: false,
    isError: true
  })
  const [value, setValue] = useState('')
  const [item, setItem] = useState('')
  const [isCheck, setCheck] = useState({
    secureTextEntry: true
  })
  const [isCheck1, setCheck1] = useState({
    secureTextEntry: true
  })
  const onCheck = () => {
    setCheck({
      secureTextEntry: !isCheck.secureTextEntry
    })
  }
  const onCheck1 = () => {
    setCheck1({
      secureTextEntry: !isCheck1.secureTextEntry
    })
  }
  const handleStudentNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, name: value })
      if (isBlank(value)) {
        setStudentNameValidate({
          ...studentNameValidate,
          isError: true,
          textError: 'Tên sinh viên không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setStudentNameValidate({
          ...studentNameValidate,
          isError: true,
          textError: 'Tên sinh viên không được chứa ký tự đặc biệt'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setStudentNameValidate({
          ...studentNameValidate,
          isError: true,
          textError: 'Tên sinh viên không vượt quá 255 ký tự'
        })
      } else {
        setStudentNameValidate({
          ...studentNameValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.name, studentCodeValidate]
  )
  const handleStudentCodeChange = useCallback(
    (value: string) => {
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/)
      setStudent({ ...student, studentCode: value })
      if (isBlank(value)) {
        setStudentCodeValidate({
          ...studentCodeValidate,
          isError: true,
          textError: 'Mã số sinh viên không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setStudentCodeValidate({
          ...studentCodeValidate,
          isError: true,
          textError: 'Mã số sinh viên không được chứa ký tự đặc biệt'
        })
      } else if (!stCode.test(value)) {
        setStudentCodeValidate({
          ...studentCodeValidate,
          isError: true,
          textError: 'Mã sinh viên không đúng định dạng'
        })
      } else if (!isLengthInRange(value, 1, 12)) {
        setStudentCodeValidate({
          ...studentCodeValidate,
          isError: true,
          textError: 'Mã sinh viên không vượt quá 255 ký tự'
        })
      } else {
        setStudentCodeValidate({
          ...studentCodeValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.studentCode, studentCodeValidate]
  )
  const handleEmailChange = useCallback(
    (value: string) => {
      setStudent({ ...student, email: value })
      if (isBlank(value)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email không vượt quá 255 ký tự'
        })
      } else if (!isEmail(value)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email sai định dạng'
        })
      } else {
        setEmailValidate({
          ...emailValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.email, emailValidate]
  )
  const handlePasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, password: value })
      if (isBlank(value)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu không vượt quá 8 ký tự'
        })
      } else if (!isPassword(value)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu sai định dạng'
        })
      } else {
        setPasswordValidate({
          ...passwordValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.password, passwordValidate]
  )
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, confimPassword: value })
      if (isBlank(value)) {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: true,
          textError: 'Trường nhập lại mật khẩu không được để trống'
        })
      } else if (student.confimPassword == student.password) {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: true,
          textError: 'Mật khẩu không đúng'
        })
      } else {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.confimPassword, confirmPasswordValidate]
  )
  const handleMajorNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, major: value })
      if (isBlank(value)) {
        setMajorValidate({
          ...majorValidate,
          isError: true,
          textError: 'Tên khoa không được để trống'
        })
      } else {
        setMajorValidate({
          ...majorValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.major, majorValidate]
  )
  const handleFacultyNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, facultyName: value })
      if (isBlank(value)) {
        setFacultyNameValidate({
          ...facultyNameValidate,
          isError: true,
          textError: 'Tên khoa không được để trống'
        })
      } else {
        setFacultyNameValidate({
          ...facultyNameValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [student.facultyName, facultyNameValidate]
  )
  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        datas.shift()
        setDataRequest(response.data.data)
        dataRequest.map((data) => {
          data.majors.map((item) => {
            datas.push(item)
          })
        })
        setDataNganhRequest(datas)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student])

  useEffect(() => {
    setStudent({ ...student, image: imagesUpload ? imagesUpload[0] : '' })
  }, [imagesUpload])

  const isCheckValidate = useMemo(() => {
    return (
      !studentNameValidate.isError &&
      !studentCodeValidate.isError &&
      !emailValidate.isError &&
      !facultyNameValidate.isError &&
      !majorValidate.isError &&
      !passwordValidate.isError &&
      !confirmPasswordValidate.isError
    )
  }, [
    studentNameValidate,
    studentCodeValidate,
    emailValidate,
    majorValidate,
    facultyNameValidate,
    passwordValidate,
    confirmPasswordValidate,
    student
  ])
  const onSubmit = useCallback(() => {
    if (isCheckValidate) {
      setIsLoading(true)
      axios
        .post<Student, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student/register', student)
        .then((response) => {
          console.log(response.status)
          Alert.alert('Đăng ký thành công', 'Thành công')
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
          setIsLoading(false)
        })
    } else if (studentNameValidate.isError) {
      setStudentNameValidate({ ...studentNameValidate, isVisible: true })
    } else if (studentCodeValidate.isError) {
      setStudentCodeValidate({ ...studentCodeValidate, isVisible: true })
    } else if (emailValidate.isError) {
      setEmailValidate({ ...emailValidate, isVisible: true })
    } else if (facultyNameValidate.isError) {
      setFacultyNameValidate({ ...facultyNameValidate, isVisible: true })
    } else if (majorValidate.isError) {
      setMajorValidate({ ...majorValidate, isVisible: true })
    } else if (passwordValidate.isError) {
      setPasswordValidate({ ...passwordValidate, isVisible: true })
    } else if (confirmPasswordValidate.isError) {
      setConfirmPasswordValidate({ ...confirmPasswordValidate, isVisible: true })
    }
  }, [student])

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity style={{ left: -100 }} onPress={() => navigation.goBack()}>
            <Icon name='chevron-left' size={20} color={'#ffff'} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtHeader}>Đăng ký sinh viên</Text>
          </View>
        </View>

        <View style={styles.form}>
          <TextInputWithTitle
            title='Họ tên'
            placeholder='Nhập họ tên...'
            onFocus={() => setStudentNameValidate({ ...studentNameValidate, isVisible: true })}
            onChangeText={(value) => handleStudentNameChange(value)}
            textInputStyle={!studentNameValidate.isError? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={studentNameValidate.textError}
            isError={studentNameValidate.isError}
            isVisible={studentNameValidate.isVisible}
          />

          <TextInputWithTitle
            title='Mã số sinh viên'
            placeholder='Nhập mã số sinh viên...'
            onFocus={() => setStudentCodeValidate({ ...studentCodeValidate, isVisible: true })}
            onChangeText={(value) => handleStudentCodeChange(value)}
            textInputStyle={!studentCodeValidate.isError? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={studentCodeValidate.textError}
            isError={studentCodeValidate.isError}
            isVisible={studentCodeValidate.isVisible}
          />

          <TextInputWithTitle
            title='Email sinh viên'
            placeholder='Nhập email sinh viên...'
            onFocus={() => setEmailValidate({ ...emailValidate, isVisible: true })}
            onChangeText={(value) => handleEmailChange(value)}
            textInputStyle={!emailValidate.isError? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={emailValidate.textError}
            isError={emailValidate.isError}
            isVisible={emailValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Khoa</Text>
            <Dropdown
              style={[styles.dropdown, {borderColor: !facultyNameValidate.isError ? '#228b22' : '#97A1B0'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataRequest}
              search
              labelField='name'
              valueField='id'
              placeholder='Chọn khoa...'
              searchPlaceholder='Tìm kiếm...'
              value={value}
              onFocus={() => setFacultyNameValidate({ ...facultyNameValidate, isVisible: true })}
              onChange={(item) => {
                setValue(item.id)
                handleFacultyNameChange(item.name)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={facultyNameValidate.textError}
            isError={facultyNameValidate.isError}
            isVisible={facultyNameValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Ngành học</Text>
            <Dropdown
              style={[styles.dropdown, {borderColor: !majorValidate.isError ? '#228b22' : '#97A1B0'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataNganhRequest}
              search
              labelField='name'
              valueField='id'
              placeholder='Chọn ngành học...'
              searchPlaceholder='Tìm kiếm...'
              value={item}
              onFocus={() => setMajorValidate({ ...majorValidate, isVisible: true })}
              onChange={(item) => {
                setItem(item.id)
                handleMajorNameChange(item.name)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={majorValidate.textError}
            isError={majorValidate.isError}
            isVisible={majorValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              placeholder='Nhập mật khẩu đăng ký...'
              style={[styles.ip, {borderColor: !passwordValidate.isError ? '#228b22' : '#97A1B0'}]}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onFocus={() => setPasswordValidate({ ...passwordValidate, isVisible: true })}
              onChangeText={(value) => handlePasswordChange(value)}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              <Icon name={!isCheck.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={passwordValidate.textError}
            isError={passwordValidate.isError}
            isVisible={passwordValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Nhập lại mật khẩu</Text>
            <TextInput
              placeholder='Nhập lại mật khẩu...'
              style={[styles.ip, {borderColor: !confirmPasswordValidate.isError ? '#228b22' : '#97A1B0'}]}
              secureTextEntry={isCheck1.secureTextEntry ? true : false}
              onFocus={() => setConfirmPasswordValidate({ ...confirmPasswordValidate, isVisible: true })}
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />

            <TouchableOpacity style={styles.icon} onPress={() => onCheck1()}>
              <Icon name={!isCheck1.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={confirmPasswordValidate.textError}
            isError={confirmPasswordValidate.isError}
            isVisible={confirmPasswordValidate.isVisible}
          />

          <View style={styles.group}>
            <View style={styles.logo}>
              <Text style={styles.txt}>Ảnh đại diện</Text>
              <TouchableOpacity style={styles.btnImg} onPress={() => imagePickerOption?.show()}>
                <Icon name='camera-retro' size={20}></Icon>
                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              {imagesUpload ? (
                <Image style={styles.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
              ) : (
                ''
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnRegister} onPress={() => onSubmit()}>
          <Text style={styles.txtRegister}>Đăng ký tài khoản</Text>
          <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
        </TouchableOpacity>
        <View style={styles.login}>
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN)
            }}
          >
            <Text style={{ color: COLOR_BTN_BLUE, fontWeight: 'bold' }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  form: { marginTop: 10 },
  group: {
    marginTop: 20,
    marginHorizontal: 10
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  },
  ip: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  btnRegister: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginTop: 30,
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

  dropdown: {
    height: 50,
    borderColor: '#97A1B0',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000'
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
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10
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

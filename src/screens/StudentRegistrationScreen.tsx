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
import AsyncStorage from '@react-native-async-storage/async-storage'
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

interface RegisterStudent {
  name: InputTextValidate
  email: InputTextValidate
  studentCode: InputTextValidate
  major: InputTextValidate
  facultyName: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterStudent): boolean => {
  let key: keyof RegisterStudent

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}
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

  const [dataNganhRequest, setDataNganhRequest] = useState([{ id: '', name: '' }])
  const [isLoading, setIsLoading] = useState(false)
  const [validate, setValidate] = useState<RegisterStudent>({
    name: {
      textError: 'Tên sinh viên không được để trống',
      isVisible: false,
      isError: true
    },
    email: {
      textError: 'Email không được để trống',
      isVisible: false,
      isError: true
    },
    studentCode: {
      textError: 'Mã số sinh viên không được để trống',
      isVisible: false,
      isError: true
    },
    facultyName: {
      textError: 'Tên khoa không được để trống',
      isVisible: false,
      isError: true
    },
    major: {
      textError: 'Tên ngành không được để trống',
      isVisible: false,
      isError: true
    },
    password: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: 'Nhập lại mật khẩu không được để trống',
      isVisible: false,
      isError: true
    }
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
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên sinh viên không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: 'Tên sinh viên không được chứa ký tự đặc biệt',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: 'Tên sinh viên không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleStudentCodeChange = useCallback(
    (value: string) => {
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/)
      setStudent({ ...student, studentCode: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã số sinh viên không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã số sinh viên không được chứa ký tự đặc biệt'
          }
        })
      } else if (!stCode.test(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã sinh viên không đúng định dạng'
          }
        })
      } else if (!isLengthInRange(value, 1, 12)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã sinh viên không vượt quá 255 ký tự'
          }
        })
      } else {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleEmailChange = useCallback(
    (value: string) => {
      setStudent({ ...student, email: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email không được để trống'
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email không vượt quá 255 ký tự'
          }
        })
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email sai định dạng'
          }
        })
      } else {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handlePasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, password: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không được để trống'
          }
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không vượt quá 8 ký tự'
          }
        })
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu sai định dạng'
          }
        })
      } else {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, confimPassword: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: 'Trường nhập lại mật khẩu không được để trống'
          }
        })
      } else if (value != student.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không đúng'
          }
        })
      } else {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: false,
            isError: false
          }
        })
      }
    },
    [validate]
  )
  const handleMajorNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, major: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: true,
            isVisible: true,
            textError: 'Tên khoa không được để trống'
          }
        })
      } else {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleFacultyNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, facultyName: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isVisible: true,
            isError: true,
            textError: 'Tên khoa không được để trống'
          }
        })
      } else {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data)
        dataRequest.map((data) => {
          if (data.name === student.facultyName) {
            setDataNganhRequest(data.majors)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student])

  useEffect(() => {
    setStudent({ ...student, image: imagesUpload ? imagesUpload[0] : '' })
  }, [imagesUpload])

  const onSubmit = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      setIsLoading(true)
      axios
        .post<Student, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student/register', student)
        .then((response) => {
          setIsLoading(false)
          navigation.navigate(LOGIN_SCREEN)
        })
        .catch((error) => {
          console.log(error)
          Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
          setIsLoading(false)
        })
    } else {
      let key: keyof RegisterStudent

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }, [validate])

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
            value={student.name}
            title='Họ tên'
            placeholder='Nhập họ tên...'
            onChangeText={(value) => handleStudentNameChange(value)}
            textInputStyle={!validate.name?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />

          <TextInputWithTitle
            value={student.studentCode}
            title='Mã số sinh viên'
            placeholder='Nhập mã số sinh viên...'
            onChangeText={(value) => handleStudentCodeChange(value)}
            textInputStyle={!validate.studentCode?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.studentCode?.textError}
            isError={validate.studentCode?.isError}
            isVisible={validate.studentCode?.isVisible}
          />

          <TextInputWithTitle
            value={student.email}
            title='Email sinh viên'
            placeholder='Nhập email sinh viên...'
            onChangeText={(value) => handleEmailChange(value)}
            textInputStyle={!validate.email?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.email?.textError}
            isError={validate.email?.isError}
            isVisible={validate.email?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Khoa</Text>
            <Dropdown
              style={[styles.dropdown, { borderColor: !validate.facultyName?.isError ? '#228b22' : '#97A1B0' }]}
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
              onChange={(item) => {
                setValue(item.id)
                handleFacultyNameChange(item.name)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.facultyName?.textError}
            isError={validate.facultyName?.isError}
            isVisible={validate.facultyName?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Ngành học</Text>
            <Dropdown
              placeholder='Chọn ngành học...'
              style={[styles.dropdown, { borderColor: !validate.major?.isError ? '#228b22' : '#97A1B0' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataNganhRequest}
              search
              labelField='name'
              valueField='id'
              searchPlaceholder='Tìm kiếm...'
              value={item}
              onChange={(item) => {
                setItem(item.id)
                handleMajorNameChange(item.name)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.major?.textError}
            isError={validate.major?.isError}
            isVisible={validate.major?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              value={student.password}
              placeholder='Nhập mật khẩu đăng ký...'
              style={[styles.ip, { borderColor: !validate.password?.isError ? '#228b22' : '#97A1B0' }]}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onChangeText={(value) => handlePasswordChange(value)}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              <Icon name={!isCheck.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.password?.textError}
            isError={validate.password?.isError}
            isVisible={validate.password?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Nhập lại mật khẩu</Text>
            <TextInput
              value={student.confimPassword}
              placeholder='Nhập lại mật khẩu...'
              style={[styles.ip, { borderColor: !validate.confimPassword?.isError ? '#228b22' : '#97A1B0' }]}
              secureTextEntry={isCheck1.secureTextEntry ? true : false}
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />

            <TouchableOpacity style={styles.icon} onPress={() => onCheck1()}>
              <Icon name={!isCheck1.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.confimPassword?.textError}
            isError={validate.confimPassword?.isError}
            isVisible={validate.confimPassword?.isVisible}
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

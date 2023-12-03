import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../../constants/Color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CustomizeBodyPost from '../post/CustomizeBodyPost'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

interface RecruitmentPostType {
  id: number
  textButton: string
  title: string
  description: string
  handleClickBtnSeeDetailEvent: (id: number) => void
}

const ICON_SIZE = 15;
export default function CustomizeSurveyPost(props: Readonly<RecruitmentPostType>) {

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <CustomizeBodyPost content={props.description} />
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => props.handleClickBtnSeeDetailEvent(props.id)}>
            <View style={styles.bottomButton}>
              <Text style={styles.txtBtn}>{props.textButton}</Text>
              <FeatherIcon name='chevrons-right' size={ICON_SIZE} color={COLOR_WHITE} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  containerSurvey: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLOR_WHITE
  },
  leftContainer: {
    width: '15%',
  },
  rightContainer: {
    width: '85%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: 'bold',
    color: COLOR_BLACK,
    fontSize: 16,
    width: '95%',
  },
  menu: {
    width: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  textTypePost: {
    backgroundColor: COLOR_SUCCESS,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemType: {
    color: COLOR_WHITE,
    fontWeight: '300',
    fontSize: 14,
  },
  rightContainerBottom: {
    width: '95%',
  },
  rightContainerBottom3Info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE_BANNER,
    padding: 6,
    alignItems: 'center',
    borderRadius: 5,
  },
  item: {
    marginVertical: 2,
    color: COLOR_BLACK,
    fontWeight: "bold",
  },
  address: {
    color: COLOR_GREY
  },
  rightContainerTopTitle: {
    flexDirection: 'row',
  },
  contentContainer: {
  },
  title: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15
  },
  txtBtn: {
    color: COLOR_WHITE,
    paddingRight: 5,
  }
})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../../constants/Color'
import { formatVietNamCurrency } from '../../utils/FormatCurrency'
import { numberDayPassed } from '../../utils/FormatTime'
import { TEXT_SEE_DETAIL } from '../../constants/StringVietnamese'
import CustomizeHeaderPost from '../post/CustomizeHeaderPost'
import { TYPE_RECRUITMENT_POST_TEXT } from '../../constants/Variables'

export interface RecruitmentPostType {
  id: number,
  typeAuthor: string | null,
  role: string,
  createdAt: string,
  image: string,
  name: string,
  type: string,
  location: string,
  title: string,
  expiration: string,
  salary: string,
  employmentType: string,
  handleClickBtnSeeDetailEvent: (id: number) => void
  handleClickIntoAvatarAndNameAndMenuEvent: (id: number) => void
}
// Constant
const ICON_SIZE = 15;
export default function CustomizeRecruitmentPost(props: RecruitmentPostType) {

  return (
    <View>
      <CustomizeHeaderPost
        name={props.name}
        avatar={props.image}
        typeAuthor={TYPE_RECRUITMENT_POST_TEXT}
        available={null}
        timeCreatePost={''}
        type={props.type}
        role={props.role}
        handleClickIntoAvatarAndNameAndMenuEvent={props.handleClickIntoAvatarAndNameAndMenuEvent}
      />
      <View style={styles.containerContentRecruitment}>
        <View style={styles.leftContainer}>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.rightContainerTopTitle}>
          </View>
          <View style={styles.rightContainerBottom}>
            <View style={[styles.rowAndCenter, styles.item]}>
              <FontAwesome6Icon name='map-location-dot' size={ICON_SIZE} color={COLOR_GREY} /><Text style={styles.address}>{' '}{props.location}</Text>
            </View>
            <Text style={[styles.item, styles.careerTitle]}>{props.title}</Text>
            <View style={styles.rightContainerBottom3Info}>
              <View style={[styles.rowAndCenter, styles.item]}>
                <AntDesignIcon name='clockcircleo' size={ICON_SIZE} color={COLOR_GREY} />
                <Text style={styles.timeCreated}>{' '}{numberDayPassed(props.createdAt)}</Text>
              </View>

              <View style={styles.rowAndCenter}>
                <FontAwesome6Icon name='money-bill-1' size={ICON_SIZE} color={COLOR_GREY} />
                <Text style={styles.salary}>{' '}{formatVietNamCurrency(props.salary)}{' '}vnd/ Tháng</Text>
              </View>

              <View style={styles.rowAndCenter}>
                <FontAwesome6Icon name='bag-shopping' size={ICON_SIZE} color={COLOR_GREY} />
                <Text>{' '}{props.employmentType}</Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => props.handleClickBtnSeeDetailEvent(props.id)}>
              <View style={styles.bottomButton}>
                <Text style={styles.txtBtnSeeMore}>{TEXT_SEE_DETAIL}</Text>
                <FeatherIcon style={styles.iconArrow} name='chevrons-right' size={ICON_SIZE} color={COLOR_WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerContentRecruitment: {
    width: '100%',
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
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
    width: '95%',
    fontWeight: 'bold',
    color: COLOR_BLACK,
    fontSize: 16,
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
  rightContainerBottom: {
    width: '95%',
  },
  rightContainerBottom3Info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE_BANNER,
    padding: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: '32%',
    borderRadius: 5
  },
  item: {
    marginVertical: 2,
  },
  address: {
    color: COLOR_GREY,
    paddingLeft: 5,
  },
  careerTitle: {
    color: COLOR_GREY
  },
  timeCreated: {
    color: COLOR_GREY,
  },
  salary: {
    color: COLOR_GREY
  },
  typeCareer: {
    color: COLOR_GREY
  },
  rightContainerTopTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  itemType: {
    color: COLOR_WHITE,
    fontWeight: '300',
    fontSize: 14,
  },
  iconArrow: {
    paddingLeft: 2,
  },
  txtBtnSeeMore: {
    color: COLOR_WHITE
  }
})
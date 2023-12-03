import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../../constants/Color'
import { formatVietNamCurrency } from '../../utils/FormatCurrency'
import { numberDayPassed } from '../../utils/FormatTime'

interface RecruitmentPostType {
  id: number
  createdAt: string
  location: string
  title: string
  salary: string
  employmentType: string
  current: string
  textButton: string
  handleClickBtnSeeDetailEvent: (id: number) => void
}
// Constant
const ICON_SIZE = 15;
export default function CustomizeRecruitmentPost(props: Readonly<RecruitmentPostType>) {
  return (
    <View>
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
                <Text style={styles.salary}>{' '}{formatVietNamCurrency(props.salary)}{' '}{props.current}</Text>
              </View>

              <View style={styles.rowAndCenter}>
                <FontAwesome6Icon name='bag-shopping' size={ICON_SIZE} color={COLOR_GREY} />
                <Text>{' '}{props.employmentType}</Text>
              </View>
            </View>
          </View>
          <View>
            <View>
              <TouchableOpacity
                onPress={() => props.handleClickBtnSeeDetailEvent(props.id)}
                style={{ flexDirection: 'row' }} 
              >
                <View style={styles.bottomButton}>
                  <Text style={styles.txtBtnSeeMore}>{props.textButton}</Text>
                  <FeatherIcon
                    style={styles.iconArrow}
                    name='chevrons-right'
                    size={ICON_SIZE}
                    color={COLOR_WHITE}
                  />
                </View>
              </TouchableOpacity>
            </View>

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
    marginTop: 10,
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
    marginTop:10,
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
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
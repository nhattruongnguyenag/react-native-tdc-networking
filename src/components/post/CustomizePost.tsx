import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { COLOR_WHITE } from '../../constants/Color'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeImagePost from './CustomizeImagePost'
import { Post } from '../../types/Post'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { openModalComments, openModalImage, openModalUserReaction, updatePostWhenHaveChangeComment } from '../../redux/Slice'
import { Like } from '../../types/Like'
import { LikeAction } from '../../types/LikeActions'
import {
  CLICK_DELETE_POST_EVENT,
  CLICK_SAVE_POST_EVENT,
  CLICK_SEE_LIST_CV_POST_EVENT,
  CLICK_SEE_RESULT_POST_EVENT,
  COMMENT_ACTION,
  GO_TO_PROFILE_ACTIONS,
  LIKE_ACTION,
  SHOW_LIST_USER_REACTED,
  TYPE_NORMAL_POST,
  TYPE_RECRUITMENT_POST,
  TYPE_RECRUITMENT_POST_TEXT,
  TYPE_SURVEY_POST,
  TYPE_SURVEY_POST_TXT
} from '../../constants/Variables'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import { numberDayPassed } from '../../utils/FormatTime'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PROFILE_SCREEN, RECRUITMENT_DETAIL_SCREEN, SURVEY_CONDUCT_SCREEN } from '../../constants/Screen'
import { RootStackParamList } from '../../App'
import { savePostAPI } from '../../api/CallApi'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import Toast from 'react-native-toast-message'
import { TEXT_NOTIFICATION_SAVE_SUCCESS, TEXT_NOTIFYCATIONS } from '../../constants/StringVietnamese'

export const NUM_OF_LINES = 5
export const HEADER_ICON_SIZE = 15
const CustomizePost = (props: Post) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  let post = props
  const { userLogin, userIdOfProfileNow, currentScreenNowIsProfileScreen } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()

  const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
    if (flag === GO_TO_PROFILE_ACTIONS) {
      if (userIdOfProfileNow !== post.userId) {
        if (currentScreenNowIsProfileScreen) {
          navigation.replace(PROFILE_SCREEN, { userId: post.userId, group: post.group })
        } else {
          navigation.navigate(PROFILE_SCREEN, { userId: post.userId, group: post.group })
        }
      }
    } else {
      console.log('show menu')
    }
  }

  const handleClickIntoAnyImageEvent = (imageId: number, listImageError: number[]) => {
    dispatch(
      openModalImage({
        group: post.group,
        name: props.name,
        userId: props.userId,
        imageIdClicked: imageId,
        avatar: props.avatar,
        images: props.images,
        listImageError: listImageError
      })
    )
  }

  const handleClickBottomBtnEvent = async (flag: number | null) => {
    if (flag === LIKE_ACTION) {
      handleClickIntoBtnIconLikeEvent()
    } else if (flag === COMMENT_ACTION) {
      handleClickIntoBtnIconComments()
    } else if (flag === SHOW_LIST_USER_REACTED) {
      handleClickIntoListUserReactions()
    }
  }

  const handleClickIntoListUserReactions = () => {
    dispatch(
      openModalUserReaction({
        group: post.group,
        likes: props.likes
      })
    )
  }

  const handleClickIntoBtnIconLikeEvent = async () => {
    const dataLike: LikeAction = {
      code: '',
      postId: post.id,
      userId: userLogin?.id ?? 0
    }
    props.likeAction(dataLike)
  }

  const checkLiked = (likes: Like[], userId: number | undefined) => {
    let result = false
    likes.some((item: any) => {
      if (item.id === userId) {
        result = true
      }
    })
    return result
  }

  const handleClickIntoBtnIconComments = () => {
    dispatch(
      openModalComments({
        id: props.id,
        group: post.group,
        commentFather: []
      })
    )
  }

  const handleClickBtnSurveyDetailEvent = (idPost: number) => {
    navigation.navigate(SURVEY_CONDUCT_SCREEN, { surveyPostId: idPost })
  }

  const handleClickBtnRecruitmentDetailEvent = (idPost: number) => {
    navigation.navigate(RECRUITMENT_DETAIL_SCREEN, { postId: idPost })
  }

  const showToast = (status: number) => {
    if (status === 201) {
      Toast.show({
        type: 'success',
        text1: TEXT_NOTIFYCATIONS,
        text2: TEXT_NOTIFICATION_SAVE_SUCCESS
      });
    } else if (status === 400) {
      Toast.show({
        type: 'error',
        text1: TEXT_NOTIFYCATIONS,
        text2: TEXT_NOTIFICATION_SAVE_SUCCESS
      });
    } else {
      Toast.show({
        type: 'warning',
        text1: TEXT_NOTIFYCATIONS,
        text2: TEXT_NOTIFICATION_SAVE_SUCCESS
      });
    }
  }

  const handleClickMenuOption = (flag: number) => {
    switch (flag) {
      case CLICK_SAVE_POST_EVENT:
        handleSavePost();
        break
      case CLICK_DELETE_POST_EVENT:
        handleSavePost();
        break
      case CLICK_SEE_LIST_CV_POST_EVENT:
        handleSeeListCvPost();
        break
      case CLICK_SEE_RESULT_POST_EVENT:
        handleSeeResultSurveyPost();
        break
      default:
        return '';
    }
  }

  const handleSavePost = async () => {
    const data = {
      "userId": userLogin?.id,
      "postId": post.id
    }
    const status = await savePostAPI(SERVER_ADDRESS + 'api/posts/user/save', data);
    updatePostData();
  }

  const handleSeeListCvPost = () => {
    console.log('====================================');
    console.log('handleSeeListCvPost' + post.id);
    console.log('====================================');
  }

  const handleSeeResultSurveyPost = () => {
    console.log('====================================');
    console.log('handleSeeResultSurveyPost' + post.id);
    console.log('====================================');
  }

  const updatePostData = () => {
    dispatch(updatePostWhenHaveChangeComment(true))
  }

  switch (post.type) {
    case TYPE_NORMAL_POST:
      return (
        <View style={styles.container}>
          <CustomizeHeaderPost
            userId={post.userId}
            name={post.name}
            avatar={post.avatar}
            available={post.available}
            timeCreatePost={numberDayPassed(post.timeCreatePost)}
            typeAuthor={post.typeAuthor}
            type={post.type}
            role={post.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={post.isSave}
          />
          <View style={styles.bodyWrap}>
            <CustomizeBodyPost content={post.content} />
          </View>
          {post.images && post.images.length > 0 && (
            <CustomizeImagePost
              images={post.images}
              handleClickIntoAnyImageEvent={handleClickIntoAnyImageEvent}
            />
          )}
          <CustomizeBottomPost
            isLike={checkLiked(post.likes, userLogin?.id)}
            likes={post.likes}
            handleClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={post.commentQty}
          />
        </View>
      )
    case TYPE_RECRUITMENT_POST:
      return (
        <View style={styles.container}>
          <CustomizeHeaderPost
            userId={post.userId}
            name={post.name}
            avatar={post.avatar}
            typeAuthor={TYPE_RECRUITMENT_POST_TEXT}
            available={null}
            timeCreatePost={''}
            type={post.type}
            role={post.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={post.isSave}
          />
          <CustomizeRecruitmentPost
            id={post.id}
            location={post.location ?? ''}
            title={post.title ?? ''}
            salary={post.salary ?? ''}
            employmentType={post.employmentType ?? ''}
            handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
            createdAt={props.timeCreatePost}
          />
          <CustomizeBottomPost
            isLike={checkLiked(post.likes, userLogin?.id)}
            likes={post.likes}
            handleClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={post.commentQty}
          />
        </View>
      )
    case TYPE_SURVEY_POST:
      return <View style={styles.container}>
        <CustomizeHeaderPost
          userId={post.userId}
          name={post.name}
          avatar={post.avatar}
          typeAuthor={TYPE_SURVEY_POST_TXT}
          available={null}
          timeCreatePost={numberDayPassed(post.timeCreatePost)}
          type={post.type}
          role={post.role}
          handleClickMenuOption={handleClickMenuOption}
          handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          isSave={post.isSave} />
        <CustomizeSurveyPost
          id={post.id}
          title={post.title ?? ''}
          handleClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
          description={props.description ?? ''}
        />
        <CustomizeBottomPost
          isLike={checkLiked(post.likes, userLogin?.id)}
          likes={post.likes}
          handleClickBottomBtnEvent={handleClickBottomBtnEvent}
          commentQty={post.commentQty}
        />
      </View>
    default:
      return null
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: COLOR_WHITE,
    marginBottom: 20
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 300
  },
  bodyWrap: {
    marginVertical: 10
  },
})
export default CustomizePost

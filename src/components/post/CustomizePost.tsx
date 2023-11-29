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
  CLICK_UN_SAVE_POST,
  COMMENT_ACTION,
  GO_TO_PROFILE_ACTIONS,
  LIKE_ACTION,
  SHOW_LIST_USER_REACTED,
  TYPE_NORMAL_POST,
  TYPE_RECRUITMENT_POST,
  TYPE_SURVEY_POST,
} from '../../constants/Variables'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import { numberDayPassed } from '../../utils/FormatTime'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LIST_JOB_APPLY_SCREEN, PROFILE_SCREEN, RECRUITMENT_DETAIL_SCREEN, SURVEY_CONDUCT_SCREEN, SURVEY_RESULT_SCREEN } from '../../constants/Screen'
import { RootStackParamList } from '../../App'
import { TEXT_NOTIFICATION_SAVE_SUCCESS, TEXT_NOTIFYCATIONS, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_RECRUITMENT_POST_TEXT, TYPE_SURVEY_POST_TXT } from '../../constants/StringVietnamese'
import Toast from 'react-native-toast-message';
import { ToastMessenger } from '../../utils/ToastMessenger'
import { formatVietNamCurrency } from '../../utils/FormatCurrency'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../../utils/getFacultyTranslated '

export const NUM_OF_LINES = 5
export const HEADER_ICON_SIZE = 15
const CustomizePost = (props: Post) => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  let post = props
  const { userLogin, userIdOfProfileNow, currentScreenNowIsProfileScreen } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
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
        listImageError: listImageError,
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
    console.log(JSON.stringify(props));
    dispatch(
      openModalComments({
        id: props.id,
        userCreatedPostId:props.userId,
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

  const handleClickMenuOption = (flag: number) => {
    console.log(flag)
    switch (flag) {
      case CLICK_SAVE_POST_EVENT:
        post.handleUnSave(post.id);
        break
      case CLICK_DELETE_POST_EVENT:
        post.handleDelete(post.id);
        break
      case CLICK_UN_SAVE_POST:
        post.handleUnSave(post.id);
        break;
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

  const handleSeeListCvPost = () => {
    navigation.navigate(LIST_JOB_APPLY_SCREEN, { postId: post.id })
  }

  const handleSeeResultSurveyPost = () => {
    navigation.navigate(SURVEY_RESULT_SCREEN, { surveyPostId: post.id })
  }

  // Tam  thoi
  const updatePostData = () => {
    dispatch(updatePostWhenHaveChangeComment(true))
  }

  const handleIdentifyTypeAuthor = (type: string) => {
    if (type == TYPE_POST_FACULTY) {
      return t("Post.normalPostIdentifyAuthorFaculty")
    } else if (type == TYPE_POST_BUSINESS) {
      return t("Post.normalPostIdentifyAuthorCompany")
    } else {
      return null;
    }
  }

  switch (post.type) {
    case TYPE_NORMAL_POST:
      return (
        <View style={styles.container}>
          <CustomizeHeaderPost
            t={t}
            userId={props.userId}
            name={getFacultyTranslated(props.name, t)}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={numberDayPassed(props.timeCreatePost)}
            typeAuthor={handleIdentifyTypeAuthor(props.typeAuthor ?? '')}
            type={props.type}
            role={props.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={props.isSave}
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
            textLikeBy={t("Post.normalPostLikeBy")}
          />
        </View>
      )
    case TYPE_RECRUITMENT_POST:
      return (
        <View style={styles.container}>
          <CustomizeHeaderPost
            t={t}
            userId={props.userId}
            name={getFacultyTranslated(props.name, t)}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={numberDayPassed(props.timeCreatePost)}
            typeAuthor={t("RecruitmentPost.recruitmentPostType")}
            type={props.type}
            role={props.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={props.isSave}
          />
          <CustomizeRecruitmentPost
            id={post.id}
            location={post.location ?? ''}
            title={post.title ?? ''}
            salary={post.salary ?? ''}
            employmentType={post.employmentType ?? ''}
            handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
            createdAt={props.timeCreatePost}
            current={t("RecruitmentPost.recruitmentPostCurrency")}
            textButton={t("RecruitmentPost.recruitmentPostButtonSeeDetail")}
          />
          <CustomizeBottomPost
            isLike={checkLiked(post.likes, userLogin?.id)}
            likes={post.likes}
            handleClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={post.commentQty}
            textLikeBy={t("Post.normalPostLikeBy")}
          />
        </View>
      )
    case TYPE_SURVEY_POST:
      return <View style={styles.container}>
        <CustomizeHeaderPost
          t={t}
          userId={props.userId}
          name={getFacultyTranslated(props.name, t)}
          avatar={props.avatar}
          available={props.available}
          timeCreatePost={numberDayPassed(props.timeCreatePost)}
          typeAuthor={t("SurveyPost.surveyPostType")}
          type={props.type}
          role={props.role}
          handleClickMenuOption={handleClickMenuOption}
          handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          isSave={props.isSave}
        />
        <CustomizeSurveyPost
          id={post.id}
          title={post.title ?? ''}
          handleClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
          description={props.description ?? ''}
          textButton={t("SurveyPost.surveyPostButton")}
        />
        <CustomizeBottomPost
          isLike={checkLiked(post.likes, userLogin?.id)}
          likes={post.likes}
          handleClickBottomBtnEvent={handleClickBottomBtnEvent}
          commentQty={post.commentQty}
          textLikeBy={t("Post.normalPostLikeBy")}
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
  }
})
export default CustomizePost

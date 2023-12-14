import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import CustomizePost from '../components/post/CustomizePost';

const DetailPost = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_POST_SCREEN'>>();
  const post = route.params?.post ?? null
  const notificationType = route.params?.notificationType ?? ''

  const likeAction = () => { }
  const handleUnSave = () => { }
  const handleDelete = () => { }

  if (post) {
    if (notificationType == 'post_log') {
      return (
        <View style={styles.post}>
          <Text style={styles.txt}><Text style={styles.txt2}>Bài viết của bạn không được duyệt vì:</Text> "{post.content}"</Text>
        </View>
      )
    }
    return (
    <View style={styles.post}>
      <CustomizePost
        id={post.id}
        userId={post.user.id}
        name={post.user.name}
        avatar={post.user.image}
        typeAuthor={'Doanh Nghiệp'}
        available={null}
        timeCreatePost={post.createdAt}
        content={post.content}
        type={post.type}
        likes={post.likes}
        comments={post.comment}
        commentQty={post.commentQuantity}
        images={post.images}
        role={post.user.roleCodes}
        likeAction={likeAction}
        location={post.location ?? null}
        title={post.title ?? null}
        expiration={post.expiration ?? null}
        salary={post.salary ?? null}
        employmentType={post.employmentType ?? null}
        description={post.description ?? null}
        isSave={post.isSave}
        group={''}
        handleUnSave={handleUnSave}
        handleDelete={handleDelete}
        active={0} />
    </View>
    )
  } else {
    return (
      <View style={styles.post}>
        <Text>Bài viết này không tồn tại</Text>
      </View>
    )
  }
  

  
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10
  },
  txt: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16
  },
  txt2: {
    fontWeight: 'bold'
  }
})
export default DetailPost
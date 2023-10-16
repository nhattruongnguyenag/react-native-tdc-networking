import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useIsFocused } from '@react-navigation/native'
import { TYPE_POST_FACULTY } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { formatDateTime } from '../utils/FormatTime'
import { handleDataClassification } from '../utils/DataClassfications'

// man hinh hien thi danh sach bai viet cua khoa

export default function FacultyDashboardScreen() {

  // Variable

  const apiUrlPost = SERVER_ADDRESS + 'api/posts';
  const isFocused = useIsFocused();
  const [facultyPost, setFacultyPost] = useState([]);

  // Function 

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        callAPI();
      }
      fetchData();
    }
  }, [isFocused])

  // Api

  const callAPI = async () => {
    console.log('call api');
    try {
      const temp = await postAPI(apiUrlPost);
      const result = handleDataClassification(temp, TYPE_POST_FACULTY);
      setFacultyPost(result);
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = (item: any) => {
    return <CustomizePost
      id={item.id}
      userId={item.user['id']}
      name={item.user['name']}
      avatar={item.user['image']}
      typeAuthor={null}
      available={null}
      timeCreatePost={formatDateTime(item.createdAt)}
      content={item.content}
      type={null}
      likes={item.likes}
      comments={item.comment}
      images={item.images}
      role={2}
    />

  }
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => callAPI()}
        data={facultyPost}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  }
})

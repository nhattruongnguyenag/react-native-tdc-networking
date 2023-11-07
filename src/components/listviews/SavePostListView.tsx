import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Post } from '../../types/Post'
import CustomizePost from '../post/CustomizePost'
import { LikeAction } from '../../types/LikeActions'
import { TYPE_POST_BUSINESS } from '../../constants/StringVietnamese'

export interface SavePostType {
    data: any
    dataType: any
    type: string
}



// const likeAction = (obj: LikeAction) => {
//     obj.code = TYPE_POST_BUSINESS
//     like(obj)
//   }
const SavePostListView = (props: SavePostType) => {

    return (
        <ScrollView>
            {
                props.type == 'all'
                    ? ((props.data)?.map((item: any) =>
                        <>
                            < CustomizePost
                                id={item.id}
                                userId={item.user['id']}
                                name={item.user['name']}
                                avatar={item.user['image']}
                                typeAuthor={'Doanh Nghiệp'}
                                available={null}
                                timeCreatePost={item.createdAt}
                                content={item.content}
                                type={item.type}
                                likes={item.likes}
                                comments={item.comment}
                                commentQty={item.commentQuantity}
                                images={item.images}
                                role={item.user['roleCodes']}
                                likeAction={likeAction}
                                location={item.location ?? null}
                                title={item.title ?? null}
                                expiration={item.expiration ?? null}
                                salary={item.salary ?? null}
                                employmentType={item.employmentType ?? null}
                                description={item.description ?? null}
                            />
                        </>
                    ))
                    : (dataType.map((item, index) => <View><Text>{item.type}</Text></View>))
            }
        </ScrollView>
    )
}

export default SavePostListView

import React, { Fragment, useMemo, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ImageView from 'react-native-image-viewing'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Images } from '../../types/Images'
import { TextImagePostResponseModal } from '../../types/response/TextImagePostResponseModal'
import CustomizeImagePost from '../post/CustomizeImagePost'
import { PostApprovalItemProps } from './PostApprovalItem'

function isTextImagePost(post?: any): post is TextImagePostResponseModal {
    return post !== undefined && post instanceof Object && post !== null && 'content' in post
}

export default function TextImagePostApprovalItem(props: PostApprovalItemProps) {
    const [imageViewState, setImageViewState] = useState<{ index: number, show: boolean }>({
        index: 0,
        show: false
    })

    const imageURIs = useMemo(() => {
        if (isTextImagePost(props.post) && props.post.images) {
            return props.post.images.map<Images>((item, index) => ({
                ...item,
                uri: SERVER_ADDRESS + 'api/images/' + item.uri
            }))
        }

        return []
    }, [])


    const handleClickIntoAnyImageEvent = (imageId: number, listImageError: number[]) => {
        setImageViewState({
            index: imageURIs.findIndex(item => item.id === imageId),
            show: true
        })
    }

    return (
        <Fragment>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Text style={styles.postContent}>{isTextImagePost(props.post) ? props.post.content : 'Đang tải...'}</Text>

                {
                    isTextImagePost(props.post) && props.post.images && props.post.images.length > 0 &&
                    <CustomizeImagePost
                        images={isTextImagePost(props.post) && props.post.images ? props.post.images : []}
                        handleClickIntoAnyImageEvent={handleClickIntoAnyImageEvent}
                    />
                }
            </ScrollView>

            <ImageView
                images={imageURIs}
                imageIndex={imageViewState.index}
                visible={imageViewState.show}
                onRequestClose={() => setImageViewState({ ...imageViewState, show: false })}
                animationType={'slide'}
                presentationStyle={'formSheet'}
                doubleTapToZoomEnabled={true}
            />
        </Fragment >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    postContent: {
        fontSize: 14,
        marginBottom: 10
    },
    buttonReadMore: {
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: -10,
        marginBottom: -10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    postImageItem: {
        width: '100%',
        height: 300
    }
})
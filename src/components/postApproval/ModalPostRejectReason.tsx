import { useIsFocused } from '@react-navigation/native'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { Modal } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useAcceptPostMutation, useRejectPostMutation } from '../../redux/Service'
import { setPostRejectLog } from '../../redux/Slice'
import ButtonFullWith from '../buttons/ButtonFullWith'
import ButtonWithLoader from '../buttons/ButtonWithLoader'
import { PostRejectedLog } from './PostApprovalItem'

function ModalPostRejectReason() {
    const { postRejectLog } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false)
    const isFocused = useIsFocused()

    const [rejectPost, rejectPostResponse] = useRejectPostMutation()

    const onDismiss = () => {
        setVisible(false)
        dispatch(setPostRejectLog(null))
    }

    const onCompleteRejectPost = () => {
        if (postRejectLog) {
            rejectPost(postRejectLog)
        }
    }

    useEffect(() => {
        if (rejectPostResponse.data) {
            setVisible(false)
            Alert.alert("Thành công !!!", "Đã từ chối bài viết thành công")
        }
    }, [rejectPostResponse.data])

    useEffect(() => {
        if (postRejectLog && isFocused) {
            setVisible(true)
        }
    }, [isFocused, postRejectLog])

    return (
        <Fragment>
            {
                <Modal
                    visible={visible}
                    onDismiss={onDismiss}
                    contentContainerStyle={styles.containerStyle}>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        textAlign={'left'}
                        style={styles.textInput}
                        placeholder={'Ghi chú...'}
                        onChangeText={(value) => {
                            if (postRejectLog) {
                                dispatch(setPostRejectLog({
                                    ...postRejectLog,
                                    content: value
                                }))
                            }
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <ButtonFullWith
                            onPress={onDismiss}
                            textColor='#000'
                            btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
                            title={"Hủy"}
                        />

                        <ButtonWithLoader
                            loading={rejectPostResponse.isLoading}
                            onPress={onCompleteRejectPost}
                            btnStyle={{ marginLeft: 10, width: 140 }}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            title={"Hoàn tất"}
                        />
                    </View>
                </Modal>
            }
        </Fragment>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 4,
        margin: 10
    },
    textInput: {
        textAlignVertical: 'top',
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5
    }
})

export default ModalPostRejectReason
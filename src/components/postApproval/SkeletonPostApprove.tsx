import React, { Fragment } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { SCREEN_WIDTH } from '../../utils/SystemDimensions'
import SkeletonPostItem from '../SkeletonPostItem'

export const POST_APPROVAL = 0
export const POST_PENDING = 1
export const POST_REJECT = 2

export interface SkeletonPostApproveProps {
    loading?: boolean
}

export default function SkeletonPostApprove(props: SkeletonPostApproveProps) {
    return <Fragment>
        {
            props.loading ?
                <Pressable style={styles.container}>
                    <SkeletonPostItem />
                </Pressable>
                :
                <></>
        }
    </Fragment>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH - 20,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 10,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 5
    },
    postBody: {
        marginBottom: 10
    }
})
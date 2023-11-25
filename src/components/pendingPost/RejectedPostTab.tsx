import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import { useGetPostsQuery } from '../../redux/Service'
import Loading from '../common/Loading'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import PostApprovalItem, { POST_REJECT } from '../postApproval/PostApprovalItem'

export default function RejectedPostTab() {
    const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const t = useTranslation()

    const { data, isLoading } = useGetPostsQuery({
        active: 2,
        userId: userLogin?.id
    }, { pollingInterval: 5000 })

    return (
        <SafeAreaView style={styles.body}>
            {
                isLoading ? <Loading title={t('PenddingPostScreen.loading')} />
                    :
                    <Fragment>
                        {
                            data?.data.length ?
                                <Fragment>
                                    <FlatList
                                        data={data?.data}
                                        renderItem={({ item, index }) =>
                                            <PostApprovalItem
                                                type={POST_REJECT}
                                                post={item}
                                            />}
                                    />
                                    <ModalPostRejectReason />
                                </Fragment>
                                :
                                <Text style={{ marginTop: -60 }}>{t('PenddingPostScreen.emptyMessage')}</Text>
                        }
                    </Fragment>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
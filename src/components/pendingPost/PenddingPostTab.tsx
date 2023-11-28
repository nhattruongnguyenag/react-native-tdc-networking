import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useMemo } from 'react'
import { useAppSelector } from '../../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import { isAdmin, isBusiness, isFaculty } from '../../utils/UserHelper'
import { useGetPostsQuery } from '../../redux/Service'
import PostApprovalItem, { POST_PENDING } from '../postApproval/PostApprovalItem'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import Loading from '../common/Loading'

export default function PenddingPostTab() {
    const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const t = useTranslation()

    const { data, isLoading } = useGetPostsQuery({
        active: 0,
        userId: userLogin?.id        
    }, {refetchOnMountOrArgChange: true})

    return (
        <SafeAreaView style={styles.body}>
            {
                isLoading ? <Loading title={t('PenddingPostScreen.loading')} />
                    :
                    <>
                        {
                            data?.data.length ?
                                <>
                                    <FlatList
                                        data={data?.data}
                                        renderItem={({ item, index }) =>
                                            <PostApprovalItem
                                                post={item}
                                                type={POST_PENDING}
                                            />}
                                    />
                                    <ModalPostRejectReason />
                                </>
                                :
                                <Text style={{ marginTop: -60 }}>{t('PenddingPostScreen.emptyMessage')}</Text>
                        }
                    </>
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
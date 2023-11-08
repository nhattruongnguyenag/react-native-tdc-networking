import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { COLOR_WHITE } from '../../constants/Color'

export default function SurveyResultSkeleton() {
  return (
    <View style={{ backgroundColor: COLOR_WHITE }}>
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item paddingHorizontal={20} marginVertical={10}>
        <SkeletonPlaceholder.Item marginTop={10} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <SkeletonPlaceholder.Item flex={1} height={30} />
          <SkeletonPlaceholder.Item width={30} height={15} marginLeft={15} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
  )
}
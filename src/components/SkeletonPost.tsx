import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { COLOR_WHITE } from '../constants/Color'

const SkeletonPost = () => {
  return (
    <>
      <View style={{ backgroundColor: COLOR_WHITE }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item paddingHorizontal={20} marginVertical={10}>
            <SkeletonPlaceholder.Item flexDirection='row' alignItems='center' justifyContent='space-between'>
              <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
              <SkeletonPlaceholder.Item width={'80%'} height={30} marginLeft={10} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginVertical={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={180} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginVertical={10} flexDirection='row'>
              <SkeletonPlaceholder.Item width={'100%'} height={30} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>

      <View style={{ backgroundColor: COLOR_WHITE }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item paddingHorizontal={20} marginVertical={10}>
            <SkeletonPlaceholder.Item flexDirection='row' alignItems='center' justifyContent='space-between'>
              <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
              <SkeletonPlaceholder.Item width={'80%'} height={30} marginLeft={10} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginVertical={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={180} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginVertical={10} flexDirection='row'>
              <SkeletonPlaceholder.Item width={'100%'} height={30} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </>
  )
}
export default SkeletonPost

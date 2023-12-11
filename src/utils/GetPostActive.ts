import { View, Text } from 'react-native'
import React from 'react'
import { NUMBER_POST_ACTIVE } from '../constants/Variables';

export const GetPostActive = (active:number):boolean => {
    let flag = false;
    if(active === NUMBER_POST_ACTIVE){
        flag = true;
    }
    return flag;
}
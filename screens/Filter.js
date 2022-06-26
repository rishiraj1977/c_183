import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Image } from 'react-native'

const Filter1 = ({face:
    {bounds:
        {size:
            {width:faceWidth,height:faceHeight}},
        leftEyePosition,rightEyePosition}
    })=> {
        const transformAngle= (
            angle_rad = Math.atan((rightEyePosition.y-leftEyePosition.y)/(rightEyePosition.x-leftEyePosition.x)) 
        )=>{
            angle_rad*180/Math.PI
        }
    return (
        <View>
            <Image source = {require('../assets/glasses.png')} 
            style={{
                width: faceWidth,height:faceHeight/3,
                resizeMode: 'contain',
                transform:[{rotate:`${transformAngle()}deg`}]
            }}
            />
        </View>
    )
}
export default Filter1
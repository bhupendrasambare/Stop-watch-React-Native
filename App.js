import { SafeAreaView, Text, TouchableOpacity, View ,Dimensions} from 'react-native'
import React, { Component,useState } from 'react'
import {PauseCircleIcon, PlayCircleIcon, StopCircleIcon} from "react-native-heroicons/solid"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function App() {
    const { width, height } = Dimensions.get('window');
    const [play, setPlay] = useState(false)
    const [time, setTime] = useState(false)

    return (
        <View className="flex-1 bg-sky-950">
            <SafeAreaView className="min-h-full">
                <View className="items-center mt-20 w-full">
                    <CountdownCircleTimer
                    size={width*0.8}
                        isPlaying={play}
                        duration={7}
                        colors={"#0563e8"}
                        trailStrokeWidth={3}
                        strokeWidth={8}
                        >
                        {({ remainingTime, animatedColor }) => (
                            <View className="items-center">
                                <Text className="font-bold text-8xl text-white">
                                {remainingTime}
                                </Text>
                            </View>
                        )}
                    </CountdownCircleTimer>
                </View>

                <View className="absolute bottom-0 flex-row justify-center right-0 left-0 pb-10">
                    <TouchableOpacity onPress={()=>setPlay(false)}>
                        <PauseCircleIcon size={50}  strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setPlay(true)}>
                        <PlayCircleIcon size={50}  strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setPlay(!play)}>
                        <StopCircleIcon size={50}  strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
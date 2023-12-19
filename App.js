import { SafeAreaView, Text, TouchableOpacity, View ,Dimensions} from 'react-native'
import React, { useEffect,useState } from 'react'
import {PauseCircleIcon, PlayCircleIcon, StopCircleIcon} from "react-native-heroicons/outline"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RNPickerSelect from 'react-native-picker-select';
import { pickerSelectStyles } from './Style';

export default function App() {
    const { width, height } = Dimensions.get('window');
    const [play, setPlay] = useState(false)
    const [start, setStart] = useState(false)
    const [key, setKey] = useState(0);

    const [duration, setDuration] = useState(0);

    const[second,setSecond] = useState(0);
    const[minute,setMinute] = useState(0);
    const[hour,setHour] = useState(0);

    const resetTimer = () => {
        setPlay(false);
        setKey(prevKey => prevKey + 1)
    };

    const minutes = Array.from({ length: 60 }, (_, i) => ({
        label: i < 10 ? `0${i}` : `${i}`,
        value: i < 10 ? `0${i}` : `${i}`,
    }));

    const seconds = Array.from({ length: 60 }, (_, i) => ({
        label: i < 10 ? `0${i}` : `${i}`,
        value: i < 10 ? `0${i}` : `${i}`,
    }));

    useEffect(() => {
        setDuration(second + (60 * minute) + (3600* hour));
    }, [second,minute,hour])
    

    return (
        <View className="flex-1 bg-sky-950">
            <SafeAreaView className="min-h-full">
                <View className="items-center mt-20 w-full">
                    { start &&
                        <CountdownCircleTimer
                            size={width*0.8}
                            isPlaying={play}
                            duration={10}
                            initialRemainingTime={60}
                            colors={"#0563e8"}
                            trailStrokeWidth={3}
                            strokeWidth={8}
                            key={key}
                            >
                            {({ remainingTime, elapsedTime }) =>(
                                <View className="items-center">
                                    <Text className="font-bold text-8xl text-white">
                                    {remainingTime}
                                    </Text>
                                </View>
                            )}
                        </CountdownCircleTimer>
                    }
                    { !start &&
                        <View className="flex-row text-white">
                            <Text> : </Text>
                            <RNPickerSelect
                                placeholder={{ label: 'HH', value: 0 }}
                                items={hour}
                                onValueChange={(value) => setHour(value)}
                                value={hour}
                                style={pickerSelectStyles}
                            />
                            <RNPickerSelect
                                placeholder={{ label: 'MM', value: 0 }}
                                items={minutes}
                                onValueChange={(value) => setMinute(value)}
                                value={minute}
                                style={pickerSelectStyles}
                            />
                            <RNPickerSelect
                                placeholder={{ label: 'SS', value: 0 }}
                                items={seconds}
                                onValueChange={(value) => setSecond(value)}
                                value={second}
                                style={pickerSelectStyles}
                            />
                        </View>
                    }
                </View>

                <View className="absolute bottom-0 flex-row justify-center right-0 left-0 pb-10">
                    {play && 
                        <TouchableOpacity onPress={()=>setPlay(false)}>
                            <PauseCircleIcon size={50}  strokeWidth={2} color="white"/>
                        </TouchableOpacity>
                    }
                    {!play && 
                        <TouchableOpacity onPress={()=>setPlay(true)}>
                            <PlayCircleIcon size={50}  strokeWidth={2} color="white"/>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={resetTimer}>
                        <StopCircleIcon size={50}  strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
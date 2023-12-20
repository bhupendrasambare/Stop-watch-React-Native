import { SafeAreaView, Text, TouchableOpacity, View ,Dimensions} from 'react-native'
import React, { useEffect,useState } from 'react'
import {PauseCircleIcon, PlayCircleIcon, StopCircleIcon} from "react-native-heroicons/outline"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import ScrollPicker from 'react-native-picker-scrollview';
import { formatTime, hours, minutes, pickerSelectStyles, seconds } from './Constants';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const { width, height } = Dimensions.get('window');
    
const whoosh = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {});
export default function App() {
    const [play, setPlay] = useState(false)
    const [start, setStart] = useState(false);
    const [stopTime,setStopTime] = useState(false);
    const [key, setKey] = useState(0);

    const [duration, setDuration] = useState(0);

    const[second,setSecond] = useState(0);
    const[minute,setMinute] = useState(0);
    const[hour,setHour] = useState(0);

    const resetTimer = () => {
        setPlay(false);
        setKey(prevKey => prevKey + 1)
    };

    useEffect(() => {
        resetTimer()
        setDuration(second + (60 * minute) + (3600* hour));
    }, [second,minute,hour])
    
    const onStart = ()=>{
        if(duration>0){
            resetTimer();
            setStart(true)
            setPlay(true)
        }
    }

    const onEnd = ()=>{
        resetTimer();
        setStart(false)
        setPlay(false)
        setDuration(0)
        setHour(0)
        setMinute(0)
        setSecond(0)
    }

    const onMusicStart = ()=>{
        whoosh.setPan(1);
        whoosh.setVolume(1);
        whoosh.setNumberOfLoops(-1);
        whoosh.play();
        setStopTime(true);
        console.log("Music on")
    }

    const onMusicEnd = ()=>{
        console.log("Sound off 1")
        whoosh.stop(() => {
            console.log("Sound off 2")
        });
        console.log("Sound off 3")
        onEnd();
        setStopTime(false)
    }

    return (
        <View className="flex-1 bg-sky-950">
            <SafeAreaView className="min-h-full">
                <View className="items-center mt-20 w-full">
                    { start &&
                        <CountdownCircleTimer
                            size={width*0.8}
                            isPlaying={play}
                            duration={duration}
                            colors={"#0563e8"}
                            trailStrokeWidth={3}
                            strokeWidth={8}
                            key={key}
                            onComplete={() =>onMusicStart()}
                            >
                            {({ remainingTime, elapsedTime }) =>(
                                <View className="items-center">
                                    { !stopTime && 
                                        <Text className="font-bold text-5xl text-white">
                                            {formatTime(remainingTime)}
                                        </Text>
                                    }
                                    {
                                        stopTime && 
                                        <TouchableOpacity onPress={()=>onMusicEnd()}>
                                            <View className="rounded-full shadow-md shadow-white bg-white p-5">
                                                <Text className="text-2xl">Stop Time</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            )}
                        </CountdownCircleTimer>
                    }
                    { !start &&
                    <View className="flex-row  text-white" style={{width:250}}>
                        <ScrollPicker            
                            dataSource={hours}
                            selectedIndex={hour}
                            wrapperColor={'#082f49'}
                            highlightColor={'#082f49'}
                            itemHeight={50}
                            wrapperHeight={150}
                            renderItem={(data, index, isSelected) => {
                                return(
                                    <View>
                                        <Text className={(isSelected)?"text-white font-bold text-5xl":" text-sky-200 text-2xl text-center"}>{data}</Text>
                                    </View>
                                )
                            }}
                            onValueChange={(data) => {
                                setHour(data)
                            }}
                        />
                        <View className="flex-col justify-center">
                            <Text className="text-white text-5xl"> : </Text>
                        </View>
                        <ScrollPicker            
                            dataSource={minutes}
                            selectedIndex={minute}
                            wrapperColor={'#082f49'}
                            highlightColor={'#082f49'}
                            itemHeight={50}
                            wrapperHeight={150}
                            renderItem={(data, index, isSelected) => {
                                return(
                                    <View>
                                        <Text className={(isSelected)?"text-white font-bold text-5xl":" text-sky-200 text-2xl text-center"}>{data}</Text>
                                    </View>
                                )
                            }}
                            onValueChange={(data) => {
                                setMinute(data)
                            }}
                        />
                        <View className="flex-col justify-center">
                            <Text className="text-white text-5xl"> : </Text>
                        </View>
                        <ScrollPicker     
                            dataSource={seconds}
                            selectedIndex={second}
                            wrapperColor={'#082f49'}
                            highlightColor={'#082f49'}
                            itemHeight={50}
                            wrapperHeight={150}
                            renderItem={(data, index, isSelected) => {
                                return(
                                    <View>
                                        <Text className={(isSelected)?"text-white font-bold text-5xl":" text-sky-200 text-2xl text-center"}>{data}</Text>
                                    </View>
                                )
                            }}
                            onValueChange={(data) => {
                                setSecond(data)
                            }}
                        />
                    </View>
                    }
                </View>

                <View className="absolute bottom-0 flex-row justify-center right-0 left-0 pb-10">
                    {play && start && 
                        <TouchableOpacity onPress={()=>setPlay(false)}>
                            <PauseCircleIcon size={50}  strokeWidth={1} color="white"/>
                        </TouchableOpacity>
                    }
                    {!play && start && 
                        <TouchableOpacity onPress={()=>setPlay(true)}>
                            <PlayCircleIcon size={50}  strokeWidth={1} color="white"/>
                        </TouchableOpacity>
                    }
                    {start &&
                        <TouchableOpacity onPress={onEnd}>
                            <StopCircleIcon size={50}  strokeWidth={1} color="white"/>
                        </TouchableOpacity>
                    }
                    {setStopTime && !start && 
                        <TouchableOpacity onPress={onStart}>
                            <PlayCircleIcon size={50}  strokeWidth={1} color="white"/>
                        </TouchableOpacity>
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}
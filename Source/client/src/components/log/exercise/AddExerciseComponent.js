import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native'
import * as Icon from "react-native-feather";
import { exercises } from '../../../../constants'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

function tabBarHeader(indexActive, setIndexActive, navigation) {
    const textColorActive = "text-orange-700";
    const textColorInactive = "text-white";
    const bgColorActive = { backgroundColor: "white" }
    return (
        <View className="absolute top-0 bg-orange-500 w-full h-32 p-4 pt-8 space-y-5">
            <View className="flex-row items-center justify-between">
                <View className="flex-row space-x-6 items-center">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                    </TouchableOpacity>
                    <Text className="text-xl text-white ">Lose It!</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CreateExercise')}
                >
                    <Text className="text-white text-2sm">Create Exercise</Text>
                </TouchableOpacity>

            </View>
            <View className="flex-1 flex-row items-center justify-center">
                <TouchableOpacity
                    className="rounded-full pl-12 pr-12 pt-1 pb-1"
                    style={indexActive === 0 ? bgColorActive : null}
                    onPress={() => setIndexActive(0)}
                >
                    <Text className={indexActive === 0 ? textColorActive : textColorInactive}>My Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-12 pr-12 pt-1 pb-1"
                    style={indexActive === 1 ? { backgroundColor: "white" } : null}
                    onPress={() => setIndexActive(1)}
                >
                    <Text className={indexActive === 1 ? textColorActive : textColorInactive}>All Exercise</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function bodyMyExerciseTemplate(indexActive) {
    if (indexActive === 0) {
        const [filter, setFilter] = useState("");
        return (
            <Animated.View
                entering={FadeInLeft.duration(100)}
                className="mt-32 h-full bg-white p-3"
            >
                <View className="flex-row items-center pr-8 border-2 border-orange-400 rounded-lg">
                    <TextInput placeholder="Filter Results"
                        placeholderTextColor="orange"
                        className=" w-full h-16 p-3" keyboardType='default'
                        onChangeText={text => setFilter(text)}
                        value={filter}
                    >
                    </TextInput>
                    {
                        filter ?
                            <TouchableOpacity
                                onPress={() => setFilter("")}
                            >
                                <Icon.XCircle stroke="orange" strokeWidth={3} />
                            </TouchableOpacity>
                            : null
                    }


                </View>

                <ScrollView className="space-y-4 mb-64"
                    showsVerticalScrollIndicator={false}
                >
                    {
                        exercises.filter(item => item.name.toLowerCase().includes(filter)).map((item, index) => {
                            let firstLetter = item.name[0];
                            let nextItem = exercises[index + 1] ?? null;
                            let prevItem = exercises[index > 0 ? index - 1 : 0];
                            let isDifferentLine = nextItem ? nextItem.name[0] !== firstLetter : false;
                            let isDifferentLetter = prevItem.name[0] !== firstLetter;

                            return (
                                <View className={"p-2 m-3 space-y-2" + (isDifferentLine ? " border-b-2 border-gray-200" : "")} key={index}>
                                    {
                                        isDifferentLetter || index === 0 ?
                                            <Text>{item.name[0].toUpperCase()}</Text>
                                            : null
                                    }

                                    <View className="flex-row items-center space-x-4">
                                        <Image source={item.image} className="w-4 h-4" />
                                        <Text>{item.name}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </Animated.View>
        )
    }
    return null;
}

function bodyAllExerciseTemplate(indexActive, setIndexActive) {
    if (indexActive === 1) {
        const [filter, setFilter] = useState("");

        return (
            <Animated.View
                className="mt-32 h-full bg-white p-3"
                entering={FadeInRight.duration(100)}
            >
                <View className="flex-row items-center pr-8 border-2 border-orange-400 rounded-lg">
                    <TextInput placeholder="Filter Results"
                        placeholderTextColor="orange"
                        className=" w-full h-16 p-3" keyboardType='default'
                        onChangeText={text => setFilter(text)}
                        value={filter}
                    >
                    </TextInput>
                    {
                        filter ?
                            <TouchableOpacity
                                onPress={() => setFilter("")}
                            >
                                <Icon.XCircle stroke="orange" strokeWidth={3} />
                            </TouchableOpacity>
                            : null
                    }


                </View>

                <ScrollView className="space-y-4 mb-64"
                    showsVerticalScrollIndicator={false}
                >
                    {
                        exercises.filter(item => item.name.toLowerCase().includes(filter)).map((item, index) => {
                            return (
                                <View className="p-2 m-3 space-y-2" key={index}>

                                    <View className="flex-row items-center space-x-4">
                                        <Image source={item.image} className="w-4 h-4" />
                                        <Text>{item.name}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </Animated.View>
        )
    }
    return null;
}

export default function AddExerciseComponent() {
    const navigation = useNavigation();
    const [indexActive, setIndexActive] = useState(0);

    return (
        <View>
            {tabBarHeader(indexActive, setIndexActive, navigation)}
            {bodyMyExerciseTemplate(indexActive)}
            {bodyAllExerciseTemplate(indexActive, setIndexActive)}
        </View>
    )
}

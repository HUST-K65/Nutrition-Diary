import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native'
import * as Icon from "react-native-feather";
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { useIsFocused } from "@react-navigation/native";

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
                    style={indexActive === 1 ? { backgroundColor: "white" } : null}
                    onPress={() => setIndexActive(1)}
                >
                    <Text className={indexActive === 1 ? textColorActive : textColorInactive}>All Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-12 pr-12 pt-1 pb-1"
                    style={indexActive === 0 ? bgColorActive : null}
                    onPress={() => setIndexActive(0)}
                >
                    <Text className={indexActive === 0 ? textColorActive : textColorInactive}>Logged Exercises</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

function bodyMyExerciseTemplate(indexActive, myExercises, navigation) {
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
                        myExercises && myExercises.length ? myExercises.filter(item => item.exercise.name.toLowerCase().includes(filter)).map((item, index) => {
                            let imageSource = item.exercise.image ? item.exercise.image : "https://cdn-icons-png.flaticon.com/512/5783/5783140.png";
                            let firstLetter = item.exercise.name[0];
                            let nextItem = myExercises[index + 1] ?? null;
                            let prevItem = myExercises[index > 0 ? index - 1 : 0];
                            let isDifferentLine = nextItem ? nextItem.exercise.name[0] !== firstLetter : false;
                            let isDifferentLetter = prevItem.exercise.name[0] !== firstLetter;

                            return (
                                <TouchableOpacity className={"p-2 m-3 space-y-2" + (isDifferentLine ? " border-b-2 border-gray-200" : "")} key={index}
                                    onPress={() => navigation.navigate("TimeToExercise", { item })}
                                >
                                    {
                                        isDifferentLetter || index === 0 ?
                                            <Text>{item.exercise.name[0].toUpperCase()}</Text>
                                            : null
                                    }

                                    <View className="flex-row items-center space-x-4">
                                        <Image source={{ uri: imageSource }} className="w-10 h-10" />
                                        <Text>{item.exercise.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : null
                    }
                </ScrollView>
            </Animated.View>
        )
    }
    return null;
}

async function getMyExercises(myExercises, setMyExercises) {
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise/getUserExercises", {
        method: "post",
        headers: {
            "Authorization": `Bearer ${window.viewer.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": window.viewer.id
        })
    }
    ).then(async (response) => {
        const res = await response.json();
        if (res && res.data && res.data.length) {
            setMyExercises(res.data);
        }
    })
        .catch(function (error) {
            Alert.alert(
                'Error',
                error.message,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                },
            );

        });
}

async function getAllExercises(allExercises, setAllExercises) {
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise", {
        method: "get",
        headers: {
            "Authorization": `Bearer ${window.viewer.token}`,
            "Content-Type": "application/json"
        }
    }
    ).then(async (response) => {
        const res = await response.json();
        if (res && res.data && res.data.length) {
            setAllExercises(res.data);
        }
    })
        .catch(function (error) {
            Alert.alert(
                'Error when get all exercises',
                error.message,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                },
            );

        });
}

function bodyAllExerciseTemplate(indexActive, allExercises, navigation) {
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
                        allExercises && allExercises.length ?
                            allExercises.filter(item => item.name.toLowerCase().includes(filter ? filter.toLowerCase() : filter)).map((item, index) => {
                                let imageSource = item.image ? item.image : "https://cdn-icons-png.flaticon.com/512/5783/5783140.png";
                                return (
                                    <TouchableOpacity className="p-2 m-3 space-y-2" key={index}
                                        onPress={() => navigation.navigate("TimeToExercise", { item })}
                                    >

                                        <View className="flex-row items-center space-x-4">
                                            <Image source={{ uri: imageSource }} className="w-10 h-10" />
                                            <Text>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : null
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
    const [allExercises, setAllExercises] = useState(null);
    const [myExercises, setMyExercises] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        getMyExercises(myExercises, setMyExercises)
        getAllExercises(allExercises, setAllExercises)
    }, [isFocused])

    return (
        <View>
            {tabBarHeader(indexActive, setIndexActive, navigation)}
            {bodyMyExerciseTemplate(indexActive, myExercises, navigation)}
            {bodyAllExerciseTemplate(indexActive, allExercises, navigation)}
        </View>
    )
}

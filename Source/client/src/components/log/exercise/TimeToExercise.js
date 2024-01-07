import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import * as Icon from "react-native-feather";

async function handleSave(item, time, caloriesBurn, navigation) {

    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise/user", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": "659a676eaf291d973da3758b",
            "exerciseId": item._id,
            "userCalories": caloriesBurn,
            "userExerciseTime": time
        })
    }
    ).then(async (response) => {
        navigation.navigate("Homepage")
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

export default function TimeToExercise() {
    let { params } = useRoute();
    const navigation = useNavigation();
    let item = params?.item;
    const [time, setTime] = useState(item.exerciseTime);
    let caloriesBurn = (item.calories / item.exerciseTime * time).toFixed(2);
    return (
        <View className="h-full w-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Lose It!</Text>
                <TouchableOpacity
                    onPress={() => handleSave(item, time, caloriesBurn, navigation)}
                >
                    <Text className="text-white text-sm">Save</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-20 p-3 bg-white flex-row items-center space-x-4">
                <Image source={{ uri: item.image ? item.image : "https://cdn-icons-png.flaticon.com/512/5783/5783140.png" }} className="w-12 h-12" />
                <Text className="text-xl font-bold">{item.name}</Text>
            </View>
            <View className="p-3 mt-4 space-y-4 bg-white">
                <Text className="text-gray-700 font-bold text-2xl">Time to exercise (minutes)</Text>
                <TextInput
                    placeholder="Time to exercise (minutes)"
                    inputMode="numeric"
                    className="border border-gray-700 rounded-xl p-3"
                    onChangeText={num => setTime(num)}
                    defaultValue={time.toString()}
                />
            </View>
            <View className="p-6 bg-white absolute h-28 bottom-0 w-full">
                <Text className="text-gray-500 text-3xl font-bold">{caloriesBurn} calories burned</Text>
            </View>
        </View>
    )
}

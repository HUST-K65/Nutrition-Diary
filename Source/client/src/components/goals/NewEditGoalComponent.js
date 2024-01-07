import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import * as Icon from "react-native-feather";

async function handleAdd(goal, currentWeight, navigation, setIndexComponentActive, isNew, goalId = null) {

    let url = isNew ? "http://10.0.2.2:8000/api/nutrition_diary/v1/goal" : ("http://10.0.2.2:8000/api/nutrition_diary/v1/goal/" + goalId)
    console.log(url)
    let method = isNew ? "post" : "patch";
    let params = {};
    if (isNew) {
        params = {
            "userId": "659a676eaf291d973da3758b",
            "currentGoal": goal,
            "currentWeight": currentWeight,
        }
    } else if (goalId) {
        console.log(goalId)
        params = {
            "goalId": goalId,
            "currentGoal": goal,
            "currentWeight": currentWeight,
        }
    }

    await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    }
    ).then(async (response) => {
        const res = response.json();
        console.log(res)
        setIndexComponentActive(2)
        navigation.navigate("Homepage");
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

export default function NewEditGoalComponent() {

    const navigation = useNavigation();
    let { params } = useRoute();
    let isNew = params?.isNew;

    let currentGoal = params?.currentGoal;
    let setIndexComponentActive = params?.setIndexComponentActive;

    const [goal, setGoal] = useState(currentGoal ? currentGoal.currentGoal : null);
    const [currentWeight, setCurrentWeight] = useState(currentGoal ? currentGoal.currentWeight : null);

    return (
        <View className="h-full w-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">
                    {isNew ? "New Goal" : "Edit Goal"}
                </Text>
            </View>
            <View className="bg-white mt-20 rounded-xl p-3">
                <View className="currentgoal space-y-6">
                    <Text className="text-2xl font-bold">{isNew ? "New Goal (kg)" : "Edit Goal (kg)"}</Text>
                    <TextInput className="p-2 border-2 border-gray-600 w-80 rounded-xl" placeholder='required' keyboardType='default' inputMode="numeric"
                        onChangeText={num => setGoal(num)}
                        defaultValue={goal ? goal.toString() : null}
                    />
                    <Text>--------------------------------------------</Text>
                    <Text className="text-2xl font-bold">Current Weight (kg)</Text>
                    <TextInput className="p-2 border-2 border-gray-600 w-80 rounded-xl" placeholder='required' keyboardType='default' inputMode="numeric"
                        onChangeText={num => setCurrentWeight(num)}
                        defaultValue={currentWeight ? currentWeight.toString() : null}
                    />
                </View>
            </View>
            <View className="w-full items-center pt-12">
                <TouchableOpacity
                    className="rounded-xl bg-green-700 p-3 items-center justify-center w-48"
                    onPress={() => handleAdd(goal, currentWeight, navigation, setIndexComponentActive, isNew, currentGoal ? currentGoal._id : null)}
                >
                    <Text className="text-2xl font-bold text-white">{isNew ? "Add New Goal" : "Save Goal"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

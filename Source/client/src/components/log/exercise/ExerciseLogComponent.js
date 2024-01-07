import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import * as Icon from "react-native-feather";
import ItemAlignComponentForExercise from '../ItemAlignComponentForExercise';
import { useIsFocused } from '@react-navigation/native';

async function getExercises(setExercises) {

    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise/getUserExercises", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": "659a676eaf291d973da3758b",
            "date": 1704585600000
        })
    }
    ).then(async (response) => {
        const res = await response.json();
        if (res && res.data && res.data.length) {
            setExercises(res.data)
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

export default function ExerciseLogComponent() {
    const [collapsed, setCollapsed] = useState(true);
    const [exercises, setExercises] = useState([]);

    const isFocused = useIsFocused();
    let totalCalories = 0;
    useEffect(() => {
        getExercises(setExercises);
    }, [isFocused])


    exercises.map(item => {
        totalCalories += (item.userCalories ? item.userCalories : item.exercise.calories)
    })

    return (
        <View className="m-3 p-3 bg-white rounded-2xl">
            <View className="flex-row justify-left space-x-4">
                <TouchableOpacity
                    onPress={() => setCollapsed(!collapsed)}
                >
                    {
                        collapsed ?
                            <Icon.ChevronDown stroke="gray" strokeWidth={3} />
                            :
                            <Icon.ChevronUp stroke="gray" strokeWidth={3} />
                    }
                </TouchableOpacity>
                <View>
                    <Text className="text-gray-700 font-bold text-lg">Workouts: {totalCalories}</Text>
                </View>
            </View>
            <ItemAlignComponentForExercise items={exercises} collapsed={collapsed} category="Exercise" />
        </View>
    )
}

import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import ExerciseLogComponent from './exercise/ExerciseLogComponent'
import MealLogComponent from './meal/MealLogComponent'
import HealthLogComponent from './health/HealthLogComponent'
import { useIsFocused } from '@react-navigation/native'

const caloriesPerKg = 7500;

async function getExercises(setExercises, datePickTime) {
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise/getUserExercises", {
        method: "post",
        headers: {
            "Authorization": `Bearer ${window.viewer.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": window.viewer.id,
            "date": datePickTime
        })
    }
    ).then(async (response) => {
        const res = await response.json();
        if (res && res.data) {
            console.log(res.data)
            setExercises(res.data)
        }
    })
        .catch(function (error) {
            Alert.alert(
                'Error when get exercises',
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

async function getCurrentGoal(setCurrentGoal, setCurrentWeight) {
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/goal/getGoal", {
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
            setCurrentGoal(res.data[0].currentGoal)
            setCurrentWeight(res.data[0].currentWeight);
        }
    })
        .catch(function (error) {
            Alert.alert(
                'Error when get goal',
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


export default function LogComponent({ datePick }) {
    const isFocused = useIsFocused();
    const [exercises, setExercises] = useState([]);
    const [currentGoal, setCurrentGoal] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);

    let datePickTime = new Date(datePick);
    datePickTime = datePickTime.getTime();

    useEffect(() => {
        getCurrentGoal(setCurrentGoal, setCurrentWeight)
        getExercises(setExercises, datePickTime);
    }, [isFocused, datePickTime])

    let budget = Math.ceil((currentGoal - currentWeight) * caloriesPerKg / 30);
    let totalCaloriesExercise = 0;

    exercises.map(item => {
        totalCaloriesExercise += (item.userCalories ? item.userCalories : item.exercise.calories)
    })

    totalCaloriesExercise = Math.ceil(totalCaloriesExercise);

    let net = 122 - totalCaloriesExercise;

    let underPositive = (budget - net) > 0;
    let classTextUnder = (underPositive ? "bg-green-600 " : "bg-red-500") + " text-lg text-white";
    return (
        <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
            <View className="flex-1 items-center justify-center flex-row space-x-8 space-y-0 bg-white border-2 border-gray-200 p-3">
                <View className="items-center">
                    <Text className="text-gray-800">Budget</Text>
                    <Text className="font-bold text-lg text-blue-800">{budget}</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Food</Text>
                    <Text className="font-bold text-lg">122</Text>
                </View>
                <View className="items-center">
                    <Text className="text-gray-800">Exercise</Text>
                    <Text className="font-bold text-lg">-{totalCaloriesExercise}</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Net</Text>
                    <Text className="font-bold text-lg">{net}</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Under</Text>
                    <Text className={classTextUnder}>{budget - net}</Text>
                </View>
            </View>

            <Text className="text-2xl m-4">Meal</Text>
            <MealLogComponent />

            <Text className="text-2xl m-4">Exercise</Text>

            <ExerciseLogComponent exercises={exercises} totalCaloriesExercise={totalCaloriesExercise} />

            <Text className="text-2xl m-4">Health</Text>
            <HealthLogComponent />
        </ScrollView>
    )
}

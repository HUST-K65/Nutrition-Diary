import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import ExerciseLogComponent from './exercise/ExerciseLogComponent'
import MealLogComponent from './meal/MealLogComponent'
import HealthLogComponent from './health/HealthLogComponent'

export default function LogComponent() {

    let underPositive = true;
    let classTextUnder = (underPositive ? "bg-green-600 " : "bg-red-500") + " text-lg text-white";
    return (
        <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
            <View className="flex-1 items-center justify-center flex-row space-x-8 space-y-0 bg-white border-2 border-gray-200 p-3">
                <View className="items-center">
                    <Text className="text-gray-800">Budget</Text>
                    <Text className="font-bold text-lg text-blue-800">2.322</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Food</Text>
                    <Text className="font-bold text-lg">122</Text>
                </View>
                <View className="items-center">
                    <Text className="text-gray-800">Exercise</Text>
                    <Text className="font-bold text-lg">0</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Net</Text>
                    <Text className="font-bold text-lg">122</Text>
                </View>
                <View>
                    <Text className="text-gray-800">Under</Text>
                    <Text className={classTextUnder}>2.200</Text>
                </View>
            </View>

            <Text className="text-2xl m-4">Meal</Text>
            <MealLogComponent />

            <Text className="text-2xl m-4">Exercise</Text>

            <ExerciseLogComponent />

            <Text className="text-2xl m-4">Health</Text>
            <HealthLogComponent />
        </ScrollView>
    )
}

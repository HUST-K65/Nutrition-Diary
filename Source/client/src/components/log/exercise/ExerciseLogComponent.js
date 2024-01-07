import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import * as Icon from "react-native-feather";
import ItemAlignComponentForExercise from '../ItemAlignComponentForExercise';

export default function ExerciseLogComponent({ exercises, totalCaloriesExercise }) {
    const [collapsed, setCollapsed] = useState(true);

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
                    <Text className="text-gray-700 font-bold text-lg">Workouts: {totalCaloriesExercise}</Text>
                </View>
            </View>
            <ItemAlignComponentForExercise items={exercises} collapsed={collapsed} category="Exercise" />
        </View>
    )
}

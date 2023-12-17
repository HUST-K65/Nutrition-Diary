import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import ItemAlignComponent from '../ItemAlignComponent';
import { exercises } from '../../../../constants'

export default function ExerciseLogComponent() {
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
                    <Text className="text-gray-700 font-bold text-lg">Workouts: 123</Text>
                </View>
            </View>
            <ItemAlignComponent items={exercises} collapsed={collapsed} category="Exercise" />
        </View>
    )


}

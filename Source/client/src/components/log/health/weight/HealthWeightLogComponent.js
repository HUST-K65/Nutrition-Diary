import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function HealthWeightLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Weight</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View className="space-y-4">
                <Icon.MoreVertical stroke="gray" strokeWidth={3} />
                <FontAwesome5 name="weight" size={25} />
            </View>
        </TouchableOpacity>
    )
}

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

export default function HealthWaterIntakeLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Water Intake</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View>
                <Entypo style={{ marginTop: 30 }} name="cup" size={25} />
            </View>
        </TouchableOpacity>
    )
}

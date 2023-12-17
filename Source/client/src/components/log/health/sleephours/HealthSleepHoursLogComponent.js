import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HealthSleepHoursLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Sleep Hours</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View>
                <MaterialCommunityIcons style={{ marginTop: 30 }} name="power-sleep" size={25} />
            </View>
        </TouchableOpacity>
    )
}

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function HealthBloodPressureLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Blood Pressure</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View className="flex-row space-x-2">
                <FontAwesome style={{ marginTop: 30 }} name="heartbeat" size={25} />
                <Fontisto style={{ marginTop: 30 }} name="heartbeat" size={25} />
            </View>
        </TouchableOpacity>
    )
}

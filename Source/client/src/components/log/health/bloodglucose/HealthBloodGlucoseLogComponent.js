import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function HealthBloodGlucoseLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Blood Glucose</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View className="flex-row space-x-2">
                <Fontisto style={{ marginTop: 30 }} name="blood-drop" size={25} />
                <Fontisto style={{ marginTop: 30 }} name="blood" size={25} />
            </View>
        </TouchableOpacity>
    )
}

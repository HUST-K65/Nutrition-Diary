import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function HealthBodyFatLogComponent() {
    return (
        <TouchableOpacity className="flex-row m-3 p-3 bg-white rounded-2xl justify-between">
            <View className="space-y-2">
                <Text className="text-gray-700 text-lg font-bold">Body Fat</Text>
                <Text className="text-gray-700 text-lg">Recorded - tap to edit</Text>
            </View>
            <View className="flex-row space-x-2">
                <FontAwesome style={{ marginTop: 30 }} name="percent" size={25} />
            </View>
        </TouchableOpacity>
    )
}

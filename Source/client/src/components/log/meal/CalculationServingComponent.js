import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Icon from "react-native-feather";

export default function CalculationServingComponent() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let title = params.title;
    return (
        <View className="h-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">{title}</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <View className="absolute flex-row bottom-0 flex-1 h-80 w-full bg-white items-end p-3 space-x-8">
                <Entypo style={{ color: "gray" }} name="calculator" size={32} />
                <TextInput className="w-32 border-b-2 border-orange-500" defaultValue="1" inputMode="numeric" autoFocus={true} style={{ fontSize: 20 }} />
                <Text className="text-xl">Servings</Text>
            </View>
        </View>
    )
}

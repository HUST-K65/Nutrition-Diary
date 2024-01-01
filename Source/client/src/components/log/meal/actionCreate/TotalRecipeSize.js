import { useNavigation } from '@react-navigation/native';
import React, { } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";

export default function TotalRecipeSize() {
    const navigation = useNavigation();
    return (
        <View>
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Total Recipe Size</Text>
                <Text className="text-white text-sm">Done</Text>
            </View>
        </View>
    )

}

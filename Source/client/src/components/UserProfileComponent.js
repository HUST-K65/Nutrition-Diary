import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function UserProfileComponent() {
    const navigation = useNavigation();
    const user = window.viewer;
    console.log(user)
    return (
        <ScrollView showsVerticalScrollIndicator={false}
        >
            <View className="absolute flex-row h-20 w-full bg-orange-500 items-start p-3 pt-8 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Me</Text>
            </View>
            <View className="items-center mt-24 mb-4">
                <View className="w-20 rounded-full bg-gray-400">
                    <AntDesign name="user" size={80} style={{
                        color: "white"
                    }} />
                </View>
            </View>

            <View className="p-3 space-y-8 bg-white rounded-xl">
                <View className="space-y-4">
                    <View className="flex-row space-x-4 items-center justify-between">
                        <Text className="font-bold text-lg">ID: </Text>
                        <Text>{user.id}</Text>
                    </View>
                    <View className="flex-row space-x-4 items-center justify-between">
                        <Text className="font-bold text-lg">Username: </Text>
                        <Text>{user.name}</Text>
                    </View>
                    <View className="flex-row space-x-4 items-center justify-between">
                        <Text className="font-bold text-lg">Phone: </Text>
                        <Text>{user.phone}</Text>
                    </View>
                    <View className="flex-row space-x-4 items-center justify-between">
                        <Text className="font-bold text-lg">Role: </Text>
                        <Text>{user.role}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

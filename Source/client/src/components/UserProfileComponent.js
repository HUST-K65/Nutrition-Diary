import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, Button, Alert } from 'react-native'
import * as Icon from "react-native-feather";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { API_URL } from "@env"



export default function UserProfileComponent() {
    const navigation = useNavigation();
    const user = window.viewer;

    async function handleLogout() {
        await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/auth/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
        }
        ).then(async (response) => {
            const res = await response.json();
            if (res.message === "Đăng xuất thành công") {
                window.viewer = {}
                navigation.navigate("Login");
            } else {
                throw new Error("Unauthorize")
            }
        })
            .catch(function (error) {
                Alert.alert(
                    'Error',
                    error.message,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                    },
                );
            });
    }

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
            <View className="items-center p-3 mt-12">
                <TouchableOpacity
                    className="bg-orange-500 p-3 rounded-xl"
                    onPress={() => {
                        Alert.alert(
                            'Warning',
                            "Are you sure to logout?",
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    style: 'ok',
                                    onPress: () => handleLogout()
                                },
                            ],
                            {
                                cancelable: true,
                            },
                        );
                    }}
                >
                    <Text className="text-xl text-white">Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

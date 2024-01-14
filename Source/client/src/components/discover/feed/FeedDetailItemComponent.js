import { useNavigation, useRoute } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import * as Icon from "react-native-feather";

export default function FeedDetailItemComponent() {
    const navigation = useNavigation();
    let { params } = useRoute();
    let item = params?.item;
    return (
        <ScrollView>
            <View className="absolute flex-row h-20 w-full bg-orange-500 items-start p-3 pt-8 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Lose It!</Text>
            </View>
            <View className="mt-24 p-3 space-y-8">

                <Text className="text-4xl font-bold">{item.title}</Text>
                <Image source={{ uri: item.image }} className="w-full h-40" />
                <Text className="text-lg">{item.content}</Text>
            </View>
        </ScrollView>
    )

}

import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import * as Icon from "react-native-feather";

export default function CommentDetailComponent() {
    const navigation = useNavigation();
    var { params } = useRoute();
    const [comment, setComment] = useState("");
    var item = params?.item;
    var commentDetails = item ? item.commentDetails : [];
    return (
        <View className="h-full">
            <View className="absolute flex-row h-20 w-full bg-orange-500 items-start p-3 pt-8 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">POST</Text>
            </View>
            <View className="mt-20 p-3 bg-white space-y-4">
                <View className="flex-row space-x-4">
                    <Image source={{ uri: item.imageGroup }} className="w-16 h-16 rounded-full" />
                    <View className="space-y-2 items-start">
                        <TouchableOpacity>
                            <Text className="text-blue-700 text-lg">{item.groupName}</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center space-x-2">
                            <Text className="text-lg font-bold">{item.userName}</Text>
                            <Text className="text-gray-500">{item.timeCreated} hour ago</Text>
                        </View>
                    </View>
                </View>
                <Text className="text-lg">{item.content}</Text>
            </View>
            <View>
                {
                    commentDetails.length ? commentDetails.map((item, index) => {
                        return (
                            <View key={index} className="p-3 flex-row space-x-6 items-center" >
                                <Image source={{ uri: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png" }} className="w-12 h-12" />
                                <View className="bg-white rounded-xl p-3">
                                    <Text className="text-blue-700 font-bold text-xl">{item.name}</Text>
                                    <Text>{item.comment}</Text>
                                </View>
                            </View>
                        )
                    }) : null
                }
            </View>
            <View className="flex-row p-3 absolute bottom-0 h-20 space-x-4 items-center">
                <TextInput
                    className="border border-gray-500 rounded-xl p-3 w-72"
                    placeholder='Write a comment'
                    value={comment}
                    onChangeText={text => setComment(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        commentDetails.push({ ...window.viewer, comment: comment })
                        item.numberOfComment++
                        setComment("")
                    }}
                >
                    <Text className="text-blue-700 text-xl font-bold">POST</Text>
                </TouchableOpacity>
            </View>
        </View >
    )

}

import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const cssInputFocus = {
    border: "border-2 border-orange-500",
}

export default function CreateFoodComponent() {
    const navigation = useNavigation();
    const [focusInput, setFocusInput] = useState();
    const textInputRef = useRef(null);


    const handleCheckFocus = () => {
        textInputRef.current.focus();
        console.log(textInputRef.current)
        textInputRef.current.className = "border-orange-500 w-64";
        textInputRef.current.placeholder = 'Search';
        setFocusInput(true);
        if (textInputRef.current) {
            const focused = textInputRef.current.isFocused();
            console.log('Is TextInput focused?', focused);
        }
    };

    return (
        <View>
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Create New Food</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <ScrollView
                className="mt-20"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row flex-1 bg-white space-x-6">
                    <MaterialCommunityIcons name="food-fork-drink" size={30} />
                    <View className="p-3">
                        <TextInput
                            ref={textInputRef}
                            className="border-2 border-gray-300 w-64"
                        >

                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity onPress={handleCheckFocus}>
                    <Text>check</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )

}

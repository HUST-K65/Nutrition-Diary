import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather";

const cssInput = {
    borderFocused: "border-2 border-orange-500",
    borderUnFocused: "border-2 border-gray-300",
    placeholderTextColorFocused: "orange",
    placeholderTextColorUnFocused: "gray",
    styles: {
        fontSize: 18
    }
}

export default function PopUpWeightComponent() {
    const navigation = useNavigation();
    let { params } = useRoute();
    let datePick = params?.datePick;
    let input = useRef(null);

    useEffect(() => {
        input.current.focus();
    }, [])

    return (
        <View>
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">{datePick ? datePick : null}</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <View className="mt-20 p-3 rounded-full">
                <TextInput
                    placeholder="Weight"
                    style={cssInput.styles}
                    ref={input}
                    inputMode="numeric"
                    placeholderTextColor={cssInput.placeholderTextColorFocused}
                    className={"rounded-xl p-3 h-16 w-full " + cssInput.borderFocused}
                />
            </View>
        </View>
    )
}

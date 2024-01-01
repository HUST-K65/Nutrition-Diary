import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

export default function CreateCaloriesComponent() {
    const navigation = useNavigation();
    const [indexInputFocus, setIndexInputFocus] = useState(1);
    return (
        <View>
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">Add Calories</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <ScrollView
                className="mt-20 p-3 space-y-5"
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-xl p-3 space-y-4">
                    <Text className="font-bold text-lg">Log calories</Text>
                    <TextInput
                        placeholder="Calories"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 1 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(1)}
                        className={"rounded-xl p-3 h-16 w-full " + (indexInputFocus === 1 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                </View>
                <View className="bg-white rounded-xl p-3 space-y-4">
                    <Text className="font-bold text-lg">Nutrients (Optional)</Text>
                    <TextInput
                        placeholder="Fats (g)"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 2 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(2)}
                        className={"rounded-xl p-3 h-16 w-full " + (indexInputFocus === 2 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                    <TextInput
                        placeholder="Carbohydrates (g)"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 3 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(3)}
                        className={"rounded-xl p-3 h-16 w-full " + (indexInputFocus === 3 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                    <TextInput
                        placeholder="Protein (g)"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 4 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(4)}
                        className={"rounded-xl p-3 h-16 w-full " + (indexInputFocus === 4 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                </View>
                <View className="bg-white rounded-xl p-3 space-y-4">
                    <Text className="font-bold text-lg">Detail (Optional)</Text>
                    <TextInput
                        placeholder="Description"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 5 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(5)}
                        className={"rounded-xl p-3 h-28 w-full " + (indexInputFocus === 5 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                </View>
            </ScrollView>
        </View>
    )

}

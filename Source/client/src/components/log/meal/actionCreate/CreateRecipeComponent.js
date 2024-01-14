import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import * as Icon from "react-native-feather";
import AntDesign from 'react-native-vector-icons/AntDesign'

const cssInput = {
    borderFocused: "border-2 border-orange-500",
    borderUnFocused: "border-2 border-gray-300",
    placeholderTextColorFocused: "orange",
    placeholderTextColorUnFocused: "gray",
    styles: {
        fontSize: 18
    }
}

export default function CreateRecipeComponent() {
    const navigation = useNavigation();
    const textInputRef = useRef(null);
    const [indexInputFocus, setIndexInputFocus] = useState(0);
    return (
        <View>
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">New Recipe</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <ScrollView className="mt-20 space-y-4 p-3">
                <Text className="text-2xl">Recipe Details</Text>
                <View className="bg-white space-y-6 p-3">
                    <TextInput
                        ref={textInputRef}
                        placeholder="Recipe Name (required)"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 1 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(1)}
                        className={"rounded-xl p-3 h-16 w-88 " + (indexInputFocus === 1 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                    <TextInput
                        placeholder="Author or Website"
                        style={cssInput.styles}
                        placeholderTextColor={indexInputFocus === 2 ? cssInput.placeholderTextColorFocused : cssInput.placeholderTextColorUnFocused}
                        onFocus={() => setIndexInputFocus(2)}
                        className={"rounded-xl p-3 h-16 w-88 " + (indexInputFocus === 2 ? cssInput.borderFocused : cssInput.borderUnFocused)}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("IconPopup")}
                        className="rounded-xl flex-row items-center justify-between p-3 h-16 w-88 border-2 border-gray-300"
                    >
                        <Text className="text-gray-500 text-xl">Recipe</Text>
                        <AntDesign name="folder1" style={{ color: "#864f39" }} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CalculationServing", { title: "Total Recipe Size" })}
                        className="flex-row rounded-xl items-center justify-between p-3 h-16 w-88 border-2 border-gray-300"
                    >
                        <Text className="text-gray-500 text-xl">Total Recipe Size</Text>
                        <AntDesign name="caretdown" size={15} />
                    </TouchableOpacity>
                </View>
                <Text className="text-2xl">Ingredients</Text>
                <View className="bg-white space-y-4 p-6 rounded-xl">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddFood")}
                        className="flex-row space-x-6"
                    >
                        <AntDesign name="plus" size={24} style={{ color: "blue" }} />
                        <Text className="text-blue-500 text-lg">Add Food</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-2xl">Nutrition</Text>
                <View className="bg-white space-y-4 p-3 rounded-xl">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CalculationServing", { title: "Portion Size" })}
                        className="rounded-xl items-start justify-center p-3 h-16 w-88 border-2 border-gray-300"
                    >
                        <Text className="text-gray-500 text-xl">Portion Size</Text>
                    </TouchableOpacity>
                    <View className="p-3 flex-row items-center justify-between">
                        <View className="items-start">
                            <Text className="text-5xl text-gray-500">0</Text>
                            <Text>Calories</Text>
                        </View>
                        <View className="items-start">
                            <Text className="text-lg text-gray-700">Total Fat</Text>
                            <Text className="text-lg text-gray-700">Sat. Fat</Text>
                            <Text className="text-lg text-gray-700">Cholest.</Text>
                            <Text className="text-lg text-gray-700">Sodium</Text>
                            <Text className="text-lg text-gray-700">Carb</Text>
                            <Text className="text-lg text-gray-700">Fiber</Text>
                            <Text className="text-lg text-gray-700">Sugars</Text>
                            <Text className="text-lg text-gray-700">Protein</Text>
                        </View>
                        <View className="items-start">
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                            <Text className="text-lg text-gray-700">0g</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-white space-y-4 p-3 rounded-xl mb-8">
                    <TextInput className="p-6 border-2 border-gray-300 h-32 rounded-xl" placeholder='Notes' placeholderTextColor="gray" style={{ fontSize: 20 }} />
                </View>
            </ScrollView>
        </View>
    )
}

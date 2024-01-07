import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function addAction(navigation, category) {
    let path = "";
    path = category ? "Add" + category : "";
    navigation.navigate(path)
}

export default function ItemAlignComponentForExercise({ items, collapsed, category }) {
    const navigation = useNavigation();
    return (
        <View>
            {
                collapsed ?
                    <View className="flex-row">
                        <ScrollView
                            className="space-x-1"
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 15
                            }}
                        >
                            {
                                items && items.length ? items.map((item, index) => {
                                    let imageUri = item.exercise.image ? item.exercise.image : "https://cdn-icons-png.flaticon.com/512/5783/5783140.png";
                                    return (
                                        <Image key={index} source={{ uri: imageUri }} className="w-12 h-12" />
                                    )
                                }) : null
                            }
                        </ScrollView>
                        <TouchableOpacity
                            className="rounded-full bg-sky-200 p-4 items-center ml-2"
                            onPress={() => addAction(navigation, category)}
                        >
                            <Text className="text-sky-600">Add {category}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        {
                            items && items.length ? items.map((item, index) => {
                                let imageUri = item.exercise.image ? item.exercise.image : "https://cdn-icons-png.flaticon.com/512/5783/5783140.png";
                                return (
                                    <View key={index} className="flex flex-1 flex-row justify-between">
                                        <View className="flex-row space-x-4">
                                            <Image key={index} source={{ uri: imageUri }} className="w-12 h-12" />
                                            <View>
                                                <Text className="text-lg">{item.exercise.name}</Text>
                                                <Text className="text-gray-500">
                                                    {category === "Exercise" ?
                                                        (item.userExerciseTime ? item.userExerciseTime : item.exercise.exerciseTime) : "1 servings"
                                                    } minutes
                                                </Text>
                                            </View>
                                        </View>
                                        <Text className="text-lg">{item.userCalories ? item.userCalories : item.exercise.calories}</Text>
                                    </View>
                                )
                            }) : null
                        }

                        <TouchableOpacity
                            className="rounded-full bg-sky-200 p-4 items-center w-32 ml-56 mt-4"
                            onPress={() => addAction(navigation, category)}
                        >
                            <Text className="text-sky-600">Add {category}</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

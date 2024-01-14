import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import * as Icon from "react-native-feather";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { API_URL } from "@env"
import { categories } from '../../../../constants'

export default function FoodEditServingComponent() {
    let { params } = useRoute();
    const navigation = useNavigation();
    let item = params?.item;
    let meal = params?.timeToMeal;
    let imageSouce = item && item.image ? { uri: item.image } : categories[0].image;

    const handleDelete = async () => {
        const viewer = window.viewer;
        const food_id = item ? item._id : '';
        await fetch(`${API_URL}/food/${food_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${viewer.token}`,
                "Content-Type": "application/json",
            }
        })
            .then(async (response) => {
                const res = await response.json();
                if (res.message === "Thành công") {
                    navigation.navigate("AddFood");
                } else if (res.code === 400) {
                    throw new Error(res.message || "DB Error")
                }
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ],
                    {
                        cancelable: true,
                    }
                );
            });
    }

    const handleCreateLog = async (food) => {
        const viewer = window.viewer;
        const user_id = viewer.id;

        await fetch(`${API_URL}/mealDiary`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${viewer.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user_id,
                foodId: food._id,
                diaryType: meal,
            }),
        })
            .then(async (response) => {
                const res = await response.json();
                if (!res.data) {
                    throw new Error(res.message)
                }

                Alert.alert(
                    "Add food to meal success",
                    `Successfully add ${food.name} to ${meal}`,
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                        {
                            text: "OK",
                            style: "ok",
                            onPress: () => navigation.navigate("Homepage")
                        },
                    ],
                    {
                        cancelable: true,
                    }
                );
            })
            .catch(function (error) {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ],
                    {
                        cancelable: true,
                    }
                );
            });
    };

    return (
        <View className="bg-white h-full w-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8"
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">{item ? item.name : null}</Text>
                <TouchableOpacity
                    onPress={() => handleCreateLog(item)}
                >
                    <Text className="text-white text-sm">Save</Text>
                </TouchableOpacity>

            </View>
            <View className="mt-24 p-3 items-center">
                <Text className="text-3xl font-bold text-gray-600">Nutritional Value</Text>
            </View>
            <View className="items-center">
                <Image source={imageSouce} className="w-24 h-24" />
            </View>
            <View className="flex-row items-center justify-between p-3">
                <View className="space-y-2 items-center p-3">
                    <Text className="text-5xl font-bold text-gray-500">{item ? item.calories : 0}</Text>
                    <Text className="text-xl text-gray-600">Calories</Text>
                </View>
                <View>
                    <Text className="text-lg text-gray-500">Total Fat</Text>
                    <Text className="text-lg text-gray-500">Sat. Fat</Text>
                    <Text className="text-lg text-gray-500">Cholest</Text>
                    <Text className="text-lg text-gray-500">Sodium</Text>
                    <Text className="text-lg text-gray-500">Carb</Text>
                    <Text className="text-lg text-gray-500">Fiber</Text>
                    <Text className="text-lg text-gray-500">Sugars</Text>
                    <Text className="text-lg text-gray-500">Protein</Text>
                </View>
                <View>
                    <Text className="text-lg text-gray-500">{item && item.fat ? item.fat : "n/a"} (g)</Text>
                    <Text className="text-lg text-gray-500">{item && item.saturatedFat ? item.saturatedFat : "n/a"} (g)</Text>
                    <Text className="text-lg text-gray-500">{item && item.cholesterol ? item.cholesterol : "n/a"} (mg)</Text>
                    <Text className="text-lg text-gray-500">{item && item.sodium ? item.sodium : "n/a"} (mg)</Text>
                    <Text className="text-lg text-gray-500">{item && item.carbohydrate ? item.carbohydrate : "n/a"} (g)</Text>
                    <Text className="text-lg text-gray-500">{item && item.fiber ? item.fiber : "n/a"} (mg)</Text>
                    <Text className="text-lg text-gray-500">{item && item.sugars ? item.sugars : "n/a"} (g)</Text>
                    <Text className="text-lg text-gray-500">{item && item.protein ? item.protein : "n/a"} (g)</Text>
                </View>
            </View>
            <View className="p-4 pt-8 flex-row items-center justify-between">
                <TouchableOpacity className="flex-row space-x-4"
                    onPress={() => {
                        Alert.alert(
                            "Warning",
                            "Are you sure to delete this food?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "OK",
                                    style: "ok",
                                    onPress: () => handleDelete()
                                },
                            ],
                            {
                                cancelable: true,
                            }
                        );
                    }}
                >
                    <AntDesign style={{ color: "red" }} name="delete" size={30} />
                    <Text className="text-lg text-red-400">Delete this food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row space-x-2 items-center"
                    onPress={() => navigation.navigate("CreateFood", { item })}
                >
                    <Entypo name="edit" size={20} style={{ color: "blue" }} />
                    <Text className="text-lg text-blue-400">Edit nutrition</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

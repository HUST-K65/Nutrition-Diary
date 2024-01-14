import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, ScrollView, Image } from 'react-native'
import * as Icon from "react-native-feather";
import { PieChart } from 'react-native-chart-kit';
import Entypo from 'react-native-vector-icons/Entypo';
import { categories } from '../../../../constants';

export default function MealSummaryComponent() {
    const navigation = useNavigation();


    let { params } = useRoute();
    let timeToMeal = params?.timeToMeal;
    let dataItems = params?.dataItems;
    let totalCalories = 0;

    let saturatedFat = 0;
    let cholesterol = 0;
    let sodium = 0;


    let fiber = 0;
    let sugars = 0;

    let protein = 0;

    dataItems.forEach(item => {
        totalCalories += item.calories;

        saturatedFat = saturatedFat + (item.saturatedFat ? item.saturatedFat : 0);
        cholesterol = cholesterol + (item.cholesterol ? item.cholesterol / 1000 : 0);
        sodium = sodium + (item.sodium ? item.sodium / 1000 : 0);

        fiber = fiber + (item.fiber ? item.fiber : 0);
        sugars = sugars + (item.sugars ? item.sugars : 0);

        protein = protein + (item.protein ? item.protein : 0);
    })

    const { width: screenWidth } = useWindowDimensions();
    let fat = saturatedFat + cholesterol + sodium;
    let carbohydrates = fiber + sugars;

    const data = [
        {
            name: "Fat",
            weight: fat,
            color: "orange",
            legendFontColor: "#7F727F",
            legendFontSize: 15
        },
        {
            name: "Carbohydrates",
            weight: carbohydrates,
            color: "cyan",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Protein",
            weight: protein,
            color: "purple",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];

    return (
        <View className="h-full w-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">{timeToMeal} Summary</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <ScrollView
                className="mt-20 mb-8 space-y-4 p-3"
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-xl">
                    <PieChart
                        data={data}
                        width={screenWidth - 25}
                        height={200}
                        chartConfig={{
                            color: (opacity) => `rgba(255,255,255,${opacity})`
                        }}
                        accessor={"weight"}
                        backgroundColor={"transparent"}
                        paddingLeft={"0"}
                    />
                    <View className="flex-row items-center justify-between p-3">
                        <View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} style={{ color: "orange" }} />
                                    <Text className="font-bold text-xl">Fat</Text>
                                </View>
                                <Text className="ml-10 text-lg">Saturated Fat</Text>
                                <Text className="ml-10 text-lg">Cholesterol</Text>
                                <Text className="ml-10 text-lg">Sodium</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} style={{ color: "cyan" }} />
                                    <Text className="font-bold text-xl">Carbohydrates</Text>
                                </View>
                                <Text className="ml-10 text-lg">Fiber</Text>
                                <Text className="ml-10 text-lg">Sugars</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} style={{ color: "purple" }} />
                                    <Text className="font-bold text-xl">Protein</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} />
                                    <Text className="font-bold text-xl">{fat.toFixed(2)} g</Text>
                                </View>
                                <Text className="ml-10 text-lg">{saturatedFat} g</Text>
                                <Text className="ml-10 text-lg">{cholesterol} mg</Text>
                                <Text className="ml-10 text-lg">{sodium} mg</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} />
                                    <Text className="font-bold text-xl">{carbohydrates.toFixed(2)} g</Text>
                                </View>
                                <Text className="ml-10 text-lg">{fiber} g</Text>
                                <Text className="ml-10 text-lg">{sugars} g</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} />
                                    <Text className="font-bold text-xl">{protein.toFixed(2)} g</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Text className="text-2xl font-bold">{timeToMeal}: {totalCalories} calories</Text>
                <View className="bg-white rounded-xl p-4 space-y-4">
                    {
                        dataItems && dataItems.length ?
                            dataItems.map((item, index) => {
                                let imageSource = item && item.image ? { uri: item.image } : categories[0].image;
                                return (
                                    <View key={index} className="flex-row items-center justify-between">
                                        <View className="flex-row space-x-2">
                                            <Image source={imageSource} className="h-12 w-12" />
                                            <View>
                                                <Text className="text-lg">{item.name}</Text>
                                                <Text>1 Servings</Text>
                                            </View>
                                        </View>
                                        <Text>{item.calories} calories</Text>
                                    </View>
                                )
                            })
                            : null
                    }
                </View>
            </ScrollView>
        </View>
    )
}

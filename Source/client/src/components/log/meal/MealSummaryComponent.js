import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, ScrollView, Image } from 'react-native'
import * as Icon from "react-native-feather";
import { PieChart } from 'react-native-chart-kit';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'

const data = [
    {
        name: "Fat",
        weight: 5,
        color: "orange",
        legendFontColor: "#7F727F",
        legendFontSize: 15
    },
    {
        name: "Carbohydrates",
        weight: 8,
        color: "cyan",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Protein",
        weight: 5,
        color: "purple",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
];

export default function MealSummaryComponent() {
    const navigation = useNavigation();
    let { params } = useRoute();
    let timeToMeal = params?.timeToMeal;
    let dataItems = params?.dataItems;
    const { width: screenWidth } = useWindowDimensions();

    // const options1 = {
    //     method: 'GET',
    //     url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/search',
    //     params: {
    //         query: 'apple',
    //         offset: '0',
    //         number: '10'
    //     },
    //     headers: {
    //         "content-type": "application/json",
    //         'X-RapidAPI-Key': 'd729d8979bmsh4ebe6f3f79e30dcp1949fdjsn66ca1b67d63c',
    //         'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    //     }
    // };

    // const options = {
    //     method: 'GET',
    //     url: 'https://dietagram.p.rapidapi.com/apiFood.php',
    //     params: {
    //         name: 'Jabłko',
    //         lang: 'pl'
    //     },
    //     headers: {
    //         "content-type": "application/json",
    //         'X-RapidAPI-Key': 'd729d8979bmsh4ebe6f3f79e30dcp1949fdjsn66ca1b67d63c',
    //         'X-RapidAPI-Host': 'dietagram.p.rapidapi.com'
    //     }
    // };
    // const op = {
    //     method: 'GET',
    //     url: 'http://www.khanacademy.org/api/v1/topictree?kind=Exercise',

    //     headers: {
    //         "content-type": "application/json",

    //     }
    // }

    // try {
    //     const response = axios.request(op)
    //         .then(res => console.log("vao res", res.data));
    //     console.log(response.data);
    // } catch (error) {
    //     console.error("vao erroe", error);
    // }

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
                                    <Text className="font-bold text-xl">5g</Text>
                                </View>
                                <Text className="ml-10 text-lg">0g</Text>
                                <Text className="ml-10 text-lg">0mg</Text>
                                <Text className="ml-10 text-lg">0mg</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} />
                                    <Text className="font-bold text-xl">8g</Text>
                                </View>
                                <Text className="ml-10 text-lg">0g</Text>
                                <Text className="ml-10 text-lg">0g</Text>
                            </View>
                            <View>
                                <View className="flex-row items-center">
                                    <Entypo name="dot-single" size={60} />
                                    <Text className="font-bold text-xl">5g</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Text className="text-2xl">{timeToMeal}: 3.076</Text>
                <View className="bg-white rounded-xl p-4 space-y-4">
                    {
                        dataItems && dataItems.length ?
                            dataItems.map((item, index) => {
                                return (
                                    <View key={index} className="flex-row items-center justify-between">
                                        <View className="flex-row space-x-2">
                                            <Image source={item.image} className="h-12 w-12" />
                                            <View>
                                                <Text className="text-lg">{item.name}</Text>
                                                <Text>1 Servings</Text>
                                            </View>
                                        </View>
                                        <Text>122</Text>
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

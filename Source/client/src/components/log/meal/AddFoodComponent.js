import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import * as Icon from "react-native-feather";
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MealConstants from './MealConstants'
import { categories, fakeMealsLog, fakeRecipes } from '../../../../constants'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

function tabBarHeader(indexActive, setIndexActive, navigation = null) {
    const textColorActive = "text-orange-700";
    const textColorInactive = "text-white";
    const bgColorActive = { backgroundColor: "white" }
    return (
        <View className="bg-orange-500 h-32 p-5 space-y-4">
            <View className="flex-row items-center justify-center space-x-14">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <View className="flex-row items-center justify-center border-b-2 border-white">
                    <Icon.Search height="25" width="25" stroke="white" />
                    <TextInput placeholder='Search' placeholderTextColor="white" style={{ fontSize: 20, color: "white" }} className="w-40 rounded-xl p-3" keyboardType='default' />
                </View>

                <Icon.MoreVertical stroke="white" strokeWidth={3} />
            </View>
            <View className="flex-1 flex-row items-center space-x-5 justify-center">
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 0 ? bgColorActive : null}
                    onPress={() => setIndexActive(0)}
                >
                    <Text className={indexActive === 0 ? textColorActive : textColorInactive}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 1 ? { backgroundColor: "white" } : null}
                    onPress={() => setIndexActive(1)}
                >
                    <Text className={indexActive === 1 ? textColorActive : textColorInactive}>My Foods</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 2 ? bgColorActive : null}
                    onPress={() => setIndexActive(2)}
                >
                    <Text className={indexActive === 2 ? textColorActive : textColorInactive}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 3 ? bgColorActive : null}
                    onPress={() => setIndexActive(3)}
                >
                    <Text className={indexActive === 3 ? textColorActive : textColorInactive}>Recipes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function bodySearchTemplate(indexActive, navigation) {
    if (indexActive === 0) {
        return (
            <Animated.View
                className="bg-white h-full p-2 space-y-8"
                entering={FadeInLeft.duration(100)}
            >
                <View className="p-3 border-gray-300 border-b-2">
                    <Text className="text-lg">Create</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateFood")}
                    className="flex-row ml-6 items-center space-x-6"
                >
                    <MaterialCommunityIcons name="food-fork-drink" size={30} />
                    <Text className="text-lg">Create New Food</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row ml-6 items-center space-x-6">
                    <Feather name="folder-plus" size={30} />
                    <Text className="text-lg">Create a Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row ml-6 items-center space-x-6">
                    <FontAwesome5 name="cart-plus" size={30} />
                    <Text className="text-lg">Add Calories</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

function bodyMyFoodsTemplate(indexActive, setIndexActive, navigation) {
    if (indexActive === 1) {
        return (
            <Animated.ScrollView
                entering={FadeInLeft.duration(100)}
                className="space-y-8 mb-20"
                showsVerticalScrollIndicator={false}
            >
                {
                    categories.map((item, index) => {
                        let firstLetter = item.name[0];
                        let nextItem = index < categories.length - 1 ? categories[index + 1] : categories[index - 1];
                        let prevItem = index > 0 ? categories[index - 1] : categories[0];
                        let isDifferentLine = nextItem.name[0] !== firstLetter || index === categories.length - 1;
                        let isDifferentLetter = prevItem.name[0] !== firstLetter;
                        return (
                            <View key={index} className={"p-2 space-y-4" + (isDifferentLine ? " border-b-2 border-gray-200" : "")}>
                                {
                                    isDifferentLetter || index === 0 ?
                                        <Text className="text-xl ml-4">
                                            {firstLetter}
                                        </Text> : null
                                }
                                <View className="flex-row items-center justify-between pl-2">
                                    <View className="flex-row space-x-6">
                                        <Image source={item.image} className="w-12 h-12" />
                                        <View>
                                            <Text className="text-lg">{item.name}</Text>
                                            <Text className="text-sm text-gray-600">2.222 cals</Text>
                                        </View>
                                    </View>
                                    <Text className="text-lg text-gray-600">Th 2</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View className="space-y-8">
                    <View className="p-3">
                        <Text className="text-lg">Lof New Food</Text>
                    </View>
                    <TouchableOpacity
                        className="flex-row ml-6 items-center space-x-6"
                        onPress={() => setIndexActive(0)}
                    >
                        <FontAwesome5 name="search" size={30} />
                        <Text className="text-lg">Search For Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-row ml-6 items-center space-x-6"
                        onPress={() => navigation.navigate("CreateFood")}
                    >
                        <MaterialCommunityIcons name="food-fork-drink" size={30} />
                        <Text className="text-lg">Create New Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row ml-6 items-center space-x-6">
                        <Feather name="folder-plus" size={30} />
                        <Text className="text-lg">Create a Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row ml-6 items-center space-x-6">
                        <FontAwesome5 name="cart-plus" size={30} />
                        <Text className="text-lg">Add Calories</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        )
    }
}

function bodyMealsTemplate(indexActive, timeToMeal) {
    if (indexActive === 2) {
        let { nameIcon, colorBgIcon } = getCssByTimeToMeal(timeToMeal);
        return (
            <Animated.ScrollView
                entering={FadeInRight.duration(100)}
                className="space-y-8 mb-20"
                showsVerticalScrollIndicator={false}
            >
                {
                    fakeMealsLog.map((item, index) => {
                        return (
                            <View key={index} className="p-2 space-y-4 border-b-2 border-gray-200">
                                <Text className="text-xl ml-2">
                                    {item.time}
                                </Text>
                                <View className="flex-row items-center justify-between pl-2">
                                    <View className="flex-row space-x-6">
                                        <View className={"rounded-full " + colorBgIcon + " p-3"}>
                                            <Feather name={nameIcon} size={22} style={{ color: "white" }} />
                                        </View>
                                        <View>
                                            <Text className="text-lg">{timeToMeal + " - " + item.calories + " cals"}</Text>
                                            <Text className="text-sm text-gray-600">{item.food}</Text>
                                        </View>
                                    </View>
                                    <Text className="text-lg text-gray-600">{item.day}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </Animated.ScrollView>
        )
    }
}

function bodyRecipesTemplate(indexActive) {
    if (indexActive === 3) {
        return (
            <Animated.ScrollView
                entering={FadeInRight.duration(100)}
                className="space-y-4 mb-20"
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center p-3 border-b-2 border-gray-100">
                    <TouchableOpacity
                    >
                        <Text className="text-lg text-blue-500 font-semibold">Create Recipe</Text>
                    </TouchableOpacity>
                </View>
                <View className="space-y-8">
                    {

                        fakeRecipes.map((item, index) => {
                            let firstLetter = item.name[0];
                            let nextItem = index < fakeRecipes.length - 1 ? fakeRecipes[index + 1] : categories[index - 1];
                            let prevItem = index > 0 ? fakeRecipes[index - 1] : fakeRecipes[0];
                            let isDifferentLine = nextItem.name[0] !== firstLetter;
                            let isDifferentLetter = prevItem.name[0] !== firstLetter;
                            return (
                                <View key={index} className={"p-2 space-y-2" + (isDifferentLine ? " border-b-2 border-gray-200" : "")}>
                                    {
                                        isDifferentLetter || index === 0 ?
                                            <Text className="text-xl ml-4">
                                                {firstLetter}
                                            </Text> : null
                                    }
                                    <View className="flex-row items-center justify-between pl-2 pr-2">
                                        <View className="flex-row space-x-6">
                                            <FontAwesome5 name="folder" size={40} />
                                            <View>
                                                <Text className="text-xl">{item.name}</Text>
                                                <Text className="text-sm text-gray-600">{item.author + " - " + item.totalCalories + " cals per servings"}</Text>
                                            </View>
                                        </View>
                                        <Text className="text-lg text-gray-600">{item.day}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </Animated.ScrollView>
        )
    }
}

function footerTemplate(timeToMeal = "") {
    let { nameIcon, colorBgIcon } = getCssByTimeToMeal(timeToMeal);

    return (
        <View className="absolute flex-row items-center justify-between bottom-0 w-full h-16 bg-blue-500 p-2 pr-4 pl-4">
            <View className="flex-row items-center space-x-4">
                <View className={"rounded-full " + colorBgIcon + " p-3"}>
                    <Feather name={nameIcon} size={22} style={{ color: "white" }} />
                </View>
                <Text className="text-white text-2xl">{timeToMeal}</Text>
            </View>
            <TouchableOpacity>
                <Text className="text-white text-lg font-bold">Done</Text>
            </TouchableOpacity>
        </View>
    )
}

function getCssByTimeToMeal(timeToMeal) {
    let nameIcon = "";
    let colorBgIcon = "bg-orange-500";

    switch (timeToMeal) {
        case MealConstants.BREAKFAST:
            nameIcon = "sunrise";
            break;
        case MealConstants.LUNCH:
            nameIcon = "sun";
            break;
        case MealConstants.DINNER:
            nameIcon = "moon";
            colorBgIcon = "bg-purple-800"
            break;
        case MealConstants.SNACK:
            nameIcon = "clock";
            colorBgIcon = "bg-blue-800";
            break;
        case "":
            break;
    }
    return { nameIcon, colorBgIcon };
}

export default function AddFoodComponent() {

    const [indexActive, setIndexActive] = useState(0);
    const navigation = useNavigation();
    let { params } = useRoute();
    let timeToMeal = params.timeToMeal;
    return (
        <View className="w-full h-full bg-white">
            {tabBarHeader(indexActive, setIndexActive, navigation)}
            {bodySearchTemplate(indexActive, navigation)}
            {bodyMyFoodsTemplate(indexActive, setIndexActive, navigation)}
            {bodyMealsTemplate(indexActive, timeToMeal)}
            {bodyRecipesTemplate(indexActive)}
            {footerTemplate(timeToMeal)}
        </View>
    )

}

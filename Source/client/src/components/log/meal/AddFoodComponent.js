import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { API_URL } from "@env";
import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import * as Icon from "react-native-feather";
import { categories } from '../../../../constants'
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MealConstants from "./MealConstants";
import { fakeMealsLog, fakeRecipes } from "../../../../constants";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { formatDate } from "../../../../utils/date";

function tabBarHeader(indexActive, setIndexActive, navigation = null) {
  const textColorActive = "text-orange-700";
  const textColorInactive = "text-white";
  const bgColorActive = { backgroundColor: "white" };
  const [openModal, setOpenModal] = useState(false);
  return (
    <View className="bg-orange-500 h-32 p-5 space-y-4">
      <View className="flex-row items-center justify-center space-x-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft stroke="white" strokeWidth={3} />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center border-b-2 border-white">
          <Icon.Search height="25" width="25" stroke="white" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="white"
            style={{ fontSize: 20, color: "white" }}
            className="w-40 rounded-xl p-3"
            keyboardType="default"
          />
        </View>
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Icon.MoreVertical stroke="white" strokeWidth={3} />
        </TouchableOpacity>
        {openModal ? (
          <Modal animationType="fade" transparent={true} visible={openModal}>
            <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    className="p-3"
                    onPress={() => navigation.navigate("CreateFood")}
                  >
                    <Text>Create Food</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-3"
                    onPress={() => navigation.navigate("CreateCalories")}
                  >
                    <Text>Add Calories</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="p-3">
                    <Text>Scan Barcode</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        ) : null}
      </View>
      <View className="flex-1 flex-row items-center space-x-5 justify-center">
        <TouchableOpacity
          className="rounded-full pl-4 pr-4"
          style={indexActive === 0 ? bgColorActive : null}
          onPress={() => setIndexActive(0)}
        >
          <Text
            className={indexActive === 0 ? textColorActive : textColorInactive}
          >
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full pl-4 pr-4"
          style={indexActive === 1 ? { backgroundColor: "white" } : null}
          onPress={() => setIndexActive(1)}
        >
          <Text
            className={indexActive === 1 ? textColorActive : textColorInactive}
          >
            My Foods
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full pl-4 pr-4"
          style={indexActive === 2 ? bgColorActive : null}
          onPress={() => setIndexActive(2)}
        >
          <Text
            className={indexActive === 2 ? textColorActive : textColorInactive}
          >
            Meals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full pl-4 pr-4"
          style={indexActive === 3 ? bgColorActive : null}
          onPress={() => setIndexActive(3)}
        >
          <Text
            className={indexActive === 3 ? textColorActive : textColorInactive}
          >
            Recipes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
        <TouchableOpacity
          className="flex-row ml-6 items-center space-x-6"
          onPress={() => navigation.navigate("CreateRecipe")}
        >
          <Feather name="folder-plus" size={30} />
          <Text className="text-lg">Create a Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCalories")}
          className="flex-row ml-6 items-center space-x-6"
        >
          <FontAwesome5 name="cart-plus" size={30} />
          <Text className="text-lg">Add Calories</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

function bodyMyFoodsTemplate(
  indexActive,
  timeToMeal,
  setIndexActive,
  navigation
) {
  const [foods, setFoods] = useState([]);

  const fetchData = async () => {
    await fetch(`${API_URL}/food/getFood`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.viewer.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: window.viewer.id,
      }),
    })
      .then(async (response) => {
        const res = await response.json();
        setFoods(res.data);
      })
      .catch(function (error) {
        Alert.alert(
          "Error when get foods",
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (indexActive === 1) {
    return (
      <Animated.ScrollView
        entering={FadeInLeft.duration(100)}
        className="space-y-8 mb-20"
        showsVerticalScrollIndicator={false}
      >
        {foods &&
          foods.sort((a, b) =>
            a.name[0] < b.name[0] ? 1 : (b.name[0] < a.name[0] ? -1 : 0)
          ).map((item, index) => {
            let firstLetter = item.name[0];
            let nextItem =
              index < foods.length - 1 ? foods[index + 1] : foods[index - 1];
            let prevItem = index > 0 ? foods[index - 1] : foods[0];
            let isDifferentLine = nextItem.name[0] !== firstLetter;
            let isDifferentLetter = prevItem.name[0] !== firstLetter;
            let imageSource = item.image ? { uri: item.image.toString() } : categories[0].image;
            return (
              <TouchableOpacity key={index} onPress={() => navigation.navigate("FoodEditServing", { item, timeToMeal })}>
                <View
                  key={index}
                  className={
                    "p-2 space-y-4" +
                    (isDifferentLine ? " border-b-2 border-gray-200" : "")
                  }
                >
                  {isDifferentLetter || index === 0 ? (
                    <Text className="text-xl ml-4">{firstLetter}</Text>
                  ) : null}
                  <View className="flex-row items-center justify-between pl-2">
                    <View className="flex-row space-x-6">
                      <Image source={imageSource} className="w-12 h-12" />
                      <View>
                        <Text className="text-lg">{item.name}</Text>
                        <Text className="text-sm text-gray-600">
                          {item.calories} cals
                        </Text>
                      </View>
                    </View>
                    <Text className="text-lg text-gray-600">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        <View className="space-y-8">
          <View className="p-3">
            <Text className="text-lg">Log New Food</Text>
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
          <TouchableOpacity
            className="flex-row ml-6 items-center space-x-6"
            onPress={() => navigation.navigate("CreateRecipe")}
          >
            <Feather name="folder-plus" size={30} />
            <Text className="text-lg">Create a Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateCalories")}
            className="flex-row ml-6 items-center space-x-6"
          >
            <FontAwesome5 name="cart-plus" size={30} />
            <Text className="text-lg">Add Calories</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    );
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
        {fakeMealsLog.map((item, index) => {
          return (
            <View
              key={index}
              className="p-2 space-y-4 border-b-2 border-gray-200"
            >
              <Text className="text-xl ml-2">{item.time}</Text>
              <View className="flex-row items-center justify-between pl-2">
                <View className="flex-row space-x-6">
                  <View className={"rounded-full " + colorBgIcon + " p-3"}>
                    <Feather
                      name={nameIcon}
                      size={22}
                      style={{ color: "white" }}
                    />
                  </View>
                  <View>
                    <Text className="text-lg">
                      {timeToMeal + " - " + item.calories + " cals"}
                    </Text>
                    <Text className="text-sm text-gray-600">{item.food}</Text>
                  </View>
                </View>
                <Text className="text-lg text-gray-600">{item.day}</Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }
}

function bodyRecipesTemplate(indexActive, navigation) {
  if (indexActive === 3) {
    return (
      <Animated.ScrollView
        entering={FadeInRight.duration(100)}
        className="space-y-4 mb-20"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center p-3 border-b-2 border-gray-100">
          <TouchableOpacity onPress={() => navigation.navigate("CreateRecipe")}>
            <Text className="text-lg text-blue-500 font-semibold">
              Create Recipe
            </Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-8">
          {fakeRecipes.map((item, index) => {
            let firstLetter = item.name[0];
            let nextItem =
              index < fakeRecipes.length - 1
                ? fakeRecipes[index + 1]
                : fakeRecipes[index - 1];
            let prevItem = index > 0 ? fakeRecipes[index - 1] : fakeRecipes[0];
            let isDifferentLine = nextItem.name[0] !== firstLetter;
            let isDifferentLetter = prevItem.name[0] !== firstLetter;
            return (
              <View
                key={index}
                className={
                  "p-2 space-y-2" +
                  (isDifferentLine ? " border-b-2 border-gray-200" : "")
                }
              >
                {isDifferentLetter || index === 0 ? (
                  <Text className="text-xl ml-4">{firstLetter}</Text>
                ) : null}
                <View className="flex-row items-center justify-between pl-2 pr-2">
                  <View className="flex-row space-x-6">
                    <FontAwesome5 name="folder" size={40} />
                    <View>
                      <Text className="text-xl">{item.name}</Text>
                      <Text className="text-sm text-gray-600">
                        {item.author +
                          " - " +
                          item.totalCalories +
                          " cals per servings"}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-lg text-gray-600">{item.day}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
    );
  }
}

function footerTemplate(
  timeToMeal = null,
  dataItems = null,
  navigation = null
) {
  let { nameIcon, colorBgIcon } = getCssByTimeToMeal(timeToMeal);
  if (timeToMeal) {
    return (
      <View className="absolute flex-row items-center justify-between bottom-0 w-full h-16 bg-blue-500 p-2 pr-4 pl-4">
        <View className="flex-row items-center space-x-4">
          <View className={"rounded-full " + colorBgIcon + " p-3"}>
            <Feather name={nameIcon} size={22} style={{ color: "white" }} />
            {dataItems && dataItems.length ? (
              <View className="absolute top-0 left-9 w-4 h-4 rounded-full bg-white items-center">
                <Text
                  className="text-blue-500 font-bold"
                  style={{ fontSize: 12 }}
                >
                  {dataItems.length}
                </Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MealSummary", { timeToMeal, dataItems })
            }
          >
            <Text className="text-white text-2xl">{timeToMeal}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Text className="text-white text-lg font-bold">Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
      colorBgIcon = "bg-purple-800";
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
  let timeToMeal = params?.timeToMeal;
  let dataItems = params?.dataItems;

  return (
    <View className="w-full h-full bg-white">
      {tabBarHeader(indexActive, setIndexActive, navigation)}
      {bodySearchTemplate(indexActive, navigation)}
      {bodyMyFoodsTemplate(indexActive, timeToMeal, setIndexActive, navigation)}
      {bodyMealsTemplate(indexActive, timeToMeal)}
      {bodyRecipesTemplate(indexActive, navigation)}
      {footerTemplate(timeToMeal, dataItems, navigation)}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

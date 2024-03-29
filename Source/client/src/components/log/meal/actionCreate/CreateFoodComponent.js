import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import * as Icon from "react-native-feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from "react-native-check-box";
import { iconFoods } from "../../../../../constants";

const cssInput = {
  borderFocused: "border-2 border-orange-500",
  borderUnFocused: "border-2 border-gray-300",
  placeholderTextColorFocused: "orange",
  placeholderTextColorUnFocused: "gray",
  styles: {
    fontSize: 18,
  },
};

const fakeServing = [
  {
    name: "Serving Weight",
    weight: 152,
    unit: "grams",
  },
  {
    name: "Serving Volumns",
    weight: 709.76,
    unit: "Milliliters",
  },
  {
    name: "Serving Amount",
    weight: 7,
    unit: "1/10 Cans",
  },
  {
    name: "Serving Amount",
    weight: 7,
    unit: "1/10 Containers",
  },
];

export default function CreateFoodComponent() {
  const navigation = useNavigation();
  let { params } = useRoute();
  let item = params?.item;
  const [indexInputFocus, setIndexInputFocus] = useState(1);
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);

  const [name, setName] = useState(item?.name);
  const [brand, setBrand] = useState();
  const [calories, setCallories] = useState(item?.calories);

  const [fat, setFat] = useState(item?.fat);
  const [saturatedFat, setSaturatedFat] = useState(item?.saturatedFat);
  const [cholesterol, setCholesterol] = useState(item?.cholesterol);
  const [sodium, setSodium] = useState(item?.cholesterol);
  const [carbohydrate, setCarbohydrate] = useState(item?.carbohydrate);
  const [fiber, setFiber] = useState(item?.fiber);
  const [sugar, setSugar] = useState(item?.sugar);
  const [protein, setProtein] = useState(item?.protein);

  const textInputRef = useRef(null);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  let fakeSerivingData = useMemo(() => {
    return fakeServing.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          className="p-2 w-full border-b-2 border-gray-200"
        >
          <Text className="text-lg font-bold">{item.name}</Text>
          <View className="flex-row space-x-4">
            <Text>{item.weight}</Text>
            <Text>{item.unit}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }, [fakeServing]);

  const handleSubmit = async (item = null) => {
    const viewer = window.viewer;
    const user_id = viewer.id;
    const food_id = item?._id;

    let url = `${API_URL}/food` + `/` + (food_id ? food_id : ``);
    let bodyParams = {};
    let methodRequest = "POST"
    if (item) {
      methodRequest = "PATCH"
      bodyParams = {
        foodId: food_id,
        name: name,
        calories: calories,
        brand: brand,
        image: item?.image,
        cholesterol: cholesterol,
        protein: protein,
        sodium: sodium,
        fat: fat,
        carbohydrate: carbohydrate,
        fiber: fiber,
        sugar: sugar,
        saturatedFat: saturatedFat,
      }
    } else {
      bodyParams = {
        userId: user_id,
        name: name,
        brand: brand,
        calories: calories,
        cholesterol: cholesterol,
        protein: protein,
        sodium: sodium,
        fat: fat,
        carbohydrate: carbohydrate,
        fiber: fiber,
        sugar: sugar,
        saturatedFat: saturatedFat,
        image: iconFoods[5].image
      }

    }

    await fetch(url, {
      method: methodRequest,
      headers: {
        Authorization: `Bearer ${viewer.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    })
      .then(async (response) => {
        const res = await response.json();
        if (res && res.data) {
          Alert.alert(
            "Thành công",
            res.message,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                style: "ok",
                onPress: () => navigation.navigate("AddFood")
              },
            ],
            {
              cancelable: true,
            }
          );
        }
        else if (res.message === "Thành công") {
          navigation.navigate("AddFood");
        } else if (res.code === 400 || res.code === 500) {
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
  };

  return (
    <View>
      <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft stroke="white" strokeWidth={3} />
        </TouchableOpacity>
        <Text className="text-white text-2xl">{item ? "Edit Food" : "Create New Food"}</Text>
        <TouchableOpacity onPress={() => handleSubmit(item)}>
          <Text className="text-white text-sm">Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="mt-20 p-3 space-y-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-1 bg-white space-x-6 p-3 rounded-xl items-start">
          <MaterialCommunityIcons name="food-fork-drink" size={40} />
          <View className="space-y-4 items-center">
            <TextInput
              ref={textInputRef}
              placeholder="Food Name (required)"
              onChangeText={(text) => setName(text)}
              style={cssInput.styles}
              placeholderTextColor={
                indexInputFocus === 1
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(1)}
              className={
                "rounded-xl p-3 h-16 w-64 " +
                (indexInputFocus === 1
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={item ? item.name : null}
            />
            <TextInput
              onFocus={() => setIndexInputFocus(2)}
              onChangeText={(text) => setBrand(text)}
              placeholder="Brand Name"
              style={cssInput.styles}
              placeholderTextColor={
                indexInputFocus === 2
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              className={
                "rounded-xl p-3 h-16 w-64 " +
                (indexInputFocus === 2
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={item ? item.brand : null}
            />
          </View>
        </View>
        <View>
          <Text className="text-2xl">Nutrition Facts</Text>
          <Text className="text-sm text-gray-400">
            Servings should contain the same number of calories
          </Text>
        </View>
        <View className="bg-white space-y-4 p-3 rounded-xl">
          {fakeSerivingData}
          <TouchableOpacity className="flex-row space-x-6">
            <AntDesign name="plus" size={24} style={{ color: "blue" }} />
            <Text className="text-blue-500 text-sm">Add Serving Amount</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
          <Text className="text-gray-500 text-sm">one serving required</Text>
        </View>
        <View className="bg-white space-y-4 p-4 rounded-xl">
          <TextInput
            placeholder="Calories (required)"
            style={cssInput.styles}
            onChangeText={(text) => setCallories(text)}
            placeholderTextColor={
              indexInputFocus === 3
                ? cssInput.placeholderTextColorFocused
                : cssInput.placeholderTextColorUnFocused
            }
            onFocus={() => setIndexInputFocus(3)}
            className={
              "rounded-xl p-3 h-16 w-84 " +
              (indexInputFocus === 3
                ? cssInput.borderFocused
                : cssInput.borderUnFocused)
            }
            defaultValue={calories?.toString()}
          />
          <View className="flex-row space-x-4">
            <TextInput
              placeholder="Fats (g)"
              style={cssInput.styles}
              onChangeText={(text) => setFat(text)}
              placeholderTextColor={
                indexInputFocus === 4
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(4)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 4
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={fat?.toString()}
            />
            <TextInput
              placeholder="Saturated Fat (g)"
              style={cssInput.styles}
              onChangeText={(text) => setSaturatedFat(text)}
              placeholderTextColor={
                indexInputFocus === 5
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(5)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 5
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={saturatedFat?.toString()}
            />
          </View>
          <View className="flex-row space-x-4">
            <TextInput
              placeholder="Cholesterol (mg)"
              style={cssInput.styles}
              onChangeText={(text) => setCholesterol(text)}
              placeholderTextColor={
                indexInputFocus === 6
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(6)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 6
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={cholesterol?.toString()}
            />
            <TextInput
              placeholder="Sodium (mg)"
              style={cssInput.styles}
              onChangeText={(text) => setSodium(text)}
              placeholderTextColor={
                indexInputFocus === 7
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(7)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 7
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={sodium?.toString()}
            />
          </View>
          <View className="flex-row space-x-4">
            <TextInput
              placeholder="Carbohydrates (g)"
              style={cssInput.styles}
              onChangeText={(text) => setCarbohydrate(text)}
              placeholderTextColor={
                indexInputFocus === 8
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(8)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 8
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={carbohydrate?.toString()}
            />
            <TextInput
              placeholder="Fiber (mg)"
              style={cssInput.styles}
              onChangeText={(text) => setFiber(text)}
              placeholderTextColor={
                indexInputFocus === 9
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(9)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 9
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={fiber?.toString()}
            />
          </View>
          <View className="flex-row space-x-4">
            <TextInput
              placeholder="Sugars (g)"
              style={cssInput.styles}
              onChangeText={(text) => setSugar(text)}
              placeholderTextColor={
                indexInputFocus === 10
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(10)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 10
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={sugar?.toString()}
            />
            <TextInput
              placeholder="Protein (g)"
              style={cssInput.styles}
              onChangeText={(text) => setProtein(text)}
              placeholderTextColor={
                indexInputFocus === 11
                  ? cssInput.placeholderTextColorFocused
                  : cssInput.placeholderTextColorUnFocused
              }
              onFocus={() => setIndexInputFocus(11)}
              className={
                "rounded-xl p-3 h-16 w-40 " +
                (indexInputFocus === 11
                  ? cssInput.borderFocused
                  : cssInput.borderUnFocused)
              }
              defaultValue={protein?.toString()}
            />
          </View>
        </View>
        <View className="bg-white space-y-4 p-4 rounded-xl mb-12">
          <Text className="text-lg font-bold">Share with the Community</Text>
          <View className="flex-row space-x-8">
            <View className="w-64">
              <Text className="text-sm text-gray-700">
                Other Lost It! user will be able to search for and log this food
              </Text>
            </View>
            <CheckBox
              onClick={() => setSelectedCheckbox(!selectedCheckbox)}
              isChecked={selectedCheckbox}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

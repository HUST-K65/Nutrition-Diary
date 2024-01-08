import React, { useCallback, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "react-native-feather";
import ItemAlignComponentForMeal from "../../ItemAlignComponentForMeal";
import MealConstants from "../MealConstants";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { API_URL } from "@env";

// const fetchData = async (datePickTime, setFoods, setCalories) => {
//   console.log(window.viewer.id)
//   console.log(datePickTime)
//   await fetch(`${API_URL}/mealDiary/getMealDiariesByType`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${window.viewer.token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: window.viewer.id,
//       diaryType: "breakfast",
//       date: datePickTime,
//     }),
//   })
//     .then(async (response) => {
//       const res = await response.json();
//       if (res && res.data && res.data.length) {
//         console.log(res.data)
//         setFoods(res.data[0].foods);
//         setCalories(res.data[0].totalCalories);
//       }
//     })
//     .catch(function (error) {
//       Alert.alert(
//         "Error",
//         error.message,
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//         ],
//         {
//           cancelable: true,
//         }
//       );
//     });
// };


export default function MealBreakfastLogComponent({ breakfast }) {
  const [collapsed, setCollapsed] = useState(true);
  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);
  const isFocused = useIsFocused();


  // useEffect(() => {
  //   fetchData(datePickTime, setFoods, setCalories)
  // }, [isFocused, datePickTime])

  return (
    <View className="m-3 p-3 bg-white rounded-2xl">
      <View className="flex-row justify-left space-x-4">
        <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <Icon.ChevronDown stroke="gray" strokeWidth={3} />
          ) : (
            <Icon.ChevronUp stroke="gray" strokeWidth={3} />
          )}
        </TouchableOpacity>
        <View>
          <Text className="text-gray-700 font-bold text-lg">
            {MealConstants.BREAKFAST}
          </Text>
          <Text className="text-gray-700 text-sm">
            {breakfast.totalCalories} calories logged
          </Text>
        </View>
      </View>
      {breakfast && (
        <ItemAlignComponentForMeal
          items={breakfast}
          collapsed={collapsed}
          category={MealConstants.CATEGORY}
          time={MealConstants.BREAKFAST}
        />
      )}
    </View>
  );
}

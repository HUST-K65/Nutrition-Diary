import React, { useState, useCallback } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import * as Icon from "react-native-feather";
import { categories } from "../../../../../constants";
import MealConstants from "../MealConstants";
import ItemAlignComponentForMeal from "../../ItemAlignComponentForMeal";
import { useFocusEffect } from "@react-navigation/native";
import { API_URL } from "@env";

export default function MealDinnerLogComponent({ dinner }) {
  const [collapsed, setCollapsed] = useState(true);
  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);

  // const fetchData = async () => {
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0);
  //   const beginningOfDayTimestamp = currentDate.getTime();

  //   await fetch(`${API_URL}/mealDiary/getMealDiariesByType`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${window.viewer.token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: window.viewer.id,
  //       diaryType: "dinner",
  //       date: beginningOfDayTimestamp,
  //     }),
  //   })
  //     .then(async (response) => {
  //       const res = await response.json();
  //       if (res && res.data && res.data.length) {
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

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

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
            {MealConstants.DINNER}
          </Text>
          <Text className="text-gray-700 text-sm">{dinner.totalCalories} calories logged</Text>
        </View>
      </View>
      {dinner && (
        <ItemAlignComponentForMeal
          items={dinner}
          collapsed={collapsed}
          category={MealConstants.CATEGORY}
          time={MealConstants.DINNER}
        />
      )}
    </View>
  );
}

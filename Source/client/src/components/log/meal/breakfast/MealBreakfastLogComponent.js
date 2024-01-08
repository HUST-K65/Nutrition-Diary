import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Icon from "react-native-feather";
import ItemAlignComponentForMeal from "../../ItemAlignComponentForMeal";
import MealConstants from "../MealConstants";

export default function MealBreakfastLogComponent({ breakfast }) {
  const [collapsed, setCollapsed] = useState(true);

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

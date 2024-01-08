import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function addAction(navigation, category, items, timeToMeal = null) {
  let path = "";
  path = category ? "Add" + category : "";
  timeToMeal
    ? navigation.navigate(path, { dataItems: items, timeToMeal })
    : navigation.navigate(path);
}

export default function ItemAlignComponentForMeal({
  items,
  collapsed,
  category,
  time,
}) {
  const navigation = useNavigation();
  return (
    <View>
      {collapsed ? (
        <View className="flex-row">
          <ScrollView
            className="space-x-1"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          >
            {items && items.length
              ? items.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: item.image}}
                      className="w-12 h-12"
                    />
                  );
                })
              : null}
          </ScrollView>
          <TouchableOpacity
            className="rounded-full bg-sky-200 p-4 items-center ml-2"
            onPress={() => addAction(navigation, category, items, time)}
          >
            <Text className="text-sky-600">Add {category}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {items && items.length
            ? items.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-1 flex-row justify-between"
                  >
                    <View className="flex-row space-x-4">
                      <Image
                        key={index}
                        source={{uri: item.image}}
                        className="w-12 h-12"
                      />
                      <View>
                        <Text className="text-lg">{item.name}</Text>
                        <Text className="text-gray-500">1 servings</Text>
                      </View>
                    </View>
                    <Text className="text-lg">122</Text>
                  </View>
                );
              })
            : null}

          <TouchableOpacity
            className="rounded-full bg-sky-200 p-4 items-center w-32 ml-56 mt-4"
            onPress={() => addAction(navigation, category, items, time)}
          >
            <Text className="text-sky-600">Add {category}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

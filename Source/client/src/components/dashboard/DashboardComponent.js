import React from 'react'
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import * as Icon from "react-native-feather";
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const data = {
    labels: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
    datasets: [
        {
            data: [12, 45, 28, 24, 30, 56, 78]
        }
    ]
};

const data1 = [
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

export default function DashboardComponent() {
    const navigation = useNavigation();
    const { width: screenWidth } = useWindowDimensions();
    let totalWeight = 0;
    data1.map(item => {
        totalWeight += item.weight;
    })
    return (
        <ScrollView className="p-3 space-y-3 mb-20"
            showsVerticalScrollIndicator={false}
        >
            <Text className="text-2xl">Favorites</Text>
            <View className="rounded-xl bg-white p-2 space-y-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg">Calories</Text>
                    <Icon.MoreVertical stroke="black" strokeWidth={3} />
                </View>
                <BarChart

                    data={data}
                    width={screenWidth - 40}
                    height={220}

                    yAxisSuffix=" cals"
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#ffa726",
                        backgroundGradientTo: "#f3dca6",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(78,27,19, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(78,27,19, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                />
            </View>
            <View className="rounded-xl bg-white p-2 space-y-4 mb-8">
                <Text className="text-lg">Macronutrients</Text>

                <PieChart
                    data={data1}
                    width={screenWidth - 35}
                    height={200}
                    chartConfig={{
                        color: (opacity) => `rgba(255,255,255,${opacity})`
                    }}
                    accessor={"weight"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                />

                <View className="flex-row items-center space-x-4 justify-center">
                    <Text>Average</Text>
                    <View className="rounded-full bg-orange-200 p-2 pr-6 pl-6">
                        <Text>{Math.ceil(data1[0].weight * 100 / totalWeight)}</Text>
                    </View>
                    <View className={"rounded-full bg-" + data1[0] + "-200 p-2 pr-6 pl-6"}>
                        <Text>{Math.ceil(data1[1].weight * 100 / totalWeight)}</Text>
                    </View>
                    <View className="rounded-full bg-orange-200 p-2 pr-6 pl-6">
                        <Text>{Math.ceil(data1[2].weight * 100 / totalWeight)}</Text>
                    </View>
                </View>
                <TouchableOpacity><Text>clcc</Text></TouchableOpacity>
            </View>

        </ScrollView>
    )

}

import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import * as Icon from "react-native-feather";
import { BarChart } from 'react-native-chart-kit';

const data = {
    labels: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
    datasets: [
        {
            data: [20, 45, 28, 24, 30, 56, 78]
        }
    ]
};

export default function DashboardComponent() {
    const { width: screenWidth } = useWindowDimensions();
    return (
        <View className="p-3 space-y-3">
            <Text className="text-2xl">Favorites</Text>
            <View className="rounded-xl bg-white p-3 space-y-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg">Calories</Text>
                    <Icon.MoreVertical stroke="black" strokeWidth={3} />
                </View>
                <BarChart

                    data={data}
                    width={screenWidth - 45}
                    height={220}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#ffa726",
                        backgroundGradientTo: "#f3dca6",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(78,27,19, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },

                    }}
                    withHorizontalLabels={false}
                />
            </View>
        </View>
    )

}

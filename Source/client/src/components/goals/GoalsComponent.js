import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

export default function GoalsComponent() {
    const { width: screenWidth } = useWindowDimensions();
    return (
        <View className="p-3 rounded-xl bg-white mt-2 space-y-4">
            <Text className="text-gray-700 font-bold text-xl">Weight</Text>
            <LineChart
                data={data}
                width={screenWidth - 25}
                height={220}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#ffa726",
                    backgroundGradientTo: "#f3dca6",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(72,35,7, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(78,27,19, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}

            />
        </View>
    )

}

import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, useWindowDimensions, View, Alert, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const dataWeight = {
    datasets: [
        {
            data: [12],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Weight Loged"] // optional
};

const dataGoals = {
    datasets: [
        {
            data: [12],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Goals Loged"] // optional
};

async function getCurrentGoal(setGoals) {
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/goal/getGoal", {
        method: "post",
        headers: {
            "Authorization": `Bearer ${window.viewer.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": window.viewer.id
        })
    }
    ).then(async (response) => {
        const res = await response.json();
        if (res && res.data && res.data.length) {
            dataWeight.datasets[0].data = [];
            dataGoals.datasets[0].data = [];
            await res.data.forEach(item => {
                dataWeight.datasets[0].data.push(item.currentWeight)
                dataGoals.datasets[0].data.push(item.currentGoal)
            });
            setGoals(res.data)
        }
    })
        .catch(function (error) {
            Alert.alert(
                'Error when get current goal',
                error.message,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                },
            );
        });
}

export default function GoalsComponent({ setIndexComponentActive }) {
    const { width: screenWidth } = useWindowDimensions();
    const [goals, setGoals] = useState();
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    let currentGoal = goals ? (goals.length > 0 ? goals[goals.length - 1] : goals[0]) : null;
    let currentWeight = goals ? (goals.length > 0 ? goals[goals.length - 1] : goals[0]) : null;
    useEffect(() => {
        getCurrentGoal(setGoals);
    }, [isFocused])

    return (
        <ScrollView className="space-y-6 mb-24" showsVerticalScrollIndicator={false}>
            <View className="p-3 rounded-xl bg-white mt-2 space-y-4">
                <Text className="text-gray-700 font-bold text-xl">Weight</Text>
                <LineChart
                    data={dataWeight}
                    width={screenWidth - 25}
                    height={220}
                    yAxisSuffix="kg"
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
            <View className="p-3 rounded-xl bg-white mt-2 space-y-4">
                <Text className="text-gray-700 font-bold text-xl">Goals</Text>
                <LineChart
                    data={dataGoals}
                    width={screenWidth - 25}
                    height={220}
                    yAxisSuffix="kg"
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

            <Text className="text-gray-700 text-2xl ml-4">My Goals</Text>

            <View className="bg-white rounded-xl p-3">
                <TouchableOpacity
                    className="currentgoal space-y-6"
                    onPress={() => navigation.navigate("NewGoal", { isNew: false, setIndexComponentActive, currentGoal })}
                >
                    <Text className="text-2xl font-bold">Current Goal</Text>
                    <Text className="text-lg">{currentGoal ? currentGoal.currentGoal : null}kg
                    </Text>
                    <Text>--------------------------------------------</Text>
                    <Text className="text-2xl font-bold">Current Weight</Text>
                    <Text className="text-lg">{currentWeight ? currentWeight.currentWeight : null}kg
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="bg-white rounded-xl p-3">
                <View className="space-y-6">
                    <Text className="text-2xl font-bold">Goals Log</Text>
                    {
                        goals && goals.length ?
                            goals.map((goal, index) => {
                                return (
                                    <View key={index}>
                                        <Text key={index} className="text-lg">Goal: {goal.currentGoal}kg  -  Weight: {goal.currentWeight}kg
                                        </Text>
                                        <Text>Log time: {goal.createdAt.substring(0, 10)}</Text>
                                    </View>
                                )
                            })
                            : null
                    }
                </View>
            </View>
        </ScrollView>

    )

}

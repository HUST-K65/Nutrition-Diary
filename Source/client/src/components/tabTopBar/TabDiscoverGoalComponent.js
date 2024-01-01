import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function TabDiscoverGoalComponent({ indexComponentActive }) {
    let label = indexComponentActive === 2 ? "Goals" : "Discover";
    return (
        <View className="flex-row flex-1 space-x-4 items-center justify-between pl-1 pr-1">
            <View className="rounded-full bg-white p-2 pl-4 pr-4">
                <Text className="text-sm text-orange-500">Explore</Text>
            </View>
            <View className="flex-row items-center space-x-4">
                <Text className="text-2xl text-white">{label}</Text>
            </View>
            <View className="rounded-full bg-gray-400 p-1">
                <AntDesign name="user" size={30} style={{
                    color: "white"
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "#dc7f3c",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 5,
        width: "90%",
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

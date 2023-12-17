import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import ControlBarComponent from './ControlBarComponent';
import LogComponent from './log/LogComponent'
import TabLogDashComponent from './tabTopBar/TabLogDashComponent';


const components = [
    <LogComponent />,   // indexComponentActive = 0
    // indexComponentActive = 1
];

export default function HomePage() {
    const [indexComponentActive, setIndexComponentActive] = useState(0);

    return (
        <SafeAreaView className="bg-gray-300 h-full mb-4" >
            <StatusBar
                barStyle="dark-content"
            />
            <View className="absolute top-0 w-full h-20 bg-orange-500 p-3 pt-8">
                <TabLogDashComponent indexComponentActive={indexComponentActive} />
            </View>
            <View className="mt-14">
                {
                    components[indexComponentActive]
                }
            </View>

            {/* control bar */}

            {/* <View className="mt-20"></View> */}

            < ControlBarComponent indexComponentActive={indexComponentActive} setIndexComponentActive={setIndexComponentActive} />


        </SafeAreaView>
    )
}
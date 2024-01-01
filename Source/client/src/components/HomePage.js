import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import ControlBarComponent from './ControlBarComponent';
import LogComponent from './log/LogComponent'
import TabLogDashComponent from './tabTopBar/TabLogDashComponent';
import DiscoverComponent from './discover/DiscoverComponent';
import TabDiscoverGoalComponent from './tabTopBar/TabDiscoverGoalComponent';
import GoalsComponent from './goals/GoalsComponent';
import DashboardComponent from './dashboard/DashboardComponent';

const components = [
    <DashboardComponent />,// indexComponentActive = 0
    <LogComponent />,   // indexComponentActive = 1,
    <GoalsComponent />, // indexComponentActive = 2,
    <DiscoverComponent />, // indexComponentActive = 3
];

export default function HomePage() {
    const [indexComponentActive, setIndexComponentActive] = useState(0);
    const [datePick, setDatePick] = useState(null);
    console.log("index", indexComponentActive)

    return (
        <SafeAreaView className="bg-gray-300 h-full mb-4" >
            <StatusBar
                barStyle="dark-content"
            />
            <View className="absolute top-0 w-full h-20 bg-orange-500 p-3 pt-8">
                {
                    indexComponentActive === 1 || indexComponentActive === 0 ?
                        <TabLogDashComponent
                            indexComponentActive={indexComponentActive}
                            datePick={datePick}
                            setDatePick={setDatePick}
                        />
                        : <TabDiscoverGoalComponent
                            indexComponentActive={indexComponentActive}
                        />
                }

            </View>
            <View className="mt-12">
                {
                    components[indexComponentActive]
                }
            </View>

            {/* control bar */}

            {/* <View className="mt-20"></View> */}

            < ControlBarComponent
                indexComponentActive={indexComponentActive}
                datePick={datePick}
                setIndexComponentActive={setIndexComponentActive}
            />


        </SafeAreaView>
    )
}
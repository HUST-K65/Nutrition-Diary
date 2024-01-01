import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Icon from "react-native-feather";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather';
import MealConstants from './log/meal/MealConstants';
import { useNavigation } from '@react-navigation/native';

const activeTabStyles = {
    icon: {
        color: " bg-orange-700 ",
    },
    text: " text-orange-500 font-semibold ",
    touchableOpacityView: "pr-5 pl-5 pt-2 pb-2 rounded-full bg-orange-300"
}

export default function ControlBar({ indexComponentActive, setIndexComponentActive, datePick }) {
    let isDashboardActive = indexComponentActive === 0;
    let isLogActive = indexComponentActive === 1;
    let isDiscoverActive = indexComponentActive === 3;
    let isGoalsActive = indexComponentActive === 2;
    const [openModalPlus, setOpenModalPlus] = useState(false);
    const navigation = useNavigation();
    return (
        <View className="absolute h-20 bottom-0 bg-transparent w-full 
        flex-row space-x-5 items-center justify-center"
        >
            <View className="absolute h-20 w-40 left-0 bottom-0 flex-row bg-white space-x-2 items-center justify-between pr-3 pl-3"
                style={{
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 10
                }}
            >
                <TouchableOpacity className="items-center"
                    onPress={() => {
                        setIndexComponentActive(0);
                    }}>
                    <View className={isDashboardActive ? activeTabStyles.touchableOpacityView : ""}>
                        <MaterialIcons

                            name="dashboard"
                            size={30} />
                    </View>
                    <Text className={isDashboardActive ? activeTabStyles.text : ""}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="items-center mt-2"
                    onPress={() => {
                        setIndexComponentActive(1);
                    }}
                >
                    <View className={isLogActive ? activeTabStyles.touchableOpacityView : ""}>
                        <Icon.Clipboard
                            stroke="black"
                            strokeWidth={2}
                            width="28"

                            height="28" />
                    </View>
                    <Text className={isLogActive ? activeTabStyles.text : ""}>Log</Text>
                </TouchableOpacity>
            </View>
            <View className="absolute h-20 w-40 right-0 bottom-0 flex-row bg-white space-x-2 items-center justify-between pr-3 pl-3"
                style={{
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 10
                }}
            >
                <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                        setIndexComponentActive(2)
                    }}
                >
                    <View className={isGoalsActive ? activeTabStyles.touchableOpacityView : ""}>
                        <Icon.Target stroke="black" strokeWidth={2} width="36" height="36" />
                    </View>
                    <Text className={isGoalsActive ? activeTabStyles.text : ""}>Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIndexComponentActive(3);
                    }}
                    className="items-center"
                >
                    <View className={isDiscoverActive ? activeTabStyles.touchableOpacityView : ""}>
                        <Icon.Activity stroke="black" strokeWidth={2} width="36" height="36" />
                    </View>
                    <Text className={isDiscoverActive ? activeTabStyles.text : ""}>Discover</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => setOpenModalPlus(true)}
                className="absolute bottom-2 items-center p-5 rounded-full bg-blue-700">
                <Icon.Plus stroke="white" strokeWidth={2} width="24" height="24" />
            </TouchableOpacity>
            {
                openModalPlus ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openModalPlus}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setOpenModalPlus(false)}
                        >
                            <View style={styles.centeredView}>
                                <TouchableOpacity className="space-y-10" style={styles.modalView}
                                    activeOpacity={1}>
                                    <View className="space-y-2">
                                        <Text className="text-xl font-bold text-orange-300">Health</Text>
                                        <View className="flex-row space-x-8 pl-5">
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("PopupWeight", { datePick })
                                                }}
                                                className="items-center">
                                                <View className="bg-sky-400 rounded-full p-3">
                                                    <FontAwesome5 name="weight" size={20} style={{ color: "#09508a" }} />
                                                </View>
                                                <Text className="text-lg text-white">Weight</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity className="items-center">
                                                <View className="bg-sky-400 rounded-full p-2">
                                                    <AntDesign name="plus" size={30} style={{ color: "#09508a" }} />
                                                </View>
                                                <Text className="text-lg text-white">New Goal</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View className="space-y-2">
                                        <Text className="text-xl font-bold text-orange-300">Food & Exercises</Text>
                                        <View className="flex-row items-center space-x-6 pr-3 pl-3 ">
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("AddFood", { timeToMeal: MealConstants.BREAKFAST });
                                                }
                                                }
                                                className="items-center">
                                                <View className="rounded-full bg-orange-400 p-3">
                                                    <Feather name="sunrise" size={22} style={{ color: "white" }} />
                                                </View>
                                                <Text className="text-white text-lg">{MealConstants.BREAKFAST}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("AddFood", { timeToMeal: MealConstants.LUNCH });
                                                }
                                                }
                                                className="items-center">
                                                <View className="rounded-full bg-orange-500 p-3">
                                                    <Feather name="sun" size={22} style={{ color: "white" }} />
                                                </View>
                                                <Text className="text-white text-lg">{MealConstants.LUNCH}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("AddFood", { timeToMeal: MealConstants.DINNER });
                                                }
                                                }
                                                className="items-center">
                                                <View className="rounded-full bg-purple-800 p-3">
                                                    <Feather name="moon" size={22} style={{ color: "white" }} />
                                                </View>
                                                <Text className="text-white text-lg">{MealConstants.DINNER}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("AddFood", { timeToMeal: MealConstants.SNACK });
                                                }
                                                }
                                                className="items-center">
                                                <View className="rounded-full bg-blue-500 p-3">
                                                    <Feather name="clock" size={22} style={{ color: "white" }} />
                                                </View>
                                                <Text className="text-white text-lg">{MealConstants.SNACK}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View className="flex-row ml-4">
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setOpenModalPlus(false)
                                                    navigation.navigate("AddExercise");
                                                }
                                                }
                                                className="items-center">
                                                <View className="rounded-full bg-green-500 p-3">
                                                    <FontAwesome5 name="running" size={22} style={{ color: "white" }} />
                                                </View>
                                                <Text className="text-white text-lg">Exercise</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal> : null
            }

        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        justifyContent: "center",
        backgroundColor: "#2d7b9e",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
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

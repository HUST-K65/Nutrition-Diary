import React, { useState } from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function TabLogDashComponent({ indexComponentActive, datePick, setDatePick }) {

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    let selected = datePick;
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYY/MM/DD"
    );

    if (!datePick) {
        selected = startDate;
        setDatePick(startDate);
    }


    const handlePressOK = () => {
        setOpenStartDatePicker(!openStartDatePicker);
        setDatePick(selected);
    }

    return (
        <View className="flex-row flex-1 space-x-4 items-center justify-between pl-1 pr-1">
            <View className="rounded-full bg-white p-2 pl-4 pr-4">
                <Text className="text-sm text-orange-500">Time</Text>
            </View>
            <View className="flex-row items-center space-x-4">
                <TouchableOpacity>
                    <AntDesign name="caretleft" size={20} style={{
                        color: "white"
                    }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setOpenStartDatePicker(!openStartDatePicker)}
                >
                    <Text className="text-xl text-white">{selected}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <AntDesign name="caretright" size={20} style={{
                        color: "white"
                    }} />
                </TouchableOpacity>

            </View>
            <View className="rounded-full bg-gray-400 p-1">
                <AntDesign name="user" size={30} style={{
                    color: "white"
                }} />
            </View>
            {
                openStartDatePicker ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openStartDatePicker}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setOpenStartDatePicker(false)}
                        >
                            <View
                                style={styles.centeredView} >
                                <TouchableOpacity className="space-y-8" style={styles.modalView}
                                    activeOpacity={1}
                                >
                                    <DatePicker
                                        mode="calendar"
                                        minimumDate={startDate}
                                        selected={selected}

                                        onSelectedChange={(date) => {
                                            selected = date
                                        }}
                                        options={{
                                            backgroundColor: "#d8ebef",
                                            textHeaderColor: "black",
                                            textDefaultColor: "black",
                                            selectedTextColor: "white",
                                            mainColor: "#0f70a4",
                                            textSecondaryColor: "black",
                                            borderColor: "rgba(122, 146, 165, 0.1)"

                                        }}
                                        style={{
                                            borderRadius: 20
                                        }}
                                    />
                                    <View className="flex-row space-x-16">
                                        <TouchableOpacity
                                            className="ml-40"
                                            onPress={() => setOpenStartDatePicker(!openStartDatePicker)}>
                                            <Text
                                                style={{ color: "white", fontSize: 20 }}>Close</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handlePressOK}
                                        >
                                            <Text style={{ color: "white", fontSize: 20 }}>OK</Text>
                                        </TouchableOpacity>
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

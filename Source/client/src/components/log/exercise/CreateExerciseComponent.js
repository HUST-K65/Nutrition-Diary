import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { iconsExercise } from '../../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Icon from "react-native-feather";

async function handleSubmitCreate(exerciseName, iconUrl, time, calories, navigation) {
    let messageError = null;
    if (!exerciseName) messageError = "exercise name is a required field"
    else if (!time) messageError = "time is a required field"
    else if (!calories) messageError = "calories is a required field"
    if (messageError) {
        Alert.alert(
            'Error',
            messageError,
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
    } else {
        await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/exercise", {
            method: "post",
            headers: {
                "Authorization": `Bearer ${window.viewer.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": exerciseName,
                "calories": calories,
                "image": iconUrl,
                "exerciseTime": time
            })
        }
        ).then(async (response) => {
            const res = await response.json();
            if (res && res.data) {
                Alert.alert(
                    'Success',
                    "Create exercise successfully!",
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate("AddExercise"),
                            style: 'ok',
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                    },
                );
            } else {
                Alert.alert(
                    'Error',
                    res.message,
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
            }
        })
            .catch(function (error) {
                Alert.alert(
                    'Error',
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
}


export default function CreateExerciseComponent() {

    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(3);
    let iconUrl = iconsExercise[value].image;
    const [items, setItems] = useState(
        iconsExercise.map((item, index) => {
            return {
                value: index,
                label: <View key={index} className="flex-row items-center space-x-2">
                    <Image source={{ uri: item.image }} className="w-12 h-12" />
                    <Text>{item.name}</Text>
                </View>,
            }
        })
    );


    const [exerciseName, setExerciseName] = useState("");
    const [time, setTime] = useState(null);
    const [calories, setCalories] = useState(null);

    return (

        <Modal visible={true} animationType="slide"
        >
            <View className="w-full h-full space-y-8">
                <View className="flex-row items-center space-x-8 w-full border-b-2 border-gray-300 p-3 pb-6 bg-orange-500">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                    </TouchableOpacity>
                    <Text className="text-4xl text-white">Create Exercise</Text>
                </View>
                <View className="p-3 space-y-6">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm">Exercise Name: </Text>
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default'
                            onChangeText={text => setExerciseName(text)}
                        >
                        </TextInput>
                    </View>
                    <View className="flex-row items-center justify-between space-x-28">
                        <Text className="text-sm">Icon: </Text>
                        <DropDownPicker
                            className="w-56"
                            open={open}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            defaultvalue={value}
                            value={value}
                            theme="LIGHT"
                            multiple={false}
                        />
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm">Time: </Text>
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default' inputMode='numeric'
                            onChangeText={num => setTime(num)}
                        >
                        </TextInput>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm">Calorise: </Text>
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default' inputMode='decimal'
                            onChangeText={num => setCalories(num)}
                        >
                        </TextInput>
                    </View>
                    <View className="w-full items-center pt-12">
                        <TouchableOpacity
                            className="rounded-xl bg-green-700 p-3 items-center justify-center w-48"
                            onPress={() => handleSubmitCreate(exerciseName, iconUrl, time, calories, navigation)}
                        >
                            <Text className="text-2xl font-bold text-white">Add Exercise</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

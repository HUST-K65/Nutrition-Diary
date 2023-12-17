import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput, Image } from 'react-native'
import { exercises } from '../../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Icon from "react-native-feather";

export default function CreateExerciseComponent() {

    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState(
        exercises.map((item, index) => {
            return {
                value: item.id,
                label: <View key={index} className="flex-row items-center space-x-2">
                    <Image source={item.image} className="w-4 h-4" />
                    <Text>{item.name}</Text>
                </View>,
            }
        })
    );
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
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default'>
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
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default'>
                        </TextInput>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm">Calorise: </Text>
                        <TextInput className="p-2 border-2 border-gray-600 w-56 rounded-xl" placeholder='required' keyboardType='default'>
                        </TextInput>
                    </View>
                    <View className="w-full items-center pt-12">
                        <TouchableOpacity
                            className="rounded-xl bg-green-700 p-3 items-center justify-center w-48"
                        >
                            <Text className="text-2xl font-bold text-white">Add Exercise</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>

    )

}

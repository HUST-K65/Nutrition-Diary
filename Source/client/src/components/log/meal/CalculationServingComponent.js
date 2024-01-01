import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Icon from "react-native-feather";
import { exercises } from '../../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CalculationServingComponent() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let title = params.title;
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
        <View className="h-full">
            <View className="absolute flex-row flex-1 h-20 w-full bg-orange-500 items-center justify-between p-3 space-x-8">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <Text className="text-white text-2xl">{title}</Text>
                <Text className="text-white text-sm">Save</Text>
            </View>
            <View className="absolute flex-row bottom-0 flex-1 h-80 w-full bg-white items-end p-3 space-x-8">
                <Entypo style={{ color: "gray" }} name="calculator" size={32} />
                <TextInput className="w-32 border-b-2 border-orange-500" defaultValue="1" inputMode="numeric" autoFocus={true} style={{ fontSize: 20 }} />
                <DropDownPicker
                    className="w-36"
                    open={open}
                    items={items}
                    placeholder="servings"
                    disableBorderRadius={true}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    defaultvalue={value}
                    value={value}
                    theme="LIGHT"
                    multiple={false}
                />
            </View>
        </View>
    )
}

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, TextInput, Image, Modal, TouchableWithoutFeedback } from 'react-native'

function tabBarHeader(indexActive, setIndexActive, navigation = null) {
    const textColorActive = "text-orange-700";
    const textColorInactive = "text-white";
    const bgColorActive = { backgroundColor: "white" }

    return (
        <View className="bg-orange-500 h-32 p-5 space-y-4">
            <View className="flex-row items-center justify-center space-x-14">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
            </View>
            <View className="flex-1 flex-row items-center space-x-5 justify-center">
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 0 ? bgColorActive : null}
                    onPress={() => setIndexActive(0)}
                >
                    <Text className={indexActive === 0 ? textColorActive : textColorInactive}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 1 ? { backgroundColor: "white" } : null}
                    onPress={() => setIndexActive(1)}
                >
                    <Text className={indexActive === 1 ? textColorActive : textColorInactive}>My Foods</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 2 ? bgColorActive : null}
                    onPress={() => setIndexActive(2)}
                >
                    <Text className={indexActive === 2 ? textColorActive : textColorInactive}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full pl-4 pr-4"
                    style={indexActive === 3 ? bgColorActive : null}
                    onPress={() => setIndexActive(3)}
                >
                    <Text className={indexActive === 3 ? textColorActive : textColorInactive}>Recipes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function FeedComponent() {
    const [indexActive, setIndexActive] = useState(0);
    const navigation = useNavigation();
    return (
        <View>
            {tabBarHeader(indexActive, setIndexActive, navigation)}
        </View>
    )

}

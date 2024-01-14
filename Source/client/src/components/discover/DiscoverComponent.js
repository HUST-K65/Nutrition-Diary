import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, TextInput, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import FeedComponent from './feed/FeedComponent';
import GroupComponent from './groups/GroupComponent';


function tabBarHeader(indexActive, setIndexActive, navigation = null) {
    const textColorActive = "text-orange-700";
    const textColorInactive = "text-white";
    const bgColorActive = { backgroundColor: "white" }
    return (
        <View className="bg-orange-500 p-3">
            <View className="flex-row items-center space-x-5 justify-center">
                <TouchableOpacity
                    className="rounded-full p-1 pl-16 pr-16"
                    style={indexActive === 0 ? bgColorActive : null}
                    onPress={() => setIndexActive(0)}
                >
                    <Text className={indexActive === 0 ? textColorActive : textColorInactive}>Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-full p-1 pl-16 pr-16"
                    style={indexActive === 1 ? { backgroundColor: "white" } : null}
                    onPress={() => setIndexActive(1)}
                >
                    <Text className={indexActive === 1 ? textColorActive : textColorInactive}>Groups</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function bodyTemplate(indexActive) {
    if (indexActive === 0) {
        return <FeedComponent />
    } else if (indexActive === 1) {
        return <GroupComponent />
    }
}

export default function DiscoverComponent() {
    const [indexActive, setIndexActive] = useState(0);
    const navigation = useNavigation();
    return (
        <View>
            {tabBarHeader(indexActive, setIndexActive, navigation)}
            {bodyTemplate(indexActive)}
        </View>
    )

}

import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather";
import { categories } from '../../../../../constants'
import MealConstants from '../MealConstants';
import ItemAlignComponentForMeal from '../../ItemAlignComponentForMeal';

export default function MealDinnerLogComponent() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <View className="m-3 p-3 bg-white rounded-2xl">
            <View className="flex-row justify-left space-x-4">
                <TouchableOpacity
                    onPress={() => setCollapsed(!collapsed)}
                >
                    {
                        collapsed ?
                            <Icon.ChevronDown stroke="gray" strokeWidth={3} />
                            :
                            <Icon.ChevronUp stroke="gray" strokeWidth={3} />
                    }
                </TouchableOpacity>
                <View>
                    <Text className="text-gray-700 font-bold text-lg">{MealConstants.DINNER}</Text>
                    <Text className="text-gray-700 text-sm">732 calories logged</Text>
                </View>
            </View>
            <ItemAlignComponentForMeal items={categories} collapsed={collapsed} category={MealConstants.CATEGORY} time={MealConstants.DINNER} />
        </View>
    )
}

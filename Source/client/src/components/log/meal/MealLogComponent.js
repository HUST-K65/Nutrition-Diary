import React from 'react'
import { View } from 'react-native'
import MealBreakfastLogComponent from './breakfast/MealBreakfastLogComponent'
import MealDinnerLogComponent from './dinner/MealDinnerLogComponent'
import MealLunchLogComponent from './lunch/MealLunchLogComponent'
import MealSnackLogComponent from './snack/MealSnackLogComponent'

export default function MealLogComponent() {

    return (
        <View>
            <MealBreakfastLogComponent />
            <MealLunchLogComponent />
            <MealDinnerLogComponent />
            <MealSnackLogComponent />
        </View>
    )

}

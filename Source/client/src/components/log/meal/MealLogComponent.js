import React from 'react'
import { View } from 'react-native'
import MealBreakfastLogComponent from './breakfast/MealBreakfastLogComponent'
import MealDinnerLogComponent from './dinner/MealDinnerLogComponent'
import MealLunchLogComponent from './lunch/MealLunchLogComponent'
import MealSnackLogComponent from './snack/MealSnackLogComponent'

export default function MealLogComponent({ breakfast, lunch, dinner, datePickTime }) {

    return (
        <View>
            <MealBreakfastLogComponent breakfast={breakfast} />
            <MealLunchLogComponent lunch={lunch} />
            <MealDinnerLogComponent dinner={dinner} />
            <MealSnackLogComponent />
        </View>
    )

}

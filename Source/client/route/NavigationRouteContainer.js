import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomePage from '../src/components/HomePage';
import AddFoodComponent from '../src/components/log/meal/AddFoodComponent';
import MealSummaryComponent from '../src/components/log/meal/MealSummaryComponent';
import AddExerciseComponent from '../src/components/log/exercise/AddExerciseComponent';
import CreateExerciseComponent from '../src/components/log/exercise/CreateExerciseComponent';
import CreateFoodComponent from '../src/components/log/meal/actionCreate/CreateFoodComponent';
import CreateRecipeComponent from '../src/components/log/meal/actionCreate/CreateRecipeComponent';
import CreateCaloriesComponent from '../src/components/log/meal/actionCreate/CreateCaloriesComponent';
import IconPopupComponent from '../src/components/log/meal/actionCreate/icon/IconPopupComponent';
import CalculationServingComponent from '../src/components/log/meal/CalculationServingComponent';
import PopUpWeightComponent from '../src/components/PopUpWeightComponent';

export default function NavigationRouteContainer({ Stack }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Homepage'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Homepage" component={HomePage} />

                <Stack.Screen name="AddFood" component={AddFoodComponent} />
                <Stack.Screen name="MealSummary" component={MealSummaryComponent} />
                <Stack.Screen name="AddExercise" component={AddExerciseComponent} options={{ headerShown: false }} />

                <Stack.Screen name="CreateExercise" component={CreateExerciseComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CreateFood" component={CreateFoodComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CreateRecipe" component={CreateRecipeComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CreateCalories" component={CreateCaloriesComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="IconPopup" component={IconPopupComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CalculationServing" component={CalculationServingComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="PopupWeight" component={PopUpWeightComponent} options={{ presentation: 'modal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
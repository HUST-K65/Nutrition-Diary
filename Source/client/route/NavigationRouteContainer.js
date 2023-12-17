import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomePage from '../src/components/HomePage';
import AddFoodComponent from '../src/components/log/meal/AddFoodComponent';
import AddExerciseComponent from '../src/components/log/exercise/AddExerciseComponent';
import CreateExerciseComponent from '../src/components/log/exercise/CreateExerciseComponent';
import CreateFoodComponent from '../src/components/log/meal/actionCreate/CreateFoodComponent';

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
                <Stack.Screen name="AddExercise" component={AddExerciseComponent} options={{ headerShown: false }} />

                <Stack.Screen name="CreateExercise" component={CreateExerciseComponent} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CreateFood" component={CreateFoodComponent} options={{ presentation: 'modal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
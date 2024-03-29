import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

async function handleSubmit(username, password, navigation = null, isLoading, setIsLoading) {
    setIsLoading(true);
    await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/auth/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "phone": username,
            "password": password
        })
    }
    ).then(async (response) => {
        const res = await response.json();
        setIsLoading(false);
        if (!res || !res.data || !res.data.user) {
            throw new Error("Unauthorize")
        }

        window.users.push(res.data.user);

        window.viewer = { ...res.data.user, token: res.data.token };
        navigation.navigate("Homepage");
    })
        .catch(function (error) {
            setIsLoading(false);
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


export default function LoginScreen() {
    const navigation = useNavigation();
    window.users = [];
    window.viewer = null;
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            {
                isLoading ? <View className="h-full w-full" style={{ alignItems: "center", justifyContent: "center", backgroundColor: "transparent" }}>
                    <View>
                        <Text className="text-2xl">Loading...</Text>
                    </View>
                </View> : null
            }
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
            {/* lights */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    source={require('../assets/images/light.png')}
                    className="h-[225] w-[90]"
                />
                <Animated.Image
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    source={require('../assets/images/light.png')}
                    className="h-[160] w-[65] opacity-75"
                />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-40 pb-10">

                {/* title */}
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">

                        <TextInput
                            placeholder="Username"
                            onChangeText={(text) => setUsername(text)}
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                        <TextInput
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View
                        className="w-full"
                        entering={FadeInDown.delay(400).duration(1000).springify()}>

                        <TouchableOpacity
                            className="w-full bg-orange-500 p-3 rounded-2xl mb-3"
                            onPress={() => handleSubmit(username, password, navigation, isLoading, setIsLoading)}
                        >
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        className="flex-row justify-center">

                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text className="text-orange-600">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import axios from 'axios'


async function postData() {
    try {
        const response = await fetch("http://localhost:8000/api/nutrition_diary/v1/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "phone": "0585713887",
                "password": "rest"
            })
        });
        console.log("response:", response)
        if (response.ok) {
            const data = await response.json();
            console.log("data success:", data);
        } else {
            console.log("Request failed with status:", response.url);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function handleSubmit() {
    let data = await fetch("http://10.0.2.2:8000/api/nutrition_diary/v1/auth/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "phone": "0969250818",
            "password": "matkhau123?"
        })
    }
    ).then(async(response)=>{
        const res = await response.json();
        console.log("data sucesss", res.data);
    })
        .catch(function (error) {
            console.log(error.message);
        });
}


export default function LoginScreen() {
    const navigation = useNavigation();
    // let [isLoading, setIsLoading] = useState(true);
    // let [error, setError] = useState();
    let [response, setResponse] = useState('');


    // axios({
    //     method: 'get',
    //     url: `https://jsonplaceholder.typicode.com/users`,
    // }).then((response) => {
    //     let city = response.data[0]['address'].city;
    //     setResponse(city);

    // });


    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //     .then(res => {
    //         const persons = res.data;
    //         console.log(res.data);
    //     })
    //     .catch(error => console.log(error));

    // useEffect(() => {
    //     axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoading(false);
    //                 setResponse(result);
    //             },
    //             (error) => {
    //                 setIsLoading(false);
    //                 setError(error);
    //             }
    //         )
    // }, []);

    // console.log(response);


    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
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
                        {response}
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View
                        className="w-full"
                        entering={FadeInDown.delay(400).duration(1000).springify()}>

                        <TouchableOpacity
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                            onPress={() => handleSubmit()}
                        >
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        className="flex-row justify-center">

                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                            <Text className="text-sky-600">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

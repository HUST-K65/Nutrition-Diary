import { useRoute } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default function TimeToExercise() {
    let { params } = useRoute();
    let item = params?.item;
    console.log(item);
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )

}

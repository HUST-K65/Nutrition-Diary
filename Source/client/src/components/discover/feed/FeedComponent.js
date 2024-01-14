import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function FeedComponent() {
    const fakeData = [
        {
            id: 1,
            title: "Healthy Eating Plate",
            image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/13503/bigstock-Health-food-selection-super-foods-fruits-veggies.jpg",
            content: "\t\t\tMake most of your meal vegetables and fruits – ½ of your plate.Aim for color and variety, and remember that potatoes don’t count as vegetables on the Healthy Eating Plate because of their negative impact on blood sugar.\n\n\n\t\t\tWhole and intact grains—whole wheat, barley, wheat berries, quinoa, oats, brown rice, and foods made with them, such as whole wheat pasta—have a milder effect on blood sugar and insulin than white bread, white rice, and other refined grains.\n\n\n\t\t\tFish, poultry, beans, and nuts are all healthy, versatile protein sources—they can be mixed into salads, and pair well with vegetables on a plate. Limit red meat, and avoid processed meats such as bacon and sausage."
        },
        {
            id: 2,
            title: "A Digest on Healthy Eating and Healthy Living",
            image: "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2022/01/HLGuide21-22thumb-793x1024.jpg",
            content: "\t\t\tOver the course of 2021, many of us continued to adapt to a “new normal,” characterized by a return to some pre-pandemic activities mixed with hobbies or habits that have emerged since 2020’s lockdowns. On the topic of food and eating, according to one U.S. consumer survey the year marked a decrease in certain behaviors that had changed abruptly during 2020. For example, fewer Americans reported that they were “snacking more” (18% in 2021 vs. 32% in 2020) or “eating more in general” (11% in 2021 vs. 20% in 2020). However, consumers also signaled a decrease in cooking at home (47% in 2021 vs. 60% in 2020); while other survey findings underscored significant disparities in food security. Beyond food, the COVID-19 pandemic continues to generate a wide range of unique and individual impacts, and the emergence of new disease variants is a sobering reminder of the urgency for increased vaccination globally, especially in low- and lower-middle-income countries. \n\n\n\t\t\tAs we all continue to navigate the twists and turns of this pandemic, we once again invite you to do what you can to incorporate healthy behaviors into your daily life. This year’s edition revisits the core themes of eating well, being active, and getting enough sleep with selected research highlights, as well as a closer look at some popular nutrition and lifestyle topics. We hope that you find it useful, and we wish you a very healthy and fulfilling 2022."
        },
        {
            id: 3,
            title: "Carbohydrates",
            image: "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2012/09/carbohydrates.jpg",
            content: "\t\t\t\tWHAT ARE CACBOHYDRATES?\n\n\n\t\t\tCarbohydrates are found in a wide array of both healthy and unhealthy foods—bread, beans, milk, popcorn, potatoes, cookies, spaghetti, soft drinks, corn, and cherry pie. They also come in a variety of forms. The most common and abundant forms are sugars, fibers, and starches.Foods high in carbohydrates are an important part of a healthy diet.\n\n\n\t\t\t Carbohydrates provide the body with glucose, which is converted to energy used to support bodily functions and physical activity. But carbohydrate quality is important; some types of carbohydrate-rich foods are better than others:"
        },
        {
            id: 4,
            title: "Fats and Cholesterol",
            image: "https://www.hsph.harvard.edu/wp-content/uploads/sites/30/2019/01/protein-homepage-300x250.jpg",
            content: "Rather than adopting a low-fat diet, it’s more important to focus on eating beneficial “good” fats and avoiding harmful “bad” fats. Fat is an important part of a healthy diet. Choose foods with “good” unsaturated fats, limit foods high in saturated fat, and avoid “bad” trans fat."
        }
    ]

    const navigation = useNavigation();

    return (
        <ScrollView className="mb-44"
            showsVerticalScrollIndicator={false}
        >
            {
                fakeData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} className="p-3 bg-white m-2 space-y-2 rounded-xl"
                            onPress={() => navigation.navigate("FeedDetail", { item })}
                        >
                            <Image source={{ uri: item.image }} className="w-full h-36" />
                            <View className="flex-row space-x-4">
                                <Fontisto name="coffeescript" size={20} style={{ color: "gray" }} />
                                <Text className="text-gray-500 font-bold">DIET & NUTRITION</Text>
                            </View>
                            <Text className="text-gray-700 font-bold text-3xl">{item.title}</Text>
                            <Text className="text-lg">{item.content.substring(0, 117)}{item.content.length > 118 ? "..." : null}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )

}

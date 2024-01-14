import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

var fakePosts = [
    {
        id: 1,
        groupName: "We're all in this together",
        userName: "Ryan",
        imageGroup: "https://www.starmark.com/wp-content/uploads/26_Focus_ON_What.png",
        timeCreated: 1,
        liked: [],
        disLiked: [],
        content: "Choose healthy vegetable oils like olive, canola, soy, corn, sunflower, peanut, and others, and avoid partially hydrogenated oils, which contain unhealthy trans fats. Remember that low-fat does not mean “healthy.",
        numberOfComment: 0,
        commentDetails: []
    },
    {
        id: 2,
        groupName: "We're all in this together",
        userName: "Kevin",
        timeCreated: 1,
        liked: [],
        disLiked: [],
        imageGroup: "https://www.starmark.com/wp-content/uploads/26_Focus_ON_What.png",
        content: "The Healthy Eating Plate encourages consumers to use healthy oils, and it does not set a maximum on the percentage of calories people should get each day from healthy sources of fat. In this way, the Healthy Eating Plate recommends the opposite of the low-fat message promoted for decades by the USDA.",
        numberOfComment: 1,
        commentDetails: [
            {
                ...window.viewer,
                comment: "this is a good ideal"
            }
        ]
    },
    {
        id: 3,
        groupName: "Intermittent Fasting (IF)",
        userName: "Sarah",
        timeCreated: 1,
        liked: [],
        disLiked: [],
        imageGroup: "https://thewellproject.org/sites/default//files/article_images/supportgroup.jpg",
        content: "There are many cultures around the world in which people may not eat their meals from a plate. Although our translations of this guide maintain the single-plate graphic, we encourage its use for creating healthy, balanced meals in context of cultural and individual customs and preferences.",
        numberOfComment: 0,
        commentDetails: []
    },
    {
        id: 4,
        groupName: "Swimming",
        userName: "Katie",
        timeCreated: 3,
        liked: [],
        disLiked: [],
        imageGroup: "https://cdn-icons-png.flaticon.com/512/625/625470.png",
        content: "Swimming is a popular recreational activity and competitive sport that involves moving through water using various techniques. It offers numerous health benefits and is suitable for people of all ages and fitness levels.",
        numberOfComment: 0,
        commentDetails: []
    },
]

function itemPostTemplate(item, index) {
    const [clicked, setClicked] = useState(false);
    const navigation = useNavigation();
    var likes = fakePosts[index].liked;
    var disLikes = fakePosts[index].disLiked;

    let liked = likes.includes(window.viewer.id);
    let disLiked = disLikes.includes(window.viewer.id);

    return (
        <View key={index} className="p-3 bg-white rounded-xl space-y-2 mb-2">
            <View className="flex-row space-x-4">
                <Image source={{ uri: item.imageGroup }} className="w-16 h-16 rounded-full" />
                <View className="space-y-2 items-start">
                    <TouchableOpacity>
                        <Text className="text-blue-700 text-lg">{item.groupName}</Text>
                    </TouchableOpacity>
                    <View className="flex-row items-center space-x-2">
                        <Text className="text-lg font-bold">{item.userName}</Text>
                        <Text className="text-gray-500">{item.timeCreated} hour ago</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("CommentDetail", { item: fakePosts[index] })}
            >
                <Text className="text-sm">{item.content}</Text>
            </TouchableOpacity>

            <View className="flex-row space-x-4 justify-between">
                <View className="flex-row space-x-8">
                    <TouchableOpacity
                        onPress={() => {
                            liked ? likes.splice(likes.indexOf(window.viewer.id), 1) : likes.push(window.viewer.id);
                            setClicked(!clicked)
                        }}
                    >
                        <AntDesign name="like1" style={{ color: liked ? "blue" : "black" }} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            disLiked ? disLikes.splice(disLikes.indexOf(window.viewer.id), 1) : disLikes.push(window.viewer.id);
                            setClicked(!clicked)
                        }}
                    >
                        <AntDesign name="dislike1" size={20} style={{ color: disLiked ? "blue" : "black" }} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    className="flex-row space-x-4"
                    onPress={() => navigation.navigate("CommentDetail", { item: fakePosts[index] })}
                >
                    <FontAwesome5 name="comments" size={20} />
                    <Text>{item.numberOfComment} comments</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function GroupComponent() {
    const isFocus = useIsFocused();
    const [re, setRe] = useState(false);
    useEffect(() => {
        setRe(!re)
    }, [isFocus])
    return (
        <ScrollView
            className="p-3 space-y-4 mb-44"
            showsVerticalScrollIndicator={false}
        >
            <Text className="text-2xl">Posts</Text>
            {
                fakePosts.map((item, index) => {
                    return itemPostTemplate(item, index)
                })
            }
        </ScrollView>
    )
}

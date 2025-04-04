import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Documents from "@/assets/icons/documents.svg"
import { router, useRouter } from 'expo-router'

const CategoryCard = ({ title, Icon, themeColor }) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push(`/(root)/category/${title}`)} className='p-3 flex-row items-center bg-white m-2 rounded-2xl shadow-2xl w-1/2'>

            {/* Icon Container with Shadow */}
            <View className={`${themeColor ? themeColor : "bg-sky-500"} rounded-full h-14 w-14 justify-center items-center mx-1`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    elevation: 6, // For Android shadow
                }}
            >
                <Icon width={30} height={30} />
            </View>

            {/* Text Section */}
            <View className='justify-center  mx-2'>
                <Text className='text-[18px] font-JakartaSemiBold'>{title}</Text>
                {/* <Text className='text-[12px] font-JakartaMedium'>34 Files</Text> */}
            </View>

        </TouchableOpacity>
    )
}

export default CategoryCard

import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Circle } from 'react-native-svg';

const CircularProgressIndicator = ({ usedStorage, totalStorage }) => {

    const percentage = (usedStorage / totalStorage) * 100;
    const strokeWidth = 10;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference * (1 - percentage / 100);

    return (
        <View className="items-center justify-center mx-5">
            <Svg width={120} height={120} viewBox="0 0 120 120">
                {/* Background Circle */}
                <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#E0E0E0"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#FFFFFF"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90 60 60)"  // Rotating to start from top
                />
            </Svg>
            {/* Text in the middle */}
            <View className="absolute items-center">
                <Text className="text-white font-JakartaBold text-xl">
                    {Math.round(percentage)}%
                </Text>

            </View>
        </View>
    );
}

export default CircularProgressIndicator;

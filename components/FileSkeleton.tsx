import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const FileCardSkeleton = () => {
    return (
        <View className="w-56 h-52 p-2 m-2">
            {/* <SkeletonPlaceholder> */}
            <View className="bg-white shadow-lg rounded-xl w-full h-full p-4 items-center justify-between">

                <View className="h-20 w-20 rounded-full bg-[#FEF1F1] shadow-md items-center justify-center" />

                <View className="w-full mt-2 items-center">
                    <View className="h-4 w-32 bg-gray-300 rounded-md mb-2" />
                    <View className="h-3 w-20 bg-gray-300 rounded-md mb-2" />
                    <View className="h-3 w-28 bg-gray-300 rounded-md" />
                </View>

                <View className="absolute top-3 right-3">
                    <ActivityIndicator size="small" color="#ccc" />
                </View>
            </View>
            {/* </SkeletonPlaceholder> */}
        </View>
    );
};

const FileTileSkeleton = () => {
    return (
        <View className="p-4 m-2 rounded-2xl bg-white shadow-md">

            <View className="flex-row items-center">
                {/* File Icon Skeleton */}
                <View className="w-10 h-10 rounded-full bg-gray-300 mr-3" />

                {/* File Details Skeleton */}
                <View className="flex-1">
                    <View className="w-3/4 h-4 bg-gray-300" />
                    <View className="flex-row justify-between items-center mt-2">
                        <View className="w-1/4 h-3 bg-gray-300" />
                        <View className="w-1/4 h-3 bg-gray-300" />
                    </View>
                </View>

                {/* Dots Menu Skeleton */}
                <View className="w-8 h-8 bg-gray-300 rounded-full ml-3" />
            </View>

        </View>
    );
};

export { FileCardSkeleton, FileTileSkeleton };

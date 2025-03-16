import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { formatDateTime, formatSize, getFileIcon, openFile } from '@/constants';

const SearchTile = ({ file }) => {
    return (
        <TouchableOpacity onPress={() => openFile(file)} activeOpacity={0.7}>
            <View className="p-4 flex-row items-center bg-white">
                <Image source={getFileIcon(file.extension)} className="w-10 h-10 mr-3" resizeMode="contain" />

                <View className="flex flex-1">
                    <Text className="text-black font-semibold" numberOfLines={1}>{file.name}</Text>
                    <View className="flex-row justify-between items-center mt-1">
                        <Text className="text-gray-500 text-xs">{formatSize(file.size)}</Text>
                        <Text className="text-gray-500 text-xs">{formatDateTime(file.createdAt)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SearchTile;
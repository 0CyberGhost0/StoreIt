import { View, Text, Image } from 'react-native'
import React from 'react'
import { formatDateTime, getFileIcon } from '@/constants';

export const Thumbnail = ({ extension }) => {
    return (
        <View className='bg-[#FEF1F1] p-2 rounded-2xl m-2' >
            <Image
                source={getFileIcon(extension)}
                alt="thumbnail"
                className='w-10 h-10'
            />
        </View>
    );
};

const ImageThumbnail = ({ file }) => {
    return (
        <View className="flex-row items-center space-x-4 p-1 border border-gray-200 rounded-xl">
            <Thumbnail type={file.type} extension={file.extension} url={file.url} />

            <View className="flex-col">
                <Text className="text-base font-semibold text-gray-800 mb-1">{file.name}</Text>
                <Text className="text-sm text-gray-500 mx-4" >{formatDateTime(file.createdAt)}</Text>
            </View>
        </View>
    )
}


export default ImageThumbnail
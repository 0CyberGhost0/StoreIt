import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { formatDateTime, formatSize } from '@/constants';
import ImageThumbnail from './ImageThumbnail';

export const DeleteComponent = ({ fileName, onDelete, onCancel }) => {
    return (
        <View className="p-6 items-center bg-white rounded-3xl w-full max-w-[90%]">
            <Text className="text-xl font-bold text-gray-800 text-center">
                Are you sure you want to delete
            </Text>
            <Text className="font-bold text-red-500 text-xl mt-4 text-center">{fileName}</Text>

            <View className="flex-row justify-center mt-6 flex-wrap gap-4 w-full">
                <CustomButton
                    title="Cancel"
                    className="p-2 flex-1 bg-white"
                    textColor="text-black"
                    onPress={onCancel}
                />
                <CustomButton
                    title="Yes, Delete"
                    className="p-2 flex-1 bg-[#ea676d] shadow-md"
                    textColor="text-white"
                    onPress={onDelete}
                />
            </View>
        </View>
    );
};




const DetailRow = ({ label, value }) => (
    <View className="flex-row justify-between px-4 py-2 border-b border-gray-200">
        <Text className="text-gray-600 font-semibold mx-4">{label}</Text>
        <Text className="text-gray-800">{value}</Text>
    </View>
);

export const FileDetailsComponent = ({ file }) => {
    return (
        <View className="bg-white rounded-3xl w-[90%] p-4 items-center">
            <Text className="text-xl font-bold text-gray-800 m-2">File Details</Text>
            <ImageThumbnail file={file} />
            <View className="mt-4 space-y-2">
                <DetailRow label="Format:" value={file.extension} />
                <DetailRow label="Size:" value={formatSize(file.size)} />
                <DetailRow label="Owner:" value={file.ownerName} />
                <DetailRow label="Last edit:" value={formatDateTime(file.createdAt)} />
            </View>
        </View>
    );
};

export const RenameComponent = ({ onPress, ...props }) => {

    return (
        <View className="p-6 items-center bg-white rounded-3xl w-[90%]">
            <Text className="text-xl font-bold text-gray-800">Rename File</Text>
            <TextInput
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter new name"
                {...props}
            />
            <CustomButton
                title="Rename"
                className="p-2 mt-6 w-[150px] bg-[#ea676d]"
                textColor="text-white"
                onPress={onPress}
            />
        </View>
    );
};

export const ShareComponent = ({ onShare }) => {
    const [email, setEmail] = useState("");

    return (
        <View className="p-6 items-center bg-white rounded-3xl w-[90%]">
            <Text className="text-xl font-bold text-gray-800">Share File</Text>

            <TextInput
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <CustomButton
                title="Share"
                className="p-2 mt-6 w-[150px] bg-[#ea676d]"
                textColor="text-white"
                onPress={() => onShare(email)}
            />
        </View>
    );
};

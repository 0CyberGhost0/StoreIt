import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { formatDateTime, formatSize, getFileIcon, icons, openFile } from '@/constants';
import ActionDropdown from './ActionDropdown';
import Modal from 'react-native-modal';
import { Pressable } from 'react-native';


const FileCard = ({ file }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                onPress={() => openFile(file)}
                activeOpacity={0.8}
                className="w-44 h-52 p-2 m-2"
            >
                <View className="bg-white shadow-lg rounded-xl w-full h-full p-4 items-center justify-between">

                    {/* File Icon */}
                    <View className="h-20 w-20 rounded-full bg-[#FEF1F1] shadow-md items-center justify-center">
                        <Image source={getFileIcon(file.extension)} className="w-12 h-12" resizeMode="contain" />
                    </View>

                    {/* File Details */}
                    <View className="w-full mt-2 items-center">
                        <Text className="text-black font-semibold text-sm text-center" numberOfLines={1}>
                            {file.name}
                        </Text>
                        <Text className="text-gray-500 text-sm font-JakartaSemiBold">{formatSize(file.size)}</Text>
                        <Text className="text-gray-400 text-xs">{formatDateTime(file.createdAt)}</Text>
                    </View>

                    {/* Options Button */}
                    <TouchableOpacity className="absolute top-3 right-3" onPress={(event) => { event.stopPropagation(); setModalVisible(true); }}>
                        <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}

                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.3}
                useNativeDriver={true}

            >
                <Pressable onPress={() => setModalVisible(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActionDropdown file={file} onClose={() => setModalVisible(false)} />
                </Pressable>
            </Modal>
        </View>
    );
};

export default FileCard;

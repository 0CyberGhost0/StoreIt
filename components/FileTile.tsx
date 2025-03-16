import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { formatDateTime, formatSize, getFileIcon, icons, openFile } from '@/constants';

import Modal from 'react-native-modal';
import ActionDropdown from './ActionDropdown';
import { Pressable } from 'react-native';


const FileTile = ({ file }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View >
            <TouchableOpacity onPress={() => openFile(file)} activeOpacity={0.7}>
                <View className="p-4 flex-row items-center bg-white m-2 rounded-2xl shadow-md">
                    <Image source={getFileIcon(file.extension)} className="w-10 h-10 mr-3" resizeMode="contain" />

                    <View className="flex flex-1">
                        <Text className="text-black font-semibold" numberOfLines={1}>{file.name}</Text>
                        <View className="flex-row justify-between items-center mt-1">
                            <Text className="text-gray-500 text-xs">{formatSize(file.size)}</Text>
                            <Text className="text-gray-500 text-xs">{formatDateTime(file.createdAt)}</Text>
                        </View>
                    </View>

                    {/* Dots Menu Button */}
                    <TouchableOpacity onPress={(event) => { event.stopPropagation(); setModalVisible(true); }}>
                        <Image source={icons.dots} className='w-8 h-8' resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOutRightBig"
                backdropOpacity={0.3}
                useNativeDriver={true}
            >
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white w-[250px] rounded-xl p-4 shadow-lg">
                        <ActionDropdown file={file} onClose={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default FileTile;

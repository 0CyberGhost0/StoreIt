import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { formatDateTime, formatSize, getFileIcon, icons, openFile } from '@/constants';
import ActionDropdown from './ActionDropdown';
import Modal from 'react-native-modal';

const FileCard = ({ file }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                onPress={() => openFile(file)}
                activeOpacity={0.8}
                className="w-56 h-52 p-2 m-2"
            >
                <View className="bg-white shadow-lg rounded-xl w-full h-full p-4 relative">

                    {/* Dots Icon at Top Right */}
                    <TouchableOpacity
                        className="absolute top-2 right-2"
                        onPress={(event) => {
                            event.stopPropagation();
                            setModalVisible(true);
                        }}
                    >
                        <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
                    </TouchableOpacity>

                    {/* File Icon */}
                    <View className="items-center mt-4">
                        <View className="h-20 w-20 rounded-full bg-[#FEF1F1] shadow-md items-center justify-center">
                            <Image source={getFileIcon(file.extension)} className="w-12 h-12" resizeMode="contain" />
                        </View>
                    </View>

                    {/* File Name */}
                    <View className="items-center mt-2">
                        <Text
                            className="text-black font-semibold text-sm truncate text-center"
                            numberOfLines={1}
                        >
                            {file.name}
                        </Text>
                    </View>

                    {/* File Size, Date & Bookmark */}
                    <View className="flex-row justify-between items-center mt-2">
                        <View className="flex-1 items-center">
                            <Text className="text-gray-500 text-sm font-JakartaSemiBold">
                                {formatSize(file.size)}
                            </Text>
                            <Text className="text-gray-400 text-xs text-center">
                                {formatDateTime(file.createdAt)}
                            </Text>
                        </View>

                        {/* Bookmark Icon */}
                        {/* <TouchableOpacity>
                            <View className='bg-[#EEE7FE] h-10 w-10 items-center justify-center rounded-full'>
                                <Image source={icons.bookmark2} className="h-6 w-6" resizeMode="contain" />
                            </View>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableOpacity>

            {/* Modal for Actions */}
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
    );
};

export default FileCard;

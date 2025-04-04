import { View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { CloseCircle } from "iconsax-react-native";
import * as Progress from "react-native-progress";

const ProgressModal = ({ visible, onCancel }) => {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View className="flex-1">
                {/* Transparent Overlay */}
                <View className="absolute inset-0 opacity-0" />

                {/* Floating Modal at Bottom-Right */}
                <View className="absolute right-4 bottom-4 bg-white rounded-lg p-4 items-center shadow-lg z-10">
                    <View className="flex-row items-center space-x-4">
                        {/* Animated Progress Bar */}
                        <Progress.Bar
                            indeterminate={true}
                            width={180}
                            color="#FA7275"
                            borderRadius={8}
                            borderWidth={0}
                            height={8}
                        />

                        {/* Cancel Button */}
                        <TouchableOpacity onPress={onCancel}>
                            <CloseCircle size={28} color="#FA7275" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ProgressModal;

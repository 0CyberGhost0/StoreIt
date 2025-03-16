import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
    title,
    className,
    IconLeft,
    IconRight,
    bgColor = "bg-[#0286ff]",
    textColor = "text-white",
    onPress,
    ...props
}) => {
    return (
        <TouchableOpacity
            className={`flex flex-row w-full rounded-full justify-center items-center shadow-md shadow-neutral-400/70 p-3 ${bgColor} ${className}`}
            onPress={onPress}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${textColor}`}>{title}</Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
};

export default CustomButton;
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { icons } from "@/constants";

const InputField = ({
    label,
    placeholder,
    LeftIcon,
    RightIcon,
    RightIcon1,
    secureTextEntry = false,
    className,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <TextInput
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        secureTextEntry={isPasswordVisible}
                        label={<Text className="font-JakartaSemiBold">{label}</Text>}

                        // placeholder={<Text className="font-JakartaLight" >{placeholder}</Text>}
                        placeholder={placeholder}
                        mode="outlined"
                        outlineColor="#E0E0E0" // Grey
                        activeOutlineColor="#272727"
                        textColor="#232323"
                        theme={{
                            roundness: 12,
                            colors: {
                                primary: isFocused ? "#272727" : "#E0E0E0", // Dark/Grey
                                error: "#F57C00", // Warning color
                            },
                        }}
                        right={
                            RightIcon ? (
                                <TextInput.Icon
                                    icon={isPasswordVisible ? RightIcon : RightIcon1}
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                />
                            ) : null
                        }
                        left={
                            <TextInput.Icon
                                icon={() => <LeftIcon />}
                            />
                        }
                        style={{
                            borderRadius: 10,
                            backgroundColor: "#F7F8FA",
                        }}
                        {...props}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;

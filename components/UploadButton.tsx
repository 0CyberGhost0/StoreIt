import { View, Image, Animated, TouchableWithoutFeedback } from "react-native";
import React, { useRef } from "react";
import { icons } from "@/constants";
import UploadFunction from "@/constants/Upload";
import useAuthStore from "@/store";
// import UploadFunction from "@/constants/Upload";

const UploadButton = () => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const { user, token } = useAuthStore();


    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.85,  // Shrinks on press
            useNativeDriver: true,
            speed: 50,
        }).start();
    };

    const handlePressOut = async () => {
        Animated.spring(scaleValue, {
            toValue: 1,  // Returns to normal size
            useNativeDriver: true,
            speed: 50,
        }).start();

        try {
            console.log("OKKK");

            await UploadFunction(token, user.name);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                style={{
                    transform: [{ scale: scaleValue }],
                    position: "absolute",
                    top: -24,
                    alignSelf: "center",
                    backgroundColor: "#FA7275",
                    width: 74,
                    height: 74,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 40,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >
                <Image source={icons.upload} style={{ height: 48, width: 48, tintColor: "white" }} resizeMode="contain" />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default UploadButton;

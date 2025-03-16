import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import CircularProgressIndicator from './CircularProgressIndicator'
import { bytesToMB, getUsedStorage } from '@/constants';
import useAuthStore from '@/store';

const AvailableStorage = () => {


    const [usedStorage, setUsedStorage] = useState(0);
    const totalStorage = 10;
    const { token } = useAuthStore();



    useEffect(() => {
        const fetchStorage = async () => {// Define your token here
            const response = await getUsedStorage(token);
            // setUsedStorage(response);
            console.log("Used Storage:", response?.data.usedStorage);
            if (response?.status === 200) {
                setUsedStorage(bytesToMB(response?.data.usedStorage));
            }
        };
        fetchStorage();
    }, []);
    return (
        <LinearGradient
            colors={['#FA7275', '#ea676d']} // Gradient colors
            style={{
                borderRadius: 16,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 9,
                padding: 0,
                shadowColor: "#000", // Shadow color
                shadowOffset: { width: 0, height: 4 }, // Offset (X, Y)
                shadowOpacity: 0.3, // Shadow opacity
                shadowRadius: 6, // Blur radius
                elevation: 8, // For Android shadow
            }}
        >
            <CircularProgressIndicator usedStorage={usedStorage} totalStorage={totalStorage} />

            <View className="flex-1 items-center justify-center">
                <Text className="text-xl font-JakartaBold text-white">
                    Available Storage
                </Text>
                <Text className="text-sm font-JakartaSemiBold text-white">
                    {usedStorage} MB  / 10 MB
                </Text>
            </View>
        </LinearGradient>
    )
}

export default AvailableStorage;

import "../global.css";
import React, { useEffect } from 'react';
import * as Notification from 'expo-notifications';
import { Redirect } from "expo-router";
import useAuthStore from "@/store";
Notification.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Home = () => {

    const { isAuthenticated } = useAuthStore();
    useEffect(() => {
        const registerForPushNotificationsAsync = async () => {
            const { status } = await Notification.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }
            registerForPushNotificationsAsync();
        }
    }, []);


    if (isAuthenticated) {
        return <Redirect href="/(root)/(tabs)/Home" />
    }
    return <Redirect href="/(auth)/SignIn" />
}

export default Home;
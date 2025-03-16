import "../global.css";
import React from 'react'

import { Redirect } from "expo-router";
import useAuthStore from "@/store";

const Home = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Redirect href="/(root)/(tabs)/Home" />
    }
    return <Redirect href="/(auth)/SignIn" />
}

export default Home;
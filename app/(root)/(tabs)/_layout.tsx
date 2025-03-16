import { View, Text, Image, TouchableWithoutFeedback, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Home, Folder } from "iconsax-react-native";
import { Bookmark } from "iconsax-react-native";
import { Profile as User } from "iconsax-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";


const Layout = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F7F8FA]">
            <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    tabBarStyle: {
                        borderRadius: 50,
                        marginHorizontal: 20,
                        marginBottom: 22,
                        height: 75,
                        flexDirection: "row",
                        position: "absolute",
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                    },
                }}
            >
                <Tabs.Screen
                    name="Home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarButton: (props) => (
                            <TouchableWithoutFeedback {...props}>
                                <View className="flex-1 justify-center items-center">
                                    {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View className={`rounded-full w-16 h-16 items-center justify-center ${focused ? "bg-gray-100" : ""}`}>
                                <Home
                                    color={focused ? "#FA7275" : "#000000"}
                                    variant={focused ? "Bold" : "Linear"}
                                    size={30}
                                />
                                <Text className={`w-20 text-center text-[12px] mt-1 ${focused ? "text-[#FA7275] font-JakartaSemiBold" : ""}`}>
                                    Home
                                </Text>
                            </View>
                        ),

                    }}
                />
                <Tabs.Screen
                    name="Search"
                    options={{
                        title: "Search",
                        headerShown: false,
                        tabBarButton: (props) => (
                            <TouchableWithoutFeedback {...props}>
                                <View className="flex-1 justify-center items-center">
                                    {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View className={`rounded-full w-16 h-16 items-center justify-center ${focused ? "bg-gray-100" : ""
                                }`}>
                                <Folder color={focused ? "#FA7275" : "#000000"} variant={focused ? "Bold" : "Linear"} size={30} />
                                <Text className={`w-20 text-center text-[12px] mt-1 ${focused ? "text-[#FA7275]" : ""} ${focused ? "font-JakartaSemiBold" : ""}`} >Search</Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Upload"
                    options={{
                        title: "Upload",
                        headerShown: false,
                        tabBarButton: (props) => (
                            <TouchableWithoutFeedback {...props}>
                                <View className="absolute -top-6 self-center bg-[#FA7275] w-20 h-20 justify-center items-center rounded-full shadow-xl shadow-black">
                                    {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Image source={icons.upload} className="h-12 w-12" resizeMode="contain" tintColor="white" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Saved"
                    options={{
                        title: "Saved",
                        headerShown: false,
                        tabBarButton: (props) => (
                            <TouchableWithoutFeedback {...props}>
                                <View className="flex-1 justify-center items-center">
                                    {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View className={`rounded-full w-16 h-16 items-center justify-center ${focused ? "bg-gray-100" : ""
                                }`}>
                                <Bookmark color={focused ? "#FA7275" : "#000000"} variant={focused ? "Bold" : "Linear"} size={30} />
                                <Text className={`w-20 text-center text-[12px] mt-1 ${focused ? "text-[#FA7275]" : ""} ${focused ? "font-JakartaSemiBold" : ""}`} >Saved</Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarButton: (props) => (
                            <TouchableWithoutFeedback {...props} >
                                <View className="flex-1 justify-center items-center">
                                    {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View className={`rounded-full w-16 h-16 items-center justify-center ${focused ? "bg-gray-100" : ""
                                }`}>
                                <User color={focused ? "#FA7275" : "#000000"} variant={focused ? "Bold" : "Linear"} size={30} />
                                <Text className={`w-20 text-center text-[12px] mt-1 ${focused ? "text-[#FA7275]" : ""} ${focused ? "font-JakartaSemiBold" : ""}`} > Profile</Text>
                            </View>
                        ),
                    }}
                />
            </Tabs >
        </SafeAreaView>
    );
};

export default Layout;
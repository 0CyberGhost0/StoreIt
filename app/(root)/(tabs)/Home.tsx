import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getRecentFiles, images, SVG } from '@/constants'
import { Notification } from 'iconsax-react-native'
import SearchField from '@/components/SearchField'
import AvailableStorage from '@/components/AvailableStorage'
import CategoryCard from '@/components/CategoryCard'
import FileTile from '@/components/FileTile'
import useAuthStore from '@/store'
import { useRouter } from 'expo-router'
import SearchTile from '@/components/SearchTile'

const Home = () => {
    const [searchText, setSearchText] = useState("");
    const [recentFiles, setRecentFiles] = useState([]);
    const [searchFiles, setSearchFiles] = useState([]);
    console.log("Home Rendered");

    const { user, token, logout } = useAuthStore();
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRecentFiles({ token });
                setRecentFiles(response.data || []);
            } catch (error) {
                console.log("Error fetching list:", error);
            }
        };
        fetchData();
    }, [token]);
    useEffect(() => {
        if (searchText) {
            const filteredFiles = recentFiles.filter((file) =>
                file.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchFiles(filteredFiles);
        } else {
            setSearchFiles([]); // Clear search results when search is empty
        }
    }, [searchText, recentFiles]);

    return (
        <SafeAreaView className="flex-1 bg-[#F7F8FA] p-4">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-3">
                    <Image source={images.avatar} className="w-14 h-14 rounded-full mx-2" resizeMode="contain" />
                    <View className='flex-col'>
                        <Text className="font-JakartaMedium text-[14px]">Welcome Back,</Text>
                        <Text className="font-JakartaBold text-[18px]">{user?.name || "Guest"}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    logout();
                    router.push("/(auth)/SignIn");
                }}>
                    <Notification size={32} color="#000000" />
                </TouchableOpacity>
            </View>

            <SearchField onChangeText={setSearchText} />

            {/* 🔹 Wrapping Dropdown and Main Content */}
            <View >
                {searchText.length > 0 && (
                    <View className="absolute top-0 left-0 right-0 bg-white rounded-lg max-h-60 overflow-hidden z-10 px-4 mx-2 shadow-2xl">
                        <FlatList
                            data={searchFiles}
                            keyExtractor={(file) => file.id.toString()}
                            renderItem={({ item }) => <SearchTile file={item} />}
                            ListEmptyComponent={
                                <Text className="text-gray-500 text-center py-4 text-lg">No matching files found</Text>
                            }
                            ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
                        />
                    </View>
                )}

                <AvailableStorage />

                <Text className='text-[24px] font-JakartaBold mt-4 mx-4'>Categories</Text>
                <View className="flex-row mr-6 mt-2">
                    <CategoryCard title="Documents" Icon={SVG.Document} themeColor="bg-[#FF7474]" />
                    <CategoryCard title="Images" Icon={SVG.Images} themeColor="bg-[#56B8FF]" />
                </View>
                <View className='flex-row mr-6'>
                    <CategoryCard title="Videos" Icon={SVG.Videos} themeColor="bg-[#3DD9B3]" />
                    <CategoryCard title="Others" Icon={SVG.Other} themeColor="bg-[#EEA8FD]" />
                </View>

                <View className='flex-row justify-between items-center'>
                    <Text className='text-[24px] font-JakartaBold mt-4 mx-4'>Recent Files</Text>
                    <TouchableOpacity onPress={() => router.push("/(root)/RecentFile")}>
                        <Text className='items-center underline justify-center mt-5'>View all</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-80 mt-2 pb-10">
                    {recentFiles.length > 0 ? (
                        <FlatList
                            data={recentFiles}
                            keyExtractor={(file) => file.id.toString()}
                            renderItem={({ item }) => <FileTile file={item} />}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text className="text-gray-500 text-center mt-4">No recent files found</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>

    );
}

export default Home;

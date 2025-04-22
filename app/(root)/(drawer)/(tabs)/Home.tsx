import { View, Text, Image, TouchableOpacity, FlatList, Keyboard, RefreshControl, StatusBar } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecentFiles, images, SVG } from '@/constants';
import { Notification } from 'iconsax-react-native';
import SearchField from '@/components/SearchField';
import AvailableStorage from '@/components/AvailableStorage';
import CategoryCard from '@/components/CategoryCard';
import FileTile from '@/components/FileTile';
import useAuthStore from '@/store';
import { useRouter } from 'expo-router';
import SearchTile from '@/components/SearchTile';
import { FileTileSkeleton } from '@/components/FileSkeleton';
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { SubscriptionModal } from '../upgrade';

const Home = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [recentFiles, setRecentFiles] = useState([]);
    const [searchFiles, setSearchFiles] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isRecentFileLoading, setIsRecentFileLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const searchFieldRef = useRef(null);

    const { user, token } = useAuthStore();
    const router = useRouter();

    // 🔥 Fetch recent files
    const fetchData = useCallback(async () => {
        setIsRecentFileLoading(true);
        try {
            const response = await getRecentFiles({ token, limit: 5 });
            setRecentFiles(response.data || []);
        } catch (error) {
            console.log("Error fetching list:", error);
        } finally {
            setIsRecentFileLoading(false);
            setRefreshing(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [token]);

    useEffect(() => {
        if (searchText) {
            const filteredFiles = recentFiles.filter((file) =>
                file.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchFiles(filteredFiles);
        } else {
            setSearchFiles([]);
        }
    }, [searchText, recentFiles]);

    // 🔥 Pull-to-refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    // 🔥 Render Categories
    const renderCategories = () => (
        <View>
            <Text className='text-[24px] font-JakartaBold mt-4 mx-4'>Categories</Text>
            <View className="flex-row mr-6 mt-2">
                <CategoryCard title="Documents" Icon={SVG.Document} themeColor="bg-[#FF7474]" />
                <CategoryCard title="Images" Icon={SVG.Images} themeColor="bg-[#56B8FF]" />
            </View>
            <View className='flex-row mr-6'>
                <CategoryCard title="Videos" Icon={SVG.Videos} themeColor="bg-[#3DD9B3]" />
                <CategoryCard title="Others" Icon={SVG.Other} themeColor="bg-[#EEA8FD]" />
            </View>
        </View>
    );

    // 🔥 Render Recent Files Section
    const renderRecentFiles = () => (
        <View>
            <View className='flex-row justify-between items-center'>
                <Text className='text-[24px] font-JakartaBold mt-4 mx-4'>Recent Files</Text>
                <TouchableOpacity onPress={() => router.push("/(root)/RecentFile")}>
                    <Text className='items-center underline justify-center mt-5'>View all</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-4">
                {isRecentFileLoading ? (
                    Array(6).fill({}).map((_, index) => <FileTileSkeleton key={index} />)
                ) : (
                    recentFiles.length > 0 ? (
                        recentFiles.map((file) => <FileTile file={file} key={file.id} />)
                    ) : (
                        <Text className="text-gray-500 text-center mt-4">No recent files found</Text>
                    )
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#F7F8FA]">
            <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

            {/* ✅ Single FlatList for Entire Screen */}
            <FlatList
                data={[]}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={
                    <>
                        <View className="p-4">
                            {/* Header */}
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center space-x-3">
                                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                        <Image source={images.avatar} className="w-14 h-14 rounded-full mx-2" resizeMode="contain" />
                                    </TouchableOpacity>
                                    <View className='flex-col'>
                                        <Text className="font-JakartaMedium text-[14px]">Welcome Back,</Text>
                                        <Text className="font-JakartaBold text-[18px]">{user?.name || "Guest"}</Text>
                                    </View>
                                </View>
                                {/* <TouchableOpacity onPress={() => {
                                    router.push("/(auth)/SignIn");
                                    logout();
                                }}>
                                    <Notification size={32} color="#000000" />
                                </TouchableOpacity> */}
                            </View>

                            {/* ✅ Search Field */}
                            <SearchField
                                ref={searchFieldRef}
                                onChangeText={setSearchText}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />

                            {/* 🔹 Display Search Results */}
                            {isSearchFocused && searchText.length > 0 && (
                                <View className="absolute top-40 mx-6 left-0 right-0 bg-white rounded-lg max-h-60 overflow-hidden z-10 px-4 shadow-2xl">
                                    <FlatList
                                        data={searchFiles}
                                        keyExtractor={(file) => file.id.toString()}
                                        renderItem={({ item }) => <SearchTile file={item} />}
                                        ListEmptyComponent={
                                            <Text className="text-gray-500 text-center py-4 text-lg">No matching files found</Text>
                                        }
                                        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                            )}

                            {/* 🔥 Available Storage */}
                            <AvailableStorage />

                            {/* 🔥 Render Categories */}
                            {renderCategories()}

                            {/* 🔥 Render Recent Files */}
                            {renderRecentFiles()}
                        </View>
                    </>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#6200ee']}
                        tintColor="#6200ee"
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

export default Home;

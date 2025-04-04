import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import FileCard from '@/components/FileCard';
import { getList, getRecentFiles, icons } from '@/constants';
import useAuthStore from '@/store';
import { FileCardSkeleton } from '@/components/FileSkeleton';

const RecentFilePage = () => {
    const [recentFiles, setRecentFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const fetchRecentFiles = async () => {
            try {
                const response = await getRecentFiles({ token, limit: 15 });
                setRecentFiles(response?.data || []);
            } catch (error) {
                setRecentFiles([]);
                console.log("Error fetching recent files:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentFiles();
    }, []);

    return (
        <SafeAreaView className="flex-1 mr-2 bg-[#F7F8FA]">
            <View className='flex flex-row items-center mx-4'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.leftArrow} color='black' className='h-7 w-7 mt-6' />
                </TouchableOpacity>
                <Text className="text-[24px] font-JakartaBold mt-4 mx-4">Recent Files</Text>
            </View>

            {loading ? (
                <FlatList
                    data={Array(8).fill({})}  // Render 8 skeletons while loading
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={() => (
                        <View style={{ flex: 1, marginHorizontal: 8 }}>
                            <FileCardSkeleton />
                        </View>
                    )}
                    className='mt-4'
                />
            ) : recentFiles?.length === 0 ? (
                <Text className="text-center text-gray-500 mt-10">No recent files found.</Text>
            ) : (
                <FlatList
                    data={recentFiles}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, marginHorizontal: 8 }}>
                            <FileCard file={item} />
                        </View>
                    )}
                    className='mt-4'
                />
            )}
        </SafeAreaView>
    );
};

export default RecentFilePage;

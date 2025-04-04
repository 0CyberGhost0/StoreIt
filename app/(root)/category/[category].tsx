import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import FileCard from '@/components/FileCard';
import { getList, icons, images } from '@/constants';
import useAuthStore from '@/store';
import { FileCardSkeleton } from '@/components/FileSkeleton';

const CategoryPage = () => {
    const { category } = useLocalSearchParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { token } = useAuthStore();
    const router = useRouter();

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await getList({ category, token });
            setFiles(response?.data || []);
        } catch (error) {
            setFiles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [category]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchFiles();
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView className="flex-1 mr-4 bg-[#F7F8FA]">
            <View className='flex flex-row items-center mx-4'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.leftArrow} color='black' className='h-7 w-7 mt-6' />
                </TouchableOpacity>
                <Text className="text-[24px] font-JakartaBold mt-4 mx-4">{category}</Text>
            </View>

            {loading ? (
                <FlatList
                    data={Array(8).fill({})}
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
            ) : files?.length === 0 ? (
                <View className='flex-1 items-center justify-center'>
                    <Image source={images.notfound} className='w-80 h-80' />
                    <Text className="text-center text-gray-500 mt-20">No files found in this category.</Text>
                </View>
            ) : (
                <FlatList
                    data={files}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, marginHorizontal: 8 }}>
                            <FileCard file={item} />
                        </View>
                    )}
                    className='mt-4'
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default CategoryPage;

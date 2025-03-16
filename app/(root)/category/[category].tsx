import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator } from 'react-native';

import FileCard from '@/components/FileCard';
import { getList } from '@/constants';
import useAuthStore from '@/store';

const CategoryPage = () => {
    const { category } = useLocalSearchParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getList({ category, token });
                setFiles(response.data);
            } catch (error) {
                setFiles([]);
                console.log("Error fetching files:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [category]);

    return (
        <SafeAreaView className="flex-1 bg-[#F7F8FA] ">
            <Text className="text-[24px] font-JakartaBold mt-4 mx-4">{category}</Text>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : files?.length === 0 ? (
                <Text className="text-center text-gray-500 mt-10">No files found in this category.</Text>
            ) : (
                <FlatList
                    data={files}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <FileCard file={item} />
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default CategoryPage;

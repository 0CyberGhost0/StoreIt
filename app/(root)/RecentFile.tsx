import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FileCard from '@/components/FileCard';
import { getRecentFiles } from '@/constants';
import useAuthStore from '@/store';

const RecentFile = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRecentFiles({ token });
                setFiles(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching list:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <View className='bg-[#F7F8FA] '>
            <Text className="text-[24px] font-JakartaBold mt-4 mx-4">Recent Files</Text>
            {loading ? (
                <Text className="text-center text-gray-500">Loading...</Text>
            ) : (
                <FlatList
                    data={files}
                    keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string
                    renderItem={({ item }) => <FileCard file={item} />}
                    ListEmptyComponent={<Text className="text-center text-gray-400">No recent files found</Text>}
                />
            )}
        </View>
    );
};

export default RecentFile;

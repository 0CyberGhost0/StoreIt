import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import FileCard from '@/components/FileCard';
import { getRecentFiles } from '@/constants';
import useAuthStore from '@/store';
import { FileCardSkeleton } from '@/components/FileSkeleton';

const SavedScreen = () => {
  const [savedFiles, setSavedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSavedFiles = async () => {
      try {
        const response = await getRecentFiles({ token });
        setSavedFiles(response?.data || []);
      } catch (error) {
        console.log("Error fetching saved files:", error);
        setSavedFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedFiles();
  }, [token]);

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#F7F8FA]">
      {/* Header */}
      <View className="flex flex-row items-center mx-4">
        <Text className="text-[24px] font-JakartaBold mt-4">Saved Files</Text>
      </View>

      {/* Display Files or Skeleton Loader */}
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
      ) : savedFiles.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">No saved files yet.</Text>
      ) : (
        <FlatList
          data={savedFiles}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <FileCard file={item} />
            </View>
          )}
          className='mt-4 mb-28 -mx-4'
        />
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;

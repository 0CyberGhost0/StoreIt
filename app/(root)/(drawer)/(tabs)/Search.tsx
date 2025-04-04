import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import FileCard from '@/components/FileCard';
import { getRecentFiles, getSearchFiles, icons } from '@/constants';
import useAuthStore from '@/store';
import { FileCardSkeleton } from '@/components/FileSkeleton';
import SearchField from '@/components/SearchField';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  const router = useRouter();
  const [recentFile, setRecentFile] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecentFiles({ token, limit: 10 });
        setFiles(response?.data || []);
        setRecentFile(response?.data || []);
      } catch (error) {
        console.log("Error fetching list:", error);
      } finally {

        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      setFiles(recentFile);
      return;
    }

    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await getSearchFiles({ searchText, token });
        setFiles(response?.data || []);
      } catch (error) {
        setFiles([]);
        console.log("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchFiles();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#F7F8FA]">

      {/* Header with Back Button */}
      <View className="flex flex-row items-center mx-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.leftArrow} color='black' className='h-7 w-7 mt-6' />
        </TouchableOpacity>
        <Text className="text-[24px] font-JakartaBold mt-4 mx-4">Search Files</Text>
      </View>

      {/* Search Bar */}

      <SearchField onChangeText={setSearchText} />


      {/* Display Files or Skeleton Loader */}
      {loading ? (
        <FlatList
          data={Array(8).fill({})}  // Render 6 skeletons while loading
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
      ) : files?.length === 0 && searchText ? (
        <Text className="text-center text-gray-500 mt-10">No matching files found.</Text>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <FileCard file={item} />
            </View>
          )}
          className='mt-4 mb-28'
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

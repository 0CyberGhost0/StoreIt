import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SearchField from '@/components/SearchField';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Sample data (replace this with API call or search logic)
  const sampleData = [
    { id: '1', title: 'React Native Guide' },
    { id: '2', title: 'Expo Documentation' },
    { id: '3', title: 'Tailwind CSS in React Native' },
    { id: '4', title: 'Using APIs in React Native' },
  ];

  const handleSearch = (text) => {
    setQuery(text);

    if (text.trim() === '') {
      setResults([]);
    } else {
      const filteredResults = sampleData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Search Bar */}
      <SearchField onChangeText={setQuery} />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => handleSearch('')}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}

      {/* Search Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-white p-4 mt-3 rounded-lg shadow">
              <Text className="text-gray-800 text-lg">{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        query.length > 0 && (
          <Text className="text-center text-gray-500 mt-4">
            No results found.
          </Text>
        )
      )}
    </View>
  );
};

export default SearchScreen;

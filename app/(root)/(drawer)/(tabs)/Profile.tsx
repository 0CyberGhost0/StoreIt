import { View, Text, Image, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store';
import { ArrowCircleRight, ArrowCircleRight2, ArrowRight, ArrowRight2, ArrowRight3, FolderCloud, LogoutCurve, SecurityUser, Setting3, Star, UserTag } from 'iconsax-react-native';
import { images, toggle2FactorAuthentication } from '@/constants';
import { SubscriptionModal } from '../upgrade';

const Profile = () => {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    console.log(user);
    setIs2FAEnabled(user?.is2FAEnabled || false);
  }, [user]);

  const toggle2FA = async () => {
    setIs2FAEnabled((prev) => !prev);
    await toggle2FactorAuthentication(token, !is2FAEnabled);
    console.log(`2FA is now ${!is2FAEnabled ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#FA7275" />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header */}
        <View className="bg-[#FA7275] pb-8 rounded-b-3xl items-center">
          {/* <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full border-4 border-white mt-8"
            resizeMode="cover"
          /> */}
          <Image
            source={images.avatar}
            className="w-32 h-32 rounded-full border-4 border-white mt-8"
            resizeMode="cover"
          />
          <Text className="text-3xl font-bold text-white mt-4">{user.name}</Text>
          <Text className="text-white text-sm">{user.email}</Text>

          {/* Edit Button */}
          <TouchableOpacity
            className="bg-white px-6 py-2 rounded-full mt-4 shadow-md"
            onPress={() => router.push('/edit-profile')}
          >
            <Text className="text-blue-500 font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Options */}
        <View className="p-6">

          {/* Option Card Component */}
          {[
            { label: 'Settings', icon: <Setting3 size={28} color="#333" />, onClick: () => router.push('/settings') },
            { label: 'My Files', icon: <FolderCloud size={28} color="#333" />, onClick: () => router.push('/files') },
            { label: 'Help & Support', icon: <UserTag size={28} color="#333" />, onClick: () => router.push('/help') },
            { label: 'Upgrade Plan', icon: <Star size={28} color='#333' />, onClick: () => setIsModalVisible(true) },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-5 rounded-xl shadow-sm flex-row items-center justify-between mb-4"
              onPress={item.onClick}
            >
              <View className="flex-row items-center">
                {item.icon}
                <Text className="text-lg ml-4">{item.label}</Text>
              </View>
              <ArrowRight2 size={26} color='black' />
            </TouchableOpacity>
          ))}
          <SubscriptionModal visible={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)} />


          {/* Two-Factor Authentication */}
          <View className="bg-white p-5 rounded-xl shadow-sm flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <SecurityUser size={28} color="#333" />
              <Text className="text-lg ml-4">Two-Factor Authentication</Text>
            </View>
            <Switch
              value={is2FAEnabled}
              onValueChange={toggle2FA}
              thumbColor={is2FAEnabled ? "#FA7275" : "#ccc"}
              trackColor={{ false: "#ccc", true: "#FA7275" }}

            />
          </View>
        </View>


        {/* Logout Button */}
        <View className="items-center">
          <TouchableOpacity
            className="bg-red-500 px-6 py-3 rounded-full flex-row items-center justify-center shadow-lg"
            onPress={() => router.push('/logout')}
          >
            <Text className="text-white font-bold text-lg mr-2">Logout</Text>
            <LogoutCurve size={28} color="white" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  );
};

export default Profile;

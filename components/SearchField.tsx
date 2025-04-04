import { View, TextInput, Image } from 'react-native';
import React, { forwardRef } from 'react';
import { icons } from '@/constants';
import { CloseCircle } from 'iconsax-react-native';

const SearchField = forwardRef(({ onChangeText, onFocus, onBlur }, ref) => {
    return (
        <View className="bg-white rounded-xl flex-row items-center p-2 px-4 mt-5 mx-2 shadow-2xl">
            <Image source={icons.search} className='w-8 h-9' resizeMode='contain' />

            <TextInput
                ref={ref}
                placeholder="Search in Cloud"
                placeholderTextColor="#18264F"
                className="flex-1 ml-3 text-[16px] text-[#18264F] font-JakartaMedium"
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {/* <CloseCircle size={18} color='black' /> */}
        </View>
    );
});

export default SearchField;

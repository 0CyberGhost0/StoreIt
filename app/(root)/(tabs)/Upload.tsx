import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios';
import useAuthStore from '@/store';
import { getList } from '@/constants';

const Upload = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuthStore();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.canceled) return;

      const file = result.assets[0];
      setFileName(file.name);
      setUploading(false);
      uploadFile(file);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };


  const uploadFile = async (file) => {
    setUploading(true);

    try {
      const response = await axios.post("http://192.168.237.199:3000/file/upload", {
        fileName: file.name,
        contentType: file.mimeType,
        fileSize: file.size,
        ownerName: "Ved",
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });


      const { url, key, fileId } = response.data;




      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          "Content-Type": file.mimeType,
        }
      });


      if (uploadResponse.ok) {
        const confirmationResponse = await axios.patch("http://192.168.79.199:3000/file/upload/confirm", {
          fileId: fileId,

        }, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        alert("File uploaded successfully!");
      } else {
        console.log("failed to upload");
      }


    } catch (error) {
      console.log("Upload Error:", error.response.data);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className='items-center justify-center flex-1'>
      <TouchableOpacity
        className='bg-sky-300 rounded-xl w-[200px] h-[100px] items-center justify-center'
        onPress={pickDocument}
        disabled={uploading}
      >
        {uploading ? <ActivityIndicator color="white" /> : <Text className='text-black text-lg font-bold'>Upload</Text>}
      </TouchableOpacity>

      {fileName && !uploading && (
        <Text className='mt-3 text-gray-700'>Selected: {fileName}</Text>
      )}

      <TouchableOpacity
        className='bg-sky-300 rounded-xl w-[200px] h-[100px] items-center justify-center'
        onPress={getList("Image")}
      >
        <Text className='text-black text-lg font-bold'>Get List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Upload;

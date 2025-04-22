import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as Notification from 'expo-notifications';
const backendUrl="http://192.168.201.199:3000";

const UploadFunction = async (token,name) => {


  try {
    // Pick Document
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (result.canceled) return;

    const file = result.assets[0];


    const response = await axios.post(`${backendUrl}/file/upload`, {
      fileName: file.name,
      contentType: file.mimeType,
      fileSize: file.size,
      ownerName:name,
    }, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const { url, fileId } = response.data;

    // Step 2: Upload the file to the pre-signed URL
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        "Content-Type": file.mimeType,
      }
    });

    if (!uploadResponse.ok) {
      console.log("Failed to upload to S3");
      throw new Error("File upload failed");
    }

    // Step 3: Confirm upload
    await axios.patch(`${backendUrl}/file/upload/confirm`, {
      fileId,
    }, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    await Notification.scheduleNotificationAsync({
      content:{
        title:"Upload Completed",
        body:`${file.name} uploaded successfully`,
      },
      trigger:null,
    });

    console.log("✅ File uploaded successfully!");
    return { success: true, fileName: file.name };

  } catch (error) {
    console.log("❌ Upload Error:", error);
    return { success: false, error };
  }
};

export default UploadFunction;

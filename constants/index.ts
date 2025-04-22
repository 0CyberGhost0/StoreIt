import avatar from "@/assets/images/avatar.png";
import search from "@/assets/images/search.png";
import upload from "@/assets/icons/upload.png";
import image from "@/assets/icons/images.png";
import Document from "@/assets/icons/documents.svg"
import Images from "@/assets/icons/images.svg";
import Other from "@/assets/icons/others.svg";
import Videos from "@/assets/icons/video.svg";
import email from "@/assets/icons/email.png";
import pdf from "@/assets/icons/file-pdf.png";
import txt from "@/assets/icons/file-txt.png";
import other from "@/assets/icons/file-other.png"
import fileImage from "@/assets/icons/file-image.png"
import video from "@/assets/icons/file-video.png"
import doc from "@/assets/icons/file-doc.png";
import docx from "@/assets/icons/file-docx.png";
import svg from "@/assets/icons/file-svg.png";
import csv from "@/assets/icons/file-csv.png";
import document from "@/assets/icons/file-document.png";
import audio from "@/assets/icons/file-audio.png";
import excel from "@/assets/icons/file-excel.png";
import bigFile from "@/assets/images/files.png";
import axios from "axios";
import dots from "@/assets/icons/dots.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
import bookmark from "@/assets/icons/bookmark.png";
import info from "@/assets/icons/info.png";
import share from "@/assets/icons/share.png";
import download from "@/assets/icons/download.png";
import leftArrow from "@/assets/icons/arrow-left.png"
import notfound from "@/assets/images/notfound.png";
import bookmark1 from "@/assets/icons/bookmark1.png";
import bookmark2 from "@/assets/icons/bookmark2.png";
import fullBrandLogo from "@/assets/icons/logo-full-brand.png";
import month from "@/assets/icons/month.png";
import year from "@/assets/icons/year.png";
import week from "@/assets/icons/week.png";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { Linking, Platform } from "react-native";
export const icons={
    search,
    upload,
    doc,
    month,
    year,
    week,
    bookmark1,
    bookmark2,
    docx,
    bookmark,
    svg,
    leftArrow,
    csv,
    excel,
    document,
    audio,
    image,
    email,
    dots,
    pdf,
    txt,
    other,
    fileImage,
    video,
    deleteIcon,
    edit,
    info,
    download,
    share,
}
export const images={
    avatar,    
    bigFile,
    fullBrandLogo,
    notfound,
}
export const SVG ={
    Document,
    Images,
    Other,
    Videos,
}

 export const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };


export const getFileIcon = (extension) => {
    switch (extension) {
        case 'pdf': return icons.pdf;  
        case 'doc': return icons.doc;
        case 'docx': return icons.docx;
        case 'xls': case 'xlsx': return icons.excel;
        case 'txt': return icons.txt;
        case 'csv': return icons.csv;
        case 'svg': return icons.svg;
        case 'mp3': return icons.audio;
        case 'jpg': case 'png': case 'jpeg': return icons.fileImage
        case 'mp4': case 'mov': return icons.video;
        default: return icons.other;
    }
};
export async function confirmUpload(fileId,token) {
    await axios.patch(`${url}/file/upload/confirm`,
      { fileId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
  }
export const getList = async ({category,token}) => {
    // const {token}=useAuthStore();
    try {

        
        const response = await axios.get(`${url}/file/getList`, {
        headers: {
            "x-auth-token": token,
        },
        params: {
            category: category,
        },
        });
        return response;

    } catch (err) {
        // console.log("Error getting list:", err);
        return [];
    }
}

export const getRecentFiles = async ({token,limit}) => {
    // const {token}=useAuthStore();
    try {

        
        const response = await axios.get(`${url}/file/getRecentFile`, {
        headers: {
            "x-auth-token": token,
        },
        params: {
            limit: limit,
        },
        });

        return response;

    } catch (err) {
        console.log("Error getting list:", err);
        return [];
    }
}
export const formatDateTime = (createdAt) => {
    const date = new Date(createdAt);

    // Format Date (Mar 08, 2025)
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Format Time (6:16 PM)
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedDate} • ${hours}:${minutes} ${amPm}`;
};

export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
    //   latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
    //   latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
    //   latestDate:
    //     totalSpace.video.latestDate > totalSpace.audio.latestDate
    //       ? totalSpace.video.latestDate
    //       : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
    //   latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: icons.edit,
    value: "rename",
  },
  {
    label: "Details",
    icon: icons.info,
    value: "details",
  },
//   {
//     label: "Share",
//     icon: icons.share,
//     value: "share",
//   },
  {
    label: "Download",
    icon: icons.download,
    value: "download",
  },
  {
    label: "Move to Trash",
    icon: icons.deleteIcon,
    value: "delete",
  },
];

  export const openFile = async (file) => {
        try {
            const fileUri = `${FileSystem.documentDirectory}${file.name}`;
            const { uri } = await FileSystem.downloadAsync(file.url, fileUri);

            if (Platform.OS === "android") {
                const contentUri = await FileSystem.getContentUriAsync(uri);
                await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                    data: contentUri,
                    flags: 1,
                    type: "*/*",
                });
            }
            else {
                await Linking.openURL(uri);
            }
        } catch (error) {
            console.log("Error opening file:", error);
        }
    };

export const renameFile=async (fileId,newName,token)=>{
    try {

        const response = await axios.patch(`${url}/file/rename`, {
            fileId,
            newName,
        }, {
            headers: {
                "x-auth-token": token,
            },
        });

        return response;
    } catch (error) {
        console.log("Error renaming file:", error);
        return error.response.data;
    }
}

export const fileDetail=async(fileId,token)=>{

}

export const shareFile=async(fileId,token)=>{

}
export const downloadFile = async (fileUrl, fileName) => {
    try {
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

        alert("Download complete!");

        return uri;
    } catch (error) {
        console.error("Error downloading file:", error);
        alert("Failed to download file.");
    }
};

export const moveToDownloads = async (fileUri, fileName,fileType) => {
    try {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (!permissions.granted) {
            alert("Permission denied");
            return;
        }

        const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            fileType
        );

        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.writeAsStringAsync(newUri, fileContent, { encoding: FileSystem.EncodingType.Base64 });

        alert("File saved to Downloads!");
    } catch (error) {
        console.log("Error moving file:", error);
    }
};
export const deleteFile=async(fileId,token)=>{
    try {

        const response = await axios.delete(`${url}/file/delete`, {
            headers: {
                "x-auth-token": token,
            },
            data: {
                fileId,
            },
        });
        return response;
        
    } catch (error) {
        console.log("Error deleting file:", error.response.data);
   
    }
}

export const searchFiles=async(searchText,token)=>{
    try {
        const response = await axios.get(`${url}/file/search`, {
            headers: {
                "x-auth-token": token,
            },
            params: {
                text: searchText,
            },
        });
        return response;
        
    } catch (error) {
        console.log("Error searching files:", error);
        
    }
}
export const getUsedStorage = async (token) => {
    try {
        const response = await axios.get(`${url}/file/getStorageUsed`, {
            headers: {
                "x-auth-token": token,
            },
        });
        // console.log("response",response);
        return response;
        
    } catch (error) {
        console.log("Error searching files:", error);
        
    }
}

export const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

export const getSearchFiles = async ({searchText, token}) => {
    try {
        const response = await axios.get(`${url}/file/search`, {
            headers: {
                "x-auth-token": token,
            },
            params: {
                searchText,
            },
        });
        return response;
    } catch (error) {
        console.log("Error searching files:", error);
        return [];
    }
}
export const toggle2FactorAuthentication = async (token,is2FAEnabled) => {
    try {
        const response = await axios.patch(`${url}/auth/toggle2FA`,{
            is2FAEnabled,
        } ,{
            headers: {
                "x-auth-token": token,
            },
            
        });
        return response;
    } catch (error) {
        console.log("Error toggling 2FA:", error);
        return error.response.data;
    }
}


export const url="http://192.168.201.199:3000";
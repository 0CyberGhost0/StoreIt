import { View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { actionsDropdownItems, deleteFile, downloadFile, fileDetail, moveToDownloads, renameFile, shareFile } from '@/constants'
import useAuthStore from '@/store';
import Modal from 'react-native-modal';
import { ShareComponent, DeleteComponent, RenameComponent, FileDetailsComponent } from './ActionDropdownContent';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActionDropdown = ({ file }) => {
    const { token } = useAuthStore();
    const [currentAction, setCurrentAction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [renameValue, setRenameValue] = useState(file.name);

    const action = {
        rename: async () => {
            const res = await renameFile(file.id, renameValue, token);
            if (res?.status === 200) {

                setIsModalOpen(false);
                setCurrentAction(null);
            }
        },
        detail: () => fileDetail(file.id, token),
        share: () => shareFile(file.id, token),
        download: async () => {
            const fileUri = await downloadFile(file.url, file.name);
            moveToDownloads(fileUri, file.name, file.type);
        },
        delete: async () => {
            const response = await deleteFile(file.id, token);
            if (response.status === 200) {
                setIsModalOpen(false);
                setCurrentAction(null);
            }
        },
    };

    return (
        <View>
            <Text className="font-JakartaBold text-lg text-center mb-4" numberOfLines={1}>
                {file.name}
            </Text>

            <FlatList
                data={actionsDropdownItems || []}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            setCurrentAction(item.value);
                            if (["rename", "share", "delete", "details"].includes(item.value)) {
                                setIsModalOpen(true);
                            }
                            if (item.value === "download") {
                                action.download();
                            }
                        }}
                    >
                        <View className="flex-row items-center p-1">
                            <Image source={item.icon} style={{ width: 30, height: 30 }} resizeMode="contain" />
                            <Text className="font-JakartaMedium ml-3">{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-300 my-2" />}
            />

            {isModalOpen && (
                <Modal isVisible={isModalOpen} onBackdropPress={() => setIsModalOpen(false)}>
                    {currentAction === "share" && <ShareComponent />}
                    {currentAction === "details" && <FileDetailsComponent file={file} />}
                    {currentAction === "delete" && (
                        <DeleteComponent
                            fileName={file.name}
                            onDelete={() => action.delete()}
                            onCancel={() => {
                                setIsModalOpen(false);
                                setCurrentAction(null);
                            }}
                        />
                    )}
                    {currentAction === "rename" && (
                        <RenameComponent value={renameValue} onChangeText={setRenameValue} onPress={() => action.rename()} />
                    )}
                </Modal>
            )}
        </View>
    );
};

export default ActionDropdown;
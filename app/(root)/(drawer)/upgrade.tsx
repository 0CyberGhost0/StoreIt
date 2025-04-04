import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Image,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { CloseCircle, CloseSquare } from "iconsax-react-native";
import { icons } from "@/constants";

export const SubscriptionModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    const [selectedPlan, setSelectedPlan] = useState<
        "Weekly" | "Monthly" | "Yearly"
    >("Monthly");

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-end bg-black/50">

                {/* Bottom Sheet Modal */}
                <View className="bg-white w-full rounded-t-3xl p-6">

                    {/* Close Button */}
                    <TouchableOpacity
                        className="absolute top-3 right-5 w-8 h-8 rounded-full bg-gray-200 justify-center items-center"
                        onPress={onClose}
                    >
                        <CloseCircle size={28} color="#000" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="items-center">
                        <Text className="text-3xl font-bold text-gray-800 mt-4 ">
                            Buy <Text className="text-orange-500">Premium</Text>
                        </Text>
                        <Text className="text-sm text-gray-500 mt-2">
                            Remove ads, Full Access & more
                        </Text>
                    </View>

                    {/* Pricing Cards */}
                    <View className="flex-row justify-between w-full mt-6">

                        {/* Weekly Plan */}
                        <TouchableOpacity
                            className={`bg-gray-100 rounded-xl p-4 w-[30%] items-center border-2 ${selectedPlan === "Weekly"
                                ? "border-[#FA7275] bg-red-50"
                                : "border-transparent"
                                }`}
                            onPress={() => setSelectedPlan("Weekly")}
                        >
                            <View className="w-12 h-12 rounded-full justify-center items-center mb-2">
                                <Image
                                    source={icons.week}
                                    className="w-14 h-14"
                                />
                            </View>
                            <Text className="text-base font-bold text-gray-800">Weekly</Text>
                            <Text className="text-lg font-bold text-orange-500 mt-1">₹199</Text>
                            <Text className="text-xs text-gray-400 line-through">₹299</Text>
                        </TouchableOpacity>

                        {/* Monthly Plan */}
                        <TouchableOpacity
                            className={`bg-gray-100 rounded-xl p-4 w-[30%] items-center border-2 ${selectedPlan === "Monthly"
                                ? "border-[#FA7275] bg-red-50"
                                : "border-transparent"
                                }`}
                            onPress={() => setSelectedPlan("Monthly")}
                        >
                            <View className="w-10 h-10 rounded-full justify-center items-center mb-2">
                                <Image
                                    source={icons.month}
                                    className="w-12 h-12"

                                />
                            </View>
                            <Text className="text-base font-bold text-gray-800">Monthly</Text>
                            <Text className="text-lg font-bold text-orange-500 mt-1">₹499</Text>
                            <Text className="text-xs text-gray-400 line-through">₹699</Text>
                        </TouchableOpacity>

                        {/* Yearly Plan */}
                        <TouchableOpacity
                            className={`bg-gray-100 rounded-xl p-4 w-[30%] items-center border-2 ${selectedPlan === "Yearly"
                                ? "border-[#FA7275] bg-red-50"
                                : "border-transparent"
                                }`}
                            onPress={() => setSelectedPlan("Yearly")}
                        >
                            <View className="w-10 h-10 rounded-full justify-center items-center mb-2">
                                <Image
                                    source={icons.year}
                                    className="w-12 h-12"

                                />
                            </View>
                            <Text className="text-base font-bold text-gray-800">Yearly</Text>
                            <Text className="text-lg font-bold text-orange-500 mt-1">₹3999</Text>
                            <Text className="text-xs text-gray-400 line-through">₹4999</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Text */}
                    <Text className="text-xs text-gray-500 text-center mt-4">
                        Your subscription will renew automatically according to the billing
                        cycle and you can cancel at any time.
                    </Text>

                    {/* Subscribe Button */}
                    <CustomButton
                        onPress={() => console.log(`Subscribed to ${selectedPlan}`)}
                        title={`Subscribe for ₹${selectedPlan === "Weekly" ? "199" : selectedPlan === "Monthly" ? "499" : "3999"}`}
                        className="p-4 mt-6 mb-6"
                    />
                </View>
            </View>
        </Modal>
    );
};

import { useState } from "react";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { Eye, EyeSlash, User, PasswordCheck } from "iconsax-react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import useAuthStore from "@/store/index.js";

const SignUp = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const onSignUpPress = async () => {
        try {
            if (!form.email || !form.password || !form.firstName || !form.lastName) {
                alert("Please fill all the fields");
                return;
            }

            const response = await axios.post("http://192.168.237.199:3000/auth/signup", {
                name: form.firstName + " " + form.lastName,
                email: form.email,
                password: form.password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                login(response.data.user, response.data.token);
                router.push("/(root)/(tabs)/Home"); // Correct way to navigate
            }

        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create an Account
                    </Text>
                </View>

                <View className="p-5">
                    <View className="flex-row justify-between">
                        <View className="w-[48%]">
                            <InputField
                                label="First Name"
                                placeholder="John"
                                leftIcon={icons.user}
                                LeftIcon={() => <User color="black" />}
                                value={form.firstName}
                                onChangeText={(value) => setForm({ ...form, firstName: value })}
                            />
                        </View>
                        <View className="w-[48%]">
                            <InputField
                                label="Last Name"
                                placeholder="Doe"
                                leftIcon={icons.user}
                                LeftIcon={() => <User color="black" />}
                                value={form.lastName}
                                onChangeText={(value) => setForm({ ...form, lastName: value })}
                            />
                        </View>
                    </View>

                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        leftIcon={icons.email}
                        LeftIcon={() => <Image source={icons.email} className="h-8 w-8" resizeMode="contain" />}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        leftIcon={icons.password}
                        LeftIcon={() => <PasswordCheck color="black" />}
                        RightIcon={() => (
                            <TextInput.Icon
                                icon={isPasswordVisible ? Eye : EyeSlash}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            />
                        )}
                        secureTextEntry={!isPasswordVisible}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <CustomButton
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="p-4 mt-10"
                        bgColor="bg-[#ea676d]"
                    />

                    <Link
                        href="/(auth)/SignIn"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Already have an account? {" "}
                        <Text className="text-primary-500 text-blue-800">Sign In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;

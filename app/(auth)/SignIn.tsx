
// import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";
import { icons } from "@/constants";
import { Eye, EyeSlash, PasswordCheck } from "iconsax-react-native";
import { Link, useRouter } from "expo-router";
import useAuthStore from "@/store";

const SignIn = () => {
    // const { signIn, setActive, isLoaded } = useSignIn();

    const login = useAuthStore((state) => state.login);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    const onSignInPress = async () => {
        try {
            if (!form.email || !form.password) {
                alert("Please fill all the fields");
                return;
            }

            const response = await axios.post("http://192.168.237.199:3000/auth/login", {
                email: form.email,
                password: form.password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                login(response.data.user, response.data.token);
                router.push("/(root)/(tabs)/Home");

            }

        } catch (error) {
            console.log(error.message);
            alert(error.message);

        }
    }
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    {/* <Image source={images.signUpCar} className="z-0 w-full h-[250px]" /> */}
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Welcome 👋
                    </Text>
                </View>

                <View className="p-5">
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
                        leftIcon={icons.image}
                        LeftIcon={() => <PasswordCheck color="black" />}
                        RightIcon={() => <EyeSlash color="black" />}

                        RightIcon1={() => <Eye color="black" />}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <CustomButton
                        title="Sign In"
                        onPress={onSignInPress}
                        className="p-4 mt-10"
                        bgColor="bg-[#ea676d]"
                    />

                    {/* <OAuth /> */}

                    <Link
                        href="/(auth)/SignUp"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Don't have an account?{" "}
                        <Text className="text-primary-500 text-blue-800">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;
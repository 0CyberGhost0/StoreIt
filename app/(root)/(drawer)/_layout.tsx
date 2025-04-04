// import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
// import React, { useEffect } from "react";
// import { Drawer } from "expo-router/drawer";
// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import { usePathname, router } from "expo-router";
// import {
//     Bookmark,
//     Folder,
//     Gallery,
//     Graph,
//     Home,
//     Setting3,
//     Star,
//     User,
//     Video,
// } from "iconsax-react-native";
// import { images } from "@/constants";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const CustomDrawerComponent = (props: any) => {
//     const pathname = usePathname();

//     useEffect(() => {
//         console.log("Current Path:", pathname); // Debug: Check exact pathname
//     }, [pathname]);

//     return (
//         <DrawerContentScrollView {...props} style={styles.container}>
//             {/* Drawer Header with Logo */}
//             <View style={styles.header}>
//                 <Image
//                     source={images.fullBrandLogo}
//                     style={styles.logo}
//                     resizeMode="contain"
//                 />
//             </View>

//             {/* Drawer Items */}
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Home color={color} variant="Outline" size={size} />
//                 )}
//                 label="Home"
//                 onPress={() => router.push("/(drawer)/(tabs)/Home")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Folder color={color} variant="Outline" size={size} />
//                 )}
//                 label="Documents"
//                 onPress={() => router.push("/(root)/category/Documents")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Gallery color={color} variant="Outline" size={size} />
//                 )}
//                 label="Images"
//                 onPress={() => router.push("/(root)/category/Images")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Video color={color} variant="Outline" size={size} />
//                 )}
//                 label="Videos"
//                 onPress={() => router.push("/(root)/category/Videos")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Graph color={color} variant="Outline" size={size} />
//                 )}
//                 label="Others"
//                 onPress={() => router.push("/(root)/category/Others")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />

//             {/* Separator */}
//             <View style={styles.separator} />

//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Star color={color} variant="Outline" size={size} />
//                 )}
//                 label="Upgrade Plan"
//                 onPress={() => router.push("/(drawer)/settings")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Bookmark color={color} variant="Outline" size={size} />
//                 )}
//                 label="Saved Files"
//                 onPress={() => router.push("/(drawer)/(tabs)/Saved")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <User color={color} variant="Outline" size={size} />
//                 )}
//                 label="Profile"
//                 onPress={() => router.push("/(drawer)/(tabs)/Profile")}
//                 style={styles.item}
//                 labelStyle={styles.label}
//             />

//             {/* Footer Image */}
//             <View style={styles.footer}>
//                 <Image
//                     source={images.bigFile}
//                     style={styles.footerImage}
//                     resizeMode="contain"
//                 />
//             </View>
//         </DrawerContentScrollView>
//     );
// };

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#f9f9f9",
//     },
//     header: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: "#ddd",
//     },
//     logo: {
//         width: 160,
//         height: 80,
//     },
//     item: {
//         marginVertical: 5,
//         borderRadius: 8,
//         marginHorizontal: 10,
//     },
//     label: {
//         fontSize: 18,
//         color: "#333",
//     },
//     separator: {
//         height: 1,
//         backgroundColor: "#ddd",
//         marginVertical: 10,
//     },
//     footer: {
//         alignItems: "center",
//         marginTop: "auto",
//     },
//     footerImage: {
//         width: 220,
//         height: 240,
//     },
// });

// // Drawer Layout
// const DrawerLayout = () => {
//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <Drawer
//                 drawerContent={(props) => <CustomDrawerComponent {...props} />}
//                 screenOptions={{
//                     headerShown: false,
//                     drawerStyle: {
//                         width: Dimensions.get("window").width / 1.7,
//                     },
//                     drawerPosition: "left",
//                     swipeEnabled: true,
//                     swipeEdgeWidth: Dimensions.get("window").width,
//                 }}
//             />
//         </GestureHandlerRootView>
//     );
// };

// export default DrawerLayout;
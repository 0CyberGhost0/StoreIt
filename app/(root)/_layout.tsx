import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Bookmark,
  Folder,
  Gallery,
  Graph,
  Home,
  Star,
  User,
  Video,
} from "iconsax-react-native";
import { images } from "@/constants";
import { router, usePathname } from "expo-router";
import { SubscriptionModal } from "./(drawer)/upgrade";

const CustomDrawerComponent = (props: any) => {
  const pathname = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log("Current Path:", pathname);
  }, [pathname]);

  const isActive = (activePath: string) => {
    const normalizedPathname = pathname.toLowerCase().replace(/^\//, "").replace(/\/$/, "");
    const normalizedActivePath = activePath.toLowerCase().replace(/^\//, "").replace(/\/$/, "");
    return normalizedPathname === normalizedActivePath;
  };


  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={images.fullBrandLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Home */}
      <DrawerItem
        icon={({ color, size }) => (
          <Home
            color={isActive("/Home") ? "white" : color}
            variant={isActive("/Home") ? "Bold" : "Outline"}
            size={isActive("/Home") ? size + 6 : size}  // Increase size when active
          />
        )}
        label="Home"
        onPress={() => router.push("/(drawer)/(tabs)/Home")}
        style={[styles.item, isActive("/Home") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/Home") && styles.activeLabel]}
      />

      {/* Documents */}
      <DrawerItem
        icon={({ color, size }) => (
          <Folder
            color={isActive("/category/Documents") ? "white" : color}
            variant={isActive("/category/Documents") ? "Bold" : "Outline"}
            size={isActive("/category/Documents") ? size + 6 : size}
          />
        )}
        label="Documents"
        onPress={() => router.push("/(root)/category/Documents")}
        style={[styles.item, isActive("/category/Documents") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/category/Documents") && styles.activeLabel]}
      />

      {/* Images */}
      <DrawerItem
        icon={({ color, size }) => (
          <Gallery
            color={isActive("/category/Images") ? "white" : color}
            variant={isActive("/category/Images") ? "Bold" : "Outline"}
            size={isActive("/category/Images") ? size + 6 : size}
          />
        )}
        label="Images"
        onPress={() => router.push("/(root)/category/Images")}
        style={[styles.item, isActive("/category/Images") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/category/Images") && styles.activeLabel]}
      />

      {/* Videos */}
      <DrawerItem
        icon={({ color, size }) => (
          <Video
            color={isActive("/category/Videos") ? "white" : color}
            variant={isActive("/category/Videos") ? "Bold" : "Outline"}
            size={isActive("/category/Videos") ? size + 6 : size}
          />
        )}
        label="Videos"
        onPress={() => router.push("/(root)/category/Videos")}
        style={[styles.item, isActive("/category/Videos") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/category/Videos") && styles.activeLabel]}
      />

      {/* Others */}
      <DrawerItem
        icon={({ color, size }) => (
          <Graph
            color={isActive("/category/Others") ? "white" : color}
            variant={isActive("/category/Others") ? "Bold" : "Outline"}
            size={isActive("/category/Others") ? size + 6 : size}
          />
        )}
        label="Others"
        onPress={() => router.push("/(root)/category/Others")}
        style={[styles.item, isActive("/category/Others") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/category/Others") && styles.activeLabel]}
      />

      <View style={styles.separator} />

      {/* Upgrade Plan */}
      <DrawerItem
        icon={({ color, size }) => (
          <Star
            color={isActive("/(drawer)/upgrade") ? "white" : color}
            variant={isActive("/(drawer)/upgrade") ? "Bold" : "Outline"}
            size={isActive("/(drawer)/upgrade") ? size + 6 : size}
          />
        )}
        label="Upgrade Plan"
        onPress={() => setIsModalVisible(true)}
        style={[styles.item, isActive("/(drawer)/upgrade") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/(drawer)/upgrade") && styles.activeLabel]}
      />
      <SubscriptionModal visible={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)} />
      {/* Saved Files */}
      <DrawerItem
        icon={({ color, size }) => (
          <Bookmark
            color={isActive("/Saved") ? "white" : color}
            variant={isActive("/Saved") ? "Bold" : "Outline"}
            size={isActive("/Saved") ? size + 6 : size}
          />
        )}
        label="Saved Files"
        onPress={() => router.push("/(drawer)/(tabs)/Saved")}
        style={[styles.item, isActive("/Saved") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/Saved") && styles.activeLabel]}
      />


      {/* Profile */}
      <DrawerItem
        icon={({ color, size }) => (
          <User
            color={isActive("/Profile") ? "white" : color}
            variant={isActive("/Profile") ? "Bold" : "Outline"}
            size={isActive("/Profile") ? size + 6 : size}
          />
        )}
        label="Profile"
        onPress={() => router.push("/(drawer)/(tabs)/Profile")}
        style={[styles.item, isActive("/Profile") && styles.activeItem]}
        labelStyle={[styles.label, isActive("/Profile") && styles.activeLabel]}
      />

      <View style={styles.footer}>
        <Image
          source={images.bigFile}
          style={styles.footerImage}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 190,
    height: 90,
  },
  item: {
    marginVertical: 5,
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 0,  // No shadow by default
    shadowColor: "transparent",
  },
  activeItem: {
    backgroundColor: "#FB8E91",   // Active color
    elevation: 5,                  // Add shadow effect
    shadowColor: "#000",           // Shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow position
    shadowOpacity: 0.2,            // Shadow transparency
    shadowRadius: 4,               // Shadow blur
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  activeLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
  },
  footerImage: {
    width: 220,
    height: 240,
  },
});

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerComponent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: Dimensions.get("window").width / 1.7 },
          drawerPosition: "left",
          swipeEnabled: true,
          swipeEdgeWidth: Dimensions.get("window").width,
        }}
      >
        <Drawer.Screen name="(drawer)/(tabs)" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

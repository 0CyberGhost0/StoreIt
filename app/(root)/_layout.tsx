import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="category/[category]" options={{ headerShown: false }} />
      <Stack.Screen name="RecentFile" options={{ headerShown: false }} />

    </Stack>
  )
}

export default RootLayout
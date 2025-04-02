import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'


const TabIcon = ({ focused, icon, title}: any) => {
    if (focused) {
        return (
            <ImageBackground
              source={images.highlight}
              className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
              <Image source={icon} tintColor="#F7F7F7" className="size-5" />
              <Text className="text-secondary text-accent font-semibold ml-2">
                {title}
              </Text>
            </ImageBackground>
        )
    }
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#B87333" className="size-5" />
        </View>
    )
  };


const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#C0C0C0',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#C0C0C0'
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused} 
                        icon={icons.home} 
                        title="Home"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="stats"
            options={{
                title: "Stats",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused} 
                        icon={icons.search} // need a stats icon instead of search
                        title="Stats"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="history"
            options={{
                title: "History",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused} 
                        icon={icons.save} // need a history icon instead of save (will reuse the saved icon as history)
                        title="History"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused} 
                        icon={icons.person} // recolor pereson
                        title="Profile"
                    />
                )
            }}
        />
    </Tabs>
  )
}

export default _layout
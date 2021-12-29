import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';
import QRHome from "./components/QR/Home";
import Scan from "./components/QR/Scan";
import Location from "./components/QR/Location";
import Timeline from "./components/Timeline";
import Contacts from "./components/Contacts";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3a0751",
    accent: "black",
  },
};

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
	return token;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const MainTab = createMaterialBottomTabNavigator();
const QRStack = createNativeStackNavigator();

const QRStackScreen = () => (
  <QRStack.Navigator screenOptions={{ headerShown: false }}>
    <QRStack.Screen name="QRHome" component={QRHome} />
    <QRStack.Screen name="Scan" component={Scan} />
    <QRStack.Screen name="Location" component={Location} />
  </QRStack.Navigator>
);

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      setExpoPushToken(token);
    });
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <MainTab.Navigator
          theme={theme}
          barStyle={{
            backgroundColor: theme.colors.primary,
          }}
        >
          <MainTab.Screen
            name="Home"
            component={Home}
            options={{ tabBarIcon: "home" }}
          />
          <MainTab.Screen
            name="QRMangala"
            component={QRStackScreen}
            options={{ tabBarIcon: "qrcode", tabBarLabel: "QR Mangala" }}
          />
          <MainTab.Screen
            name="Timeline"
            component={Timeline}
            options={{ tabBarIcon: "timeline-outline", tabBarLabel: "Timeline" }}
          />
          <MainTab.Screen
            name="Settings"
            component={Contacts}
            options={{ tabBarIcon: "cogs", tabBarLabel: "Settings" }}
          />
        </MainTab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

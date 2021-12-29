import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { List, useTheme } from 'react-native-paper'
import Master from '../Master'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function Location({ route, navigation }) {
    async function registerForPushNotificationsAsync() {
        let token;
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
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: theme.colors.primary,
            });
        }

        return token;
    }
    const [location, setLocation] = useState({})
    const [mobile_token, setMobile_token] = useState('')

    const theme = useTheme()
    useEffect(() => {
        setLocation(route.params.data);
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            // registerForPushNotificationsAsync().then(token => {
            //     console.log(token);
            //     setMobile_token(token)
            // });
        });

        return unsubscribe;
    }, [navigation])
    return (
        <Master title={route.params.data.location.name} subtitle='Your Current Location' left={route.params.data.location.icon} onScan={e => navigation.navigate("Scan")}>
            <List.Item title="Available nearby" />
            <FlatList
                data={route.params.data.location.next}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.name}
                        titleStyle={{ fontWeight: 'bold' }}
                        description={item.next.length && `${item.next.length} more places from here`}
                        left={props => <List.Icon icon={item.icon || 'map-marker-right'} color={theme.colors.primary}
                        />} />
                )} />
        </Master>
    )
}

import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Master from './Master'
import * as Calendar from 'expo-calendar'
import { List, useTheme } from 'react-native-paper'

export default function Home() {
    const theme=useTheme()
    const [calendarIDs, setCalendarIDs] = useState([])
    const [flightEvents, setFlightEvents] = useState([])
    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                setCalendarIDs(calendars.map(c => c.id))

                let futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 365)

                const events = await Calendar.getEventsAsync(calendarIDs, new Date(), futureDate)
                setFlightEvents(events.filter(e => e.title.toLowerCase().includes("flight")).reverse())
                console.log(flightEvents);
            }
        })();
    }, []);

    return (
        <Master title="QR Mangala" subtitle='Home'>
            <List.Item title="Welcome" description="Deepjyoti PAUL" descriptionStyle={{ fontSize: 20, color: 'black', fontWeight: 'bold', textTransform: 'uppercase' }} />
            <List.Item title="Your upcoming flights" />
            <FlatList data={flightEvents} keyExtractor={item=>item.id} style={{
                height: 200
            }} renderItem={({item}) => (
                <TouchableOpacity>
                    <List.Item title={item.title} description={new Date(item.startDate).toDateString()} titleStyle={{
                        fontWeight:'bold'
                    }} left={props=><List.Icon style={{color: theme.colors.primary}} color={theme.colors.primary} icon="airplane" {...props} />}
                    right={props=><List.Icon style={{color: theme.colors.primary}} color={theme.colors.primary} icon="chevron-right" {...props} />} />
                </TouchableOpacity >
            )} />
        </Master>
    )
}

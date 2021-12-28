import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import Master from './Master'
import * as Calendar from 'expo-calendar'
import { Button, List, useTheme } from 'react-native-paper'
import AnimatedLottieView from 'lottie-react-native'

export default function Home({navigation}) {
    const theme = useTheme()
    const [calendarIDs, setCalendarIDs] = useState([])
    const [flightEvents, setFlightEvents] = useState([])

    const getEvents = useCallback(async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            // console.log(calendars);
            setCalendarIDs(calendars.map(c => c.id))
            console.log(calendarIDs);
            let futureDate = new Date()
            futureDate.setDate(futureDate.getDate() + 365)

            const events = await Calendar.getEventsAsync(calendarIDs, new Date(), futureDate)
            setFlightEvents(events.filter(e => e.title.toLowerCase().includes("flight")).reverse())
            // console.log(flightEvents);
        }
    })

    useEffect(() => {

        // getEvents()
    }, []);

    return (
        <Master title="QR Mangala" subtitle='Home'>
            <List.Item title="Welcome" description="Deepjyoti PAUL" descriptionStyle={{ fontSize: 20, color: 'black', fontWeight: 'bold', textTransform: 'uppercase' }} />
            {
                !flightEvents.length ? (
                    <>
                        <Text style={{textAlign:'center',fontSize:20}}>Ready to travel?</Text>
                        <Text style={{textAlign:'center'}}>Let's get started</Text>
                        <AnimatedLottieView source={require('../lottie/90770-traveller.json')} autoPlay loop resizeMode='contain' style={{ width: Dimensions.get('screen').width }} />
                        <Button onPress={getEvents} mode='contained' style={{padding:10,margin:10,borderRadius:8}}>Sync my flights</Button>
                    </>
                )
                    :
                    <>
                        <List.Item title="Your upcoming flights" />
                        <FlatList data={flightEvents} keyExtractor={item => item.id} style={{
                            height: 200
                        }} renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>navigation.navigate('QRMangala')}>
                                <List.Item title={item.title} description={new Date(item.startDate).toDateString()} titleStyle={{
                                    fontWeight: 'bold'
                                }} left={props => <List.Icon style={{ color: theme.colors.primary }} color={theme.colors.primary} icon="airplane" {...props} />}
                                    right={props => <List.Icon style={{ color: theme.colors.primary }} color={theme.colors.primary} icon="chevron-right" {...props} />} />
                            </TouchableOpacity >
                        )} />
                    </>
            }
        </Master>
    )
}

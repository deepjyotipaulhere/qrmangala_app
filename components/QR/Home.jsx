import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Master from '../Master'
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Home({navigation}) {
    
    return (
        <Master title="Start your journey">
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <LottieView source={require('../../lottie/62158-flight.json')} autoPlay loop resizeMode='contain' style={{ width: 150 }} />
                <Text style={{ fontSize: 30 }}>Starting a journey</Text>
                <Text style={{ textAlign: 'center', padding: 20, fontSize: 18, color: 'grey' }}>After starting the journey you can scan any QR Mangala code inside the Bengaluru Airport to get helps and exciting offers on partner brands</Text>
                <Button mode='contained' onPress={e => navigation.navigate("Scan")}>Start journey</Button>
            </View>
        </Master>
    )
}

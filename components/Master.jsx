import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function Master({ children, title, subtitle = '' }) {
	return (
		<>
			<StatusBar translucent={true} style='light' />
			<Appbar.Header>
				<Appbar.Content title={title} subtitle={subtitle} style={{alignItems:'center'}} />
			</Appbar.Header>
			{children}
		</>
	)
}
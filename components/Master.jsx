import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function Master({ children, title, subtitle = '', onScan = null, left=null }) {
	return (
		<>
			<StatusBar translucent={true} style='light' />
			<Appbar.Header>
				{left && <Appbar.Action icon={left} />}
				<Appbar.Content title={title} subtitle={subtitle} style={{ alignItems: 'center' }} />
				{onScan && <Appbar.Action icon="qrcode" onPress={onScan} />}
			</Appbar.Header>
			{children}
		</>
	)
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './components/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QRHome from './components/QR/Home'
import Scan from './components/QR/Scan';


const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#3a0751',
		accent: 'black',
	},
};

const MainTab = createMaterialBottomTabNavigator();
const QRStack = createNativeStackNavigator();

const QRStackScreen = () => (
	<QRStack.Navigator screenOptions={{ headerShown: false }}>
		<QRStack.Screen name='QRHome' component={QRHome} />
		<QRStack.Screen name='Scan' component={Scan} />
	</QRStack.Navigator>
)

export default function App() {

	return (
		<NavigationContainer>
			<PaperProvider theme={theme}>
				<MainTab.Navigator theme={theme} barStyle={{
					backgroundColor: theme.colors.primary
				}}>
					<MainTab.Screen name='Home' component={Home} options={{ tabBarIcon: 'home' }} />
					<MainTab.Screen name='QRMangala' component={QRStackScreen} options={{ tabBarIcon: 'qrcode',tabBarLabel:"QR Mangala" }} />
					<MainTab.Screen name='Settings' component={QRStackScreen} options={{ tabBarIcon: 'cogs',tabBarLabel:"Settings" }} />
				</MainTab.Navigator>
			</PaperProvider>
		</NavigationContainer>
	);
}
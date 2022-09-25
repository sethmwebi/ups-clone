import { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { useTailwind } from "tailwind-rn"
import {
	CompositeNavigationProp,
	useNavigation,
	RouteProp,
	useRoute
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import DeliveryCard from "../components/DeliveryCard"

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
	const tw = useTailwind()
	const navigation = useNavigation<OrdersScreenNavigationProp>()
	const { params: { order }} = useRoute<OrderScreenRouteProp>()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: order.trackingItems.customer.name,
			headerTitleStyle: { color: "black" },
			headerBackTitle: "Deliveries",
			headerTintColor: "#EB6A7C"
		})
	},[order])
	return (
		<View style={tw("-mt-2")}>
			<DeliveryCard order={order} fullWidth/>
		</View>
	)
}

export default OrderScreen
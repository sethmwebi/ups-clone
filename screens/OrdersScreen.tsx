import { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import {
	RouteProp,
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { useTailwind } from "tailwind-rn";
import useOrders from "../hooks/useOrders";
import { Image, Button } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;
const OrdersScreen = () => {
	const navigation = useNavigation<OrdersScreenNavigationProp>();
	const tw = useTailwind();
	const { loading, error, orders } = useOrders();
	const [ascending, setAscending] = useState<boolean>(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
			tabBarLabel: ({ focused, color }) => (
				<Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
					Orders
				</Text>
			),
		});
	}, []);
	return (
		<ScrollView style={{ backgroundColor: "#EB6A7C" }}>
			<Image
				source={{ uri: "https://links.papareact.com/m51" }}
				containerStyle={tw(`w-full h-64`)}
				PlaceholderContent={<ActivityIndicator />}
			/>
			<View style={tw(`pb-5`)}>
				<View style={tw(`my-2 mx-5`)}>
					<Button
						onPress={() => setAscending((prev) => !prev)}
						color="pink"
						titleStyle={{ color: "gray", fontWeight: "400" }}
					>
						{ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
					</Button>
				</View>

				{orders
					?.sort((a, b) => {
						if (ascending) {
							return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
						} else {
							return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
						}
					})
					.map((order) => (
						<OrderCard key={order.trackingId} item={order} />
					))}
			</View>
		</ScrollView>
	);
};

export default OrdersScreen;

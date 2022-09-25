import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import {STEPZEN_API_KEY} from "@env"
import utilities from "./tailwind.json";
import RootNavigator from "./navigator/RootNavigator";

const client = new ApolloClient({
  uri: "https://liaozhong.stepzen.net/api/alert-squid/__graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Apikey ${STEPZEN_API_KEY}`
  }
});

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

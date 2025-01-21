import Sign_in from "./pages/auth/Sign_in";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from "./pages/auth/Register";
import products from "./pages/boutique/products";
import panier from "./pages/boutique/panier";
import map from "./pages/map";
import List from "./pages/boutique/List"
const Stack = createNativeStackNavigator();
export default function Index() {
  return( 
     <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Sign_in">
       <Stack.Screen name="Register" component={Register}/>
       <Stack.Screen name="Sign_in" component={Sign_in}/>
       <Stack.Screen name="products" component={products}/>
       <Stack.Screen name="panier" component={panier}/>
       <Stack.Screen name="map" component={map}/>
       <Stack.Screen name="list" component={List}/>
     </Stack.Navigator>
  )
}

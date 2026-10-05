import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../views/SplashScreen';
import OnboardingView from '../views/OnboardingView';
import OnboardingPage3View from '../views/OnboardingPage3View';
import OnboardingPage4View from '../views/OnboardingPage4View';
import OnboardingPage5View from '../views/OnboardingPage5View';
import OnboardingPage6View from '../views/OnboardingPage6View';
import OnboardingPage7View from '../views/OnboardingPage7View';
import CategoriesView from '../views/CategoriesView';
import AllCategoriesView from '../views/AllCategoriesView';
import CategoryProductsView from '../views/CategoryProductsView';
import FruitsVegetablesView from '../views/FruitsVegetablesView';
import FreshVegetablesView from '../views/FreshVegetablesView';
import ProductDetailsView from '../views/ProductDetailsView';
import CartView from '../views/CartView';
import CheckoutView from '../views/CheckoutView';
import OrderSuccessView from '../views/OrderSuccessView';
import ProfileView from '../views/ProfileView';
import UsersView from '../views/UsersView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FAF7F2' },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding3"
        component={OnboardingPage3View}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding4"
        component={OnboardingPage4View}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding5"
        component={OnboardingPage5View}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding6"
        component={OnboardingPage6View}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding7"
        component={OnboardingPage7View}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllCategories"
        component={AllCategoriesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FruitsVegetables"
        component={FruitsVegetablesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreshVegetables"
        component={FreshVegetablesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={CartView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Users"
        component={UsersView}
        options={{ title: 'Node + Express + React Native', headerShown: true }}
      />
    </Stack.Navigator>
  );
}

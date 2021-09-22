import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import Categories from '../components/home/Categories'
import HeaderTab from '../components/home/HeaderTab'
import RestaurantItem, {localRestaurants} from '../components/home/RestaurantItem'
import SearchBar from '../components/home/SearchBar'
import GlobalStyles from '../styles/GlobalStyles'

const YELP_API_KEY =
  "78hvFlkDrF0GYAZpmBbJ0NtHuNfnogkD6lNvI5RwhoLLi7r7XOO7yDutCIHb3vc5i49uXm0rG3AkQ2VvjV8DXSO3_sppeDwbfPsyRFKF8B38kRBSjejwXz9nru9JYXYx";
//Ohio – 45039
export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");
  

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
          business.transactions.includes(activeTab.toLowerCase())
        )
      ))
  }

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);
      return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>  
            <View 
              style={{ 
                  backgroundColor: 'white',
                  padding: 15,
                  }}
            >
              <HeaderTab activeTab= {activeTab}  setActiveTab ={setActiveTab}/>
              <SearchBar cityHandler= { setCity }/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
               <Categories />
               <RestaurantItem 
                 restaurantData ={restaurantData}
                 navigation={navigation}
                 />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    )
}

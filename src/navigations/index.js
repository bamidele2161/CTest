/* eslint-disable prettier/prettier */

import React from 'react';
import HomeScreen from '../screens/homeScreen';
import NewsScreen from '../screens/newsScreen';
import AddNewsScreen from '../screens/addNewsScreen';
import AddNewComment from '../screens/addNewComment';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AppRouter = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="news"
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="News"
        component={AddNewsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="newComment"
        component={AddNewComment}
      />
    </Stack.Navigator>
  );
};

export default AppRouter;

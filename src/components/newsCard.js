/* eslint-disable prettier/prettier */

import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';
import {useActions} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {Card, Image} from 'react-native-elements';
import {DEFAULT_IMAGE, IMAGES_ARR} from '../utils';
import colors from '../assets/color';
import PrimaryButton from './button';

const NewsCard = ({data, index}) => {
  const {deleteNews} = useActions();
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate('news', {id: data.id, index: index});
  };

  return (
    <Pressable onPress={navigate}>
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: IMAGES_ARR[data.id].src ?? DEFAULT_IMAGE,
              }}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.cardPreview}>
            <Text
              numberOfLines={1}
              h4
              h4Style={{fontSize: 15, color: colors.success}}>
              {data.title}
            </Text>
            <View style={styles.authorView}>
              <Text h4 numberOfLines={1} h4Style={{fontSize: 13}}>
                Author: <Text> {data.author} </Text>
              </Text>
            </View>
            <View>
              <Text numberOfLines={3}>{data.body}</Text>
            </View>
            <View style={styles.btnView}>
              <PrimaryButton
                title="Delete"
                buttonStyle={{
                  backgroundColor: colors.error,
                  borderRadius: 10,
                }}
                textStyle={{color: colors.white, fontSize: 10}}
                onPress={() => deleteNews(data?.id)}
              />
              <PrimaryButton
                title="Edit"
                buttonStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                }}
                textStyle={{color: colors.white, fontSize: 10}}
                onPress={() =>
                  navigation.navigate('News', {
                    data,
                    headerTitle: 'Edit News',
                  })
                }
              />
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 0,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    width: 130,
    height: 300,
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    height: 150,
    width: '100%',
  },
  authorView: {
    marginVertical: 4,
  },
  author: {
    fontSize: 14,
  },
  paragraph: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  cardPreview: {
    flex: 1,
    marginLeft: 0,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    flex: 1,
    minWidth: 70,
    backgroundColor: colors.primary,
    marginRight: 5,
  },
});

export default NewsCard;

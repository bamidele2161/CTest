/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {Text, Image} from 'react-native-elements';
import {getById} from '../utils';
import {useActions} from '../hooks';
import colors from '../assets/color';
import Comment from '../components/Comment';
import PrimaryButton from '../components/button';
import BackArrow from '../components/arrowBack';
import {IMAGES_ARR} from '../utils';

const News = ({route, navigation}) => {
  const {state, dispatch} = useActions();
  const {id} = route.params;
  const news = state.news;
  const commentsState = state.comments.comments;
  const comments = commentsState[id] || [];
  const item = getById(id, news);

  useEffect(() => {
    dispatch.comments.getAllcommentAsync(id);
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <View style={styles.imagesView}>
        {item?.images ? (
          <SliderBox sliderBoxHeight={'100%'} images={item.images} />
        ) : (
          <Image
            style={{height: '100%'}}
            source={{uri: IMAGES_ARR[id ?? 0].src}}
          />
        )}
      </View>
      <BackArrow />
      <View style={styles.body}>
        <Text h4 h4Style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.authorView}>
          <Text style={styles.author}>Author:</Text>
          <Text>{item.author}</Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'justify',
            }}>
            {item.body}
          </Text>
        </View>
        <View>
          <View style={styles.addCommentView}>
            <Text
              h4
              h4Style={{
                fontSize: 13,
                marginVertical: 10,
              }}>
              Comments..
            </Text>

            <PrimaryButton
              buttonStyle={{backgroundColor: colors.primary, borderRadius: 10}}
              textStyle={{color: colors.white}}
              title="Add comment"
              onPress={() =>
                navigation.navigate('newComment', {newsId: item.id})
              }
            />
          </View>
          {!comments.length ? (
            <View>
              <Text>No comments</Text>
            </View>
          ) : (
            <View>{comments.map(com => <Comment data={com} />).reverse()}</View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.white,
  },
  title: {
    marginVertical: 10,
  },
  imagesView: {
    height: 250,
  },
  body: {
    paddingHorizontal: 20,
  },
  authorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },

  addCommentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
export default News;

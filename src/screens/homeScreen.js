import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useActions} from '../hooks';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/color';
import NewsCard from '../components/newsCard';
import Pagination from '../components/pagination';
import Navbar from '../components/navbar';
import PrimaryButton from '../components/button';

const HomeScreen = ({navigation}) => {
  const {tryAgain, state, dispatch} = useActions();
  const news = state.news;
  const loadingState = state.loading.effects.news.getAllNewsAsync;
  const [pageNumber, setPageNumber] = useState(1);
  // console.log(news);

  useEffect(() => {
    dispatch.news.getAllNewsAsync(pageNumber);
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <Navbar />
      {loadingState ? (
        <View style={styles.center}>
          <ActivityIndicator animating={true} color={colors.red} />
        </View>
      ) : null}
      {!loadingState && !news.length ? (
        <View style={styles.center}>
          <Text style={styles.errorMsg}>There seems to be an Error</Text>
          <PrimaryButton
            title="Try Again"
            onPress={() => tryAgain(pageNumber)}
          />
        </View>
      ) : (
        <View style={styles.cards}>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={news}
            numColumns={2}
            renderItem={({item, index}) => (
              <NewsCard data={item} index={index} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <View style={styles.pagination}>
        <Pagination
          page={pageNumber}
          setPage={setPageNumber}
          dataLength={news.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cards: {
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
    marginLeft: 10,
  },
  flatlist: {
    paddingBottom: 150,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsg: {
    fontSize: 17,
    marginBottom: 10,
  },
});
export default HomeScreen;

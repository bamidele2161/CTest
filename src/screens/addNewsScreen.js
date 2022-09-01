import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {useActions} from '../hooks';
import colors from '../assets/color';
import TextInput from '../components/TextInput';
import {showToast} from '../utils';
import PrimaryButton from '../components/button';
import BackArrow from '../components/arrowBack';

const NewNews = ({route, navigation}) => {
  const {state, dispatch} = useActions();
  const loadingState = state.loading;
  const [error, setError] = useState('');
  const isLoading = loadingState.models.news;
  const {data} = route.params;

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const submit = async () => {
    const body = {
      author,
      title,
    };

    if (!body.author || !body.title) {
      return setError('all fields must be provided');
    }

    if (!data) {
      await dispatch.news.addNewsAsync({body});
      navigation.navigate('home', {
        data: null,
      });

      showToast('success', 'Successfully added news');
      setAuthor('');
      setTitle('');
      return;
    }

    await dispatch.news.editNewsAsync({newsId: data.id, body});

    setAuthor('');
    setTitle('');
  };

  useEffect(() => {
    setTimeout(() => setError(''), 1500);
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthor(data.author);
      setTitle(data.title);
    }
  }, []);

  return (
    <View style={styles.card}>
      <Card style={styles.container}>
        <Card.Title h4>
          <Text> {data?.author ? 'Edit News' : 'Add News'} </Text>
        </Card.Title>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View>
          <TextInput
            label="Title"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            value={title}
            inputStyle={{
              paddingHorizontal: 10,
              borderColor: colors.grey,
              borderWidth: 2,
              borderRadius: 4,
              height: '100%',
            }}
            onChangeText={text => {
              setTitle(text);
            }}
          />
          <TextInput
            keyboardType="default"
            label="Author"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            multiline
            inputStyle={{
              paddingHorizontal: 10,
              borderColor: colors.grey,
              borderWidth: 2,
              borderRadius: 4,
              height: '100%',
            }}
            value={author}
            onChangeText={text => {
              setAuthor(text);
            }}
          />
          <PrimaryButton
            title="SUBMIT"
            loading={isLoading}
            onPress={submit}
            buttonStyle={{borderRadius: 10, backgroundColor: colors.primary}}
          />
        </View>
      </Card>
      <BackArrow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  error: {
    color: colors.error,
    fontSize: 15,
    marginVertical: 15,
  },
  card: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});
export default NewNews;

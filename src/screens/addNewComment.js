import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import {Card} from 'react-native-elements';
import {useActions} from '../hooks';
import colors from '../assets/color';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/button';
import BackArrow from '../components/arrowBack';

const AddComment = ({route}) => {
  const routeObj = route.params;
  const {state, dispatch} = useActions();
  const loadingState = state.loading.models.comments;
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const submit = async () => {
    const data = {
      name,
      comment,
    };

    if (!data.name || !data.comment)
      return setError('Please leave no field empty');

    if (!routeObj.commentValues) {
      await dispatch.comments.addCommentAsync({
        newsId: routeObj?.newsId,
        body: data,
      });
      setName('');
      setComment('');
      return;
    } else {
      await dispatch.comments.editCommentAsync({
        newsId: routeObj?.commentValues?.newsId,
        commentId: routeObj?.commentValues?.id,
        body: data,
      });
      setName('');
      setComment('');
    }
  };

  useEffect(() => {
    setTimeout(() => setError(''), 1500);
  }, [error]);

  useEffect(() => {
    if (routeObj?.commentValues) {
      setName(routeObj?.commentValues.name);
      setComment(routeObj?.commentValues?.comment);
      return;
    }
  }, [routeObj?.commentValues]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.card}>
        <Card style={styles.cardContainer}>
          <Card.Title h4>
            {routeObj?.commentValues ? 'Edit Comment' : 'Add Comment'}
          </Card.Title>
          <Card.Divider />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View></View>
          <View
            style={{
              padding: 5,
            }}>
            <TextInput
              label="Name"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={name}
              inputStyle={{
                paddingHorizontal: 10,
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 4,
                height: '100%',
              }}
              onChangeText={text => {
                setName(text);
              }}
            />
            <TextInput
              label="Comment"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              inputStyle={{
                paddingHorizontal: 10,
                borderColor: colors.grey,
                borderWidth: 2,
                borderRadius: 4,
                height: '100%',
              }}
              returnKeyLabel="next"
              value={comment}
              onChangeText={text => {
                setComment(text);
              }}
            />
            <PrimaryButton
              title="SUBMIT"
              loading={loadingState}
              onPress={submit}
              buttonStyle={{backgroundColor: colors.primary, borderRadius: 10}}
            />
          </View>
        </Card>
      </View>
      <BackArrow />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  cardContainer: {
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    width: 100,
    flex: 1,
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
export default AddComment;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {format} from 'timeago.js';
import colors from '../assets/color';
import PrimaryButton from './button';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const trash = <Icon name="trash" size={20} color={colors.error} solid />;
const edit = <EditIcon name="pencil" size={20} color={colors.primary} solid />;

const Comment = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {name, comment, newsId, id, createdAt} = data;

  const editComment = () => {
    navigation.navigate('newComment', {commentValues: data});
  };

  const deleteComment = async () => {
    await dispatch.comments.deleteCommentAsync({newsId, commentId: id});
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={[styles.flex, {marginBottom: 5}]}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View>
          <Text>{comment}</Text>
        </View>

        <View style={[styles.flex, styles.commentBottom]}>
          <View>
            <Text style={{fontStyle: 'italic'}}>{format(createdAt)}</Text>
          </View>
          <View style={[styles.flex, styles.actionBtn]}>
            <PrimaryButton
              title={trash}
              onPress={deleteComment}
              textStyle={{color: colors.red}}
              buttonStyle={styles.btn}
            />
            <PrimaryButton
              title={edit}
              onPress={editComment}
              textStyle={{color: colors.primary}}
              buttonStyle={styles.btn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
  body: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    flex: 1,
    shadowColor: '#878686',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  commentBottom: {
    justifyContent: 'space-between',
  },
  actionBtn: {
    justifyContent: 'space-between',
    width: '50%',
  },
  btn: {
    minWidth: 70,
    backgroundColor: 'transparent',
  },
});
export default Comment;

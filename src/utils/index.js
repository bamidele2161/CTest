import Toast from 'react-native-toast-message';

export const getById = (id, list = []) => {
  const exist = list.findIndex(el => el.id === id);
  if (exist === -1) return {};

  return list[exist];
};

export const getExistingIndex = (id, list = []) => {
  const exist = list.findIndex(el => el.id === id);
  return exist;
};

export const showToast = (type, msg) =>
  Toast.show({
    type,
    text1: msg,
  });

export const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3BhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60';

// export const IMAGES_ARR = [
//   "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3BhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
//   "https://images.unsplash.com/photo-1631519952398-5b1d76b946e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmV3c3BhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",

// ]

export const IMAGES_ARR = Array.from({length: 512}, () => ({
  src: `https://source.unsplash.com/random?${Math.ceil(Math.random() * 999)}/${
    Math.floor(Math.random() * 4) + 2
  }/${Math.floor(Math.random() * 4) + 2}`,
}));

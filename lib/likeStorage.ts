import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLiked = async (id: string) => {
  const val = await AsyncStorage.getItem(`liked-${id}`);
  return val === 'true';
};

export const toggleLiked = async (id: string) => {
  const current = await getLiked(id);
  const newVal = !current;
  await AsyncStorage.setItem(`liked-${id}`, newVal.toString());
  return newVal;
};

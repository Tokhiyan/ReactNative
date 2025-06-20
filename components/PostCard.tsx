import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getLiked, toggleLiked } from '@/lib/likeStorage';
import {Post} from '@/lib/types'

interface IProps {
    post: Post, 
    onPress: () => void
}

export default function PostCard({ post, onPress }: IProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getLiked(post.id).then(setLiked);
  }, []);

  const onLike = async () => {
    const newVal = await toggleLiked(post.id);
    setLiked(newVal);
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${post.id}/300/200` }}
        style={{ width: '100%', height: 200, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{post.title}</Text>
      <Text style={{ color: 'gray' }}>By: {post.user.name}</Text>
      <TouchableOpacity onPress={onLike}>
        <Text style={{ color: liked ? 'red' : 'gray' }}>{liked ? '♥ Liked' : '♡ Like'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

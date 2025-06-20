import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import { ScrollView, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { getLiked, toggleLiked } from '@/lib/likeStorage';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        name
      }
    }
  }
`;

export default function PostDetail() {
  const { id } = useLocalSearchParams();

  const skip = !id;

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id },
    skip,
  });

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (data?.post?.id) {
      getLiked(data.post.id).then(setLiked);
    }
  }, [data?.post?.id]);

  const onLike = async () => {
    const newVal = await toggleLiked(data.post.id);
    setLiked(newVal);
  };

  if (skip) return <ActivityIndicator size="large" />;
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const post = data.post;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${post.id}/300/200` }}
        style={{ width: '100%', height: 200, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{post.title}</Text>
      <Text style={{ color: 'gray', marginBottom: 10 }}>By: {post.user.name}</Text>
      <Text>{post.body}</Text>
      <TouchableOpacity onPress={onLike}>
        <Text style={{ color: liked ? 'red' : 'gray' }}>{liked ? '♥ Liked' : '♡ Like'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


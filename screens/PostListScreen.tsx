import { gql, useQuery } from '@apollo/client';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import PostCard from '@/components/PostCard';
import { useRouter } from 'expo-router';
import {Post} from '@/lib/types'

const GET_POSTS = gql`
  query {
    posts(options: { paginate: { page: 1, limit: 10 } }) {
      data {
        id
        title
        body
        user {
          name
        }
      }
    }
  }
`;

export default function PostListScreen() {
  const { data, loading, error } = useQuery(GET_POSTS);
  const router = useRouter();

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={{ padding: 16, marginBottom: 80 }}>
      {data.posts.data.map((post: Post) => (
        <PostCard key={post.id} post={post} onPress={() => router.push(`/${post.id}`)} />
      ))}
    </ScrollView>
  );
}
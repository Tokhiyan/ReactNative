import React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts(options: { paginate: { page: 1, limit: 5 } }) {
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

const PostList = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) {
  console.log('GraphQL Error:', error.graphQLErrors);
  console.log('Network Error:', error.networkError);
  return <Text>Error: {error.message}</Text>;
}


  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {data.posts.data.map((post: any) => (
        <View key={post.id} style={{ marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10 }}>
          <Image
            source={{ uri: `https://picsum.photos/seed/${post.id}/300/200` }}
            style={{ width: '100%', height: 200, borderRadius: 10 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{post.title}</Text>
          <Text style={{ color: 'gray' }}>By: {post.user.name}</Text>
          <Text>{post.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PostList;

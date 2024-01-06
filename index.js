
import config from './config';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: config.GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${config.API_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

const GET_DATA = gql`
query {
  search(query: "location:Butembo", type: USER, first: 100) {
    userCount
    edges {
      node {
        __typename
        ... on User {
          login
          avatarUrl
          name
          company
          location
          organizations(first: 100) {
            nodes {
              login
            }
          }
          followers {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            totalCommitContributions
            totalPullRequestContributions
            restrictedContributionsCount
          }
        }
      }
      cursor
    }
  }
}
`;

client
  .query({
    query: GET_DATA,
  })
  .then((result) => {
    // Handle the fetched data
    console.log(result.data);
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error fetching data:', error);
  });


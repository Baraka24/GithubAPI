const query = `
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

export default query;
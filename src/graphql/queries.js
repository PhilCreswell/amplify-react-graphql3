/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIssue = /* GraphQL */ `
  query GetIssue($id: ID!) {
    getIssue(id: $id) {
      id
      title
      description
      updates {
        items {
          id
          content
          createdAt
          updatedAt
          issueUpdatesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listIssues = /* GraphQL */ `
  query ListIssues(
    $filter: ModelIssueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIssues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        updates {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUpdate = /* GraphQL */ `
  query GetUpdate($id: ID!) {
    getUpdate(id: $id) {
      id
      content
      issue {
        id
        title
        description
        updates {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      issueUpdatesId
    }
  }
`;
export const listUpdates = /* GraphQL */ `
  query ListUpdates(
    $filter: ModelUpdateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUpdates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        issue {
          id
          title
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        issueUpdatesId
      }
      nextToken
    }
  }
`;

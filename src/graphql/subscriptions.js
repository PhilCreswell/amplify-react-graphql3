/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIssue = /* GraphQL */ `
  subscription OnCreateIssue($filter: ModelSubscriptionIssueFilterInput) {
    onCreateIssue(filter: $filter) {
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
export const onUpdateIssue = /* GraphQL */ `
  subscription OnUpdateIssue($filter: ModelSubscriptionIssueFilterInput) {
    onUpdateIssue(filter: $filter) {
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
export const onDeleteIssue = /* GraphQL */ `
  subscription OnDeleteIssue($filter: ModelSubscriptionIssueFilterInput) {
    onDeleteIssue(filter: $filter) {
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
export const onCreateUpdate = /* GraphQL */ `
  subscription OnCreateUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onCreateUpdate(filter: $filter) {
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
export const onUpdateUpdate = /* GraphQL */ `
  subscription OnUpdateUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onUpdateUpdate(filter: $filter) {
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
export const onDeleteUpdate = /* GraphQL */ `
  subscription OnDeleteUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onDeleteUpdate(filter: $filter) {
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

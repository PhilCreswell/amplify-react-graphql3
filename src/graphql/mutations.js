/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIssue = /* GraphQL */ `
  mutation CreateIssue(
    $input: CreateIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    createIssue(input: $input, condition: $condition) {
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
export const updateIssue = /* GraphQL */ `
  mutation UpdateIssue(
    $input: UpdateIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    updateIssue(input: $input, condition: $condition) {
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
export const deleteIssue = /* GraphQL */ `
  mutation DeleteIssue(
    $input: DeleteIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    deleteIssue(input: $input, condition: $condition) {
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
export const createUpdate = /* GraphQL */ `
  mutation CreateUpdate(
    $input: CreateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    createUpdate(input: $input, condition: $condition) {
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
export const updateUpdate = /* GraphQL */ `
  mutation UpdateUpdate(
    $input: UpdateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    updateUpdate(input: $input, condition: $condition) {
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
export const deleteUpdate = /* GraphQL */ `
  mutation DeleteUpdate(
    $input: DeleteUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    deleteUpdate(input: $input, condition: $condition) {
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

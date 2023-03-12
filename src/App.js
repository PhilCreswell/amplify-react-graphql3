import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, graphqlOperation } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  //Image,
  Text,
  TextField,
  TextAreaField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listIssues, listUpdates } from "./graphql/queries";
import {
  createIssue as createIssueMutation,
  deleteIssue as deleteIssueMutation,
  createUpdate as createUpdateMutation,
  deleteUpdate as deleteUpdateMutation,
} from "./graphql/mutations";
import Issue from './components/Issue'

const customListIssuesQuery = `
  query {
    listIssues {
      items {
        title
        description
        id
        createdAt
        updates {
          items {
            id
            content
            createdAt
          }
        }
      }
    }
  }
`;

const customListUpdatesQuery = `
  query {
    listUpdates {
      items {
        content
        id
        createdAt
        issue {
          title
          id
        }
      }
    }
  }
`;
const App = ({ signOut }) => {
  const [issues, setIssues] = useState([]);
  const [updates, setUpdates] = useState([]);
  
  useEffect(() => {
    fetchIssues();
    fetchUpdates();
  }, []);

  async function fetchIssues() {
    const apiData = await API.graphql(graphqlOperation(customListIssuesQuery));
    const issuesFromAPI = apiData.data.listIssues.items;
    setIssues(issuesFromAPI);
    console.log(issuesFromAPI);
  }

  async function fetchUpdates() {
    const apiData = await API.graphql(graphqlOperation(customListUpdatesQuery));
    //const apiData = await API.graphql({ query: listUpdates });
    const updatesFromAPI = apiData.data.listUpdates.items;
    //.filter(elements => {
    //  return elements !== null;
    //});
    console.log(JSON.stringify(updatesFromAPI));
    setUpdates(updatesFromAPI);
  }

  async function createIssue(event) {
    console.log("createIssue");
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      title: form.get("title"),
      description: form.get("description"),
    };
    const newIssue = await API.graphql({
      query: createIssueMutation,
      variables: { input: data, 
       // condition: conditions 
      },
    });
    
    const data2 = {
      content: "Did i mention that XXX Created new Issue",
      issueUpdatesId: newIssue.data.createIssue.id,
    };
    console.log(JSON.stringify(data2));
    const newUpdate = await API.graphql({
      query: createUpdateMutation,
      variables: { input: data2 },
    });
    console.log(newUpdate);
    
    fetchIssues();
    fetchUpdates();
    
    event.target.reset();
    
  }

  async function createUpdate(issueId, content) {
    console.log("createUpdate");
    //console.log(JSON.stringify(event));
    //event.preventDefault();
    //const form = new FormData(event.target);
    const data = {
      content: content,
      issueId: issueId,
    };
    const newUpdate = await API.graphql({
      query: createUpdateMutation,
      variables: { input: data },
    });

    fetchIssues();
    console.log(JSON.stringify(data));
  }

  

  async function deleteIssue({ id, title }) {
    console.log("Delete Issue");
    console.log(JSON.stringify(id));
    console.log(title);
    
    const newIssues = issues.filter((issue) => issue.id !== id);
    setIssues(newIssues);
    await API.graphql({
      query: deleteIssueMutation,
      variables: { input: { id } },
    });
  }

  async function deleteUpdate({ id }) {
    const newUpdates = updates.filter((update) => update.id !== id);
    setUpdates(newUpdates);
    await API.graphql({
      query: deleteUpdateMutation,
      variables: { input: { id } },
    });
  }

  
  return (
    <View className="App">
      <Heading level={1}>Issue Logger</Heading>
      
      <View as="form" onSubmit={createIssue}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="title"
            placeholder="Issue Title"
            label="Issue Title"
            labelHidden
            variation="quiet"
            required
          />
          <TextAreaField
            name="description"
            placeholder="Issue Description"
            label="Issue Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Issue
          </Button>
        </Flex>
      </View>
      
      <Heading level={2}>Issues Table</Heading>
      <View className="issues-table" margin="3rem 0">
        {issues.map((issue) => (
            <div key = {issue.id || issue.title}>
              <Issue  issue = {issue} 
                      deleteMe = {() => deleteIssue(Issue)}
                      refreshData = {() => fetchIssues()}
              ></Issue>
              {/* <Button variation="primary" onClick={() => deleteIssue(issue)}>
                Delete issue
              </Button> */}
            </div>
            
        ))}
      </View>  
      
     
      <Button onClick={signOut}>Sign Out</Button>
    </View>

  );
};

export default withAuthenticator(App);
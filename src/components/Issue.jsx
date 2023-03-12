import "../App.css";
import React, {useState} from "react";
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
    Grid,
    Form,
} from '@aws-amplify/ui-react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createUpdate as createUpdateMutation,
    deleteUpdate as deleteUpdateMutation,
} from "../graphql/mutations";

const Issue = ({issue, deleteMe, refreshData}) => {
    const [value, setValue] = useState(1);
    const [provisionalUpdate, setProvisionalUpdate] = useState("");
    const [showUpdates, setShowUpdates] = useState(false);

    async function createUpdate(event) {
        console.log("createUpdate");
        //console.log(JSON.stringify(event));
        event.preventDefault();
        const form = new FormData(event.target);
        //console.log(JSON.stringify(form));
        const data = {
            content: form.get("content"),
            //content: provisionalUpdate,
            issueUpdatesId: issue.id,
        };
        const newUpdate = await API.graphql({
          query: createUpdateMutation,
          variables: { input: data },
        });
        event.target.reset();
        refreshData();
        console.log(newUpdate);

      }

      function prettifyId(id) {
        return(id.substring(0,4));
      }

      function contemporizeDatetime(dt) {
        var now = new Date();
        var pastDate = new Date(dt)
        var relative = "relative date";
        if (now.getFullYear() < pastDate.getFullYear()) {
            if (now.getFullYear()==pastDate.getFullYear()+1) {
                relative = "some time in " + pastDate.getMonth() + " " + pastDate.getFullYear();
            } else {
                relative = "some time in " + pastDate.getFullYear();
            }
        } else if (now.getMonth() < pastDate.getMonth()) {
            if (now.getTime() < pastDate.getTime()+1) {
                relative =  "yesterday";
            } else if (now.getTime() < pastDate.getTime()+7) {
                relative =  pastDate.toLocaleString('en-us', {  weekday: 'long' });
            } else {
                relative = "some time in " + pastDate.getMonth();
            }
        } else if (now.getDate() < pastDate.getDate()) {
            if (now.getTime() < pastDate.getTime()+1) {
                relative =  "yesterday";
            } else if (now.getTime() < pastDate.getTime()+7) {
                relative =  pastDate.toLocaleString('en-us', {  weekday: 'long' });
            } else {
                relative =  pastDate.getUTCDate() + " " + pastDate.toLocaleString('default', { month: 'short' });
            }
        } else {
            relative = pastDate.toLocaleTimeString().substring(0,5);
        }
        return(relative);

      }
    
      function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
      }

    return (
        <div className ="issue-section">
            <div className="issue-row"> 
                <div className="issue-id">{prettifyId(issue.id)}</div>
                <div className="person-id">PC</div>
                <div className="issue-title">{issue.title}</div>
                {/* <Button variation="primary" onClick={deleteMe}>
                    Delete issue
                </Button> */}
                <div className="issue-timestamp">{contemporizeDatetime(issue.createdAt)}</div>
                <button className="issue-update-count" 
                        onClick={() => setShowUpdates(!showUpdates)}>
                    {(issue.updates?.items?.length | 0) + (showUpdates ? " ^" : " v")}
                </button>
                <div className="issue-description">{issue.description}</div>
                
            </div>

            {/* <form className="add-update-row" onSubmit={createUpdate}>    
                <textarea value={provisionalUpdate} 
                          name="content"
                          className = "add-update-content" 
                          onChange={(e)=>setProvisionalUpdate(e.value)}/>        
                <input className = "add-update-button"
                       type="submit" 
                       value="Submit" />
            </form> */}
           
            <div className="updates-section" hidden={!showUpdates}>
                <form
                    className="add-update-row"
                    onSubmit={createUpdate}>
                    <div className="person-id">PC</div>
                    <TextField
                        name="content"
                        className="add-update-content"
                        placeholder="Add update"
                        label="Update content"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <Button className="add-update-button" type="submit" variation="primary">
                        Save Update
                    </Button>
                </form>

                {issue.updates?.items?.
                    sort(dynamicSort("-createdAt")).
                    map((update) => (
                    <div className="update-row" key={update.id}>
                        <div className="update-id">{prettifyId(update.id)}</div>
                        <div className="person-id">PC</div>
                        <div className="update-content" fontWeight={700}>
                            {update.content}
                        </div>
                        <div className="update-timestamp">{contemporizeDatetime(update.createdAt)}</div>
                    
                    </div>
                ))}    
            </div>          
        </div>
    );
};

export default Issue;
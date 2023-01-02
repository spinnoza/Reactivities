import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5039/api/Activities').then(
      response => {
        console.log(response);
        setActivities(activities => response.data);
      }
    )
  },[]);
  
  return (
    <div>
       <Header as='h2' icon='users' content='Reactivities' />
     
        <List>
          <ListItem>
            {activities.map((activity:any) => {
              return (
                <li key={activity.id} >
                  {activity.title}
                </li>
              );
            })}
          </ListItem>
       </List>
       
    
    </div>
  );
}

export default App;

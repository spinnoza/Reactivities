import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5039/api/Activities').then(
      response => {
        setActivities(activities => response.data);
      }
    )
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(selectedActivity => activities.find(x => x.id === id));
  }

  function handleCancelSelect() {
    setSelectedActivity(selectedActivity => undefined);
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelect}
        />
      </Container>
    </>
  );
}

export default App;

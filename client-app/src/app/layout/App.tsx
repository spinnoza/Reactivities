import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(
      response => {
        let filterDateList = response.map<Activity>((v) => { return { ...v, ['date']: v.date.split('T')[0] } });
        setActivities(activities => filterDateList);
        setLoading((loading) => false);
      }
    )
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(selectedActivity => activities.find(x => x.id === id));
  }

  function handleCancelSelect() {
    setSelectedActivity(selectedActivity => undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelect();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(submitting => true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities(activities => [...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(selectedActivity => activity);
        setEditMode(editMode => false);
        setSubmitting(submitting => false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities(activities => [...activities, activity]);
        setSelectedActivity(selectedActivity => activity);
        setEditMode(editMode => false);
        setSubmitting(submitting => false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(submitting => true);
    agent.Activities.delete(id).then(
      ()=>{
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(submitting => false);
      }
    );
   
  }

  if (loading) return <LoadingComponent content='Loading app' />
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelect}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default App;

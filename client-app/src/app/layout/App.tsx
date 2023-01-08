import { useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/homePage';

function App() {

  const {activityStore} = useStore();


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route path='/' element={<HomePage />}></Route>
      </Container>
    </>
  );
}

export default observer(App);

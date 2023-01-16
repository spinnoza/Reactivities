import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';


export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity
        , loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date:null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        category: Yup.string().required('The event category is required'),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => {
                setActivity((a) => { return activity! });
            });
        }
    }, [id, loadActivity]);


    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    // function handleChange(event: ChangeEvent<HTMElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     //setActivity({ ...activity, [name]: value })
    //     setActivity(activity => { return { ...activity, [name]: value } });
    // }

    if (loadingInitial) {
        return <LoadingComponent content='Loading activity...' />
    }

    return (
        <Segment clearing>
             <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit,isValid, isSubmitting, dirty }) => {
                    return (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='title' placeholder='Title' />

                            <MyTextAreaInput rows={3} placeholder='Description' name='description' />
                            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                            <MyDateInput 
                                name='date' 
                                placeholderText='Date' 
                                //showTimeSelect 
                                //timeCaption='time' 
                                dateFormat='yyyy-MM-dd' />

                            <Header content='Location Details' sub color='teal' />
                            <MyTextInput placeholder='City' name='city' />
                            <MyTextInput placeholder='Venue' name='venue' />
                            <Button 
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading} 
                                floated='right' positive type='submit' content='Submit' />
                            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                        </Form>

                    );
                }}
            </Formik>

        </Segment>
    )
});
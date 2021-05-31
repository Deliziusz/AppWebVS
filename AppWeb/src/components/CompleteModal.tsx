import React, { useContext, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonButtons,
    IonMenuButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonButton,
    IonModal,
    IonIcon
} from '@ionic/react';
import ActivitiesContext, { Activity } from '../data/activities-context';
import classes from '../pages/AllActivities/AllActivities.module.css';
import { checkmarkOutline } from 'ionicons/icons';

interface CompleteModalActivityProps {
    activity: Activity;
    dismissModal: () => void;
}
const AllActivities: React.FC<CompleteModalActivityProps> = (props) => {

    const [activityToComplete, setActivityToComplete] = useState<Activity>();
    const activitiesCtxt = useContext(ActivitiesContext);

    const confirmCompletion =(activityId: string) => {
        activitiesCtxt.completeActivity(activityId);
        props.dismissModal();
    };

    //este lo dejamos de usar cuando implementamos el confirm completition
    const openCompleteModal = (activity: Activity) => {
        setActivityToComplete(activity);
    };

    //Lo dejamos de usar cuando pusimos el dimiss explicito
    const closeModal = () => {
        props.dismissModal();
    };

    return (
        <React.Fragment>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>TODAS TUS ACTIVIDADES</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        {activitiesCtxt.activities.map(activity => (
                            <IonRow key={activity.id}>
                                <IonCol className="ion-text-center">
                                    <IonCard>
                                        <img src={activity.imageUrl} alt="Activity" />
                                        <IonCardHeader>
                                            <IonCardSubtitle>{activity.title}</IonCardSubtitle>
                                            <IonCardTitle>{activity.hour}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p>{activity.description}</p>
                                            <IonItem lines="none">
                                            <IonCol className='ion-text-center'>
                                                <IonButton color='danger' fill='clear' onClick={props.dismissModal}>Cancel</IonButton>
                                            </IonCol>
                                                <IonButton
                                                    className={classes.FullWidth}
                                                    fill="clear"
                                                    onClick={    
                                                        () => confirmCompletion(props.activity.id)                                         
                                                    }>Actividad Completa 
                                            </IonButton>
                                                 
                                                
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};
export default AllActivities;
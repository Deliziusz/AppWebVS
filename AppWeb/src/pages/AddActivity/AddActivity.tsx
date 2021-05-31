import React, { useContext, useRef, useState } from 'react';
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonToast,
    IonDatetime,
    IonMenuToggle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ActivitiesContext, { ActivityType } from '../../data/activities-context';

const AddActivity: React.FC = () => {

    const history = useHistory();

    const titleInput = useRef<HTMLIonInputElement>(null);
    const descriptionInput = useRef<HTMLIonInputElement>(null);
    const activityTypeInput = useRef<HTMLIonSegmentElement>(null);
    const hourInput = useRef<HTMLIonDatetimeElement>(null);

    const activitiesCtxt = useContext(ActivitiesContext);

    //Cosito para hacer Toast, debe ir en true
    const [toastMsg, setToastMsg] = useState(true);
    //Cosito para el Toggle
    const [checked, setChecked] = useState(false);
    
    const addActivity = () => {
        const title = titleInput.current?.value as string;
        const description = descriptionInput.current?.value as string;
        const activityType = activityTypeInput.current?.value as ActivityType;
        const startDate = new Date(hourInput.current?.value as string);
        const startHour = startDate.getHours() + ':' + startDate.getMinutes();
        

        if (title && description && activityType && startHour) {
            activitiesCtxt.addActivity(title, description, startHour, activityType);
            history.replace('/all-activities');
        }
    };


    return (
        <React.Fragment>
      <IonToast
        isOpen={toastMsg}
        onDidDismiss={() => setToastMsg(false)}
        message="Bienvenid@ Porfavor agrega tu registro"
        duration={8000}
      />
         <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButton slot='start'>
                            <IonMenuButton />
                        </IonButton>
                        <IonTitle>Agregar Actividad</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonSegment ref={activityTypeInput}>
                                        <IonSegmentButton value="comida">
                                            <IonLabel>Comida</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="tareas">
                                            <IonLabel>Tarea</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="musica">
                                            <IonLabel>Música</IonLabel>
                                        </IonSegmentButton>
                                    </IonSegment>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Título de la Actividad</IonLabel>
                                        <IonInput ref={titleInput} type="text"></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Descripción de la Actividad</IonLabel>
                                        <IonInput ref={descriptionInput} type="text"></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Hora de inicio</IonLabel>
                                        <IonDatetime ref={hourInput} displayFormat="h:mm A" picker-pickerFormat="h:mm A" value={new Date().toISOString()}></IonDatetime>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonCol className="ion-text-center ion-margin-top">
                                <IonButton onClick={addActivity} expand="block" fill="outline"
                                >Agregar Actividad Ahora</IonButton>
                            </IonCol>
                        </IonGrid>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AddActivity;
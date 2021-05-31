import React from 'react';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Route, Redirect } from 'react-router-dom';
import AllActivities from './pages/AllActivities/AllActivities';
import AgregarRuta from './pages/AddActivity/Locacion';
import AddActivity from './pages/AddActivity/AddActivity';
import { bodyOutline, newspaperOutline } from 'ionicons/icons'
import ActivityContextProvider from './data/ActivitiesContextProvider';

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonMenu side='start' contentId='deliziuszapp'>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Deliziusz AppWeb</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem routerLink="/all-activities" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={bodyOutline} />
                                <IonLabel>Todas las actividades cariñx</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/add-activity" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={newspaperOutline} />
                                <IonLabel>Agrega una Actividad o algo</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonMenuToggle>
                                <IonItem routerLink="/locacion" routerDirection="none" lines="none">
                                    <IonIcon color="medium" slot="start" icon={newspaperOutline}/>
                                    <IonLabel>Location</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <ActivityContextProvider>
                <IonRouterOutlet id="deliziuszapp">
                    <Route path="/all-activities" component={AllActivities} exact />
                    <Route path="/add-activity" component={AddActivity} exact />
                    <Route path="/locacion" component={AgregarRuta} exact />
                    <Redirect to='/all-activities' />
                </IonRouterOutlet>
            </ActivityContextProvider>
        </IonReactRouter>
    </IonApp>
);
export default App;

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonButtons, IonHeader, IonLoading, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import AllActivities from '../AllActivities/AllActivities';
import {Network} from '@capacitor/network';

interface LocationError {
    showError: boolean;
    message?: string;
}

const GeolocationButton: React.FC = () => {

    Network.addListener('networkStatusChange', status => {
    console.log('Estatus de la red', status);
  });
  
  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
  
    console.log('Obtengo estatus :', status);
  };



    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<LocationError>({ showError: false });
    const [position, setPosition] = useState<Geoposition>();

    
    const getLocation = async () => {
        setLoading(true);

        try {
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setLoading(false);
            setError({ showError: false });
        } catch (e) {
            setError({ showError: true, message: e.message });
            setLoading(false);
        }
    }


    const [toastMsg, setToastMsg] = useState(true);

    return (
        <React.Fragment>
            <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Tu localización bb</IonTitle>
                    </IonToolbar>
                </IonHeader>
            <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(true)}
                message={'Consiguiendo tus coordenadas...'}
            />

<IonToast
        isOpen={toastMsg}
        onDidDismiss={() => setToastMsg(false)}
        message="Ve tus coordenadas"
        duration={4000}
      />


            <IonToast
                isOpen={error.showError}
                onDidDismiss={() => setError({ message: "", showError: false })}
                message={error.message}
                duration={3000}
            />
            <IonButton color="primary" onClick={getLocation}>{position ? `${position.coords.latitude} ${position.coords.longitude}` : "Localización"}</IonButton>
            </IonPage>
            </React.Fragment>
    );
};

export default GeolocationButton;

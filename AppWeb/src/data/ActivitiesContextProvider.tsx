import React, { useState } from 'react';
import ActivitiesContext, { ActivitiesContextModel, Activity, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC = (props) => {
    const [activities, setActivities] = useState<Activity[]>(
        [
            {
                id: Math.random().toString(),
                title: 'Mi comida de hoy',
                description: 'La comida que me gustaría comer hoy',
                hour: '23:00',
                activityType: 'comida',
                imageUrl: '/assets/images/comida.jpg',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Tareas',
                description: '¿Ya hiciste la tarea pendiente?',
                hour: '9:00',
                activityType: 'tareas',
                imageUrl: '/assets/images/tarea.jpg',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Música',
                description: 'Hoy mi canción del día fue ...',
                hour: '19:00',
                activityType: 'musica',
                imageUrl: '/assets/images/musica.jpg',
                isCompleted: false
            }
        ]
    );

    const addActivity = (title: string, description: string, hour: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch (activityType) {
            case 'comida':
                imageUrl = '/assets/images/comida.jpg'
                break;
            case 'musica':
                imageUrl = '/assets/images/musica.jpg'
                break;
            case 'tareas':
                imageUrl = '/assets/images/tarea.jpg'
                break;
            default:
                imageUrl = '/assets/images/musica.jpg'
                break;
        };

        const newActivity: Activity ={
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted:false
        };

        setActivities(currActivities => {
            return [...currActivities, newActivity];
        });
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };
        const activitiesContext: ActivitiesContextModel = {
            activities,
            addActivity,   
            completeActivity
        };

        return (
            <ActivitiesContext.Provider value={activitiesContext}>
                {props.children}
            </ActivitiesContext.Provider>
        );
    };
    export default ActivitiesContextProvider;
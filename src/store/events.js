import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        events: [
            {
                id: 1,
                title: 'Title',
                description: 'Descriptions',
                data: [
                    {
                        id: 1,
                        date: '12-Dec-2020',
                        starttime: '09:00',
                        endtime: '17:00',
                        type: 'Consultation',
                        price: 70
                    },
                    {
                        id: 2,
                        date: '13-Dec-2020',
                        starttime: '08:00',
                        endtime: '20:00',
                        type: 'Telephone',
                        price: 50
                    },
                    {
                        id: 3,
                        date: '14-Dec-2020',
                        starttime: '10:00',
                        endtime: '22:00',
                        type: 'Abulance',
                        price: 100
                    }
                ],
            },
            {
                id: 2,
                title: 'Title',
                description: 'Descriptions',
                data: [
                    {
                        id: 1,
                        date: '12-Dec-2020',
                        starttime: '09:00',
                        endtime: '17:00',
                        type: 'Consultation',
                        price: 70
                    }
                ],
            }
        ]
    }),
    actions: {
        addEvent(appointment) {
            const formattedShift = {
                id: this.events.length + 1,
                title: appointment.title,
                description: appointment.description,
                data: [ ...appointment.data ]
            };
            this.events.unshift(formattedShift);
        },
        removeEvent(id) {
            this.events = this.events.filter(appointment => appointment.id !== id);
        }
    }
});

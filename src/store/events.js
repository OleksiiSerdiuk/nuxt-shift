import { defineStore } from 'pinia';

const generateUniqueId = (items) => {
    return items.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;
};

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
                        date: '2020-12-03',
                        starttime: '09:00',
                        endtime: '17:00',
                        type: 'Consultation',
                        price: 70
                    },
                    {
                        id: 2,
                        date: '2020-12-13',
                        starttime: '08:00',
                        endtime: '20:00',
                        type: 'Telephone',
                        price: 50
                    },
                    {
                        id: 3,
                        date: '2020-12-14',
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
                        date: '2020-12-12',
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
                id: generateUniqueId(this.events),
                title: appointment.title,
                description: appointment.description,
                data: [ ...appointment.data ]
            };
            this.events.unshift(formattedShift);
        },
        editEvent(newData) {
            const index = this.events.findIndex(event => event.id === newData.id);
            if (index !== -1) {
                this.events[index] = {
                    id: newData.id,
                    title: newData.title,
                    description: newData.description,
                    data: newData.data.map(d => ({ ...d }))
                };
            }
        },
    }
});

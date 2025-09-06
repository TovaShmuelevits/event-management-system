

import { createContext, useEffect, useState } from "react";
import { Event } from "../types/Event";
import { useHttp } from "../custom-hooks/useHttp";

type EventContextType = {
    events: Event[] | undefined,
    updateEvent: (oldEventId:string,newEvent: Event) => void,
    addEvent: () => void,
    deleteEvent: (eventId: string) => void
};

export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {
    const { data: events, error, loading, request } = useHttp<Event[]>('/productions');
    const [eventList, setEventList] = useState<Event[]>([]);

    useEffect(() => {
        if (events) {
            setEventList(events);
        } else {
            request('/productions');
        }
    }, [events])
    const contextValue: EventContextType = {
        events: eventList,

        updateEvent() { 
            request()
        },
        addEvent() { request() },

        deleteEvent(eventId: string) {
            request(`/productions/${eventId}`, "delete")
                .then(() => {
                    request('/productions');
                })
        }

    };

    return (
        <EventContext.Provider value={contextValue}>
            {loading && 'Loading...'}
            {error && <p>{error}</p>}
            {!loading && !error && props.children}
        </EventContext.Provider>
    );
};

import { createContext } from "react";
import { Producer } from "../types/Producer";
import { useHttp } from "../custom-hooks/useHttp";

type ProducerContextType = {
    producer: Producer | undefined,
    updateProducer: (newProducer: Producer) => void,
    addProducer: (newProducer: Producer) => void
};

export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props: any) => {
    const { data: producer, error, loading, request } = useHttp<Producer>('/producer');

    const contextValue: ProducerContextType = {
        producer,
        updateProducer() {

        },
        addProducer(newProducer: Producer) {
            request('/producer', 'post', newProducer);

        }
    };
    return (
        <ProducerContext.Provider value={contextValue}>
            {loading && 'Loading...'}
            {error}
            {!loading && !error && props.children}
        </ProducerContext.Provider>
    );
};
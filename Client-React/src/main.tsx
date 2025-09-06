import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ProducerProvider } from './context/Producer.context.tsx'
import { ProducerMenu } from './components/ProducerMenu.tsx'
import { AddProducer } from './components/AddProducer.tsx'
import { ProducerEventDetails } from './components/ProducerEventDetails.tsx'
import { EventProvider } from './context/Event.context.tsx'
import { MainMenu } from './components/MainMenu.tsx'
import { UsersEventList } from './components/UsersEventList.tsx'
import { UserEventDetails } from './components/UserEventDetails.tsx'
import { ProducerDetails } from './components/ProducerDetails.tsx'
import { ProducerEventList } from './components/ProducerEventList.tsx'
import { AddEvent } from './components/AddEvent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <ProducerProvider>
          <App />
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/ProducerMenu" element={<ProducerMenu />} />
            <Route path="/AddProducer" element={<AddProducer />} />
            <Route path="/ProducerDetails" element={<ProducerDetails />} />
            <Route path="/UsersEventList" element={<UsersEventList />} />
            <Route path="/UserEventDetails/:id" element={<UserEventDetails />} />
            <Route path="/ProducerEventDetails/:id" element={<ProducerEventDetails />} />
            <Route path="/ProducerEventList/:producerId" element={<ProducerEventList />} />
            <Route path="/AddEvent/:producerId" element={<AddEvent />} />
          </Routes>
        </ProducerProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
);

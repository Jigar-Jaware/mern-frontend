import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, Alert } from 'reactstrap';
import socketio from 'socket.io-client';

import './dashboard.css'

export default function Dashboard({ history }) {
    const [events, setEvents] = useState([]);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');

    // const [rSelected, setRSelected] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('');
    const [eventsRequest, setEventsRequest] = useState([])


    useEffect(() => {
        getEvent()
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    useEffect(() => {
        
        socket.on('registration_request', data => setEventsRequest([...eventsRequest, data]));
    }, [eventsRequest, socket])


    const getEvent = async (filter) => {
        try {
            const url = filter ? `/EventDetails/${filter}` : '/EventDetails';
            const response = await api.get(url, { headers: { user } })

            console.log(response.data)

            setEvents(response.data.events)
        } catch (error) {
            history.push('/login');
        }

    };


    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, { headers: { user: user } });
            setSuccess(true)
            setMessageHandler('The event was deleted successfully!')
            setTimeout(() => {
                setSuccess(false)
                setMessageHandler('')
            }, 2500)

        } catch (error) {
            setError(true)
            setMessageHandler('Error when deleting event!')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000)
        }
    }

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } })

            setSuccess(true)
            setMessageHandler(`The request for the event ${event.title} was successfully!`)
            setTimeout(() => {
                setSuccess(false)
                setMessageHandler('')
            }, 2500)

        } catch (error) {
            setError(true)
            setMessageHandler(`The request for the event ${event.title} wasn't successfully!`)
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000)
        }
    }

      return (
        <>
            <h1 color="danger">EVENT Detail</h1>
            
            <div xs="8">
                <ul className="events-list">
                    {events.map(event => (
                        <li key={event._id}>
                            <header style={{ backgroundImage: `url(${event.thumbnail_url})` }}>
                                {event.user === user_id ? <div><Button color="danger" size="sm" onClick={() => deleteEventHandler(event._id)}>Delete</Button></div> : ""}

                            </header>
                           <strong><span href="/">{event.title}</span></strong>
                            <span>{event.description}</span>
                            <span>Location: {event.location}</span>
                            <span>Event Date: {moment(event.date).format('l')}</span>
                            <span>Seats: {parseInt(event.seats)}</span>
                            <span>Event Price: {parseFloat(event.price).toFixed(2)}</span>
                            <Button color="primary" onClick={() => registrationRequestHandler(event)}>Registration Request</Button>
                        </li>
                    ))}
                </ul>
            </div>

            {
                error ? (
                    <Alert className="event-validation" color="danger"> {messageHandler} </Alert>
                ) : ""
            }
            {
                success ? (
                    <Alert className="event-validation" color="success"> {messageHandler}</Alert>
                ) : ""
            }
        </>
    )
}
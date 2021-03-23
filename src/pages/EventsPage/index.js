// eslint-disable-next-line
import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Label, Alert, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import "./events.css";

export default function EventsPage({ history }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [seats, setSeats] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [category, setCategory] = useState('Event Name')
    const [date, setDate] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) history.push('/login');
    }, [])

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const submitHandler = async (evt) => {
        evt.preventDefault()

        const eventData = new FormData();

        eventData.append("thumbnail", thumbnail)
        eventData.append("category", category)
        eventData.append("title", title)
        eventData.append("price", price)
        eventData.append("description", description)
        eventData.append("address", address)
        eventData.append("seats", seats)
        eventData.append("date", date)


        try {
            if (title !== "" &&
                description !== "" &&
                address !== "" &&
                seats !== "" &&
                price !== "" &&
                category !== "category" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post("/event", eventData, { headers: { user } })
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)       
                    history.push("/")  //./
                }, 2000)
            } else {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 2000)
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    const   categoryHandler = (category) => setCategory(category);

    console.log(category)
    return (
        <Container>
            <h2>Create your Event</h2>
            <Form onSubmit={submitHandler}>
            <div className="input-group">
                <FormGroup>
                <Label>Upload Image: </Label>
                        <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                            <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                            <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon image" />
                        </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input id="title" type="text" value={title} placeholder={'Event Title'} onChange={(evt) => setTitle(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>About: </Label>
                    <Input id="description" type="text" value={description} placeholder={'About Event'} onChange={(evt) => setDescription(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Location: </Label>
                    <Input id="address" type="text" value={address} placeholder={'Address'} onChange={(evt) => setAddress(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Seats: </Label>
                    <Input id="seats" type="text" value={seats} placeholder={'Seats'} onChange={(evt) => setSeats(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event price: </Label>
                    <Input id="price" type="text" value={price} placeholder={'Event Price ₹ 0.00'} onChange={(evt) => setPrice(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event date & Time: </Label>
                    <Input id="date" type="date" value={date} onChange={(evt) => setDate(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Category: </Label>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <Button id="caret" value={category} disabled>{category}</Button>
                        <DropdownToggle caret>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() =>categoryHandler('social')}>Social</DropdownItem>
                            <DropdownItem onClick={() =>categoryHandler('cultural')}>Cultural</DropdownItem>
                            <DropdownItem onClick={() =>categoryHandler('sports')}>Sports</DropdownItem>
                            <DropdownItem onClick={() =>categoryHandler('parties')}>Parties</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </FormGroup>
            </div>
                <FormGroup>
                    <Button className="submit-btn" type="submit">Create Event</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("./")} >
                        Cancel
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger"> Missing required information</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="succces">The event was created successfully!</Alert>
            ) : ""}
        </Container>
    )
}
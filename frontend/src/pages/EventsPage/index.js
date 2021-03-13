//Events Page will show all the events
import React, { useEffect,useState, useMemo } from "react";
import api from "../../services/api";
import { Alert, Label, Button, Form, FormGroup, Container, Input, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import CameraIcon from "../../assets/camera.png";
import "./event.css"
/* 
title: String,
description: String,
price: Number,
thumbnail: String,
sport: String,
date: Date, */

export default function EventsPage({ history }) {

    //Kiszedjük a böngésző memóriából (loc. store. a felhasználó id-t)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState("");
    const [sport, setSport] = useState("Sport");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem("user");


    useEffect(()=>{
        if(!user) history.push("/login");
    },[]);

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const submitHandler = async (evt) => {
        evt.preventDefault();
        const eventData = new FormData();
        eventData.append("thumbnail", thumbnail);
        eventData.append("sport", sport);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);
        eventData.append("date", date);

        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "Sport" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post("/event", eventData, { headers: { user } }) //!!headersbe küldjük az id-t
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false)
                    history.push("/");
                }, 2000)
            } else {
                setError(true);
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)


            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }
    const sportEventHandler = (sport) => setSport(sport);
    //JSX
    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
                <div className="input-group">
                    <FormGroup>
                        <Label>Upload Image:</Label>
                        <Label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? "has-thumbnail" : ""}>
                            <Input type="file" onChange={(evt) => setThumbnail(evt.target.files[0])} />
                            <img src={CameraIcon} style={{ maxWidth: "50px" }} alt="upload icon image" />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Title: </Label>
                        <Input id="title" type="text" value={title} placeholder={"Event title"} onChange={(evt) => setTitle(evt.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Event description: </Label>
                        <Input id="description" type="text" value={description} placeholder={"Event description"} onChange={(evt) => setDescription(evt.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Event price:</Label>
                        <Input id="price" type="text" value={price} placeholder={"Event price (pound)"} onChange={(evt) => setPrice(evt.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Events date:</Label>
                        <Input id="date" type="date" value={date} placeholder={"Events date"} onChange={(evt) => setDate(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                            <Button id="caret" value={sport} disabled on>{sport}</Button>
                            <DropdownToggle caret />
                            <DropdownMenu>
                                <DropdownItem onClick={() => sportEventHandler("running")}>running</DropdownItem>
                                <DropdownItem onClick={() => sportEventHandler("cycling")}>cycling</DropdownItem>
                                <DropdownItem onClick={() => sportEventHandler("swimming")}>swimming</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn">
                        Create event
                    </Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("/")} >
                        Cancel
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">Missing required information!</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success">The event was created successfully! </Alert>
            ) : ""}
        </Container>
    )
}

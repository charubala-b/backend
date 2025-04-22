const mongoose = require('mongoose');
const express = require('express');
const { User, Department, Event, Register } = require('./model.js');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());

// Database connection
async function connectTodb() {
    try {
        await mongoose.connect('mongodb+srv://charubala2909:charu2004@cluster0.672igpn.mongodb.net/college?retryWrites=true&w=majority&appName=Cluster0');
        console.log("db connection established");
        const port = process.env.PORT || 8000;
        app.listen(port, function () {
            console.log(`listening on ${port}....`);
        });
    }
    catch (error) {
        console.log(error);
        console.log("couldn't connect to db connection");
    }
}
connectTodb();

// User - Add new user
app.post('/add-userdetails', async function (request, response) {
    try {
        await User.create({
            "user_id": request.body.user_id,
            "username": request.body.username,
            "email": request.body.email,
            "password": request.body.password,
            "role": request.body.role,
            "create_time": request.body.create_time
        });
        response.status(200).json({
            "status": "inserted successfully"
        });
    }
    catch (error) {
        response.status(401).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});

// Department - Add department details
app.post('/add-departmentdetails', async function (request, response) {
    try {
        await Department.create({
            "dep_id": request.body.dep_id,
            "name": request.body.name,
            "number_of_students": request.body.number_of_students,
            "highest_package": request.body.highest_package,
            "description": request.body.description
        });
        response.status(200).json({
            "status": "inserted successfully"
        });
    }
    catch (error) {
        response.status(401).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});

// Get department details
app.get('/get-departmentdetails', async function (request, response) {
    try {
        const departmentdetails = await Department.find();
        response.status(200).json({
            "total": departmentdetails
        });
    }
    catch (error) {
        response.status(500).json({
            "status": "not successfully received",
            "error": error
        });
    }
});

// Event - Add new event
app.post('/add-event', async function (request, response) {
    try {
        await Event.create({
            "event_id": request.body.event_id,
            "title": request.body.title,
            "description": request.body.description,
            "date_time": request.body.date_time,
            "location": request.body.location,
            "dep_id": request.body.dep_id,
            "created_admin_id": request.body.created_admin_id
        });
        response.status(200).json({
            "status": "inserted successfully"
        });
    }
    catch (error) {
        response.status(401).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});

// Event - Get all events
app.get('/get-event', async function (request, response) {
    try {
        const eventdetails = await Event.find();
        response.status(200).json({
            "total": eventdetails
        });
    }
    catch (error) {
        response.status(500).json({
            "status": "not successfully received",
            "error": error
        });
    }
});

// Event - Update an event
app.put('/update-event/:id', async function (request, response) {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            request.params.id,
            {
                title: request.body.title,
                description: request.body.description,
                date_time: request.body.date_time,
                location: request.body.location,
                dep_id: request.body.dep_id,
                created_admin_id: request.body.created_admin_id
            },
            { new: true }
        );
        response.status(200).json({
            "status": "event updated successfully",
            "updatedEvent": updatedEvent
        });
    }
    catch (error) {
        response.status(400).json({
            "error-occurrence": error,
            "status": "couldn't update the event"
        });
    }
});

// Event - Delete an event
app.delete('/delete-event/:id', async function (request, response) {
    try {
        await Event.findByIdAndDelete(request.params.id);
        response.status(200).json({
            "status": "event deleted successfully"
        });
    }
    catch (error) {
        response.status(400).json({
            "error-occurrence": error,
            "status": "couldn't delete the event"
        });
    }
});

// Register - Add registration (User)
app.post('/add-register', async function (request, response) {
    try {
        await Register.create({
            "register_id": request.body.register_id,
            "user_id": request.body.user_id,
            "event_id": request.body.event_id,
            "register_time": request.body.register_time,
            "status": request.body.status
        });
        response.status(200).json({
            "status": "inserted successfully"
        });
    }
    catch (error) {
        response.status(401).json({
            "error-occurrence": error,
            "status": "not inserted successfully"
        });
    }
});

// Cancel registration - Update status (User)
app.post('/cancel-registration', async function (request, response) {
    try {
        const registration = await Register.findOne({ "user_id": request.body.user_id, "event_id": request.body.event_id });
        if (registration) {
            registration.status = "Cancelled"; // Or you can delete the record if required
            await registration.save();
            response.status(200).json({
                "status": "registration cancelled successfully"
            });
        } else {
            response.status(404).json({
                "status": "registration not found"
            });
        }
    }
    catch (error) {
        response.status(400).json({
            "error-occurrence": error,
            "status": "couldn't cancel registration"
        });
    }
});

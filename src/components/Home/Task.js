import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import { generateID } from '../Utils/generateID';

function Task({open, handleClose, getTask}) {
    const { user } = useContext(AuthContext);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    const tasks = db.tasks || [];

    const [task, setTask] = useState({
        id: generateID(),
        title: "",
        desc: "",
        due_date: "",
        priority: "",
        createdBy: "",
        assigned: [],
        status: "Processing",
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleTask = (e) => {
        setTask((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleTaskSubmit = (e)=>{
        e.preventDefault();
        const updatedTasks = [...tasks, { ...task, id: generateID() }];
        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
        window.dispatchEvent(new Event('storage'));
        handleClose();
    }

    useEffect(() => {
        setTask((prevTask) => {
            return { ...prevTask, createdBy: user && user.username }
        })
    }, [user])


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 700 }}>
                    Task
                </Typography>
                <Typography id="modal-modal-description" component={"form"} sx={{ mt: 2 }} onSubmit={handleTaskSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder='Title' onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" name="desc" placeholder='Description' onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date">Due Date</label>
                        <input type="date" name="due_date" onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select name="priority" id="" onChange={handleTask} required>
                            <option value="" disabled>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-submit">
                        <input type="submit" value="Create" />
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
}

export default Task
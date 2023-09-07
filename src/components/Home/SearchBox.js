import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import { generateID } from '../Utils/generateID';

function SearchBox() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = useContext(AuthContext);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    const [task, setTask] = useState({
        id: generateID(),
        title: "",
        desc: "",
        due_date: "",
        priority: "",
        createdBy: "",
    })
    const [tasks, setTasks] = useState(db.tasks || []);

    // Add username to task
    useEffect(()=>{
        setTask((prevTask)=>{
            return {...prevTask, createdBy: user && user.username}
        })
    }, [user])

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

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, {...task, id: generateID()}]);
        handleClose();
    }

    useEffect(()=>{
        localStorage.setItem("collaborative-management-app", JSON.stringify({...db, tasks}));
    }, [tasks])

    return (
        <div className='searchBox'>
            <div className='search-field'>
                <TextField variant='outlined' fullWidth size='small' label="Search..." InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment>, }} />
            </div>
            <div className="create-task">
                <Button variant='outlined' endIcon={<Add />} sx={{ textTransform: "capitalize" }} fullWidth onClick={handleOpen}>Create Task</Button>
            </div>
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
                                <option value="">Select Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="High">Low</option>
                            </select>
                        </div>
                        <div className="form-submit">
                            <input type="submit" value="Create" />
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default SearchBox
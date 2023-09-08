import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import { generateID } from '../Utils/generateID';
import { toast } from 'react-toastify';

function Task({open, handleClose, updateTaskID=""}) {
    const { user } = useContext(AuthContext);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    const tasks = db.tasks || [];

    const [task, setTask] = useState({
        id: "",
        title: "",
        desc: "",
        due_date: "",
        priority: "",
        createdBy: "",
        assigned: {
            teamID: "",
            members: [],
        },
        status: "Pending",
    })

    useEffect(()=>{
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            if(updateTaskID){
                setTask(db.tasks.find((task)=>task.id === updateTaskID));
            }
        }
        window.addEventListener('storage', handleStorage)

        handleStorage();

        return () => window.removeEventListener('storage', handleStorage())
    }, [updateTaskID])

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
        let updatedTasks;
        if(updateTaskID){
            updatedTasks = tasks.map((prevTask)=>{
                if(prevTask.id === updateTaskID){
                    return task;
                }
                return prevTask;
            })
        }else{
            updatedTasks = [...tasks, { ...task, id: generateID(), createdBy: user.username }];
        }
        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
        window.dispatchEvent(new Event('storage'));
        handleClose();
        toast.success(updateTaskID ? "Task updated successfully!" : "Task added successfully!");
    }

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
                        <input type="text" name="title" value={task.title} placeholder='Title' onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" name="desc" placeholder='Description' value={task.desc} onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date">Due Date</label>
                        <input type="date" name="due_date" value={task.due_date} onChange={handleTask} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select name="priority" id="" onChange={handleTask} required value={task.priority}>
                            <option value="" disabled>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-submit">
                        <input type="submit" value={updateTaskID ? "Update" : "Create"} />
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
}

export default Task
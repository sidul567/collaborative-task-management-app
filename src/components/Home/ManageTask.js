import React, { useContext, useEffect, useState } from 'react'
import Header from '../Layout/Header/Header'
import './ManageTask.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Task from './Task';
import AssignMember from './AssignMember';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function ManageTask() {
    const {id} = useParams();
    const [openTask, setOpenTask] = useState(false);
    const {user} = useContext(AuthContext);
    const handleOpenTask = () => setOpenTask(true);
    const handleCloseTask = () => setOpenTask(false);
    const [openAssignMember, setOpenAssignMember] = useState(false);
    const handleOpenAssignMember = () =>  setOpenAssignMember(true);
    const handleCloseAssignMember = () => setOpenAssignMember(false);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    const navigate = useNavigate();
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
        status: "",
    })

    const handleDeleteTask = ()=>{
        const updatedTasks = db.tasks.filter((prevTask)=>prevTask.id !== id);
        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
        window.dispatchEvent(new Event('storage'));
        handleCloseTask();
        toast.success("Task deleted successfully!");
        navigate("/home");   
    }

    useEffect(()=>{
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            setTask(db.tasks.find((task)=>task.id === id));
        }
        window.addEventListener('storage', handleStorage)

        handleStorage();

        return () => window.removeEventListener('storage', handleStorage())
    }, [id])

  return (
    <>
        <Header />
        <h3 className="title">Task</h3>
        <div className="task">
            <h2 className="taskID">#{task.id}</h2>
            <h3 className="taskTitle"><strong>Title:</strong> {task.title}</h3>
            <p className="desc"><strong>Description:</strong> {task.desc}</p>
            <p className="priority"><strong>Priority:</strong> {task.priority}</p>
            <p className="dueDate"><strong>Due Date:</strong> {task.due_date}</p>
            <p className="createdBy"><strong>Task By:</strong> {task.createdBy}</p>
            <p className="assigned"><strong>Assigned Members:</strong> {task.assigned.members.join(", ")}</p>
            <p className="status"><strong>Status:</strong> {task.status}</p>
            {
                task.createdBy === user.username && (
                <div className="button">
                    <Button variant='contained' color='info' sx={{mr: 2}} onClick={handleOpenTask}>Edit Task</Button>
                    <Button variant='contained' color='error' sx={{mr: 2}} onClick={handleDeleteTask}>Delete Task</Button>
                    <Button variant='contained' color='secondary' onClick={handleOpenAssignMember}>Assign Member</Button>
                </div>
            )
            }
        </div>
        <Task open={openTask} handleClose={handleCloseTask} updateTaskID={id} />
        <AssignMember open={openAssignMember} handleClose={handleCloseAssignMember} taskID={id} />
    </>
  )
}

export default ManageTask
import React, { useContext, useEffect, useState } from 'react'
import './AllTasks.css';
import { Delete, Edit, GroupAdd } from '@mui/icons-material';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import AssignMember from './AssignMember';

function AllTasks() {

    const { user } = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState([]);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    const [taskID, setTaskID] = useState("");
    const [openAssignMember, setOpenAssignMember] = useState(false);
    const handleOpenAssignMember = (id) => {
        setOpenAssignMember(true)
        setTaskID(id);
    };
    const handleCloseAssignMember = () => {
        setOpenAssignMember(false);
        setTaskID("");
    }


    useEffect(() => {
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            setAllTasks(db?.tasks?.filter((task) => task.createdBy === user.username || task.assigned.members.includes(user.username)) || []);
        }
        window.addEventListener('storage', handleStorage)

        handleStorage();

        return () => window.removeEventListener('storage', handleStorage())
    }, [user.username])

    const updateStatus = (taskId, taskStatus) => {
        const updateTaskStatus = taskStatus === "Processing" ? "Completed" : "Processing";

        const updatedTasks = allTasks.map((task) =>
            task.id === taskId ? { ...task, status: updateTaskStatus } : task
        );
        setAllTasks(updatedTasks);

        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
    }
    return (
        <>
            <div className='tasks'>
                <h3>All Tasks</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Assigned</th>
                            <th>Assign</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{task.desc}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.priority}</td>
                                    <td><Button color={task.status === "Processing" ? 'warning' : 'success'} sx={{ textTransform: "capitalize" }} variant='outlined' onClick={() => updateStatus(`${task.id}`, `${task.status}`)} >{task.status}</Button></td>
                                    <td>{task.assigned.members.join(", ")}</td>
                                    <td onClick={()=>handleOpenAssignMember(task.id)}><center><GroupAdd color='primary' /></center></td>
                                    <td>
                                        <Edit fontSize='small' />
                                        <Delete fontSize='small' color='error' />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <AssignMember open={openAssignMember} handleClose={handleCloseAssignMember} taskID={taskID} />
        </>
    )
}

export default AllTasks
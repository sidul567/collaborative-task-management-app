import React, { useEffect, useState } from 'react'
import './AllTasks.css';
import { Delete, Edit, GroupAdd } from '@mui/icons-material';
import { Button } from '@mui/material';

function AllTasks({tasks}) {

  const [allTasks, setAllTasks] = useState(tasks);
  const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
  
  const updateStatus = (taskId, taskStatus)=>{
    const updateTaskStatus = taskStatus === "Processing" ? "Completed" : "Processing";

    const updatedTasks = allTasks.map((task) =>
        task.id === taskId ? { ...task, status: updateTaskStatus } : task
    );
    setAllTasks(updatedTasks);

    localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
  }
  return (
    <div className='tasks'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Member</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allTasks.map((task)=>(
                        <tr>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.desc}</td>
                            <td>{task.due_date}</td>
                            <td>{task.priority}</td>
                            <td><Button color={task.status === "Processing" ? 'warning' : 'success'} sx={{textTransform: "capitalize"}} variant='outlined' onClick={()=>updateStatus(`${task.id}`, `${task.status}`)} >{task.status}</Button></td>
                            <td><center><GroupAdd color='primary' /></center></td>
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
  )
}

export default AllTasks
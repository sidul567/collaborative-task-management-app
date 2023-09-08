import React, { useContext, useEffect, useState } from 'react'
import './AllTasks.css';
import { Delete, Edit, GroupAdd } from '@mui/icons-material';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import AssignMember from './AssignMember';

function AllTasks({status, sortBy, orderBy}) {

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

            const filteredTask = db?.tasks?.filter((task) =>{
                const match = task.createdBy === user.username || task.assigned.members.includes(user.username);

                return (match && status === "All") || (match && task.status === status);
            }) || [];

            filteredTask.sort((task1, task2)=>{
                const priority = {
                    "Low": 0,
                    "Medium": 1,
                    "High": 2,
                }

                const priority1 = priority[task1.priority];
                const priority2 = priority[task2.priority];

                const diffPriority = priority1 - priority2;
                const diffDueDate = new Date(task1.due_date) -  new Date(task2.due_date);

                if(sortBy === "priority"){
                    return orderBy === "asc" ? diffPriority : -diffPriority;
                }else if(sortBy === "dueDate"){
                    return orderBy === "asc" ? diffDueDate : -diffDueDate;
                }

                return 0;
            })

            setAllTasks(filteredTask);
            
        }
        window.addEventListener('storage', handleStorage)

        handleStorage();

        return () => window.removeEventListener('storage', handleStorage())
    }, [user.username, status, sortBy, orderBy]) 

    const updateStatus = (taskId, taskStatus) => {
        let updateTaskStatus = taskStatus;
        if(updateTaskStatus === "Pending"){
            updateTaskStatus = "Processing";
        }else if(updateTaskStatus === "Processing"){
            updateTaskStatus = "Completed";
        }else{
            updateTaskStatus = "Pending"
        }

        const updatedTasks = allTasks.map((task) =>
            task.id === taskId ? { ...task, status: updateTaskStatus } : task
        );
        setAllTasks(updatedTasks);

        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
    }

    const getTeamName = (teamID)=>{
        if(teamID){
            const team = db.teams.find((team)=>team.teamID === teamID);
            return team.teamName;
        }
        return "";
    }

    const getTaskColor = (status)=>{
        if(status === "Pending"){
            return "error";
        }else if(status === "Processing"){
            return "warning";
        }else{
            return "success";
        }
    }

    return (
        <>
            <div className='tasks'>
                <h3>All Tasks</h3>
                <table>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Leader</th>
                            <th>Team Name</th>
                            <th>Assigned</th>
                            <th>Assign</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.priority}</td>
                                    <td style={{width: "120px"}}>
                                        <Button 
                                            color={getTaskColor(task.status)} 
                                            sx={{ textTransform: "capitalize", maxWidth: "100%", minWidth: "100%" }} 
                                            variant='contained' 
                                            onClick={() => updateStatus(`${task.id}`, `${task.status}`)} 
                                            disableElevation
                                        >
                                            {task.status}
                                        </Button>
                                    </td>
                                    <td>{task.createdBy}</td>
                                    <td>{getTeamName(task.assigned.teamID)}</td>
                                    <td>{task.assigned.members.join(", ")}</td>
                                    {
                                        task.createdBy === user.username ? <td onClick={()=>handleOpenAssignMember(task.id)}><center><GroupAdd color='primary' /></center></td> : <td><center><GroupAdd color='disabled' /></center></td>
                                    }
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
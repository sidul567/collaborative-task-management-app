import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, MenuItem, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import Task from './Task';
import Team from './Team';
import AllTasks from './AllTasks';

function SearchBox() {
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState("asc");
    const [openTask, setOpenTask] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const handleOpenTeam = () => setOpenTeam(true);
    const handleOpenTask = () => setOpenTask(true);
    const handleCloseTeam = () => setOpenTeam(false);
    const handleCloseTask = () => setOpenTask(false);

    return (
        <>
            <div className='searchBox'>
                <div className='search-field'>
                    <TextField 
                        variant='outlined' 
                        size='small' 
                        label="Filter By Status"
                        select
                        sx={{width: "35%"}}
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Processing"}>Processing</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                    </TextField>

                    <TextField 
                        variant='outlined' 
                        size='small' 
                        label="Sort By"
                        select
                        sx={{width: "30%"}}
                        value={sortBy}
                        onChange={(e)=>setSortBy(e.target.value)}
                    >
                        <MenuItem value={"priority"}>Priority</MenuItem>
                        <MenuItem value={"dueDate"}>Due Date</MenuItem>
                    </TextField>

                    <TextField 
                        variant='outlined' 
                        size='small' 
                        label="Order By"
                        select
                        sx={{width: "20%"}}
                        value={orderBy}
                        onChange={(e)=>setOrderBy(e.target.value)}
                    >
                        <MenuItem value={"asc"}>Ascending</MenuItem>
                        <MenuItem value={"des"}>Descending</MenuItem>
                    </TextField>
                </div>
                <div className="create-task">
                    <Button variant='outlined' endIcon={<Add />} sx={{ textTransform: "capitalize" }} fullWidth onClick={handleOpenTask}>Create Task</Button>
                </div>
                <div className="create-team">
                    <Button variant='outlined' endIcon={<Add />} sx={{ textTransform: "capitalize" }} color='secondary' fullWidth onClick={handleOpenTeam}>Create Team</Button>
                </div>
                <Task open={openTask} handleClose={handleCloseTask}/>
                <Team open={openTeam} handleClose={handleCloseTeam} />
            </div>
            <AllTasks status={status} sortBy={sortBy} orderBy={orderBy} />
        </>

    )
}

export default SearchBox
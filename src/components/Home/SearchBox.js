import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import { generateID } from '../Utils/generateID';
import AllTasks from './AllTasks';
import Task from './Task';
import Team from './Team';

function SearchBox() {
    const [search, setSearch] = useState("");
    const [openTask, setOpenTask] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const handleOpenTeam = () => setOpenTeam(true);
    const handleOpenTask = () => setOpenTask(true);
    const handleCloseTeam = () => setOpenTeam(false);
    const handleCloseTask = () => setOpenTask(false);

    const getTask = () => {
        handleCloseTask();
    }

    const handleTeam = () => {
        handleCloseTeam();
    }

    return (
        <>
            <div className='searchBox'>
                <div className='search-field'>
                    <TextField variant='outlined' fullWidth size='small' label="Search..." InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment>, }} />
                </div>
                <div className="create-task">
                    <Button variant='outlined' endIcon={<Add />} sx={{ textTransform: "capitalize" }} fullWidth onClick={handleOpenTask}>Create Task</Button>
                </div>
                <div className="create-team">
                    <Button variant='outlined' endIcon={<Add />} sx={{ textTransform: "capitalize" }} color='secondary' fullWidth onClick={handleOpenTeam}>Create Team</Button>
                </div>
                <Task open={openTask} handleClose={handleCloseTask} getTask={getTask} />
                <Team open={openTeam} handleClose={handleCloseTeam} handleTeam={handleTeam} />
            </div>
        </>

    )
}

export default SearchBox
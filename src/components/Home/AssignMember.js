import { Box, Chip, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import './Team.css';

function AssignMember({ open, handleClose, taskID }) {
    const { user } = useContext(AuthContext);

    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));

    const [teamInfo, setTeamInfo] = useState({
        teamID: "",
        members: [],
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
        outline: "none",
        p: 4,
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            const task = db?.tasks?.find((task)=>task.id === taskID) || [];
            setTeamInfo({
                teamID: task?.assigned?.teamID || "",
                members: task?.assigned?.members || [],
            });
        }
        window.addEventListener('storage', handleStorage)

        handleStorage();

        return () => window.removeEventListener('storage', handleStorage())
    }, [taskID])

    const handleTeamInput = (e) => {
        if (e.target.name === "members") {
            const {
                target: { value },
            } = e;
            setTeamInfo((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: typeof value === 'string' ? value.split(',') : value,
                }
            })
        } else {
            setTeamInfo((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                    members: [],
                }
            })
        }

    }
    const handleAssignMember = (e) => {
        e.preventDefault();

        const updatedTasks = db.tasks.map((task)=>{
            if(task.id === taskID){
                return {...task, assigned: {teamID: teamInfo.teamID, members: teamInfo.members}}
            }
            return task;
        })

        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, tasks: updatedTasks }));
        window.dispatchEvent(new Event('storage'));
        handleClose();
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
                    Team Information
                </Typography>
                <Typography id="modal-modal-description" component={"form"} sx={{ mt: 2 }} onSubmit={handleAssignMember}>
                    <TextField
                        select
                        label="Team Name"
                        value={teamInfo.teamID}
                        onChange={handleTeamInput}
                        name="teamID"
                        size='small'
                        required
                    >
                        {
                            db?.teams?.map((team) => (team.leader === user.username ) && (
                                <MenuItem value={team.teamID} key={team.teamID}>{team.teamName}</MenuItem>
                            ))
                        }
                    </TextField>
                    {
                        teamInfo.teamID && <FormControl fullWidth size='small' required>
                            <InputLabel id="demo-multiple-chip-label">Memebers</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={teamInfo.members}
                                onChange={handleTeamInput}
                                name="members"
                                input={<OutlinedInput id="select-multiple-chip" label="Members" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} color='info' />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                required
                            >
                                {db?.teams?.map((team) => {
                                    return team.teamID === teamInfo.teamID && team.members.map((member) => member.status !== "pending" && (
                                        <MenuItem
                                            key={member.username}
                                            value={member.username}
                                        >
                                            {member.username}
                                        </MenuItem>
                                    ))
                                })}
                            </Select>
                        </FormControl>
                    }

                    {
                        teamInfo.members.length > 0 && (
                            <div className="form-submit">
                                <input type="submit" value="Assign" />
                            </div>
                        )
                    }
                </Typography>
            </Box>
        </Modal>
    )
}

export default AssignMember
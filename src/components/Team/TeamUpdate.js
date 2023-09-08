import { Box, Modal, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { generateID } from '../Utils/generateID';

function TeamUpdate({open, handleClose, teamID}) {
    const { user: currentUser } = useContext(AuthContext);

    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));

    const [teamName, setTeamName] = useState("");
    const [checkedUserName, setCheckedUserName] = useState([]);
    const teams = db.teams || [];
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            const team = db?.teams?.find((team)=>team?.teamID === teamID) || {};
            if(teamID){
                setTeamName(team.teamName);
                setUsers(db?.users?.filter((user)=>
                (team?.leader !== user.username && !team?.members?.some((member)=>member.username===user.username))
                ))
            }
        }
        window.addEventListener('storage', handleStorage)
    
        handleStorage();
    
        return () => window.removeEventListener('storage', handleStorage())
    },[teamID])

    const handleChecked = (e)=>{
        if(e.target.checked){
            if(!checkedUserName.includes(e.target.value)){
                setCheckedUserName([...checkedUserName, {username: e.target.value, status: "pending"}]);
            }
        }else{
            setCheckedUserName(checkedUserName.filter((user)=>user.username !== e.target.value));
        }
    }

    const handleTeamSubmit = (e)=>{
        e.preventDefault();

        const updateTeams = teams?.map((team)=>{
            if(team.teamID === teamID){
                team.members = [...team.members, ...checkedUserName];
            }
            return team;
        });

        localStorage.setItem("collaborative-management-app", JSON.stringify({...db, teams: updateTeams}));

        window.dispatchEvent(new Event('storage'));

        setCheckedUserName([]);
        handleClose();
    }

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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 700 }}>
                    Members
                </Typography>
                <Typography id="modal-modal-description" component={"form"} sx={{ mt: 2 }} onSubmit={handleTeamSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Team Name</label>
                        <input type="text" name="team" placeholder='Enter Team Name' value={teamName} required readOnly />
                    </div>
                    {
                        users.map((user)=> (
                                <div className="user" key={user.username}>
                                    <div className="avatar"><img src={user.avatar} alt="" /></div>
                                    <div className="username">{user.username}</div>
                                    <div className="checkbox" value={user.username}><input type="checkbox" value={user.username} onChange={handleChecked} /></div>
                                </div>
                            )
                        )
                    }
                    {
                        users.length > 0 ? <div className="form-submit">
                        <input type="submit" value="Invite" />
                        </div> : <p>Not found members!</p>
                    }
                </Typography>
            </Box>
        </Modal>
    )
}

export default TeamUpdate
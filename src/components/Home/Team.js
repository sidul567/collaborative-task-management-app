import { Box, Modal, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './SearchBox.css';
import { AuthContext } from '../../context/AuthContext';
import './Team.css';
import { generateID } from '../Utils/generateID';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Team({open, handleClose}) {
    const { user: currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));

    const [teamName, setTeamName] = useState("");
    const [checkedUserName, setCheckedUserName] = useState([]);
    const teams = db.teams || [];

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

        const updateTeams = [...teams, {teamID: generateID(), teamName, members: checkedUserName, leader: currentUser.username}];

        localStorage.setItem("collaborative-management-app", JSON.stringify({...db, teams: updateTeams}));

        window.dispatchEvent(new Event('storage'));

        setCheckedUserName([]);
        handleClose();
        toast.success("Team created successfully!");
        navigate("/team");
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
                {
                    db.users.length > 1 ? (
                        <Typography id="modal-modal-description" component={"form"} sx={{ mt: 2 }} onSubmit={handleTeamSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Team Name</label>
                        <input type="text" name="team" placeholder='Enter Team Name' onChange={(e)=>setTeamName(e.target.value)} required />
                    </div>
                    {
                        db.users.map((user)=>{
                            return user.username !== currentUser.username && (
                                <div className="user" key={user.username}>
                                    <div className="avatar"><img src={user.avatar} alt="" /></div>
                                    <div className="username">{user.username}</div>
                                    <div className="checkbox" value={user.username}><input type="checkbox" value={user.username} onChange={handleChecked} /></div>
                                </div>
                            )
                        })
                    }
                    <div className="form-submit">
                        <input type="submit" value="Create" />
                    </div>
                </Typography>
                    ) : <h4>Not found any members for create team!</h4>
                }
            </Box>
        </Modal>
    )
}

export default Team
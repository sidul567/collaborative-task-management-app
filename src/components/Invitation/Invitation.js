import React, { useContext, useEffect, useState } from 'react'
import Header from '../Layout/Header/Header'
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
import { Add, AddCircle, AddRounded, Cancel } from '@mui/icons-material';

function Invitation() {
    const { user, logout } = useContext(AuthContext);
    const [invitations, setInvitations] = useState([]);
    const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
    useEffect(() => {
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            if (db.teams) {
                setInvitations(db.teams.filter((team) =>
                    team.members.some((member) => member.username === user.username && member.status === "pending")
                ));
            }
        }
        const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
        if (db.teams) {
            setInvitations(db.teams.filter((team) =>
                team.members.some((member) => member.username === user.username && member.status === "pending")
            ));
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage())
    }, [user.username])

    const handleJoin = (teamID) => {
        const updatedTeams = db.teams.map((team) => {
            if (team.teamID === teamID) {
                const updatedMembers = team.members.map((member) => {
                    if (member.username === user.username) {
                        return { ...member, status: "joined" };
                    }
                    return member;
                });

                return { ...team, members: updatedMembers };
            }
            return team;
        })
        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, teams: updatedTeams }));

        window.dispatchEvent(new Event('storage'));
    }
    const handleDiscard = (teamID) => { 
        const updatedTeams = db.teams.map((team) => {
            if (team.teamID === teamID) {
                const updatedMembers = team.members.filter((member) => member.username !== user.username);

                return { ...team, members: updatedMembers };
            }
            return team;
        })
        localStorage.setItem("collaborative-management-app", JSON.stringify({ ...db, teams: updatedTeams }));

        window.dispatchEvent(new Event('storage'));
    }

    return (
        <>
            <Header />
            <>
                {
                    invitations.length > 0 ? (
                        <div className='container'>
                            <h3 className='title'>Invitation</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Team Name</th>
                                        <th>Team Leader</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invitations.map((invitation) => (
                                            <tr>
                                                <td>{invitation.teamID}</td>
                                                <td>{invitation.teamName}</td>
                                                <td>{invitation.leader}</td>
                                                <td>
                                                    <Button variant='outlined' color='success' endIcon={<AddCircle />} sx={{ mr: 2 }} onClick={() => handleJoin(invitation.teamID)}>Join</Button>
                                                    <Button variant='outlined' color='error' endIcon={<Cancel />} onClick={()=>handleDiscard(invitation.teamID)} >Discard</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <center><h1 style={{ marginTop: "40px" }}>Not found any invitaton!</h1></center>
                    )
                }
            </>
        </>
    )
}

export default Invitation
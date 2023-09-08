import React, { useContext, useEffect, useState } from 'react'
import Header from '../Layout/Header/Header'
import avatar from '../../images/avatar.png';
import './MyTeam.css';
import { Groups3, Share } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import TeamUpdate from './TeamUpdate';
import { IconButton } from '@mui/material';

function MyTeam() {
  const [teams, setTeams] = useState([]);
  const { user } = useContext(AuthContext);
  const [teamID, setTeamID] = useState("");
  const [openTeam, setOpenTeam] = useState(false);
  const handleOpenTeam = (teamID) =>{
     setOpenTeam(true);
     setTeamID(teamID)
  };
  const handleCloseTeam = () => {
    setOpenTeam(false);
    setTeamID("");
  }

  const db = JSON.parse(localStorage.getItem("collaborative-management-app"));

  useEffect(() => {
    const handleStorage = () => {
      const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
      setTeams(db?.teams?.filter((team) => team.leader === user.username || team.members.some((member) => member.username === user.username && member.status === "joined")) || []);
    }
    window.addEventListener('storage', handleStorage)

    handleStorage();

    return () => window.removeEventListener('storage', handleStorage())
  }, [user.username])

  const getAvatar = (username)=>{
    const user = db?.users?.find((user)=>user.username === username);
    return user?.avatar;
  }

  return (
    <>
      <Header />
      <h3 className='title'>My Teams</h3>
      <div className="teams">
        {
          teams && teams.map((team) => (
            <div className="team" key={team.teamID}>
              <div className="team-name">
                <h3>
                  <Groups3 /> 
                  {team.teamName} 
                  <IconButton sx={{ml: "auto" , cursor: "pointer"}} onClick={()=>handleOpenTeam(team.teamID)}>
                    <Share color='success' />
                  </IconButton>
               </h3>
              </div>
              <div className="team-leader">
                <h4>Team Leader</h4>
                <div className="info">
                  <img src={getAvatar(team.leader)} alt="" />
                  <h6 className="name">{team.leader}</h6>
                </div>
              </div>
              <div className="team-members">
                <h4>Team Members</h4>
                <div className="member">
                {
                  team?.members.map((member, index)=>(
                    <div className="info" key={index}>
                    <img src={getAvatar(member.username)} alt="" />
                    <h6 className="name">{member.username}{member.status === "pending" && <span className='red'> (Pending) </span>}</h6>
                  </div>
                  ))
                }
                </div>
              </div>
            </div>
          ))
        }
        <TeamUpdate open={openTeam} handleClose={handleCloseTeam} teamID={teamID} />
      </div>
    </>
  )
}

export default MyTeam
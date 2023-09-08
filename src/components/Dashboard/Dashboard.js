import { Groups3 } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Layout/Header/Header'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AuthContext } from '../../context/AuthContext';

function Dashboard() {
    const [teams, setTeams] = useState([]);
    const {user} = useContext(AuthContext);
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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
      );


      const countStatus = (teamID)=>{
            const completed = db?.tasks?.filter((task)=>task?.assigned?.teamID === teamID && task.status === "Completed").length;
            const pending = db?.tasks?.filter((task)=>task?.assigned?.teamID === teamID && task.status === "Pending").length;
            const processing = db?.tasks?.filter((task)=>task?.assigned?.teamID === teamID && task.status === "Processing").length;

            return {completed, pending, processing};
      }

  return (
    <>
      <Header />
      <h3 className='title'>Dashboard</h3>
      <>
        <div className="teams">
            {
                teams.map((team)=>{
                    const count = countStatus(team.teamID);
                    return <div className="team">
                    <div className="team-name">
                        <h3>
                            <Groups3 /> 
                            {team.teamName}
                        </h3>
                    </div>
                    <div className="doughnut">
                        <Doughnut
                         data={
                            {
                                labels: ["Pending", "Completed", "Processing"],
                                datasets: [{
                                  data: [count.pending, count.completed, count.processing],
                                backgroundColor: [
                                  'rgba(255, 99, 132, 0.2)',
                                  'rgba(75, 192, 192, 0.2)',
                                  'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                  'rgba(255, 99, 132, 1)',
                                  'rgba(75, 192, 192, 1)',
                                  'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                                }]
                              } 
                         } 
                        />
                    </div>
                    </div>
                })
            }
        </div>
      </>
    </>
  )
}

export default Dashboard
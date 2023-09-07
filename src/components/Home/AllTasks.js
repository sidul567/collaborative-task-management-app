import React from 'react'
import './AllTasks.css';

function AllTasks() {
  return (
    <div className='tasks'>
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Add Member</th>
                <th>Action</th>
            </tr>
        </table>
    </div>
  )
}

export default AllTasks
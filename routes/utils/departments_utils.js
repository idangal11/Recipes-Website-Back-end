async function updateStatus(room_id, status_id){
    await DButils.execQuery(
        `UPDATE room SET status_id = ${status_id} WHERE room_id = ${room_id}`
    ); 
}

async function updateNumOfTvs(room_id, num_of_tv){
    await DButils.execQuery(
        `UPDATE room SET num_of_tv = ${num_of_tv} WHERE room_id = ${room_id}`
    ); 
}

async function updateNumOfSubscribers(room_id, num_of_subscribers){
    await DButils.execQuery(
        `UPDATE room SET num_of_subscribers = ${num_of_subscribers} WHERE room_id = ${room_id}`
    ); 
} 

async function getDepartmentWithRooms(departmentId) {
    try {
        // Use SQL JOIN to fetch department and its room.
        const departmentQuery = `
            SELECT department.name as departmentName, room.*
            FROM department 
            LEFT JOIN room ON room.department_id = department.department_id 
            WHERE department.department_id = ${departmentId};
        `;
        
        const departmentData = await DButils.execQuery(departmentQuery);
        
        if (departmentData.length === 0) {
            return null; // or appropriate handling when no department data is found.
        }

        return departmentData;
    } catch (error) {
        throw error; // Ensure that errors are caught in the route handler.
    }
}


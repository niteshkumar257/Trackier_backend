import { client } from "../db/config.js";

export const get_Task_Status_id = async (status_name) => {
    try {
      
        const task_query = `SELECT status_id FROM statuses WHERE status_name = $1`;
        const result = await client.query(task_query, [status_name]);

     
        if (result.rows.length > 0) {
            return result.rows[0].status_id;  
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

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
export const user_exit = async (user_id) => {
  try {
    const query = `select user_id from users where user_id=$1`;
    const id = await client.query(query, [user_id]);
    console.log(id?.rows[0]);
    return id?.rows[0]?.user_id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const project_exit = async (project_id) => {
  try {
    const query = `select project_id from projects where project_id=${project_id}`;

    const id = await client.query(query);

    return id?.rows[0]?.project_id;
  } catch (err) {
    return null;
  }
};

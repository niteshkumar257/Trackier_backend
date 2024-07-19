import { client } from "../db/config.js";
import { get_Task_Status_id } from "../utils/helper_function.js";


export const createTask = async (req, res) => {
  const { project_id } = req.params;
  const { name, description, status_id, tags, due_date, assigned_to } =
    req.body;

  try {
    const result = await client.query(
      `INSERT INTO tasks (project_id, name, description, status_id, tags, due_date, assigned_to)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [project_id, name, description, status_id, tags, due_date, assigned_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasksUnderProject = async (req, res) => {
  const { project_id, user_id } = req.params;
  const { status, Due_Date } = req.query;
  const id = await get_Task_Status_id(status);

  if (!id) {
    return res.status(400).json({ errors: "Not a valid status name" });
  }
  let query = "SELECT * FROM tasks WHERE project_id = $1 AND assigned_to = $2";
  const queryParams = [project_id, user_id];

  if (id) {
    query += ` AND status_id = ${id}`;
  }

  if (Due_Date) {
    query += ` AND due_date = '${Due_Date}'`;
  }

  try {
    const result = await client.query(query, queryParams);
    res.status(200).json({ tasks: result.rows });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};


export const getTaskById = async (req, res) => {
  const { task_id } = req.params;

  try {
    const result = await client.query(
      "SELECT * FROM tasks WHERE task_id = $1",
      [task_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to retrieve task" });
  }
};


export const getAllTasksUnderProject = async (req, res) => {
  const { project_id } = req.params;

  try {
    const result = await client.query(
      "SELECT * FROM tasks WHERE project_id = $1",
      [project_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

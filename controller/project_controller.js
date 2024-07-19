import { client } from "../db/config.js";

// Function to create a new project
const createProject = async (req, res) => {
    const { name, description, created_by } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
            [name, description, created_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Function to get all projects
const getAllProjects = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM projects');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
};

// Function to get a specific project's info
const getProjectById = async (req, res) => {
    const projectId = req.params.project_id;

    try {
        const result = await client.query(
            'SELECT * FROM projects WHERE project_id = $1',
            [projectId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to retrieve project' });
    }
};

export {getAllProjects,createProject,getProjectById}
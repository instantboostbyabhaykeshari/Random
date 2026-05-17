import API from "./axios";

// get all tasks
export const getTasks = async () => {
  const response = await API.get("/tasks");

  return response.data;
};

// create task
export const createTask = async (taskData) => {
  const response = await API.post(
    "/tasks",
    taskData
  );

  return response.data;
};

// delete task
export const deleteTask = async (id) => {
  const response = await API.delete(
    `/tasks/${id}`
  );

  return response.data;
};

// update task
export const updateTask = async (
  id,
  updatedData
) => {
  const response = await API.put(
    `/tasks/${id}`,
    updatedData
  );

  return response.data;
};
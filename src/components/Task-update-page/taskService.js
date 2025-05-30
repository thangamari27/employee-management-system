const API_URL = "http://localhost:5000/tasks"; // Adjust based on your backend

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTask = async (task) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const updateTask = async (id, task) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

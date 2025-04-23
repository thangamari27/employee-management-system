import { db, auth } from './firebase';
import { 
  collection, doc, getDoc, getDocs, 
  addDoc, updateDoc, deleteDoc, setDoc 
} from 'firebase/firestore';

/** 🔹 Generic Firestore Read Operation */
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`🔥 Error fetching document from ${collectionName}:`, error.message);
    return null;
  }
};

/** 🔹 Generic Firestore Fetch All */
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`🔥 Error fetching documents from ${collectionName}:`, error.message);
    return [];
  }
};

/** 🔹 Fetch User Role (Defaults to Employee) */
export const getUserRole = async (userUID) => {
  try {
    const userRef = doc(db, "users", userUID);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().role; // Ensure role is fetched correctly
    } else {
      console.warn("⚠️ User document not found in Firestore.");
      return "employee"; // Default to employee if user not found
    }
  } catch (error) {
    console.error("❌ Error fetching user role:", error);
    return "employee";
  }
};

/** 🔹 Add New Task (Only Admin & Manager) */
export const addTask = async (taskData) => {
  const userUID = auth.currentUser?.uid;
  const userRole = await getUserRole(userUID);

  if (userRole !== "Admin" && userRole !== "Manager") {
    console.error("🔥 Error adding task: ❌ Only Admin or Manager can add tasks.");
    throw new Error("Only Admin or Manager can add tasks.");
  }

  try {
    const taskRef = await addDoc(collection(db, "tasks"), taskData);
    return taskRef.id;
  } catch (error) {
    console.error("❌ Error adding task:", error);
    throw error;
  }
};


/** 🔹 Get All Tasks */
export const getAllTasks = async () => {
  return await getAllDocuments("tasks");
};

/** 🔹 Update Task (Role-Based) */
export const updateTask = async (taskId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("❌ User not authenticated");

    const userRole = await getUserRole(user.uid);

    // Employees can update only status but not verification
    if (updatedData.verified && userRole === "employee") {
      throw new Error("❌ Employees cannot update task verification.");
    }

    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
    console.log("✅ Task updated:", taskId);
    return { id: taskId, ...updatedData };
  } catch (error) {
    console.error("🔥 Error updating task:", error.message);
    return null;
  }
};

/** 🔹 Delete Task (Only Admin & Manager) */
export const deleteTask = async (taskId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("❌ User not authenticated");

    const userRole = await getUserRole(user.uid);
    if (!['admin', 'manager'].includes(userRole)) {
      throw new Error("❌ Only Admin or Manager can delete tasks.");
    }

    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log("✅ Task deleted:", taskId);
    return taskId;
  } catch (error) {
    console.error("🔥 Error deleting task:", error.message);
    return null;
  }
};

/** 🔹 Add Admin or Manager */
export const addAdminOrManager = async (userId, role) => {
  try {
    if (!['admin', 'manager'].includes(role)) {
      throw new Error("❌ Invalid role. Only 'admin' or 'manager' are allowed.");
    }

    const userRef = doc(db, "admin_manager", userId);
    await setDoc(userRef, { role });

    console.log(`✅ User ${userId} added as ${role}`);
    return { id: userId, role };
  } catch (error) {
    console.error("🔥 Error adding admin/manager:", error.message);
    return null;
  }
};

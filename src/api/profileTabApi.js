import { db, auth } from "../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Fetch user profile data from Firestore.
 */
export const fetchUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.error("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Generate a unique ID based on role.
 */
const generateUniqueId = (role) => {
  const prefix = role === "admin" ? "ADM" : role === "manager" ? "MGR" : "EMP";
  return `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
};

/**
 * Update user profile in Firestore.
 */
export const updateUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // If user exists, update details
    if (userSnap.exists()) {
      await updateDoc(userRef, profileData);
    } else {
      // If new user, assign a unique ID based on role and insert data
      const userId = generateUniqueId(profileData.role);
      await setDoc(userRef, { ...profileData, employeeId: userId });
    }

    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

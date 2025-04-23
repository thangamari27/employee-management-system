import {auth, db} from "../firebase/firebase";
import {doc, getDoc, setDoc, updateDoc} from "../firebase/firebase";

export const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
  
      // Store user data in Firestore with a default role
      await setDoc(doc(db, "users", user.uid), {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        role: "employee", // Default role
        createdAt: new Date()
      });
  
      console.log("User Registered Successfully:", user);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration Error:", error.message);
      toast.error(error.message);
      setErrors({ submit: error.message });
    }
    setSubmitting(false);
  };

export const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      // Fetch user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // Get user role
  
        toast.success('Login successful!');
  
        // Role-based redirection
        if (userRole === "admin") {
          navigate("/dashboard");
        } else if (userRole === "manager") {
          navigate("/dashboard");
        } else if (userRole === "employee") {
          navigate("/dashboard");
        } else {
          toast.error("Unauthorized role detected!");
        }
      } else {
        // 🔴 **Fix: Auto-create missing Admin/Manager in Firestore**
        if (["admin@example.com", "manager123@gmail.com"].includes(user.email)) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: user.email.includes("admin") ? "admin" : "manager",
            createdAt: new Date()
          });
  
          toast.success("User registered in Firestore, please log in again.");
        } else {
          toast.error("User not found in Firestore! Contact admin.");
        }
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error("Invalid credentials or user does not exist.");
      setErrors({ submit: "Invalid credentials. Please try again." });
    }
    setSubmitting(false);
  };
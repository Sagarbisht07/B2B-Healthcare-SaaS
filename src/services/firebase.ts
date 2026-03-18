// Mock Firebase implementation for development
// Replace with actual Firebase if you have a valid API key
// import { UserCredential } from "firebase/auth";

const mockUser = {
  uid: "12345",
  email: "demo@careconnect.com",
  displayName: "Dr. Smith",
  photoURL: null,
};

export const auth = {
  currentUser: null as any
};

export const onAuthStateChanged = (_: any, callback: (user: any) => void) => {
  // Simulate being logged out initially in mock mode
  // The persistent store will overwrite this if already logged in.
  callback(null);
  return () => {};
};

export const signInWithEmailAndPassword = async (_: any, email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "demo@careconnect.com" && password === "password123") {
        resolve({ user: mockUser });
      } else {
        reject({ code: "auth/invalid-credential" });
      }
    }, 1000);
  });
};

export const signOut = async (_: any): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

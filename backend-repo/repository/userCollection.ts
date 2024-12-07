import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const USERS_COLLECTION = "USERS";

export const createUser = async (userData: User): Promise<void> => {
  const userRef = db.collection(USERS_COLLECTION).doc(userData.uid);
  await userRef.set({
    uid: userData.uid,
    email: userData.email,
    displayName: userData.displayName || "",
    age: userData.age || Math.floor(Math.random() * (50 - 18 + 1)) + 18, // Random age between 18 and 50
    passion: userData.passion || "Coding",
    occupation: userData.occupation || "Student",
    createdAt: new Date(),
  });
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  await userRef.update(userData);
};

export const fetchUser = async (userId: string): Promise<User | null> => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
  if (!userDoc.exists) return null;
  return { uid: userDoc.id, ...userDoc.data() } as User;
};

import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const USERS_COLLECTION = "USERS";

export const updateUser = async (userId: string, userData: Partial<User>) => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  await userRef.update(userData);
};

export const fetchUser = async (userId: string): Promise<User | null> => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
  if (!userDoc.exists) return null;
  return { id: userDoc.id, ...userDoc.data() } as User;
};

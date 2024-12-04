import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccount = require(process.env.FIREBASE_KEY_PATH || "");

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert(serviceAccount)
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = admin.firestore();
// export const auth = admin.auth();

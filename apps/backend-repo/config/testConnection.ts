import { db } from "./firebaseConfig";

export const testFirestoreConnection = async () => {
  try {
    const testDoc = db.collection("TEST_CONNECTION").doc("testDoc");
    await testDoc.set({ connected: true, timestamp: new Date() });
    const docSnapshot = await testDoc.get();

    if (docSnapshot.exists) {
      console.log("✅ Firestore connected successfully!");
      console.log("Test document data:", docSnapshot.data());
    } else {
      console.error("❌ Firestore connection failed. Document not found.");
    }

    // // Clean up (optional)
    // await testDoc.delete();
  } catch (error) {
    console.error("❌ Error connecting to Firestore:", error);
  }
};

testFirestoreConnection();

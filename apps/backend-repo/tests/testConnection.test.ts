import * as admin from 'firebase-admin';
import { testFirestoreConnection } from '../config/testConnection';

// Mock Firestore methods correctly
jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        set: jest.fn(),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: jest.fn().mockReturnValue({ connected: true, timestamp: new Date() }),
        }),
        delete: jest.fn(),
      }),
    }),
  }),
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn().mockReturnValue({}),
    applicationDefault: jest.fn(),
  },
}));

describe('Firestore connection test', () => {
  it('should successfully connect to Firestore', async () => {
    // Set up collection and doc args in the mock
    const collectionPath = 'TEST_CONNECTION';
    const docId = 'testDoc';

    const result = await testFirestoreConnection();

    // Check if the mock methods were called with the correct arguments
    expect(admin.firestore().collection).toHaveBeenCalledWith(collectionPath);
    expect(admin.firestore().collection(collectionPath).doc).toHaveBeenCalledWith(docId);
    expect(admin.firestore().collection(collectionPath).doc().set).toHaveBeenCalled();
    expect(admin.firestore().collection(collectionPath).doc().get).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should handle Firestore connection error', async () => {
    // Simulate an error in get()
    const collectionPath = 'TEST_CONNECTION';
    const docId = 'testDoc';
    // admin.firestore().collection(collectionPath).doc().get.mockRejectedValueOnce(new Error('Firestore error'));
    // admin.firestore().collection(collectionPath).doc().get.mockRejectedValueOnce(new Error('Firestore error'));

    const result = await testFirestoreConnection();

    // Verify that the error was handled
    expect(result).toBe(false);
  });
});

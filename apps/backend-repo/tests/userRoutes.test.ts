import request from "supertest";
import app from "../core/app";

describe("User Routes", () => {
  const mockToken = "mock-token"; // Replace this with a valid token during real tests.

  it("should fetch user data", async () => {
    const response = await request(app)
      .get("/api/user/123")
      .set("Authorization", mockToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "123");
  });

  it("should return 404 if user not found", async () => {
    const response = await request(app)
      .get("/api/user/999")
      .set("Authorization", mockToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should update user data", async () => {
    const updatedUser = {
      name: "Updated Name",
      email: "updated@example.com",
      age: 30,
      address: "Updated Address",
    };

    const response = await request(app)
      .put("/api/user/123")
      .set("Authorization", mockToken)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User updated successfully");
  });
});

import { User } from "../types/user";

export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (!user.uid || typeof user.uid !== "string") {
    errors.push("UID is required and must be a string.");
  }

  if (!user.email || typeof user.email !== "string" || !user.email.includes("@")) {
    errors.push("Valid email is required.");
  }

  if (user.age !== undefined && (user.age < 18 || user.age > 100)) {
    errors.push("Age must be between 18 and 100 if provided.");
  }

  if (!user.displayName || typeof user.displayName !== "string") {
    errors.push("Display name is required and must be a string.");
  }

  return errors;
};

export const DB_NAME = "chat-app-basic-db";

export const OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appWriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  dataBasesId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  //collections
  postsIs: import.meta.env.VITE_APPWRITE_POSTS_ID,
  usersId: import.meta.env.VITE_APPWRITE_USER_ID,
  savesId: import.meta.env.VITE_APPWRITE_SAVES_ID,
};

export const client = new Client()
  .setEndpoint(appWriteConfig.url)
  .setProject(appWriteConfig.projectId);

export const account = new Account(client);
export const dataBases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

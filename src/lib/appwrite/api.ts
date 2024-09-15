import { ID, Query } from "appwrite";
import { account, appWriteConfig, avatars, dataBases } from "./config";

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export const saveUserToDB = async (user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
}) => {
  try {
    const newUser = await dataBases.createDocument(
      appWriteConfig.dataBasesId,
      appWriteConfig.usersId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await dataBases.listDocuments(
      appWriteConfig.dataBasesId,
      appWriteConfig.usersId,
      [Query.equal("accountId", currentAccount?.$id)]
    );

    console.log({ currentUser });

    if (!currentUser) throw Error;
    return currentUser.documents?.[0];
  } catch (err) {
    console.log(err);
  }
};

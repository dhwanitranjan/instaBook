type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type IAuthContext = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: () => React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: () => React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

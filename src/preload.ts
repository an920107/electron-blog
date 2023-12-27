import 'dotenv/config';
import { contextBridge } from 'electron'
import ArticleRepo from './repo/articleRepo';
import AuthService from './repo/authService';
import Article from './model/article';
import UserRepo from './repo/userRepo';
import User from './model/user';

contextBridge.exposeInMainWorld('auth', {
  signIn: async (email: string, password: string) => await AuthService.signIn(email, password),
  signOut: () => AuthService.signOut(),
  signUp: async (user: User, password: string) => await AuthService.signUp(user, password),
  getUser: () => AuthService.user,
  isSignedIn: () => AuthService.user !== undefined && AuthService.user !== null,
});

contextBridge.exposeInMainWorld('app', {
  getUser: async (uid: string) => await UserRepo.getUser(uid),
  listArticles: async () => await ArticleRepo.listArticles(),
  addArticle: async (article: Article) => await ArticleRepo.addArticle(article),
});

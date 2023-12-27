import Article from "../model/article";
import User from "../model/user";

export type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

export type ArticleContextType = {
  article: Article | undefined
  setArticle: React.Dispatch<React.SetStateAction<Article | undefined>>
}
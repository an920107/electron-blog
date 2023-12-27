import { useEffect, useState } from "react";
import Article from "../model/article"
import User from "../model/user";

const app = (window as any).app

const ArticleTile = ({ article }: { article: Article }) => {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    app.getUser(article.author)
      .then((user: User) => setAuthor(user.displayName ?? "Unknown"))
      .catch((error: any) => setAuthor("Unknown"));
  }, []);

  return (
    <div className="articlePreview">
      <div className="mb-4 py-2 px-4 border border-dark-subtle rounded">
        <h2 className="mt-2">{article.title}</h2>
        <h6 className="text-secondary">@ {author} - {article.createTime?.toLocaleString()}</h6>
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default ArticleTile;
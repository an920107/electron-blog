import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Article from "../model/article";
import ArticleTile from "../component/ArticlePreview";

const app = (window as any).app

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    app.listArticles().then((value: Article[]) =>
      setArticles(value.sort((a, b) =>
        b.createTime!.getTime() - a.createTime!.getTime())
      )
    );
  }, []);

  return (
    <div className="articleList">
      <h1 className="mb-5 text-center">Articles</h1>
      {articles.map(article => (
        <ArticleTile article={article} />
      ))}
      <Outlet />
    </div>
  );
}

export default ArticleList;
import { FormEvent, useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../App";
import { UserContextType } from "../context/Types";
import Article from "../model/article";

const app = (window as any).app

const ArticleEditor = ({ id }: { id?: string }) => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const isNewPost = id === undefined || id === null || id === "";

  useEffect(() => {
    if (!isNewPost) {
      app.getArticle(id).then((article: Article) => {
        titleRef.current!.value = article.title ?? "";
        contentRef.current!.value = article.content ?? "";
      });
    }
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const article: Article = {
      title: titleRef.current!.value,
      content: contentRef.current!.value
    };
    try {
      if (isNewPost) {
        await app.addArticle(article);
      } else {
        article.id = id;
        await app.updateArticle(article);
      }
      window.location.replace("#/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="articleEditor">
      {
        user ?
          <div>
            <h1 className="mb-5 text-center">New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="titleInput" className="form-label">Title</label>
                <input type="text" name="titleInput" className="form-control" ref={titleRef} />
              </div>
              <div className="mb-3">
                <label htmlFor="contentInput" className="form-label">Content</label>
                <textarea name="contentInput" className="form-control" rows={10} ref={contentRef} />
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div> :
          <h3 className="mb-5 text-center">
            You have to sign in first.
          </h3>
      }

      <Outlet />
    </div>
  );
}

export default ArticleEditor;
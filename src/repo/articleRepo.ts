import AuthService from "./authService";
import Article from "../model/article";

const endpoint = "https://firestore.googleapis.com/v1/projects/electron-blog/databases/(default)/documents";
const collection = "article";

export default class ArticleRepo {

    static async listArticles(): Promise<Article[]> {
        const response = await fetch(`${endpoint}/${collection}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (!response.ok) throw new Error("List articles failed.");
        const json = await response.json();
        return json['documents'].map((data: any) => ({
            id: (data['name'] as string).split("/").at(-1),
            title: data['fields']['title']['stringValue'],
            content: data['fields']['content']['stringValue'],
            author: data['fields']['author']['stringValue'],
            createTime: new Date(data['createTime'])
        }) as Article);
    }

    static async addArticle(article: Article): Promise<void> {
        var response = await fetch(`${endpoint}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${AuthService.token}`,
            },
        });
        if (!response.ok) throw new Error("Create article failed.");
        const docPath = (await response.json())['name'];

        response = await fetch(`${endpoint}:commit`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${AuthService.token}`,
            },
            body: JSON.stringify({
                writes: [{
                    update: {
                        name: docPath,
                        fields: {
                            title: { "stringValue": article.title },
                            content: { "stringValue": article.content },
                            author: { "stringValue": AuthService.user!.uid! },
                        }
                    }
                }]
            }),
        })
        if (!response.ok) throw new Error("Update article failed.");
    }
}

import User from "../model/user";
import AuthService from "./authService";

const endpoint = "https://firestore.googleapis.com/v1";
const dbPath = "projects/electron-blog/databases/(default)/documents";
const collection = "user";

export default class UserRepo {
    static async getUser(uid: string): Promise<User | undefined> {
        const response = await fetch(`${endpoint}/${dbPath}/${collection}/${uid}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (!response.ok) throw new Error("Get user info failed");
        const json = await response.json();
        return {
            uid: uid,
            displayName: json['fields']['displayName']['stringValue'],
        } as User;
    }

    static async updateUser(user: User): Promise<void> {
        const response = await fetch(`${endpoint}/${dbPath}:commit`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${AuthService.token}`,
            },
            body: JSON.stringify({
                writes: [{
                    update: {
                        name: `${dbPath}/${collection}/${user.uid!}`,
                        fields: { displayName: { "stringValue": user.displayName! } },
                    }
                }]
            }),
        })
        if (!response.ok) throw new Error("Update user data failed.");
    }
}

import User from '../model/user';
import UserRepo from './userRepo';

const endpoint = "https://identitytoolkit.googleapis.com/v1/accounts";
const apiKey = process.env.API_KEY

export default class AuthService {
    static token: string = "";
    static user?: User;

    static async signIn(email: string, password: string): Promise<void> {
        const response = await fetch(`${endpoint}:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
        });
        if (!response.ok) throw new Error("Login failed.");
        this.token = (await response.json())['idToken'];
        this.user = await this.getUser();
    }

    static signOut() {
        this.token = "";
        this.user = undefined;
    }

    static async getUser(): Promise<User | undefined> {
        const response = await fetch(`${endpoint}:lookup?key=${apiKey}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ idToken: this.token }),
        });
        if (!response.ok) throw new Error("Token is not available.");
        const userInfo = (await response.json())['users'][0];
        return {
            uid: userInfo['localId'],
            email: userInfo['email'],
            displayName: userInfo['providerUserInfo'][0]['displayName'],
            createTime: new Date(parseInt(userInfo['createdAt'])),
        } as User;
    }

    static async signUp(user: User, password: string): Promise<void> {
        const response = await fetch(`${endpoint}:signUp?key=${apiKey}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: user.email!,
                password: password,
                returnSecureToken: true,
            }),
        });
        if (!response.ok) throw new Error("Create user failed.");
        const json = await response.json();
        this.token = json['idToken'];
        user.uid = json['localId'];
        await this.updateUser(user);
        this.user = await this.getUser();
    }

    static async updateUser(user: User): Promise<void> {
        const response = await fetch(`${endpoint}:update?key=${apiKey}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                idToken: this.token,
                displayName: user.displayName!,
                returnSecureToken: false,
            }),
        });
        if (!response.ok) throw new Error("Update user data failed.");
        await UserRepo.updateUser(user);
    }
}
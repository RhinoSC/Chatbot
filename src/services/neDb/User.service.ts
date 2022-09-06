import { UserRepository } from "../../repository/neDb/User.repository";
import User from "../../types/User";

export class UserService {
    private db: any;
    private UserRepository: UserRepository;

    constructor(db: any) {
        this.db = db;
        this.UserRepository = new UserRepository(this.db);
    }

    public find = async (): Promise<User[]> => {
        const users: User[] = await this.UserRepository.findUsers();
        return users;
    }

    public findById = async (id: string): Promise<User[]> => {
        const user: User[] = await this.UserRepository.findUserById(id);
        return user;
    }

    public findByName = async (name: string): Promise<User[]> => {
        const user: User[] = await this.UserRepository.findUserByName(name);
        return user;
    }

    public create = async (user: User) => {
        const newUser: User = await this.UserRepository.addNewUser(user)
        return newUser;
    }

    public update = async (id: string, user: User) => {
        const updateUser: User = await this.UserRepository.updateUser(id, user)
        return updateUser;
    }

    public delete = async (id: string) => {
        const deleteUser: any = await this.UserRepository.deleteUser(id)
        return deleteUser;
    }
}
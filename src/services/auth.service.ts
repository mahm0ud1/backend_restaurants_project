import { AuthDal } from "../dal/auth.dal";

export class AuthService {
  public async register(user:any) {
    const dal = new AuthDal();
    const res = await dal.register(user);
    return res;
  }

  public async login(user:any) {
    const dal = new AuthDal();
    const res = await dal.login(user);
    return res;
  }
}

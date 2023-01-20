import { Increment } from "mongoose-auto-increment-ts";
import Users from "../db/models/users";
import bcrypt from 'bcrypt'
import { EMAIL_EXIST, RESTPONSE_IMPL, USERNAME_EXIST, USER_CREATED, USER_NOT_CREATED, USER_NOT_FOUND, USER_PASSWORD_INCORRECT, USER_ROLE_TOKEN, USER_TOKEN } from "../types/responds";
import { createToken } from "../middleware/jwtAuth";

export class AuthDal {
  private static async getIncrementUserID() {
    let RestaurantID = null;
    await Increment('users').then(
      id => RestaurantID = id
    );
    return RestaurantID;
  }

  public async register(user: any) {

    try {
      // ToDo - validate Email and Password
      const { firstName, lastName, username, email, password } = user;
      const data = await Users.findOne({ $or: [{ username: username }, { email: email }] });
      if (data) {
        if (data.username === username)
          return new USERNAME_EXIST;
        else
          return new EMAIL_EXIST;
      }

      const userRes = await new Promise<RESTPONSE_IMPL>((resolve, reject) => {
        bcrypt.genSalt(10, async function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hashedPassword) {
            try {
              const id = await AuthDal.getIncrementUserID();
              user = new Users({
                id: id,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                hashedPassword: hashedPassword,
              });

              const response = await Users.create(user);
              if (response)
                resolve(new USER_CREATED);
            }
            catch (error) { }

            resolve(new USER_NOT_CREATED);
          });
        });
      })

      return userRes;
    }
    catch (err) { }

    return new USER_NOT_CREATED;
  }

  public async login(user: any) {
    try {
      const { username, email, password } = user;
      const data = await Users.findOne({ $or: [{ username: username }, { email: email }] });

      if (data) {
        const { id, firstName, lastName, username, email, hashedPassword, role } = data;

        const userRes = await new Promise<boolean>((resolve, reject) => {
          bcrypt.compare(password, hashedPassword, function (err, result) {
            if (result) {
              resolve(true);
            }
            else {
              resolve(false);
            }
          });
        });

        if (userRes) {
          const token = createToken(id);
          if(role)
            return new USER_ROLE_TOKEN(token, role);
          return new USER_TOKEN(token);
        }
        else {
          return new USER_PASSWORD_INCORRECT;
        }
      }
      else {
        return new USER_NOT_FOUND;
      }
    }
    catch (error) {
      return new USER_NOT_FOUND;
    }
  }
}
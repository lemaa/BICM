
import * as bcrypt from 'bcryptjs';

export default class PasswordHandler {

 static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 12);
}

static checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, password);
}
  }

export interface RESPONSE_TYPE {
    status_code: number,
    message: String
}

export abstract class RESTPONSE_IMPL implements RESPONSE_TYPE {
    abstract status_code: number;
    abstract message: String;
    
    public getStatusCode = () => {
        return this.status_code;
    }

    public getMessage = () => {
        return this.message;
    }
}

export class USERNAME_EXIST extends RESTPONSE_IMPL {
    status_code = 409;
    message: String = "Username already exist";
}

export class EMAIL_EXIST extends RESTPONSE_IMPL {
    status_code = 409;
    message: String = "Email already exist";
}

export class USER_CREATED extends RESTPONSE_IMPL {
    status_code = 201;
    message: String = "Created successfuly";
}

export class USER_NOT_CREATED extends RESTPONSE_IMPL {
    status_code = 400;
    message: String = "ERROR while creating user";
}

export class USER_NOT_FOUND extends RESTPONSE_IMPL {
    status_code = 401;
    message: String = "USER not found";
}

export class USER_PASSWORD_INCORRECT extends RESTPONSE_IMPL {
    status_code = 401;
    message: String = "Password Incorrect";
}

export class USER_TOKEN extends RESTPONSE_IMPL {
    message: String;
    status_code = 200;
    constructor(message: String) {
        super();
        this.message = message;
    }
}

export class OK_RESPONSE extends RESTPONSE_IMPL {
    status_code = 200;
    message: String = "OK";

    constructor(msg:String) {
        super();
        this.message = msg;
    }
}
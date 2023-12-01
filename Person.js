export class Person {
    #name;
    #email;
    #phone;
    #location;
    #avatar;

    constructor(name, email, phone, location, avatar) {
        this.#name = name;
        this.#email = email;
        this.#phone = phone;
        this.#location = location;
        this.#avatar = avatar;
    }

    getName() {
        return this.#name;
    }

    getEmail() {
        return this.#email;
    }

    getPhone() {
        return this.#phone;
    }

    getLocation() {
        return this.#location;
    }

    getAvatar() {
        return this.#avatar;
    }
}
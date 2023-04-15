export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public role: string,
    public active: boolean,
    public _token: string,
  ) {}
  get token() {
    return this._token;
  }
}

export class Usuario {
  constructor(
    public _id: String,
    public nombre: String,
    public email: String,
    public password: String,
    public tipo: String,
    public municipio: string,
    public rol: String
  ){}
}

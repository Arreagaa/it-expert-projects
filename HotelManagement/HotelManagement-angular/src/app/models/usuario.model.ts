export class Usuario {
  constructor(
    public _id: String,
    public nombre: String,
    public email: String,
    public password: String,
    public direccion: String,
    public pais: string,
    public rol: String,
    public idHotel: String
  ){}
}

export class Evento {
  constructor(
    public _id: String,
    public evento: String,
    public descripcion: String,
    public precio: Number,
    public disponibilidad: Boolean,
    public idHotel: String
  ){}
}

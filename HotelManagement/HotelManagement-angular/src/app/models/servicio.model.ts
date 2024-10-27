export class Servicio {
  constructor(
    public _id: String,
    public servicio: String,
    public precio: Number,
    public disponibilidad: Boolean,
    public idHotel: String
  ){}
}

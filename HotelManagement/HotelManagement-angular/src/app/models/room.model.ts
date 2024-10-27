export class Room {
  constructor(
    public _id: String,
    public nombreRoom: String,
    public tipo: String,
    public precio: Number,
    public disponibilidad: Boolean,
    public idHotel: String
  ){}
}

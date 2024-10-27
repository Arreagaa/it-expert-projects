export class Reservacion {
  constructor(
    public _id: String,
    public idHotel: String,
    public idUsuario: String,
    public idRoom: String,
    public fechaInicio: String,
    public totalNoches: Number,
  ){}
}

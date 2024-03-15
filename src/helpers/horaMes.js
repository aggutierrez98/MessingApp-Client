import moment from "moment";

export const horaMes = (fecha) => {
	const fechaMensaje = moment(fecha);
	const fechaHoy = moment(new Date());
	if(fechaMensaje.year() === fechaHoy.year()) return fechaMensaje.format("HH:mm - DD/MM");
	else return fechaMensaje.format("HH:mm - DD/MM/YY");
};

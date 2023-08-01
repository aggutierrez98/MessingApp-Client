export const types = {
	//AUTH STATE
	loginUsuario: "[Auth] Login de usuario",
	logoutUsuario: "[Auth] Logout de usuario",
	tokenInvalido: "[Auth] Token invalido",

	//USUARIO STATE
	cargarDatos: "[Usuario] Cargar datos usuario",
	descargarDatos: "[Usuario] Descargar datos usuario",
	editarNombre: "[Usuario] Editar nombre",
	editarDescripcion: "[Usuario] Editar descripcion",
	editarImagen: "[Usuario] Editar imagen",

	//CONTACTOS STATE
	cargarContactos: "[Contactos] Cargar contactos",
	contactoConectado: "[Contactos] Contacto conectado",
	contactoDesconectado: "[Contactos] Contacto desconectado",
	cargarUsuariosRestantes: "[Contactos] Cargar usuarios restantes",
	agregarContacto: "[Contactos] Agregar contacto",
	eliminarContacto: "[Contactos] Eliminar contacto",
	cargarNotificaciones: "[Contactos] Cargar notificaciones",
	nuevaNotificacion: "[Contactos] Nueva notificacion",
	eliminarNotificacion: "[Contactos] Eliminar notificacion",
	limpiarContactos: "[Contactos] Limpiar contactos",

	//MENSAJES STATE
	activarChat: "[Chat] Activar chat",
	nuevoMensajeUsuario: "[Chat] Nuevo mensaje usuario",
	nuevoMensajeContacto: "[Chat] Nuevo mensaje contacto",
	mensajesVistos: "[Chat] Mensajes vistos",
	cargarMensajes: "[Chat] Cargar mensajes",
	cargarUltimosMensajes: "[Chat] Cargar ultimos mensajes",
	limpiarMensajes: "[Chat] Limpiar mensajes",
	cargarMensajesTotales: "[Chat] Cargar mensajes totales",
	descargarChats: "[Chat] Descargar chats",
};

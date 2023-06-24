export const statusMessages = (statusCode: number, text?: string): string => {
  switch (statusCode) {
    case 200:
      return text;

    case 201:
      return statusCode + " " + "Registro agregado exitosamente.";

    case 202:
      return (
        statusCode +
        " " +
        "La petición fue exitosa pero no ha sido procesada, es posible que sea rechazada."
      );

    case 203:
      return (
        statusCode +
        " " +
        "La petición fue exitosa, pero es posible que su contenido provenga de otra fuente."
      );

    case 301:
      return (
        statusCode + " " + "El recurso solicitado se ha movido permanentemente."
      );

    case 302:
      return (
        statusCode + " " + "El recurso solicitado se ha movido temporalmente."
      );

    case 400:
      return (
        statusCode +
        " " +
        "Petición no exitosa inténtelo más tarde o revise los datos de la misma."
      );

    case 401:
      return (
        statusCode +
        " " +
        "Acceso denegado, no cuenta con los permisos necesarios para esta solicitud."
      );

    case 403:
      return (
        statusCode +
        " " +
        "Petición fallida, la API se encuentra fuera de servicio en estos momentos."
      );

    case 404:
      return (
        statusCode +
        " " +
        "El Recurso o registro solicitado no fue encontrado en nuestro servidor, verifique los datos de la petición."
      );

    case 405:
      return (
        statusCode +
        " " +
        "Petición no soportada, verifique los datos de la misma."
      );

    case 406:
      return (
        statusCode +
        " " +
        "No es posible retornar datos en el formato esperado por el navegador."
      );

    case 407:
      return (
        statusCode +
        " " +
        "Se requiere autenticación del proxi para procesar la petición."
      );

    case 408:
      return statusCode + " " + "El cliente no continuo con la petición.";

    case 409:
      return (
        statusCode +
        " " +
        "Se presento un conflicto al procesar la petición revise los datos enviados."
      );

    case 410:
      return (
        statusCode +
        " " +
        "El Recurso o registro solicitado ya no está disponible en el servidor de origen y es probable que esta condición sea permanente."
      );

    case 411:
      return (
        statusCode +
        " " +
        "No se pudo procesar la petición debido a un error en la cabecera."
      );

    case 412:
      return (
        statusCode +
        " " +
        "El servidor no cumple con una de las condiciones previas que el cliente puso en sus campos de encabezado de solicitud."
      );

    case 500:
      return (
        statusCode +
        " " +
        "Error interno del servidor, puede que en estos momento nuestro servidor presente problemas, inténtelo más tarde."
      );

    case 501:
      return (
        statusCode +
        " " +
        "Funcionalidad no soportada por el servidor, revise el contenido de la petición."
      );

    case 503:
      return (
        statusCode +
        " " +
        "Servidor no disponible, puede estar congestionado o en mantenimiento, inténtelo más tarde."
      );

    case 504:
      return (
        statusCode +
        " " +
        "Servidor no disponible dentro de un período de tiempo establecido, puede estar congestionado o en mantenimiento, inténtelo más tarde."
      );

    case 505:
      return (
        statusCode +
        " " +
        "Versión del protocolo HTTP no soportada por el servidor"
      );

    default:
      return "Error desconocido, verifique su conexión a internet o comuniquese con el proveedor";
  }
};

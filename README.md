# MDM Dashboard

Este proyecto es un ejemplo de tablero de monitoreo en Angular y Leaflet que consume los servicios del backend [`mdm-backend`](https://github.com/Luizzavala/mdm-backend).

## Instalación

1. Instale las dependencias con `npm install`.
2. Inicie el servidor de desarrollo con `npm start`.

## Uso

En el tablero se puede seleccionar un dispositivo para consultar su historial de ubicaciones. Si la última sincronización fue hace más de 20 minutos el dispositivo se marca como **inactivo**. En el mapa se muestran todos los puntos históricos y se resalta la última posición.

## Nota

Debido a las restricciones del entorno, es posible que deba configurar la instalación de dependencias manualmente antes de ejecutar el proyecto.

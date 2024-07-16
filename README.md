# Video Uploader con Flask y NAS

Este proyecto es una aplicación web que permite a los usuarios grabar videos desde su navegador y subirlos a un servidor NAS (Network Attached Storage) usando Flask y la biblioteca `smb.SMBConnection`.

## Descripción

La aplicación permite a los usuarios:
1. Grabar videos directamente desde su navegador.
2. Subir los videos grabados a una carpeta compartida en un servidor NAS.

### Tecnologías Utilizadas

- **Flask:** Framework de microservicios para Python.
- **JavaScript:** Para manejar la grabación de medios y las interacciones del usuario en el frontend.
- **SMBConnection:** Biblioteca de Python para manejar conexiones SMB/CIFS para subir archivos al NAS.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local.

### Requisitos Previos

- Python 3.x
- Flask
- smbprotocol

### Pasos de Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/JosueReyes13/Nas.git
    cd tu-proyecto
    ```

2. Instala las dependencias de Python:
    ```bash
    pip install -r requirements.txt
    ```

3. Ejecuta la aplicación:
    ```bash
    python main.py
    ```

La aplicación debería estar corriendo en `http://localhost:5000`.

## Uso

1. Abre la aplicación en tu navegador (`http://localhost:5000`).
2. Usa la interfaz para grabar un video.
3. Sube el video al servidor NAS usando el formulario proporcionado.

## Archivos Principales

### `main.py`

Este archivo contiene el código backend de la aplicación, manejando la lógica de conexión al NAS y la subida de archivos.

### `grabar.js`

Este archivo contiene el código JavaScript que maneja la grabación de medios y la subida de archivos desde el frontend.

### Captura de Pantalla

![Interfaz de la Aplicación](Capturas_de_Pantalla/Captura%20de%20pantalla%202024-07-16%20110314.png)

## Contribuir

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Créditos

- [Josue Reyes](https://github.com/JosueReyes13)


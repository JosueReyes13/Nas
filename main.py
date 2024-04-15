from flask import Flask, render_template, request, jsonify
from smb.SMBConnection import SMBConnection
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Definir la ruta para el formulario donde se carga el video
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para manejar la subida del video a la NAS
@app.route('/subir_video', methods=['POST'])
def subir_video():
    try:
        # Obtener el archivo de video del formulario
        video = request.files['video']
        
        # Lista de direcciones IP del servidor NAS
        server_addresses = [""] # Colocar con las direcciones IP de tu servidor
        username = "" # Colocar con el usuario de tu servidor
        password = "" # Colocar con la contraseña de tu servidor
        domain = ""  # Dominio de tu servidor
        share_name = ""  # Nombre de la canta compartida dentro del servidor
        folder_path = ""  # Ruta de la canta compartida dentro del servidor
        
        conn = None

        # Intentar conectar con cada dirección IP en la lista
        for address in server_addresses:
            try:
                conn = SMBConnection(username, password, "python", "nas", domain=domain, use_ntlm_v2=True)
                conn.connect(address, 445)
                break  # Si la conexión es exitosa, salir del bucle
            except Exception as e:
                print(f"No se pudo conectar a la dirección IP {address}: {e}")

        if conn is None:
            return jsonify({'message': 'No se pudo conectar a ninguna de las direcciones IP especificadas.'}), 500

        # Guardar el archivo en la NAS
        conn.storeFile(share_name, folder_path + "/" + video.filename, video.stream)
        conn.close()

        return jsonify({'message': 'Video subido con éxito.'}), 200

    except Exception as e:
        return jsonify({'message': f'Error: {e}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

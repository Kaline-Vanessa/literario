import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from flask_cors import cross_origin

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Nenhum arquivo foi enviado'}), 400
        
        file = request.files['file']
        book_id = request.form.get('book_id', '')
        
        if file.filename == '':
            return jsonify({'error': 'Nenhum arquivo selecionado'}), 400
        
        if file and allowed_file(file.filename):
            # Criar diretório de uploads se não existir
            upload_folder = os.path.join(current_app.static_folder, 'uploads')
            os.makedirs(upload_folder, exist_ok=True)
            
            # Gerar nome único para o arquivo
            file_extension = file.filename.rsplit('.', 1)[1].lower()
            unique_filename = f"{book_id}_{uuid.uuid4().hex}.{file_extension}"
            filename = secure_filename(unique_filename)
            
            # Salvar arquivo
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            
            # Retornar URL do arquivo
            file_url = f"/uploads/{filename}"
            
            return jsonify({
                'success': True,
                'file_url': file_url,
                'book_id': book_id,
                'message': 'Arquivo enviado com sucesso!'
            }), 200
        
        return jsonify({'error': 'Tipo de arquivo não permitido'}), 400
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500


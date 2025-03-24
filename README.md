## Seek Tasks - Bruno Sarti

App de task management en con backend en frameworw serverless (AWS) y frontend en React+Vite+MUI, la base de datos es una instancia M0 de Atlas(MongoDB). Mejores prácticas de seguridad como la omisión del archivo .env del repositorio fueron omitidas para simplificar la revisión.

El deploy es servido a través de Cloudfront y está disponible en: https://dmy9yo835a3z3.cloudfront.net

La url base de la api es: https://k9qeiudz2k.execute-api.us-east-1.amazonaws.com/dev

Endpoints:
POST | /register  
POST | /login  
GET | /tasks  
POST | /tasks  
PUT | /tasks/{id}  
DELETE | /{id}

se incluye un archivo compatible con OpenApi (Swager) en ./task-managerbackend/openapi.json que se puede importar en https://editor.swagger.io/ (no requiere usuario) ó directamente en Postman

### Docker

```bash
docker-compose up --build --detach
```

este comando hará disponible la api localmente en el puerto 4000 y el frontend en el puerto 3000

### Testing

para correr pruebas en backend

cd task-manager-backend
python -m unittest discover -s tests -t .

# 🌐 Página Web DataLab ITAM

Página web oficial de DataLab ITAM - Estudiantes del ITAM preocupadxs por problemáticas sociales, económicas y ambientales en México y el mundo.

## 🚀 Stack Tecnológico

### Frontend
- **React** con TypeScript
- **Styled Components** para estilos
- **Framer Motion** para animaciones
- **React Router** para navegación
- **Firebase** para autenticación y base de datos

### Backend
- **Node.js** con Express
- **Firebase Admin SDK** para gestión de datos
- **CORS** y **Helmet** para seguridad
- **Morgan** para logging

## 📁 Estructura del Proyecto

```
pagina_web_datalab/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── layout/     # Header, Footer
│   │   │   ├── ui/         # Botones, Cards, etc.
│   │   │   └── common/     # Componentes comunes
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── styles/         # Tema y estilos globales
│   │   ├── config/         # Configuración Firebase
│   │   ├── services/       # Servicios API
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Utilidades
│   └── public/             # Archivos estáticos
├── backend/                 # API Node.js
│   ├── src/                # Código fuente
│   ├── config/             # Configuración Firebase
│   ├── routes/             # Rutas de la API
│   ├── middleware/         # Middlewares
│   └── services/           # Servicios de negocio
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Firebase

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd pagina_web_datalab
```

### 2. Configurar el Backend
```bash
cd backend
npm install

# Crear archivo .env basado en env.example
cp env.example .env

# Editar .env con tus credenciales de Firebase
nano .env
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```

### 4. Configuración de Firebase

El proyecto utiliza el mismo proyecto Firebase existente (`horas-datalab`). 

#### Variables de entorno del backend (.env):
```env
PORT=3001
FIREBASE_PROJECT_ID=horas-datalab
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@horas-datalab.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## 🚀 Ejecución

### Desarrollo
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Producción
```bash
# Backend
cd backend
npm start

# Frontend (build)
cd frontend
npm run build
```

## 📊 Estructura de Datos Firebase

### Colecciones principales:

#### `content` - Contenido de la página
```javascript
{
  "hero": {
    "title": "DataLab ITAM",
    "subtitle": "Estudiantes preocupadxs por problemáticas sociales...",
    "description": "Desarrollamos software, visualizaciones...",
    "ctaText": "Conoce nuestros proyectos",
    "backgroundImage": "/images/hero-bg.jpg"
  },
  "about": {
    "title": "Sobre DataLab",
    "mission": "Nuestra misión es...",
    "vision": "Visualizamos un mundo...",
    "values": [...]
  },
  "contact": {
    "email": "itamdatalab@gmail.com",
    "phone": "+52 55 5628 4000",
    "address": "Río Hondo 1, Progreso Tizapán...",
    "socialMedia": {...}
  }
}
```

#### `projects` - Proyectos de DataLab
```javascript
{
  "title": "Sistema de Horas de Servicio",
  "description": "Plataforma digital para gestionar...",
  "category": "Software",
  "technologies": ["Flutter", "Firebase", "React"],
  "status": "En desarrollo",
  "featured": true,
  "image": "/images/projects/horas-servicio.jpg",
  "githubUrl": "https://github.com/...",
  "demoUrl": "https://...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `team` - Miembros del equipo
```javascript
{
  "name": "Nombre del Miembro",
  "role": "Desarrollador Full Stack",
  "description": "Descripción del miembro...",
  "image": "/images/team/member.jpg",
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "order": 1
}
```

#### `news` - Blog y noticias
```javascript
{
  "title": "Título del Artículo",
  "content": "Contenido del artículo...",
  "excerpt": "Resumen del artículo...",
  "author": "Nombre del Autor",
  "category": "Tecnología",
  "tags": ["datos", "social", "tecnología"],
  "image": "/images/blog/article.jpg",
  "publishedAt": "2024-01-01T00:00:00.000Z",
  "featured": true
}
```

#### `contact_messages` - Mensajes de contacto
```javascript
{
  "name": "Nombre del Usuario",
  "email": "usuario@email.com",
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje...",
  "type": "general",
  "status": "nuevo",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

## 🎨 Características de Diseño

- **Diseño Responsivo**: Mobile-first approach
- **Animaciones**: Framer Motion para transiciones suaves
- **Tema Consistente**: Sistema de design tokens
- **Accesibilidad**: Cumple con estándares WCAG
- **Performance**: Optimizado para carga rápida
- **SEO**: Meta tags y estructura semántica

## 🔧 Scripts Disponibles

### Frontend
- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm test` - Ejecutar tests
- `npm run eject` - Eject de Create React App

### Backend
- `npm start` - Servidor de producción
- `npm run dev` - Servidor de desarrollo con nodemon

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo DataLab ITAM

Somos estudiantes del ITAM comprometidos con el uso de datos y tecnología para abordar problemáticas sociales, económicas y ambientales.

- **Email**: itamdatalab@gmail.com
- **GitHub**: [github.com/datalab-itam](https://github.com/datalab-itam)
- **LinkedIn**: [linkedin.com/company/datalab-itam](https://linkedin.com/company/datalab-itam)

---

Hecho con ❤️ por DataLab ITAM

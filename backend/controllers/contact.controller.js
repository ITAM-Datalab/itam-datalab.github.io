/**
 * Controlador de contacto
 * Maneja la lógica de negocio para mensajes de contacto
 */
const firestoreService = require('../services/firestore.service');
const logger = require('../utils/logger');
const { 
  successResponse, 
  createdResponse, 
  errorResponse,
  notFoundResponse 
} = require('../utils/apiResponse');

/**
 * Procesa formulario de contacto
 * POST /api/contact
 */
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message, type = 'general' } = req.body;
    
    // Crear mensaje en Firestore
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'Consulta general',
      message: message.trim(),
      type,
      status: 'nuevo',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    };
    
    const result = await firestoreService.createDocument('contact_messages', contactData);
    
    logger.info(`Nuevo mensaje de contacto recibido de: ${email}`);
    
    createdResponse(res, { id: result.id }, 'Mensaje enviado correctamente');
    
  } catch (error) {
    logger.error('Error procesando formulario de contacto:', error);
    next(error);
  }
};

/**
 * Obtiene información de contacto de DataLab
 * GET /api/contact/info
 */
const getContactInfo = async (req, res, next) => {
  try {
    const contactDoc = await firestoreService.getDocument('content', 'contact');
    
    if (!contactDoc) {
      // Información por defecto
      const defaultContact = {
        email: 'itamdatalab@gmail.com',
        phone: '+52 55 5628 4000',
        address: 'Río Hondo 1, Progreso Tizapán, 01080 Ciudad de México, CDMX',
        socialMedia: {
          github: 'https://github.com/datalab-itam',
          linkedin: 'https://linkedin.com/company/datalab-itam',
          twitter: 'https://twitter.com/datalab_itam',
          instagram: 'https://instagram.com/datalab_itam',
        },
        officeHours: {
          monday: '9:00 - 18:00',
          tuesday: '9:00 - 18:00',
          wednesday: '9:00 - 18:00',
          thursday: '9:00 - 18:00',
          friday: '9:00 - 17:00',
          saturday: 'Cerrado',
          sunday: 'Cerrado',
        },
      };
      
      return successResponse(res, defaultContact, 'Información de contacto');
    }
    
    successResponse(res, contactDoc, 'Información de contacto');
    
  } catch (error) {
    logger.error('Error obteniendo información de contacto:', error);
    next(error);
  }
};

/**
 * Obtiene lista de mensajes de contacto (admin)
 * GET /api/contact/messages
 */
const getContactMessages = async (req, res, next) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    
    const options = {
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: parseInt(limit),
      offset,
    };
    
    if (status) {
      options.where = [['status', '==', status]];
    }
    
    const messages = await firestoreService.getDocuments('contact_messages', options);
    
    successResponse(res, messages, `${messages.length} mensajes encontrados`);
    
  } catch (error) {
    logger.error('Error obteniendo mensajes de contacto:', error);
    next(error);
  }
};

/**
 * Obtiene un mensaje específico (admin)
 * GET /api/contact/messages/:id
 */
const getContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const message = await firestoreService.getDocument('contact_messages', id);
    
    if (!message) {
      return notFoundResponse(res, 'Mensaje no encontrado');
    }
    
    successResponse(res, message, 'Mensaje encontrado');
    
  } catch (error) {
    logger.error('Error obteniendo mensaje:', error);
    next(error);
  }
};

/**
 * Actualiza el status de un mensaje (admin)
 * PUT /api/contact/messages/:id/status
 */
const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const exists = await firestoreService.documentExists('contact_messages', id);
    
    if (!exists) {
      return notFoundResponse(res, 'Mensaje no encontrado');
    }
    
    const updatedMessage = await firestoreService.updateDocument(
      'contact_messages',
      id,
      { status }
    );
    
    logger.info(`Status de mensaje ${id} actualizado a: ${status}`);
    
    successResponse(res, updatedMessage, 'Status actualizado correctamente');
    
  } catch (error) {
    logger.error('Error actualizando status de mensaje:', error);
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getContactInfo,
  getContactMessages,
  getContactMessage,
  updateMessageStatus,
};


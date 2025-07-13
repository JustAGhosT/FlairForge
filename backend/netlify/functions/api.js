import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import serverless from 'serverless-http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from templates directory
app.use('/templates', express.static(path.join(__dirname, '../../templates')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FlairForge API is running' });
});

// Flyer generation endpoint
app.post('/api/generate-flyer', async (req, res) => {
  try {
    const { template, data } = req.body;
    
    // Validate input
    if (!template || !data) {
      return res.status(400).json({ 
        error: 'Missing required fields: template and data' 
      });
    }

    // TODO: Implement flyer generation logic
    // This would typically involve:
    // 1. Loading the EJS template
    // 2. Rendering with provided data
    // 3. Converting to PDF/image
    // 4. Returning the result

    res.json({ 
      success: true, 
      message: 'Flyer generation endpoint ready',
      template,
      dataReceived: data 
    });
  } catch (error) {
    console.error('Error generating flyer:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Template listing endpoint
app.get('/api/templates', (req, res) => {
  try {
    // TODO: Read available templates from templates directory
    const templates = [
      { id: 'cheesy-pig', name: 'Cheesy Pig Promo', description: 'Promotional flyer template' },
      { id: 'cheesy-pig-part2', name: 'Cheesy Pig Part 2', description: 'Follow-up flyer template' }
    ];
    
    res.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Export for Netlify Functions
export const handler = serverless(app); 
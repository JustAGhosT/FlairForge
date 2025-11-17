import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import ssrFlyerRoute from './ssrFlyerRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));
app.use(ssrFlyerRoute)

// Load flyer data
const flyerDataPath = join(__dirname, '../data/flyerData.json');
let flyerData = [];

try {
  const data = fs.readFileSync(flyerDataPath, 'utf8');
  flyerData = JSON.parse(data);
} catch (error) {
  console.warn('Could not load flyer data:', error.message);
  flyerData = [
    {
      id: 'cheesy-pig-promo',
      title: 'Cheesy Pig Promo',
      description: 'Promotional flyer for The Cheesy Pig',
      template: 'cheesy-pig-promo'
    },
    {
      id: 'cheesy-pig-part2',
      title: 'Cheesy Pig Part 2',
      description: 'Second promotional flyer for The Cheesy Pig',
      template: 'cheesy-pig-part2'
    }
  ];
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all flyers
app.get('/api/flyers', (req, res) => {
  try {
    const flyers = flyerData.map(flyer => ({
      id: flyer.id,
      title: flyer.title,
      description: flyer.description
    }));
    res.json(flyers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flyers' });
  }
});

// Get specific flyer by ID
app.get('/api/flyers/:id', (req, res) => {
  try {
    const flyer = flyerData.find(f => f.id === req.params.id);
    if (!flyer) {
      return res.status(404).json({ error: 'Flyer not found' });
    }
    
    // Load template HTML
    const templatePath = join(__dirname, `../templates/${flyer.template}.ejs`);
    let html = '';
    
    try {
      html = fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      html = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1>${flyer.title}</h1>
          <p>${flyer.description}</p>
          <p>Template: ${flyer.template}</p>
        </div>
      `;
    }
    
    res.json({
      id: flyer.id,
      title: flyer.title,
      html
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flyer' });
  }
});

// Generate flyer HTML
app.post('/api/flyers/generate', (req, res) => {
  try {
    const { template, data } = req.body;
    
    if (!template || !data) {
      return res.status(400).json({ error: 'Template and data are required' });
    }
    
    // Here you would generate the flyer HTML based on template and data
    const html = `
      <div style="padding: 20px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #FF6B35;">${data.title || 'Generated Flyer'}</h1>
        <p>${data.description || 'Generated content'}</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Template: ${template}</h3>
          <p>Generated at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
    
    res.json({ html });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate flyer' });
  }
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 FlairForge Backend running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  // eslint-disable-next-line no-console
  console.log(`📋 API docs: http://localhost:${PORT}/api/flyers`);
}); 
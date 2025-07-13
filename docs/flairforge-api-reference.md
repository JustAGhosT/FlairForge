# FlairForge API Reference

**API Name**: FlairForge Flyer Generation API  
**Version**: v1.0  
**Base URL**: `https://flairforge.netlify.app/.netlify/functions/api`  
**Related Skill Pack**: AI Enhancement Skill Pack  
**Mesh Layer**: Business  
**Owner**: FlairForge Development Team  
**Last Updated**: 2024-01-15

## TL;DR

RESTful API for generating professional flyers using AI-powered templates and content enhancement. Integrate flyer generation into your applications with simple HTTP requests.

## Quick Start Guide

### Authentication

```bash
# Currently no authentication required for MVP
# Future versions will support API keys
curl -X GET https://flairforge.netlify.app/.netlify/functions/api/health
```

### First API Call

```bash
# Example: Generate a flyer
curl -X POST https://flairforge.netlify.app/.netlify/functions/api/generate-flyer \
  -H "Content-Type: application/json" \
  -d '{
    "template": "cheesy-pig",
    "data": {
      "title": "Grand Opening Sale!",
      "description": "Join us for amazing deals",
      "contact": "555-0123"
    }
  }'
```

## OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: FlairForge Flyer Generation API
  description: |
    **Purpose**: Generate professional flyers using AI-powered templates and content enhancement
    
    **Mesh Layer**: Business Applications
    
    **Rate Limits**: 100 requests/hour per IP (free tier)
    
    **Mesh Intelligence**: This API leverages the Cognitive Mesh's Reasoning layer for content analysis
    and the Metacognitive layer for layout optimization, ensuring professional and engaging flyers.
    
  version: 1.0.0
  contact:
    name: FlairForge API Support
    url: https://flairforge.netlify.app/support
    email: api-support@flairforge.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://flairforge.netlify.app/.netlify/functions/api
    description: Production
  - url: https://staging-flairforge.netlify.app/.netlify/functions/api
    description: Staging
  - url: http://localhost:8888/.netlify/functions/api
    description: Local Development

components:
  schemas:
    FlyerRequest:
      type: object
      required:
        - template
        - data
      properties:
        template:
          type: string
          description: Template identifier
          example: "cheesy-pig"
        data:
          type: object
          description: Flyer content data
          properties:
            title:
              type: string
              description: Main headline
              example: "Grand Opening Sale!"
            description:
              type: string
              description: Detailed description
              example: "Join us for amazing deals and special offers"
            contact:
              type: string
              description: Contact information
              example: "555-0123"
            logo:
              type: string
              description: Base64 encoded logo image
              format: base64
        options:
          type: object
          description: Generation options
          properties:
            format:
              type: string
              enum: [png, pdf, jpg]
              default: "png"
            quality:
              type: integer
              minimum: 1
              maximum: 100
              default: 90
            ai_enhancement:
              type: boolean
              default: true
    
    FlyerResponse:
      type: object
      properties:
        success:
          type: boolean
        flyer_url:
          type: string
          description: URL to generated flyer
        flyer_data:
          type: string
          description: Base64 encoded flyer data
          format: base64
        metadata:
          $ref: '#/components/schemas/FlyerMetadata'
        status:
          type: string
          enum: [success, processing, failed]
    
    FlyerMetadata:
      type: object
      properties:
        template_used:
          type: string
        generation_time_ms:
          type: integer
        file_size_bytes:
          type: integer
        ai_enhancements_applied:
          type: array
          items:
            type: string
        mesh_processing_layer:
          type: string
          enum: [foundation, reasoning, metacognitive, agency, business]
    
    Template:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        category:
          type: string
        preview_url:
          type: string
        dimensions:
          type: object
          properties:
            width:
              type: integer
            height:
              type: integer
    
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
        details:
          type: object
          description: Additional error details
        mesh_context:
          type: object
          description: Mesh-specific error context

paths:
  /health:
    get:
      summary: Health check
      description: |
        Check the health status of the FlairForge API.
        
        **Mesh Layer**: Business (health monitoring)
        **Rate Limit**: 100 requests per minute
      responses:
        '200':
          description: API is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "OK"
                  message:
                    type: string
                    example: "FlairForge API is running"
                  timestamp:
                    type: string
                    format: date-time
                  version:
                    type: string
                    example: "1.0.0"

  /generate-flyer:
    post:
      summary: Generate a flyer
      description: |
        Generate a professional flyer using AI-powered templates and content enhancement.
        
        **Mesh Intelligence**: Leverages the Reasoning layer for content analysis and
        the Metacognitive layer for layout optimization
        **Processing Time**: Typically 2-5 seconds depending on content complexity
        **Rate Limit**: 100 requests per hour
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FlyerRequest'
            examples:
              promotional_flyer:
                summary: Create a promotional flyer
                value:
                  template: "cheesy-pig"
                  data:
                    title: "Grand Opening Sale!"
                    description: "Join us for amazing deals and special offers. 50% off everything!"
                    contact: "555-0123 | info@example.com"
                  options:
                    format: "png"
                    quality: 90
                    ai_enhancement: true
      responses:
        '200':
          description: Flyer generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FlyerResponse'
              examples:
                success_response:
                  summary: Successful flyer generation
                  value:
                    success: true
                    flyer_url: "https://flairforge.netlify.app/flyers/abc123.png"
                    flyer_data: "iVBORw0KGgoAAAANSUhEUgAA..."
                    metadata:
                      template_used: "cheesy-pig"
                      generation_time_ms: 2340
                      file_size_bytes: 156789
                      ai_enhancements_applied: ["text_optimization", "layout_improvement"]
                      mesh_processing_layer: "business"
                    status: "success"
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '429':
          description: Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /templates:
    get:
      summary: List available templates
      description: |
        Get a list of all available flyer templates.
        
        **Mesh Layer**: Business (template management)
        **Rate Limit**: 1000 requests per hour
      parameters:
        - name: category
          in: query
          schema:
            type: string
          description: Filter templates by category
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
          description: Number of templates to return
      responses:
        '200':
          description: Templates retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  templates:
                    type: array
                    items:
                      $ref: '#/components/schemas/Template'
                  total_count:
                    type: integer
                  categories:
                    type: array
                    items:
                      type: string

  /templates/{template_id}:
    get:
      summary: Get template details
      description: |
        Get detailed information about a specific template.
        
        **Mesh Layer**: Business (template details)
        **Rate Limit**: 1000 requests per hour
      parameters:
        - name: template_id
          in: path
          required: true
          schema:
            type: string
          description: Template identifier
      responses:
        '200':
          description: Template details retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Template'
        '404':
          description: Template not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /batch-generate:
    post:
      summary: Generate multiple flyers
      description: |
        Generate multiple flyers from batch data.
        
        **Mesh Layer**: Business (batch processing)
        **Rate Limit**: 10 requests per hour
        **Batch Size**: Maximum 50 flyers per request
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                template:
                  type: string
                  description: Template to use for all flyers
                batch_data:
                  type: array
                  items:
                    $ref: '#/components/schemas/FlyerRequest'
                  maxItems: 50
                options:
                  type: object
                  description: Global options for all flyers
      responses:
        '202':
          description: Batch processing started
          content:
            application/json:
              schema:
                type: object
                properties:
                  batch_id:
                    type: string
                  status:
                    type: string
                    example: "processing"
                  total_flyers:
                    type: integer
                  estimated_completion:
                    type: string
                    format: date-time
```

## Endpoint Reference

| Endpoint          | Method | Purpose                  | Mesh Layer | Rate Limit | Auth Required |
| ----------------- | ------ | ------------------------ | ---------- | ---------- | ------------- |
| `/health`         | GET    | Health check             | Business   | 100/min    | No            |
| `/generate-flyer` | POST   | Generate single flyer    | Business   | 100/hour   | No            |
| `/templates`      | GET    | List templates           | Business   | 1000/hour  | No            |
| `/templates/{id}` | GET    | Get template details     | Business   | 1000/hour  | No            |
| `/batch-generate` | POST   | Generate multiple flyers | Business   | 10/hour    | No            |

## Error Codes

| HTTP Status | Error Code            | Description                     | Mesh Context                  |
| ----------- | --------------------- | ------------------------------- | ----------------------------- |
| 400         | `INVALID_REQUEST`     | Request validation failed       | Check request schema          |
| 404         | `TEMPLATE_NOT_FOUND`  | Template does not exist         | Verify template ID            |
| 413         | `PAYLOAD_TOO_LARGE`   | Request body too large          | Reduce image size or content  |
| 429         | `RATE_LIMIT_EXCEEDED` | Too many requests               | Implement exponential backoff |
| 500         | `GENERATION_FAILED`   | Flyer generation failed         | Check content and try again   |
| 503         | `SERVICE_UNAVAILABLE` | Service temporarily unavailable | Retry after specified time    |

## SDK and Code Examples

### JavaScript SDK

```javascript
class FlairForgeAPI {
  constructor(baseUrl = 'https://flairforge.netlify.app/.netlify/functions/api') {
    this.baseUrl = baseUrl;
  }

  async generateFlyer(template, data, options = {}) {
    const response = await fetch(`${this.baseUrl}/generate-flyer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template,
        data,
        options: {
          format: 'png',
          quality: 90,
          ai_enhancement: true,
          ...options
        }
      })
    });

    return response.json();
  }

  async getTemplates(category = null) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    
    const response = await fetch(`${this.baseUrl}/templates?${params}`);
    return response.json();
  }
}

// Usage example
const api = new FlairForgeAPI();

const flyer = await api.generateFlyer('cheesy-pig', {
  title: 'Grand Opening Sale!',
  description: 'Join us for amazing deals',
  contact: '555-0123'
});

console.log('Flyer URL:', flyer.flyer_url);
```

### Python SDK

```python
import requests
import base64

class FlairForgeAPI:
    def __init__(self, base_url="https://flairforge.netlify.app/.netlify/functions/api"):
        self.base_url = base_url
    
    def generate_flyer(self, template, data, options=None):
        if options is None:
            options = {}
        
        payload = {
            "template": template,
            "data": data,
            "options": {
                "format": "png",
                "quality": 90,
                "ai_enhancement": True,
                **options
            }
        }
        
        response = requests.post(
            f"{self.base_url}/generate-flyer",
            json=payload
        )
        
        return response.json()
    
    def get_templates(self, category=None):
        params = {}
        if category:
            params['category'] = category
        
        response = requests.get(f"{self.base_url}/templates", params=params)
        return response.json()

# Usage example
api = FlairForgeAPI()

flyer = api.generate_flyer('cheesy-pig', {
    'title': 'Grand Opening Sale!',
    'description': 'Join us for amazing deals',
    'contact': '555-0123'
})

print(f"Flyer URL: {flyer['flyer_url']}")
```

## Webhooks

### Webhook Events

| Event             | Description                | Mesh Layer |
| ----------------- | -------------------------- | ---------- |
| `flyer.generated` | Flyer generation completed | Business   |
| `batch.completed` | Batch processing finished  | Business   |
| `error.occurred`  | Processing error           | Business   |

### Webhook Payload Example

```json
{
  "event": "flyer.generated",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "flyer_id": "flyer_123",
    "template": "cheesy-pig",
    "status": "success",
    "flyer_url": "https://flairforge.netlify.app/flyers/abc123.png"
  },
  "mesh_metadata": {
    "processing_layer": "business",
    "generation_time_ms": 2340
  }
}
```

## Rate Limiting

### Rate Limit Headers

``` text
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1641811200
X-RateLimit-Retry-After: 60
```

### Best Practices

- Implement exponential backoff for rate limit errors
- Cache template data where appropriate
- Use batch endpoints for multiple flyers
- Monitor rate limit headers in responses

## Testing and Validation

### Test Environment

- **Base URL**: `https://staging-flairforge.netlify.app/.netlify/functions/api`
- **Test Templates**: Use template IDs starting with "test-"
- **Rate Limits**: Reduced limits for testing

### Validation Checklist

- [ ] Health endpoint responds correctly
- [ ] Flyer generation works with sample data
- [ ] Template listing returns expected data
- [ ] Error handling functions correctly
- [ ] Rate limiting behaves as documented

## Support and Resources

### Documentation Links

- [FlairForge User Guide](./user-guide-getting-started-with-flairforge.md)
- [Template Gallery](https://flairforge.netlify.app/templates)
- [API Status Page](https://status.flairforge.netlify.app)

### Support Channels

- **Email Support**: [Email Support](api-support@flairforge.com)
- **Documentation**: [FlairForge Docs](https://docs.flairforge.netlify.app)
- **Community**: [GitHub Discussions](https://github.com/flairforge/discussions)

### Changelog

- **v1.0.0** (2024-01-15): Initial API release
- **v1.0.1** (2024-01-20): Added batch generation endpoint
- **v1.1.0** (2024-02-01): Enhanced error responses and webhooks

## Appendices

### A. Template Categories

- **Promotional**: Sales, events, announcements
- **Business**: Professional services, corporate
- **Creative**: Artistic, design-focused layouts
- **Simple**: Minimal, clean designs

### B. Performance Benchmarks

- **Single Flyer**: 2-5 seconds average
- **Batch Processing**: 10-30 seconds per flyer
- **Template Loading**: < 1 second
- **Health Check**: < 100ms

### C. Security Considerations

- All requests are logged for monitoring
- Input validation prevents injection attacks
- Rate limiting prevents abuse
- No sensitive data is stored

### D. Migration Guide

Instructions for migrating from previous API versions (when applicable).

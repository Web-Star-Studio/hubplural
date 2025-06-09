import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

// Validation function
function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!data.name || data.name.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Assunto deve ter pelo menos 5 caracteres');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  // Length validations
  if (data.name && data.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)');
  }

  if (data.email && data.email.length > 150) {
    errors.push('E-mail muito longo (máximo 150 caracteres)');
  }

  if (data.phone && data.phone.length > 20) {
    errors.push('Telefone muito longo (máximo 20 caracteres)');
  }

  if (data.company && data.company.length > 100) {
    errors.push('Nome da empresa muito longo (máximo 100 caracteres)');
  }

  if (data.subject && data.subject.length > 150) {
    errors.push('Assunto muito longo (máximo 150 caracteres)');
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Mensagem muito longa (máximo 1000 caracteres)');
  }

  return { isValid: errors.length === 0, errors };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Rate limiting (simple in-memory store)
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionLog.get(ip) || [];
  
  // Clean old submissions (older than 1 hour)
  const recentSubmissions = submissions.filter(time => now - time < 3600000);
  
  // Allow max 5 submissions per hour
  if (recentSubmissions.length >= 5) {
    return true;
  }
  
  // Update the log
  recentSubmissions.push(now);
  submissionLog.set(ip, recentSubmissions);
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em 1 hora.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Sanitize inputs
    const formData: ContactFormData = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      phone: sanitizeInput(body.phone || ''),
      company: sanitizeInput(body.company || ''),
      subject: sanitizeInput(body.subject || ''),
      message: sanitizeInput(body.message || ''),
      interest: sanitizeInput(body.interest || ''),
    };

    // Validate data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.errors },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email via service like SendGrid, Nodemailer, etc.
    // 2. Save to database
    // 3. Send to CRM
    // 4. Send to Slack/Discord notification
    
    // For now, we'll just log the submission and return success
    console.log('📧 Nova mensagem de contato recebida:', {
      nome: formData.name,
      email: formData.email,
      empresa: formData.company || 'Não informado',
      telefone: formData.phone || 'Não informado',
      interesse: formData.interest || 'Não especificado',
      assunto: formData.subject,
      mensagem: formData.message,
      timestamp: new Date().toISOString(),
      ip: ip
    });

    // You would replace this with actual email sending logic
    // Example with hypothetical email service:
    /*
    await sendEmail({
      to: 'contato@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      replyTo: formData.email
    });

    // Send confirmation email to user
    await sendEmail({
      to: formData.email,
      subject: 'Confirmação - Hub Plural',
      html: generateConfirmationTemplate(formData.name)
    });
    */

    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}

// Optional: Generate email template
function generateEmailTemplate(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f59e0b; padding: 20px; text-align: center;">
        <h1 style="color: black; margin: 0; font-weight: bold; text-transform: uppercase;">
          Hub Plural
        </h1>
        <p style="color: black; margin: 5px 0 0 0;">Nova mensagem de contato</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #333; margin-bottom: 20px;">Dados do Contato:</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Nome:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telefone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          ` : ''}
          ${data.company ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Empresa:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
          </tr>
          ` : ''}
          ${data.interest ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interesse:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.interest}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Assunto:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.subject}</td>
          </tr>
        </table>
        
        <h3 style="color: #333; margin: 30px 0 15px 0;">Mensagem:</h3>
        <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #f59e0b; margin-bottom: 30px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          Esta mensagem foi enviada através do formulário de contato do site Hub Plural.
        </p>
      </div>
    </div>
  `;
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
} 
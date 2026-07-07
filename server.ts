import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Lazy-initialized SMTP transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

// API endpoint to process checkout and send order details directly via email
app.post("/api/send-order", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, customerAddress, cartItems, cartTotal, isAr } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !cartItems || !cartTotal) {
      return res.status(400).json({ error: "Missing required checkout fields" });
    }

    const orderDetailsText = cartItems.map((item: any) => {
      const pName = isAr ? item.product.nameAr : item.product.name;
      return `- ${pName} x ${item.quantity} ($${item.product.price}.00 each)`;
    }).join('\n');

    const orderDetailsHtml = cartItems.map((item: any) => {
      const pName = isAr ? item.product.nameAr : item.product.name;
      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${pName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${item.product.price}.00</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${item.product.price * item.quantity}.00</td>
        </tr>
      `;
    }).join('');

    const subject = isAr 
      ? `طلب شراء شاي جديد من ${customerName}` 
      : `New Premium Tea Order from ${customerName}`;

    const textBody = isAr 
      ? `مرحباً،\n\nلقد تم استلام طلب شراء للمنتجات التالية:\n\n${orderDetailsText}\n\nالمجموع الإجمالي: $${cartTotal}.00\n\nتفاصيل المشتري:\n- الاسم: ${customerName}\n- البريد الإلكتروني: ${customerEmail}\n- الهاتف: ${customerPhone}\n- العنوان: ${customerAddress}\n\nشكراً لك!`
      : `Hello,\n\nA new premium tea order has been received:\n\n${orderDetailsText}\n\nTotal Amount: $${cartTotal}.00\n\nBuyer Details:\n- Name: ${customerName}\n- Email: ${customerEmail}\n- Phone: ${customerPhone}\n- Shipping Address: ${customerAddress}\n\nThank you!`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #8e7046; border-bottom: 2px solid #8e7046; padding-bottom: 10px; margin-top: 0;">
          ${isAr ? 'طلب شراء شاي جديد' : 'New Tea Order Received'}
        </h2>
        <p style="color: #555;">
          ${isAr 
            ? 'لقد تم استلام طلب شراء شاي جديد بالتفاصيل التالية:' 
            : 'A new premium tea order has been placed. Details below:'}
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">${isAr ? 'المنتج' : 'Product'}</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">${isAr ? 'الكمية' : 'Qty'}</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">${isAr ? 'السعر' : 'Price'}</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">${isAr ? 'المجموع' : 'Total'}</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetailsHtml}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td colspan="3" style="padding: 8px; text-align: right; border-top: 2px solid #ddd;">${isAr ? 'المجموع الكلي' : 'Grand Total'}:</td>
              <td style="padding: 8px; text-align: right; border-top: 2px solid #ddd; color: #8e7046;">$${cartTotal}.00</td>
            </tr>
          </tfoot>
        </table>

        <div style="background-color: #fdfaf6; padding: 15px; border-radius: 6px; border-left: 4px solid #8e7046;">
          <h3 style="margin-top: 0; color: #8e7046; font-size: 16px;">${isAr ? 'تفاصيل المشتري' : 'Buyer Details'}</h3>
          <ul style="list-style: none; padding: 0; margin: 0; color: #444; line-height: 1.6;">
            <li><strong>${isAr ? 'الاسم' : 'Name'}:</strong> ${customerName}</li>
            <li><strong>${isAr ? 'البريد الإلكتروني' : 'Email'}:</strong> ${customerEmail}</li>
            <li><strong>${isAr ? 'الهاتف' : 'Phone'}:</strong> ${customerPhone}</li>
            <li><strong>${isAr ? 'عنوان الشحن' : 'Address'}:</strong> ${customerAddress}</li>
          </ul>
        </div>
      </div>
    `;

    const transporter = getTransporter();
    const recipient = process.env.SMTP_TO || "mohammedh.handi@gmail.com";
    const sender = process.env.SMTP_FROM || `"Premium Tea Shop" <${process.env.SMTP_USER || "no-reply@example.com"}>`;

    if (!transporter) {
      // SMTP not configured - log order to terminal and return simulated success
      console.log("=== [SIMULATED EMAIL ORDER DISPATCH] ===");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content:\n${textBody}`);
      console.log("========================================");

      return res.json({
        success: true,
        simulated: true,
        message: "Order processed successfully! SMTP configuration is not yet active in AI Studio Secrets, so this order was printed directly to the system console. Please configure SMTP variables to send real emails.",
        recipient,
        order: { customerName, customerEmail, cartTotal }
      });
    }

    // SMTP configured - send actual email!
    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: textBody,
      html: htmlBody,
    });

    res.json({
      success: true,
      simulated: false,
      message: "Order placed successfully! A secure confirmation email has been sent directly to sales.",
      recipient
    });

  } catch (err: any) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: err.message || "Failed to send email order." });
  }
});

// Serve static build or proxy Vite in development
const start = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
};

start();

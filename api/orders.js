export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const orderId = `ALN-${Math.floor(10000 + Math.random() * 90000)}`;
    const createdOrder = {
      id: orderId,
      status: 'pending',
      payment_status: body.payment_method === 'apple_pay' ? 'paid' : 'pending_transfer',
      notification_recipient: 'foxx20041@hotmail.com',
      createdAt: new Date().toISOString(),
      ...body,
    };
    return res.status(201).json({ success: true, data: createdOrder });
  }

  return res.status(200).json({ success: true, data: [] });
}

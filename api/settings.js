export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    data: {
      store_name_en: "Al Namoos Veterinary Store & Pharmacy",
      store_name_ar: "متجر وصيدلية الناموس البيطرية",
      tagline_en: "Trusted Desert Veterinary Specialist | Delivery Across GCC",
      tagline_ar: "الخبير البيطري الموثوق | توصيل لكافة دول مجلس التعاون الخليجي",
      primary_whatsapp: "+968 9526 6144",
      sales_whatsapp_1: "+968 9526 6144",
      sales_whatsapp_2: "+968 9951 9155",
      sales_whatsapp_3: "+971 56 297 3007",
      doctor_consultation_1: "+968 9469 4666",
      doctor_consultation_2: "+968 7964 4471",
      email: "foxx20041@hotmail.com",
      omr_to_aed: 9.55
    }
  });
}

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const dictionary = {
  ar: {
    // Header & Global
    storeName: "AL-NAMOOS VET CLINIC",
    brandName: "AL-NAMOOS VET CLINIC",
    tagline: "رعاية • إلتزام • تميز | سلطنة عُمان والخليج",
    home: "الرئيسية",
    shop: "المتجر البيطري",
    categories: "الفئات والحيوانات",
    consultation: "استشر الطبيب",
    aboutUs: "عن الناموس",
    contactUs: "اتصل بنا",
    deliveryPolicy: "سياسة التوصيل والظروف البيطرية",
    termsPrivacy: "الشروط والخصوصية",
    adminPanel: "لوحة التحكم",
    searchPlaceholder: "ابحث عن دواء، فيتامين، علف، أو رقم SKU...",
    cart: "سلة الشراء",
    account: "حسابي",
    myOrders: "طلباتي",
    addresses: "العناوين",
    wishlist: "المفضلة",
    profile: "الملف الشخصي",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    
    // Species
    camel: "الهجن والإبل",
    horse: "الخيل والفروسية",
    cow: "الأبقار والماشية",
    allSpecies: "جميع الحيوانات",
    
    // Product Types
    medicine: "الأدوية البيطرية",
    supplements: "المكملات والفيتامينات",
    feed: "الأعلاف والتغذية",
    equipment: "المعدات والمستلزمات",
    allTypes: "جميع الفئات",

    // Banner & Hero
    heroTitle: "الخبير البيطري الموثوق لإبل وهجن وجياد الخليج",
    heroSubtitle: "أدوية بيطرية معتمدة، مكملات الأداء، أعلاف تخصصية ومعدات عالية الجودة للإبل والخيل والمواشي.",
    exploreStore: "تصفّح المتجر",
    askDoctor: "استشر الطبيب البيطري",
    freeShippingNotice: "⚡ شحن مجاني لكافة دول الخليج للطلبات أكثر من 50 ر.ع (~477 د.إ)",
    trustedSpecialist: "صيدلية بيطرية مرخصة بعمان ودول الخليج",
    veterinaryFormulas: "تركيبات صيدلانية معتمدة ومبرّدة",
    expressGccDelivery: "توصيل مبرّد وسريع لكافة دول الخليج",

    // Product Card & Details
    inStock: "متوفر بالمخزون",
    outOfStock: "نفذت الكمية",
    addToCart: "إضافة للسلة",
    buyNow: "شراء الآن",
    viewDetails: "عرض التفاصيل",
    dosageInstructions: "جرعة وطريقة الاستخدام البيطرية",
    usageWarnings: "تعليمات وتحذيرات الاستعمال",
    sku: "رمز المنتج (SKU):",
    category: "الفئة:",
    speciesFit: "مخصص لـ:",
    quantity: "الكمية",
    inquireWhatsapp: "استفسر عن المنتج عبر الواتساب",
    relatedProducts: "منتجات بيطرية ذات صلة",

    // Cart & Checkout
    cartEmpty: "سلة الشراء فارغة حالياً",
    startShopping: "ابدأ التسوق الآن",
    subtotal: "المجموع الفرعي",
    shipping: "رسوم الشحن والتوصيل",
    freeShipping: "مجاني",
    total: "المجموع الإجمالي",
    proceedCheckout: "متابعة الشراء والتسليم",
    deliveryDetails: "تفاصيل عنوان التسليم",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف / الواتساب",
    email: "البريد الإلكتروني",
    country: "الدولة",
    city: "المدينة / المنطقة",
    address: "العنوان التفصيلي (الشارع / رقم المنزل)",
    deliveryOption: "خيار الشحن والتوصيل",
    omanStandard: "توصيل عادي داخل عمان (2 ر.ع)",
    omanExpress: "توصيل سريع مبرّد داخل عمان (3.5 ر.ع)",
    gccStandard: "شحن قياسي لدول الخليج (6.5 ر.ع)",
    gccExpress: "شحن سريع مبرّد لدول الخليج (10 ر.ع)",
    paymentMethod: "طريقة الدفع",
    applePay: "Apple Pay (عبر تطبيق أو هاتف الأبل)",
    bankTransfer: "تحويل بنكي مباشر (بنك مسقط / بنك أبوظبي الإسلامي)",
    bankInstructionsTitle: "تعليمات الدفع عبر التحويل البنكي المباشر",
    bankNotice: "يرجى تحويل المبلغ الإجمالي إلى أحد الحسابات التالية واستخدام رقم الطلب كمرجع للتحويل:",
    adibAccount: "مصرف أبوظبي الإسلامي (ADIB):",
    bankMuscatAccount: "بنك مسقط (Bank Muscat):",
    accountNumber: "رقم الحساب:",
    accountHolder: "اسم الحساب:",
    placeOrder: "تأكيد وإرسال الطلب",
    orderConfirmed: "تم استلام طلبك بنجاح!",
    orderNumber: "رقم الطلب:",
    notifyWhatsapp: "إرسال تأكيد الطلب للواتساب مباشر",

    // Consultation
    askDoctorTitle: "قسم الاستشارات البيطرية — تواصل مع الأطباء المختصين",
    askDoctorSubtitle: "فريقنا البيطري متواجد للرد على استفسارات العلاج، جرعات الإبل والهجن، وبرامج تغذية خيل السباقات.",
    doctor1Name: "د. أحمد الهنائي — بيطري متخصص بالإبل والهجن",
    doctor2Name: "د. سارة الهاشمي — بيطرية تخصص خيل ومواشي",
    callNow: "اتصال مباشر",
    chatWhatsapp: "محادثة واتساب",

    // Footer
    aboutFooter: "AL-NAMOOS VET CLINIC — اسم عريق في عمان ودول الخليج متخصص في أدوية ومكملات وأعلاف الهجن والخيل والمواشي.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات التواصل والفروع",
    rightsReserved: "جميع الحقوق محفوظة © 2026 AL-NAMOOS VET CLINIC.",
  },
  en: {
    // Header & Global
    storeName: "AL-NAMOOS VET CLINIC",
    brandName: "AL-NAMOOS VET CLINIC",
    tagline: "CARE • COMPASSION • COMMITMENT",
    home: "Home",
    shop: "Veterinary Store",
    categories: "Categories & Species",
    consultation: "Ask a Doctor",
    aboutUs: "About Al-Namoos",
    contactUs: "Contact Us",
    deliveryPolicy: "Delivery Policy & Cold Chain",
    termsPrivacy: "Terms & Privacy",
    adminPanel: "Admin Panel",
    searchPlaceholder: "Search medicine, vitamins, feed, or SKU number...",
    cart: "Cart",
    account: "My Account",
    myOrders: "My Orders",
    addresses: "Addresses",
    wishlist: "Wishlist",
    profile: "Profile",
    login: "Login",
    logout: "Logout",
    
    // Species
    camel: "Camels",
    horse: "Horses",
    cow: "Cows & Cattle",
    allSpecies: "All Animals",
    
    // Product Types
    medicine: "Veterinary Medicine",
    supplements: "Supplements & Vitamins",
    feed: "Feed & Nutrition",
    equipment: "Equipment & Supplies",
    allTypes: "All Categories",

    // Banner & Hero
    heroTitle: "Oman's Trusted Desert Veterinary Specialist",
    heroSubtitle: "Certified medicines, performance supplements, specialized feed, and equipment for camels, horses, and livestock.",
    exploreStore: "Explore Store",
    askDoctor: "Ask a Doctor",
    freeShippingNotice: "⚡ FREE GCC SHIPPING ON ORDERS OVER 50 OMR (~477 AED)",
    trustedSpecialist: "Licensed Oman & GCC Veterinary Pharmacy",
    veterinaryFormulas: "Cold-Chain Certified Pharmaceutical Formulas",
    expressGccDelivery: "Express Temperature-Controlled GCC Delivery",

    // Product Card & Details
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    viewDetails: "View Details",
    dosageInstructions: "Veterinary Dosage & Directions",
    usageWarnings: "Usage Instructions & Precautions",
    sku: "SKU:",
    category: "Category:",
    speciesFit: "Species Fit:",
    quantity: "Quantity",
    inquireWhatsapp: "Inquire on WhatsApp",
    relatedProducts: "Related Veterinary Products",

    // Cart & Checkout
    cartEmpty: "Your shopping cart is currently empty",
    startShopping: "Start Shopping Now",
    subtotal: "Subtotal",
    shipping: "Shipping & Handling",
    freeShipping: "Free",
    total: "Total",
    proceedCheckout: "Proceed to Checkout",
    deliveryDetails: "Delivery Address Details",
    fullName: "Full Name",
    phone: "Phone / WhatsApp Number",
    email: "Email Address",
    country: "Country",
    city: "City / Region",
    address: "Detailed Street Address / Villa",
    deliveryOption: "Shipping Method",
    omanStandard: "Standard Oman Delivery (2 OMR)",
    omanExpress: "Express Cold-Chain Oman (3.5 OMR)",
    gccStandard: "Standard GCC Shipping (6.5 OMR)",
    gccExpress: "Express Cold-Chain GCC (10 OMR)",
    paymentMethod: "Payment Method",
    applePay: "Apple Pay",
    bankTransfer: "Direct Bank Transfer (Bank Muscat / ADIB)",
    bankInstructionsTitle: "Direct Bank Transfer Instructions",
    bankNotice: "Please transfer the total amount to one of the bank accounts below using your Order Reference Number:",
    adibAccount: "Abu Dhabi Islamic Bank (ADIB):",
    bankMuscatAccount: "Bank Muscat:",
    accountNumber: "Account Number:",
    accountHolder: "Account Name:",
    placeOrder: "Confirm & Place Order",
    orderConfirmed: "Your Order Has Been Received!",
    orderNumber: "Order Number:",
    notifyWhatsapp: "Send Order Confirmation to WhatsApp Direct",

    // Consultation
    askDoctorTitle: "Veterinary Consultation — Talk to Licensed Doctors",
    askDoctorSubtitle: "Our veterinary team is available for treatment advice, camel race injection schedules, and equine feeding protocols.",
    doctor1Name: "Dr. Ahmed Al Hinai — Camel Specialist",
    doctor2Name: "Dr. Sarah Al Hashimi — Equine & Livestock Specialist",
    callNow: "Call Directly",
    chatWhatsapp: "WhatsApp Chat",

    // Footer
    aboutFooter: "AL-NAMOOS VET CLINIC — Trusted veterinary pharmacy and livestock supplies specialist in Oman and the GCC.",
    quickLinks: "Quick Links",
    contactInfo: "Contact & Branches",
    rightsReserved: "All rights reserved © 2026 AL-NAMOOS VET CLINIC.",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('alnamoos_lang') || 'ar';
  });

  // Fixed LTR layout direction for BOTH English & Arabic as requested by user
  const isRtl = false;

  useEffect(() => {
    localStorage.setItem('alnamoos_lang', language);
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key) => {
    return dictionary[language]?.[key] || dictionary.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

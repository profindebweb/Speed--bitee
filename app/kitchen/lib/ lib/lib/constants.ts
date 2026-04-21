export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: Category;
  isNew?: boolean;
  isSpicy?: boolean;
  calories?: number;
  prepTime?: number;
}

export type Category = "all" | "burgers" | "tacos" | "pizza" | "boxes" | "drinks";

export interface CategoryTab {
  id: Category;
  label: string;
  labelAr: string;
  icon: string;
}

export const categories: CategoryTab[] = [
  { id: "all", label: "All", labelAr: "الكل", icon: "LayoutGrid" },
  { id: "burgers", label: "Burgers", labelAr: "برݣر", icon: "Beef" },
  { id: "tacos", label: "Tacos", labelAr: "تاكوس", icon: "Sandwich" },
  { id: "pizza", label: "Pizza", labelAr: "بيتزا", icon: "Pizza" },
  { id: "boxes", label: "Boxes", labelAr: "بوكسات", icon: "Package" },
  { id: "drinks", label: "Drinks", labelAr: "مشروبات", icon: "CupSoda" },
];

export const menuItems: MenuItem[] = [
  {
    id: "double-cheese-crash",
    name: "Double Cheese Crash",
    nameAr: "دوبل تشيز كراش",
    description: "Two juicy beef patties with melted cheddar, caramelized onions, and secret sauce",
    descriptionAr: "جوج قطع ديال لحم بقري عصيرين، جبنة شيدر دابزة، بصلة محمرة، وصلصة سرية ديالنا — غادي تخلّيك تبكي من الفرحة! 😋",
    price: 83,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "burgers",
    isNew: true,
    isSpicy: true,
    calories: 850,
    prepTime: 8,
  },
  {
    id: "speed-burger",
    name: "Speed Burger",
    nameAr: "سبيد برݣر",
    description: "Classic beef patty with fresh lettuce, tomato, pickles, and Speed sauce",
    descriptionAr: "برݣر كلاسيكي ديال لحم بقري، خص طازج، مطيشة، مخلل، وصلصة سبيد اللي كتجمع الكل — بنة ما كتحسّاش! 👌",
    price: 65,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    category: "burgers",
    calories: 620,
    prepTime: 6,
  },
  {
    id: "spicy-crunch-taco",
    name: "Spicy Crunch Taco",
    nameAr: "تاكوس سبايسي كرانش",
    description: "Crispy chicken strips with spicy mayo, slaw, and fresh cilantro",
    descriptionAr: "شرائح دجاج مقرمش، مايونيز حار، سلطة كول سلو، وشبيطة طازجة — ناري ناري! 🔥 غادي تحرق لسانك وبغا يعاود!",
    price: 45,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    category: "tacos",
    isSpicy: true,
    calories: 420,
    prepTime: 5,
  },
  {
    id: "meat-lovers-pizza",
    name: "Meat Lover's Pizza",
    nameAr: "بيتزا محبي اللحم",
    description: "Loaded with beef, pepperoni, bacon, and mozzarella",
    descriptionAr: "محشية باللحم البقري، بيبروني، لحم مقدد، وموزاريلا دابزة — للي كيحب اللحم بزاف! كل قصعة فيها كنزة ديال لحم! 🍖",
    price: 95,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    category: "pizza",
    calories: 1100,
    prepTime: 12,
  },
  {
    id: "speed-box",
    name: "Speed Box",
    nameAr: "بوكس السرعة",
    description: "Burger, fries, nuggets, and drink - the complete meal",
    descriptionAr: "برݣر، فريت، ناجتس، ومشروب — الوجبة الكاملة! كلشي فبوكس واحد، غادي تشبع وتحس براسك ملك! 👑",
    price: 120,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    category: "boxes",
    isNew: true,
    calories: 1350,
    prepTime: 10,
  },
  {
    id: "orange-fizz",
    name: "Orange Fizz",
    nameAr: "أورانج فيز",
    description: "Fresh orange soda with a twist of lime and mint",
    descriptionAr: "صودا ليمونة طازجة مع لمسة ديال ليم ونعناع — غادي تبرد ليك القلب فهاد الحرارة! 🍊❄️",
    price: 25,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
    category: "drinks",
    calories: 180,
    prepTime: 2,
  },
];

export const darijaPhrases = {
  addToCart: "زيد فالسلة",
  viewCart: "شوف السلة",
  confirmOrder: "أكد الطلبية",
  sendToKitchen: "سيفط للكوزينة",
  emptyCart: "السلة خاوية",
  total: "المجموع",
  notes: "ملاحظات",
  spicy: "حار",
  new: "جديد",
  popular: "الأكثر طلباً",
  minutes: "دقيقة",
  calories: "سعرة",
  table: "طاولة",
  orderNumber: "رقم الطلبية",
  statusNew: "جديدة 🛎",
  statusPreparing: "كايتحضر",
  statusReady: "وجدات ✅",
  urgent: "طولات بزاف! ⏰",
  revenue: "الفلوس ديال اليوم",
  totalOrders: "عدد الطلبيات",
  bestSeller: "اللي كيهبّر",
  connected: "متصل بالكوزينة",
  scanToOrder: "سكانّي واطلب من طاولتك",
  noWaiter: "ما كاينش الانتظار، طلب بلا ما تستنى الخدام",
  welcome: "مرحبا بيك فـ Speed Bite!",
  orderSent: "طلبيتك وصلات للكوزينة! 🎉",
  itemAdded: "زيد فالسلة! ✅",
};


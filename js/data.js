/* GASS SHOPPING BD - demo catalogue.
   Every product, brand, seller and review below is invented for this portfolio project. */
(function (G) {
  'use strict';

  G.COL = {
    sage:  { en: 'Sage',      bn: 'সেজ গ্রিন',  c: '#8fb59a' },
    sand:  { en: 'Sand',      bn: 'বালুরঙ',     c: '#d9c4a2' },
    ink:   { en: 'Ink',       bn: 'কালচে নীল',  c: '#2f3e4a' },
    clay:  { en: 'Clay',      bn: 'মাটিরঙ',     c: '#c97b5f' },
    sky:   { en: 'Sky',       bn: 'আকাশি',      c: '#7fb2d9' },
    plum:  { en: 'Plum',      bn: 'বেগুনি',     c: '#7b5a8c' },
    mist:  { en: 'Mist',      bn: 'ধূসর',       c: '#c3cfcc' },
    lemon: { en: 'Lemon',     bn: 'লেবু',       c: '#e2d25a' },
    rose:  { en: 'Rose',      bn: 'গোলাপি',     c: '#d98fa0' },
    black: { en: 'Black',     bn: 'কালো',       c: '#2a2d2e' },
    white: { en: 'Off-white', bn: 'অফ-হোয়াইট', c: '#e6e9e7' },
    navy:  { en: 'Navy',      bn: 'নেভি',       c: '#31496b' },
    olive: { en: 'Olive',     bn: 'জলপাই',      c: '#7e8a4b' },
    red:   { en: 'Red',       bn: 'লাল',        c: '#c24a45' },
    gold:  { en: 'Gold',      bn: 'সোনালি',     c: '#c9a24a' },
    teal:  { en: 'Teal',      bn: 'টিল',        c: '#2f8f87' }
  };

  G.CATS = [
    { id: 'fashion',     shape: 'hoodie',     en: 'Fashion',            bn: 'ফ্যাশন',            col: 'sage' },
    { id: 'mobiles',     shape: 'phone',      en: 'Mobiles',            bn: 'মোবাইল',            col: 'sky' },
    { id: 'electronics', shape: 'headphones', en: 'Electronics',        bn: 'ইলেকট্রনিক্স',      col: 'plum' },
    { id: 'laptops',     shape: 'laptop',     en: 'Laptops',            bn: 'ল্যাপটপ',           col: 'mist' },
    { id: 'watches',     shape: 'watch',      en: 'Watches',            bn: 'ঘড়ি',              col: 'gold' },
    { id: 'home',        shape: 'kettle',     en: 'Home & Kitchen',     bn: 'ঘর ও রান্নাঘর',     col: 'clay' },
    { id: 'beauty',      shape: 'jar',        en: 'Beauty',             bn: 'বিউটি',             col: 'rose' },
    { id: 'sports',      shape: 'ball',       en: 'Sports',             bn: 'খেলাধুলা',          col: 'olive' },
    { id: 'bags',        shape: 'bag',        en: 'Bags & Travel',      bn: 'ব্যাগ ও ভ্রমণ',     col: 'navy' },
    { id: 'books',       shape: 'book',       en: 'Books & Stationery', bn: 'বই ও স্টেশনারি',    col: 'lemon' },
    { id: 'mart',        shape: 'bottle',     en: 'GASS Mart',          bn: 'গ্যাস মার্ট',       col: 'teal' }
  ];

  var SZ = {
    apparel: ['XS', 'S', 'M', 'L', 'XL'],
    shoe: ['39', '40', '41', '42', '43', '44'],
    ph: ['128 GB', '256 GB'],
    ph2: ['256 GB', '512 GB'],
    lap: ['512 GB SSD', '1 TB SSD']
  };

  /* cat, shape, brand, name en, name bn, price, old price, rating, reviews, stock, colours, options */
  var raw = [
    ['fashion', 'hoodie', 'Padma Wear', 'Light Hooded Tracksuit', 'লাইট হুডেড ট্র্যাকসুট', 3490, 4360, 4.7, 1284, 24, ['sand', 'sage', 'ink'], { sz: 'apparel', flash: 1, mall: 1 }],
    ['fashion', 'tee', 'Padma Wear', 'Organic Cotton Crew Tee', 'অর্গানিক কটন ক্রু টি-শার্ট', 590, 890, 4.5, 932, 120, ['white', 'sage', 'clay', 'navy'], { sz: 'apparel', mall: 1 }],
    ['fashion', 'shoe', 'Karnafuli Gear', 'Cloudstep Running Sneakers', 'ক্লাউডস্টেপ রানিং স্নিকার্স', 2790, 3990, 4.6, 764, 42, ['white', 'sky', 'black'], { sz: 'shoe', flash: 1 }],
    ['fashion', 'hoodie', 'Rongon', 'Zip Fleece Hoodie', 'জিপ ফ্লিস হুডি', 1650, 2200, 4.4, 521, 66, ['olive', 'ink', 'clay'], { sz: 'apparel' }],
    ['fashion', 'tee', 'Rongon', 'Linen Blend Panjabi', 'লিনেন মিশ্রিত পাঞ্জাবি', 1890, 2490, 4.6, 388, 35, ['white', 'sand', 'sage'], { sz: 'apparel' }],
    ['fashion', 'shoe', 'Karnafuli Gear', 'Leather Penny Loafers', 'চামড়ার পেনি লোফার', 2450, 3200, 4.3, 214, 18, ['black', 'clay'], { sz: 'shoe' }],

    ['mobiles', 'phone', 'Jamuna Mobile', 'Jamuna Nova 12 (8/256 GB)', 'যমুনা নোভা ১২ (৮/২৫৬ জিবি)', 28990, 32990, 4.5, 2210, 15, ['black', 'sky', 'sage'], { sz: 'ph2', mall: 1 }],
    ['mobiles', 'phone', 'Jamuna Mobile', 'Jamuna Nova Lite (6/128 GB)', 'যমুনা নোভা লাইট (৬/১২৮ জিবি)', 15490, 17990, 4.3, 1670, 58, ['black', 'mist', 'rose'], { sz: 'ph' }],
    ['mobiles', 'phone', 'Surma Tech', 'Surma S5 Pro 5G', 'সুরমা এস৫ প্রো ৫জি', 42990, 47990, 4.8, 940, 9, ['ink', 'white', 'plum'], { sz: 'ph2', flash: 1, mall: 1 }],

    ['electronics', 'headphones', 'Joar Audio', 'Wireless ANC Headphones', 'ওয়্যারলেস এএনসি হেডফোন', 4290, 6490, 4.6, 1512, 31, ['black', 'sand', 'sky'], { flash: 1, mall: 1 }],
    ['electronics', 'headphones', 'Joar Audio', 'Studio Over-Ear (Wired)', 'স্টুডিও ওভার-ইয়ার (ওয়্যারড)', 1890, 2490, 4.2, 403, 77, ['black', 'red'], {}],
    ['electronics', 'speaker', 'Joar Audio', 'Pocket Bluetooth Speaker', 'পকেট ব্লুটুথ স্পিকার', 1590, 2290, 4.4, 868, 64, ['teal', 'clay', 'black'], { flash: 1 }],

    ['laptops', 'laptop', 'Surma Tech', 'AeroBook 14 (i5, 16 GB)', 'এয়ারবুক ১৪ (আই৫, ১৬ জিবি)', 74990, 84990, 4.7, 356, 7, ['mist', 'ink'], { sz: 'lap', mall: 1 }],
    ['laptops', 'laptop', 'Surma Tech', 'StudyBook 15 (Ryzen 5)', 'স্টাডিবুক ১৫ (রাইজেন ৫)', 56990, 62990, 4.4, 512, 14, ['mist', 'sky'], { sz: 'lap' }],

    ['watches', 'watch', 'Rupsha Time', 'Pulse Smartwatch 2', 'পালস স্মার্টওয়াচ ২', 3290, 4990, 4.5, 2044, 88, ['black', 'sage', 'rose'], { flash: 1, mall: 1 }],
    ['watches', 'watch', 'Rupsha Time', 'Classic Steel Analog', 'ক্লাসিক স্টিল অ্যানালগ', 2190, 2990, 4.6, 640, 29, ['gold', 'mist', 'black'], {}],
    ['watches', 'watch', 'Rupsha Time', 'Kids Fit Band', 'কিডস ফিট ব্যান্ড', 990, 1490, 4.1, 275, 96, ['lemon', 'sky', 'rose'], {}],

    ['home', 'kettle', 'Meghna Home', '1.7 L Electric Kettle', 'ইলেকট্রিক কেটলি ১.৭ লিটার', 1290, 1790, 4.5, 1308, 52, ['white', 'black', 'sage'], { flash: 1 }],
    ['home', 'lamp', 'Meghna Home', 'Warm Glow Table Lamp', 'ওয়ার্ম গ্লো টেবিল ল্যাম্প', 990, 1490, 4.4, 312, 40, ['sand', 'white', 'clay'], {}],
    ['home', 'appliance', 'Meghna Home', 'Digital Air Fryer 4 L', 'ডিজিটাল এয়ার ফ্রায়ার ৪ লিটার', 5990, 7990, 4.6, 1895, 21, ['black', 'white'], { mall: 1 }],
    ['home', 'lamp', 'Meghna Home', 'Rechargeable Study Lamp', 'রিচার্জেবল স্টাডি ল্যাম্প', 790, 1190, 4.3, 702, 83, ['lemon', 'sky', 'rose'], {}],
    ['home', 'bottle', 'Meghna Home', 'Steel Vacuum Flask 750 ml', 'স্টিল ভ্যাকুয়াম ফ্লাস্ক ৭৫০ মি.লি.', 890, 1290, 4.7, 1120, 74, ['sage', 'ink', 'sand'], {}],

    ['beauty', 'jar', 'Shapla Beauty', 'Vitamin C Face Serum 30 ml', 'ভিটামিন সি ফেস সিরাম ৩০ মি.লি.', 790, 1190, 4.5, 1431, 140, ['lemon', 'sand'], { mall: 1 }],
    ['beauty', 'jar', 'Shapla Beauty', 'Aloe Gel Moisturizer', 'অ্যালোভেরা জেল ময়েশ্চারাইজার', 450, 690, 4.4, 989, 200, ['sage', 'mist'], {}],
    ['beauty', 'bottle', 'Shapla Beauty', 'Argan Hair Oil 100 ml', 'আরগান হেয়ার অয়েল ১০০ মি.লি.', 520, 790, 4.3, 610, 150, ['clay', 'gold'], {}],

    ['sports', 'ball', 'Sundarban Outdoors', 'Match Football (Size 5)', 'ম্যাচ ফুটবল (সাইজ ৫)', 1190, 1690, 4.5, 740, 60, ['white', 'red', 'navy'], {}],
    ['sports', 'bottle', 'Sundarban Outdoors', 'Gym Shaker 700 ml', 'জিম শেকার ৭০০ মি.লি.', 390, 590, 4.2, 533, 180, ['black', 'teal', 'plum'], {}],
    ['sports', 'ball', 'Sundarban Outdoors', 'Cricket Tennis Balls (6 pack)', 'ক্রিকেট টেনিস বল (৬ পিস)', 450, 650, 4.6, 1210, 240, ['lemon', 'red'], { flash: 1 }],

    ['bags', 'bag', 'Karnafuli Gear', 'Urban Commuter Backpack 24 L', 'আর্বান কমিউটার ব্যাকপ্যাক ২৪ লি.', 1890, 2690, 4.6, 997, 47, ['ink', 'olive', 'clay'], { flash: 1, mall: 1 }],
    ['bags', 'bag', 'Karnafuli Gear', 'Weekend Duffel Bag', 'উইকেন্ড ডাফেল ব্যাগ', 2190, 2990, 4.3, 241, 25, ['navy', 'sand'], {}],
    ['bags', 'bag', 'Karnafuli Gear', 'Laptop Sleeve 15"', 'ল্যাপটপ স্লিভ ১৫"', 690, 990, 4.4, 458, 110, ['mist', 'black', 'sage'], {}],

    ['books', 'book', 'Ektara Books', 'Daily Focus Planner 2027', 'ডেইলি ফোকাস প্ল্যানার ২০২৭', 450, 650, 4.5, 322, 90, ['sage', 'sand', 'plum'], {}],
    ['books', 'book', 'Ektara Books', 'Bangla Poetry Collection (Hardcover)', 'বাংলা কবিতা সংকলন (হার্ডকভার)', 380, 520, 4.8, 211, 55, ['red', 'navy'], {}],
    ['books', 'book', 'Ektara Books', 'Sketchbook A4, 120 gsm', 'স্কেচবুক এ৪, ১২০ জিএসএম', 320, 450, 4.4, 189, 130, ['white', 'black'], {}],

    ['mart', 'bottle', 'Dhaan Mart', 'Premium Mustard Oil 1 L', 'প্রিমিয়াম সরিষার তেল ১ লিটার', 240, 280, 4.6, 3120, 400, ['gold'], { free: 1 }],
    ['mart', 'jar', 'Dhaan Mart', 'Forest Honey 500 g', 'বনের মধু ৫০০ গ্রাম', 620, 790, 4.7, 1480, 160, ['gold', 'clay'], { free: 1 }],
    ['mart', 'jar', 'Dhaan Mart', 'Chinigura Aromatic Rice 5 kg', 'চিনিগুঁড়া সুগন্ধি চাল ৫ কেজি', 690, 790, 4.5, 2210, 220, ['sand'], { free: 1 }],
    ['mart', 'bottle', 'Dhaan Mart', 'Premium Tea Leaf 400 g', 'প্রিমিয়াম চা পাতা ৪০০ গ্রাম', 320, 380, 4.4, 1770, 300, ['olive', 'clay'], { flash: 1, free: 1 }],
    ['mart', 'jar', 'Dhaan Mart', 'Roasted Cashew Nuts 500 g', 'ভাজা কাজুবাদাম ৫০০ গ্রাম', 890, 1090, 4.6, 640, 120, ['sand', 'clay'], { free: 1 }]
  ];

  G.SELLERS = ['GASS Official', 'Dhanmondi Trade Hub', 'Chattala Store', 'Sylhet Select', 'Banani Brands', 'Rajshahi Retail'];

  G.PRODUCTS = raw.map(function (r, i) {
    var o = r[11] || {};
    var id = i + 1;
    return {
      id: id, cat: r[0], shape: r[1], brand: r[2],
      name: { en: r[3], bn: r[4] },
      price: r[5], old: r[6], rating: r[7], reviews: r[8], stock: r[9],
      cols: r[10],
      sizes: o.sz ? SZ[o.sz] : null,
      sizeKind: r[1] === 'shoe' ? 'shoe' : (r[1] === 'phone' || r[1] === 'laptop') ? 'storage' : 'size',
      flash: !!o.flash, mall: !!o.mall,
      free: !!o.free || r[5] >= 1500,
      sold: 38 + ((id * 37) % 55),
      seller: G.SELLERS[o.mall ? 0 : (id % (G.SELLERS.length - 1)) + 1]
    };
  });

   G.SPEC = {
    fashion: [
      ['Material', 'উপাদান', 'Soft cotton blend', 'নরম কটন মিশ্রণ'],
      ['Fit', 'ফিট', 'Relaxed, unisex', 'ঢিলেঢালা, ইউনিসেক্স'],
      ['Care', 'যত্ন', 'Machine wash cold', 'ঠান্ডা পানিতে মেশিন ওয়াশ'],
      ['Origin', 'উৎপত্তি', 'Made in Bangladesh', 'বাংলাদেশে তৈরি']
    ],
    mobiles: [
      ['Display', 'ডিসপ্লে', '6.7" AMOLED, 120 Hz', '৬.৭" অ্যামোলেড, ১২০ হার্জ'],
      ['Battery', 'ব্যাটারি', '5,000 mAh, 33 W charging', '৫,০০০ mAh, ৩৩ ওয়াট চার্জিং'],
      ['Camera', 'ক্যামেরা', '50 MP main + 8 MP ultrawide', '৫০ MP মেইন + ৮ MP আল্ট্রাওয়াইড'],
      ['Warranty', 'ওয়ারেন্টি', '1 year official', '১ বছর অফিসিয়াল']
    ],
    electronics: [
      ['Connectivity', 'সংযোগ', 'Bluetooth 5.3 / USB-C', 'ব্লুটুথ ৫.৩ / ইউএসবি-সি'],
      ['Battery life', 'ব্যাটারি', 'Up to 30 hours', '৩০ ঘণ্টা পর্যন্ত'],
      ['In the box', 'বক্সে যা থাকছে', 'Device, cable, pouch', 'ডিভাইস, কেবল, পাউচ'],
      ['Warranty', 'ওয়ারেন্টি', '6 months seller', '৬ মাস সেলার ওয়ারেন্টি']
    ],
    laptops: [
      ['Processor', 'প্রসেসর', 'Latest-gen, 8 cores', 'সর্বশেষ জেনারেশন, ৮ কোর'],
      ['Display', 'ডিসপ্লে', '14" FHD IPS, anti-glare', '১৪" এফএইচডি আইপিএস, অ্যান্টি-গ্লেয়ার'],
      ['Weight', 'ওজন', '1.4 kg', '১.৪ কেজি'],
      ['Warranty', 'ওয়ারেন্টি', '2 years official', '২ বছর অফিসিয়াল']
    ],
    watches: [
      ['Case', 'কেস', '44 mm alloy', '৪৪ মি.মি. অ্যালয়'],
      ['Water resistance', 'পানি প্রতিরোধ', '5 ATM', '৫ এটিএম'],
      ['Battery', 'ব্যাটারি', 'Up to 10 days', '১০ দিন পর্যন্ত'],
      ['Warranty', 'ওয়ারেন্টি', '1 year', '১ বছর']
    ],
    home: [
      ['Power', 'পাওয়ার', '220 V, 50 Hz', '২২০ ভোল্ট, ৫০ হার্জ'],
      ['Material', 'উপাদান', 'Food-grade stainless steel', 'ফুড-গ্রেড স্টেইনলেস স্টিল'],
      ['Safety', 'নিরাপত্তা', 'Auto shut-off', 'অটো শাট-অফ'],
      ['Warranty', 'ওয়ারেন্টি', '1 year', '১ বছর']
    ],
    beauty: [
      ['Skin type', 'ত্বকের ধরন', 'All skin types', 'সব ধরনের ত্বক'],
      ['Free from', 'যা নেই', 'Parabens, mineral oil', 'প্যারাবেন, মিনারেল অয়েল'],
      ['Shelf life', 'মেয়াদ', '24 months', '২৪ মাস'],
      ['Origin', 'উৎপত্তি', 'Made in Bangladesh', 'বাংলাদেশে তৈরি']
    ],
    sports: [
      ['Material', 'উপাদান', 'Durable synthetic', 'টেকসই সিনথেটিক'],
      ['Best for', 'উপযুক্ত', 'Training and match play', 'অনুশীলন ও ম্যাচ'],
      ['Weight', 'ওজন', 'Standard', 'স্ট্যান্ডার্ড'],
      ['Warranty', 'ওয়ারেন্টি', '3 months', '৩ মাস']
    ],
    bags: [
      ['Capacity', 'ধারণক্ষমতা', '24 litres', '২৪ লিটার'],
      ['Fabric', 'কাপড়', 'Water-resistant polyester', 'পানি-প্রতিরোধী পলিয়েস্টার'],
      ['Compartments', 'কম্পার্টমেন্ট', '3 main, 2 side', '৩টি মূল, ২টি পাশে'],
      ['Warranty', 'ওয়ারেন্টি', '6 months', '৬ মাস']
    ],
    books: [
      ['Paper', 'কাগজ', 'Acid-free, 120 gsm', 'অ্যাসিড-ফ্রি, ১২০ জিএসএম'],
      ['Pages', 'পৃষ্ঠা', '200+', '২০০+'],
      ['Binding', 'বাঁধাই', 'Stitched spine', 'সেলাই করা স্পাইন'],
      ['Language', 'ভাষা', 'Bangla / English', 'বাংলা / ইংরেজি']
    ],
    mart: [
      ['Pack size', 'প্যাক সাইজ', 'As listed', 'তালিকা অনুযায়ী'],
      ['Storage', 'সংরক্ষণ', 'Cool, dry place', 'ঠান্ডা ও শুকনো জায়গায়'],
      ['Shelf life', 'মেয়াদ', '12 months from packing', 'প্যাকিং থেকে ১২ মাস'],
      ['Origin', 'উৎপত্তি', 'Grown in Bangladesh', 'বাংলাদেশে উৎপাদিত']
    ]
  };

  G.DESC = {
    fashion: ['Cut for everyday wear and made to last through a monsoon of washes. Soft on the skin, easy to layer.', 'প্রতিদিনের পরার জন্য তৈরি, বারবার ধোয়ার পরও টেকসই। ত্বকে নরম, সহজে লেয়ার করা যায়।'],
    mobiles: ['A bright display, a battery that lasts the full day and a camera that holds up in low light.', 'উজ্জ্বল ডিসপ্লে, সারাদিন চলার মতো ব্যাটারি আর কম আলোতেও ভালো ছবির ক্যামেরা।'],
    electronics: ['Clear sound, a comfortable fit and a battery that outlasts your commute.', 'পরিষ্কার সাউন্ড, আরামদায়ক ফিট আর যাতায়াতের চেয়ে বেশি সময় চলা ব্যাটারি।'],
    laptops: ['Light enough for campus, fast enough for work. Built for long days and loadshedding evenings.', 'ক্যাম্পাসে বহনযোগ্য, কাজের জন্য যথেষ্ট দ্রুত। দীর্ঘ দিন আর লোডশেডিংয়ের সন্ধ্যার জন্য তৈরি।'],
    watches: ['Tracks your day without getting in the way. Water resistant and comfortable on the wrist.', 'আপনার দিনের হিসাব রাখে, বিরক্ত করে না। পানি-প্রতিরোধী ও হাতে আরামদায়ক।'],
    home: ['Practical for a busy kitchen or a small flat. Easy to clean and simple to use.', 'ব্যস্ত রান্নাঘর বা ছোট ফ্ল্যাটের জন্য কাজের। পরিষ্কার করা সহজ, চালানোও সহজ।'],
    beauty: ['A light formula that sits well in humid weather. Dermatologically tested.', 'আর্দ্র আবহাওয়ায় মানানসই হালকা ফর্মুলা। ডার্মাটোলজিক্যালি টেস্টেড।'],
    sports: ['Made for the field behind your house as much as the tournament ground.', 'বাড়ির পাশের মাঠ থেকে টুর্নামেন্ট পর্যন্ত, সবখানে ব্যবহারের জন্য।'],
    bags: ['Roomy, water resistant and stitched to carry a full day of books, a laptop and lunch.', 'প্রশস্ত, পানি-প্রতিরোধী আর বই, ল্যাপটপ ও টিফিন বহনের মতো মজবুত সেলাই।'],
    books: ['Made for people who like to write things down. Lies flat, takes ink well.', 'যারা লিখে রাখতে ভালোবাসেন তাদের জন্য। সমান হয়ে খোলে, কালি ভালো ধরে।'],
    mart: ['Sourced from trusted growers and packed fresh. Delivered sealed, with the packing date on the label.', 'বিশ্বস্ত চাষি থেকে সংগ্রহ, তাজা প্যাকিং। সিল করা অবস্থায় পৌঁছায়, লেবেলে প্যাকিংয়ের তারিখ থাকে।']
  };

  G.VOUCHERS = [
    { code: 'GASS50',    type: 'flat', val: 50,  min: 500,  en: '৳50 off orders over ৳500',          bn: '৫০০ টাকার বেশি অর্ডারে ৫০ টাকা ছাড়' },
    { code: 'WELCOME10', type: 'pct',  val: 10,  min: 800,  cap: 300, en: '10% off, up to ৳300',     bn: '১০% ছাড়, সর্বোচ্চ ৩০০ টাকা' },
    { code: 'FREESHIP',  type: 'ship', val: 0,   min: 0,    en: 'Free standard delivery',            bn: 'স্ট্যান্ডার্ড ডেলিভারি ফ্রি' },
    { code: 'FEST100',   type: 'flat', val: 100, min: 1500, en: '৳100 off orders over ৳1,500',       bn: '১,৫০০ টাকার বেশি অর্ডারে ১০০ টাকা ছাড়' },
    { code: 'BKASH15',   type: 'pct',  val: 15,  min: 1000, cap: 150, pay: 'bkash', en: '15% off with bKash, up to ৳150', bn: 'বিকাশে ১৫% ছাড়, সর্বোচ্চ ১৫০ টাকা' }
  ];

  G.GEO = [
    { id: 'Dhaka', en: 'Dhaka', bn: 'ঢাকা', d: [['Dhaka', 'ঢাকা'], ['Faridpur', 'ফরিদপুর'], ['Gazipur', 'গাজীপুর'], ['Gopalganj', 'গোপালগঞ্জ'], ['Kishoreganj', 'কিশোরগঞ্জ'], ['Madaripur', 'মাদারীপুর'], ['Manikganj', 'মানিকগঞ্জ'], ['Munshiganj', 'মুন্সীগঞ্জ'], ['Narayanganj', 'নারায়ণগঞ্জ'], ['Narsingdi', 'নরসিংদী'], ['Rajbari', 'রাজবাড়ী'], ['Shariatpur', 'শরীয়তপুর'], ['Tangail', 'টাঙ্গাইল']] },
    { id: 'Chattogram', en: 'Chattogram', bn: 'চট্টগ্রাম', d: [['Bandarban', 'বান্দরবান'], ['Brahmanbaria', 'ব্রাহ্মণবাড়িয়া'], ['Chandpur', 'চাঁদপুর'], ['Chattogram', 'চট্টগ্রাম'], ['Cumilla', 'কুমিল্লা'], ["Cox's Bazar", 'কক্সবাজার'], ['Feni', 'ফেনী'], ['Khagrachhari', 'খাগড়াছড়ি'], ['Lakshmipur', 'লক্ষ্মীপুর'], ['Noakhali', 'নোয়াখালী'], ['Rangamati', 'রাঙামাটি']] },
    { id: 'Rajshahi', en: 'Rajshahi', bn: 'রাজশাহী', d: [['Bogura', 'বগুড়া'], ['Joypurhat', 'জয়পুরহাট'], ['Naogaon', 'নওগাঁ'], ['Natore', 'নাটোর'], ['Chapainawabganj', 'চাঁপাইনবাবগঞ্জ'], ['Pabna', 'পাবনা'], ['Rajshahi', 'রাজশাহী'], ['Sirajganj', 'সিরাজগঞ্জ']] },
    { id: 'Khulna', en: 'Khulna', bn: 'খুলনা', d: [['Bagerhat', 'বাগেরহাট'], ['Chuadanga', 'চুয়াডাঙ্গা'], ['Jashore', 'যশোর'], ['Jhenaidah', 'ঝিনাইদহ'], ['Khulna', 'খুলনা'], ['Kushtia', 'কুষ্টিয়া'], ['Magura', 'মাগুরা'], ['Meherpur', 'মেহেরপুর'], ['Narail', 'নড়াইল'], ['Satkhira', 'সাতক্ষীরা']] },
    { id: 'Barishal', en: 'Barishal', bn: 'বরিশাল', d: [['Barguna', 'বরগুনা'], ['Barishal', 'বরিশাল'], ['Bhola', 'ভোলা'], ['Jhalokati', 'ঝালকাঠি'], ['Patuakhali', 'পটুয়াখালী'], ['Pirojpur', 'পিরোজপুর']] },
    { id: 'Sylhet', en: 'Sylhet', bn: 'সিলেট', d: [['Habiganj', 'হবিগঞ্জ'], ['Moulvibazar', 'মৌলভীবাজার'], ['Sunamganj', 'সুনামগঞ্জ'], ['Sylhet', 'সিলেট']] },
    { id: 'Rangpur', en: 'Rangpur', bn: 'রংপুর', d: [['Dinajpur', 'দিনাজপুর'], ['Gaibandha', 'গাইবান্ধা'], ['Kurigram', 'কুড়িগ্রাম'], ['Lalmonirhat', 'লালমনিরহাট'], ['Nilphamari', 'নীলফামারী'], ['Panchagarh', 'পঞ্চগড়'], ['Rangpur', 'রংপুর'], ['Thakurgaon', 'ঠাকুরগাঁও']] },
    { id: 'Mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ', d: [['Jamalpur', 'জামালপুর'], ['Mymensingh', 'ময়মনসিংহ'], ['Netrokona', 'নেত্রকোনা'], ['Sherpur', 'শেরপুর']] }
  ];

  /* Reviews are generated from a seed so every product always shows the same ones. */
  var NAMES = [['Rafi Ahmed', 'রাফি আহমেদ'], ['Nusrat Jahan', 'নুসরাত জাহান'], ['Tanvir Hasan', 'তানভীর হাসান'], ['Sadia Islam', 'সাদিয়া ইসলাম'], ['Mehedi Hasan', 'মেহেদী হাসান'], ['Farhana Akter', 'ফারহানা আক্তার'], ['Imran Hossain', 'ইমরান হোসেন'], ['Tasnim Rahman', 'তাসনিম রহমান']];
  var TEXT = {
    5: [['Exactly as shown. Packaging was neat and delivery was quick.', 'ছবির মতোই পেয়েছি। প্যাকেজিং ভালো ছিল, ডেলিভারিও দ্রুত।'], ['Great value for the price. I would buy this again.', 'দামের তুলনায় দারুণ। আবার কিনব।'], ['Better than I expected. Quality feels premium.', 'আশার চেয়ে ভালো। মান প্রিমিয়াম মনে হয়েছে।']],
    4: [['Good quality overall. Delivery took a day longer than promised.', 'মোটের ওপর ভালো মান। ডেলিভারিতে একদিন বেশি লেগেছে।'], ['Works well. The colour looks a little different in daylight.', 'ভালো কাজ করছে। দিনের আলোতে রঙ একটু আলাদা লাগে।']],
    3: [['Okay for the price, nothing special.', 'দামে ঠিকঠাক, বিশেষ কিছু না।']]
  };
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  G.reviewsFor = function (p) {
    var r = rng(p.id * 977), out = [];
    for (var i = 0; i < 5; i++) {
      var star = r() < (p.rating - 3.2) / 2 ? 5 : (r() < 0.75 ? 4 : 3);
      var pool = TEXT[star], tx = pool[Math.floor(r() * pool.length)], nm = NAMES[Math.floor(r() * NAMES.length)];
      out.push({ star: star, name: { en: nm[0], bn: nm[1] }, text: { en: tx[0], bn: tx[1] }, daysAgo: 2 + Math.floor(r() * 60), verified: true });
    }
    return out;
  };

  G.ratingSplit = function (p) {
    var shift = p.rating - 4.4, w = [0.02 - shift * 0.02, 0.03 - shift * 0.03, 0.08 - shift * 0.05, 0.25 - shift * 0.1, 0.62 + shift * 0.2];
    w = w.map(function (x) { return Math.max(0.01, x); });
    var sum = w.reduce(function (a, b) { return a + b; }, 0);
    return w.map(function (x) { return Math.round(x / sum * 100); }).reverse();
  };
})(window.GASS = window.GASS || {});
       

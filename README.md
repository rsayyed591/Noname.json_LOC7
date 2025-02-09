# 🍽️ **अन्नSampark** - Bridging the Gap Between Food Waste & Hunger in India

## 🚀 Overview
India faces a **paradox** where nearly **40% of food produced** goes to waste, while millions suffer from **food insecurity**. Restaurants, grocery stores, and wedding caterers discard **large amounts of edible food daily**, while **food banks and shelters struggle to provide meals** to those in need.

**अन्नSampark** is a **technology-driven platform** that efficiently connects **surplus food donors (restaurants, supermarkets, caterers)** with **NGOs and food banks**, ensuring the **real-time redistribution of food** to those in need.

---

## 🛠️ **Features**
✅ **Real-time Food Matching** - AI-powered system to **match surplus food** with **NGOs and food banks** based on **demand & proximity**.  
✅ **Logistics Optimization** - **GPS-based route planning** for **efficient pickup & delivery** of food.  
✅ **Donor-NGO Platform** - A seamless **web platform** where **donors list surplus food** & **NGOs claim & distribute it**.  
✅ **Quality & Safety Monitoring** - **IoT/AI-based mechanisms** to assess **food freshness & safety compliance**.  
✅ **Blockchain Transparency** - Immutable **ledger** to **track donations, recipients & impact metrics**.  
✅ **Government & FSSAI Compliance** - Ensures **legal food safety guidelines** for large-scale adoption.  

### 🔥 **Bonus Features**
🔹 **Predictive Analytics for Demand Forecasting** - AI models to analyze **historical data** & predict **food demand** for NGOs.  
🔹 **Community Engagement** - **Mobile alerts** for surplus food, volunteer coordination & **real-time impact reports**.  
🔹 **Incentives for Donors** - **Tax benefits, CSR recognition, & reward system** for food donors.  
🔹 **Integration with Local Kirana Stores** - Expands **food redistribution** beyond restaurants to reduce waste at **multiple levels**.  

---

## ⚙️ **Tech Stack**
**Frontend** 🖥️ - [Next.js](https://nextjs.org/)  
**Backend** 🔧 - [Java Spring Boot](https://spring.io/projects/spring-boot)  
**Authentication** 🔑 - [Google OAuth](https://developers.google.com/identity)  
**Maps & Routing** 🗺️ - [Google Maps API](https://developers.google.com/maps)  

---

## 🏆 **Hackathon Details**
**🎯 Hackathon Name:** LOC 7.0 (Lines of Code 7.0)  
**🏢 Organized by:** SVKM's Dwarkadas J. Sanghvi College of Engineering  
**⏳ Duration:** 24 Hours  
**💰 Prize Pool:** ₹3,00,000+  
**🛠️ Domains:** AI, Blockchain, Web, FinTech, Sustainability  

> LOC 7.0, organized by **DJSCE ACM**, is a **24-hour hackathon** where participants collaborate to **create impactful solutions** across **5 diverse domains**.

---

## 👥 **Team - noName.json**
🚀 **Rehan Sayyed**  
🚀 **Bilal Ansari**  
🚀 **Nishikant Raut**  
🚀 **Vivek Chouhan**  

---

## 📂 **Project Structure**
```
noname.json_loc7/
├── .gitignore
├─] .next/ (ignored)
├── components.json
├── eslint.config.mjs
├── image-qaqNbpVP0TjsGZxpeaDnxgsHqxao8C.avif
├─] next-env.d.ts (ignored)
├── next.config.ts
├─] node_modules/ (ignored)
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── admin/
│   ├── bg.jpg
│   ├── ngo/
│   └── restaurant/
├── README.md
├── src/
│   ├── api/
│   │   └── api.js
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── ngosignup/
│   │   │   │   └── page.tsx
│   │   │   ├── restaurantsignup/
│   │   │   │   └── page.tsx
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── add-restaurant/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── ngos/
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── restaurants/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── food-hygine/
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── ngo/
│   │   │   ├── delivery-agent/
│   │   │   │   └── page.tsx
│   │   │   ├── delivery-route/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── previous-donations/
│   │   │   │   └── page.tsx
│   │   │   └── select-order/
│   │   │       ├── page.tsx
│   │   │       └── [orderid]/
│   │   │           └── page.tsx
│   │   ├── page.tsx
│   │   ├── restaurant/
│   │   │   ├── donate-food/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── previous-donations/
│   │   │       └── page.tsx
│   │   └── supermarket/
│   │       ├── donate-food/
│   │       │   └── page.tsx
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── previous-donations/
│   │           └── page.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   ├── RestaurantDetails.tsx
│   │   │   └── stats-card.tsx
│   │   ├── hero-geometric.tsx
│   │   ├── ngo/
│   │   │   ├── MobileNav.tsx
│   │   │   ├── restaurant-skeleton.tsx
│   │   │   ├── stats-card.tsx
│   │   │   └── wobble-card.tsx
│   │   ├── restaurant/
│   │   │   ├── bar-chart.tsx
│   │   │   ├── donation-card.tsx
│   │   │   ├── donation-details-modal.tsx
│   │   │   ├── line-chart.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── stats-card.tsx
│   │   ├── supermarket/
│   │   │   └── MobileNav.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── FileUpload.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       └── textarea.tsx
│   └── lib/
│       ├── schemas/
│       │   └── donate-food-schema.tsx
│       ├── service/
│       │   └── donation.ts
│       ├── types/
│       │   └── donation.ts
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 **Getting Started**
### 🔹 1. Clone the Repository
```bash
git clone https://github.com/your-username/noname.json_loc7.git
cd noname.json_loc7
```

### 🔹 2. Install Dependencies
```bash
npm install
```

### 🔹 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=your_client_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

### 🔹 4. Start the Development Server
```bash
npm run dev
```
The app will be running at **http://localhost:3000** 🎉

---

## 🤝 **Contributing**
Want to contribute? **Pull requests are welcome!**  
1️⃣ Fork the repository  
2️⃣ Create a new branch (`feature-branch`)  
3️⃣ Commit changes & push (`git push origin feature-branch`)  
4️⃣ Open a **PR (Pull Request)**  

---

## 📜 **License**
This project is licensed under the **MIT License**.  

---
💡 **Let’s work together to reduce food waste and feed millions in India!** 🇮🇳

# 🏕️ TravelTrucks — Camper Rental Catalog

A clean and functional camper rental application built with Next.js, featuring advanced filtering, booking form validation, and a favorites system with Local Storage.
The solution is designed to deliver a fast and convenient user experience for travelers.

## Project description

TravelTrucks helps users find the perfect camper for their journey.  
The application provides detailed information about each camper, including photos, specifications, reviews, and booking capabilities.


---

## 🚀 Features

- **Advanced search & filtering**  - Location search with trimming, equipment filters, vehicle types  
- **Equipment badges**  - Semantic `<ul>` lists with icons and accessible layout  
- **Favorites system**  - Persists via Local Storage, updates UI instantly  
- **Dynamic catalog with pagination**  - Seamless loading with loader indicator  
- **Camper rating & review system**  - Stars, counts, proper formatting and UX  
- **Custom-styled datepicker**  - Fully redesigned calendar UI matching Figma layout  
- **Booking form with validation**  - Error and success notifications handled via *iziToast*  
- **State management with Zustand**  - Clear separation of concerns for filters & campers data  
- **Responsive layout**  - Components adapt to various screen widths

---

## 🧱 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - type safety and improved developer experienceч
- **CSS Modules** - modular component styling
- **Zustand** - for state management
- **react-datepicker** - date selection for booking
- **iziToast** - for notifications
- **Next/Image** - for optimized images
- **REST API** (mock backend)
- **Local Storage**  - for favorites persistence

---

## 🧭 Filters & Equipment (UI Overview)

All equipment icons are implemented via SVG sprite.

---

## 📦 Installation & Running Locally

```bash```
npm install
npm run dev

The project will be available at:

http://localhost:3000


## 📁 Project Structure

app/
  catalog/
    [id]/page.tsx     # Camper details page
    page.tsx          # Catalog page
  layout.tsx
  page.tsx  
components/
  BookingDatePicker/
  CamperCard/
  FeaturesList/
  FiltersPanel/
  Header/
  Hero/
  Loader/
lib/
  api.ts 
  constants/
    equipment.ts            # API fetch logic
  store/
    campers.ts       # Zustand store for campers list
    favorites.ts     # Zustand store for favorites
    filters.ts       # Zustand store for filters    
public/
  sprite.svg         # All icons
types/
  camper.ts


## 🧪 Key Functionality

🔹 Filtering
Trim is applied to all text inputs to prevent incorrect search behavior.

🔹 Pagination
Loads data batch by batch with a spinner during loading.

🔹 Favorites
Fully persistent via Local Storage, syncs between sessions.

🔹 Datepicker
Reimplemented header, triangle, weekday layout, typography, and selection states to match Figma.

🔹 Booking Form
Includes:

required field validation

date validation (no past dates)

iziToast notifications

## 🌐 Deployment

The project is deployed on Vercel.
Just push to main and Vercel will auto-build the app.

## 👩‍💻 Author

Anna Yarmolenko
Frontend Developer
Ukraine → Bulgaria 

🔗 GitHub: https://github.com/AnnaYarmolenko
🔗 LinkedIn: https://www.linkedin.com/in/hanna-yarmolenko  
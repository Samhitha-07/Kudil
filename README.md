# Affordable Housing Finder - UI Architecture Document

## 1. Overall Design Philosophy

### User-Centric & Accessible:
- Focus on easy navigation and clarity, avoiding unnecessary clutter.
- Multilingual support to reach a broader audience with language options in the Settings.
- Accessibility features: font size adjustments, high contrast mode, and screen reader support.

### Sustainability & Trust:
- Earth tones and calming colors to inspire trust and provide a welcoming atmosphere.
- Consistent UI patterns (e.g., minimalism similar to Airbnb) for simplicity.
- Icons and illustrations that evoke community and home values.

### Responsive & Modular:
- Prioritize mobile-first design to ensure compatibility with phones, tablets, and desktops.
- Reusable modular components, such as cards and navigation bars, for flexibility in UI updates and consistency.

---

## 2. Suggested Color Palette & Typography

### Color Palette:

#### Primary Colors:
- **Deep Teal (#005F6A):** Headers, primary buttons, active states.
- **Warm Beige (#F5F2E7):** Backgrounds for content sections to maintain a light feel.

#### Secondary Colors:
- **Eco Green (#8BC34A):** Call-to-action elements like buttons, icons.
- **Sky Blue (#03A9F4):** Notifications, links, progress bars.

#### Neutral Colors:
- **Charcoal (#333333):** Primary text for readability.
- **Light Grey (#E0E0E0):** Dividers, borders, disabled elements.
- **White (#FFFFFF):** Backgrounds, surfaces, and cards.

### Typography:
- **Primary Font:** Clean, modern sans-serif like Roboto or Open Sans.
- **Secondary Font (Optional):** A serif font for headers/quotes to add a professional touch.

#### Hierarchy:
- Bold and large sizes for headings (H1, H2).
- Regular weight body text with good line spacing.
- CTAs in contrasting colors to stand out.

---

## 3. Navigation & Global UI Elements

### Global Navigation Bar (Header):
- Fixed top navigation across all pages.
- Elements:
  - Logo (clickable to go to Home/Dashboard).
  - Dynamic links based on user roles (Buyer vs. Seller).
  - User profile icon with dropdown for settings, account info, logout.

### Footer:
- Links to About, Contact, FAQs, Terms of Service, Privacy Policy.
- Social media icons.
- Region-specific resources for housing assistance.

### Global Side Panel (Optional for Desktop):
- **Purpose:** Quick access to filters and notifications.
- **Contents:** Quick filters (price range, location, property type) and notifications/messages.

---

## 4. Detailed Page Architecture

### 4.1 Onboarding & Authentication

#### Landing Page:
- Hero banner with value proposition and primary CTAs.
- Features overview and testimonials carousel.

#### Login/Signup Page:
- Login with email/username, password, and social logins (Google, Facebook).
- Separate sign-up forms for Buyers and Sellers.

#### Role-Specific Onboarding Questionnaire (Buyer/Renter):
1. Choose between Buy or Rent.
2. Set location and budget.
3. Define property features.
4. Confirmation and Start Searching.

### 4.2 Buyer/Renter Experience

#### Buyer Dashboard/Home Page:
- Personalized greeting, quick search bar, dynamic listings carousel.
- Map view toggle to switch between list and map view.

#### Search & Filter Page:
- Left panel: Budget, property type, amenities, location.
- Right panel: Grid/List view for property listings.

#### Property Listing Details Page:
- Property gallery, details, seller profile.
- Interactive buttons: Message landlord, schedule visit, save listing.
- Housing loan calculator widget.

#### Messaging/Communication Page:
- Modern chat interface with conversation list, attachment options.

#### Housing Assistance & Loan Options Page:
- Educational content, loan calculator, and FAQs.

#### Saved Listings/Comparison Page:
- Saved properties gallery with a side-by-side comparison tool.

#### User Profile & Settings Page:
- Editable profile, notification settings, location switch, language selector.
- Account settings (password change, delete account) and logout.

#### Forums & Community Page:
- Categories like neighborhood insights, buying tips.
- Thread details with comments and reply options.

### 4.3 Seller Experience

#### Seller Dashboard/Home Page:
- Summary cards with buyer interactions and quick actions.

#### Post New Listing Page:
1. Property details, pricing, availability, location.
2. Review and submit.

#### Manage Listings Page:
- Table/card view for managing listings: edit, delete, boost, statistics.

#### Buyer Requirement & Inquiry Page:
- Cards summarizing buyer preferences with interaction options.

#### Seller Forum Creation & Management Page:
- Create and manage seller forums.

#### Seller Profile & Reviews Page:
- Editable seller profile with reviews and responses.

#### Notifications & Alerts for Sellers:
- Real-time notifications for messages, inquiries.

---

## 5. Additional Functionalities:

### Chatbot Integration:
- A floating chatbot icon on all pages for user assistance (buyers, renters, sellers).

### Interactive Property Comparison:
- Allow users to compare properties side-by-side with interactive features, such as filtering and sorting.

### Map-Based Search:
- Search properties on an interactive map with draggable radius filters for location-based results.

### Dark Mode:
- Users can toggle between light and dark themes to suit their preference, providing better accessibility.

---

### file structure
affordable-housing-finder/
│── index.html              # Main landing page
│── about.html              # About page
│── contact.html            # Contact page
│── login.html              # Login page
│── signup.html             # Signup page
│── dashboard.html          # Buyer/Seller Dashboard
│── property-list.html      # Search results page
│── property-details.html   # Individual property details page
│── profile.html            # User profile page
│── saved-listings.html     # Saved listings page
│── messages.html           # Messaging interface
│── community.html          # Forums & Community page
│── post-listing.html       # Seller's add property page
│── manage-listings.html    # Seller's property management page
│── settings.html           # User settings page
│
├── assets/
│   ├── css/
│   │   ├── styles.css       # Global styles
│   │   ├── responsive.css   # Responsive styles
│   │   ├── theme.css        # Dark/Light mode styles
│   │
│   ├── js/
│   │   ├── app.js           # Global scripts
│   │   ├── auth.js          # Authentication logic
│   │   ├── dashboard.js     # Dashboard interactions
│   │   ├── search.js        # Search & filters logic
│   │   ├── messages.js      # Chat/messaging functionality
│   │   ├── settings.js      # User settings & preferences
│   │   ├── chatbot.js       # Chatbot integration
│   │
│   ├── images/
│   │   ├── logo.png         # App logo
│   │   ├── banner.jpg       # Hero section banner
│   │   ├── properties/      # Sample property images
│   │
│   ├── icons/
│   │   ├── home.svg         # Home icon
│   │   ├── search.svg       # Search icon
│   │   ├── user.svg         # User profile icon
│
├── components/
│   ├── navbar.html          # Navigation bar component
│   ├── footer.html          # Footer component
│   ├── sidebar.html         # Sidebar component
│   ├── filters.html         # Search filters component
│   ├── property-card.html   # Property listing card
│   ├── chatbot.html         # Chatbot floating UI
│
├── data/                    # Placeholder for JSON/mock data
│   ├── properties.json      # Sample property data
│   ├── users.json           # Sample user data
│
└── README.md                # Project documentation

# Kudil - Affordable Housing Finder

Kudil is a web application that connects home seekers with property owners in India, supporting SDG 11 (Sustainable Cities and Communities). The platform facilitates direct connections for renting and buying properties without intermediaries.

## Features

### For Home Seekers
- Map-based property search
- Housing loan calculator
- Government scheme information
- NGO financial support connections
- Regional language support
- AI chatbot assistance
- Direct messaging with property owners
- Visit scheduling system
- Forums and community engagement

### For Property Owners
- Property listing management
- Direct interaction with potential tenants/buyers
- Community forums
- Profile management
- Requirement matching

## Project Structure
```
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
```

## Getting Started
1. Clone the repository
2. Open index.html in your browser
3. Start developing!

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- Google Maps API

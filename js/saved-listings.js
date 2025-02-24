document.addEventListener('DOMContentLoaded', function() {
    // Sample data - Replace with actual data from your backend
    const savedListings = [
        {
            id: 1,
            image: '../../assets/images/property1.jpg',
            price: '₹25,000/month',
            address: 'Koramangala, Bangalore',
            description: 'Modern 2BHK apartment with excellent amenities',
            bedrooms: 2,
            bathrooms: 2,
            area: '1200 sq ft',
            sustainabilityFeatures: ['Solar Powered', 'Rainwater Harvesting'],
            amenities: ['Gym', 'Pool', 'Security'],
            furnished: 'Semi-Furnished',
            parking: 'Available',
            petFriendly: true
        },
        {
            id: 2,
            image: '../../assets/images/property2.jpg',
            price: '₹35,000/month',
            address: 'Indiranagar, Bangalore',
            description: 'Luxury 3BHK with modern amenities',
            bedrooms: 3,
            bathrooms: 3,
            area: '1800 sq ft',
            sustainabilityFeatures: ['Solar Powered', 'Waste Management', 'EV Charging'],
            amenities: ['Gym', 'Pool', 'Club House', 'Security'],
            furnished: 'Fully Furnished',
            parking: '2 Slots',
            petFriendly: true
        },
        {
            id: 3,
            image: '../../assets/images/property3.jpg',
            price: '₹18,000/month',
            address: 'HSR Layout, Bangalore',
            description: 'Cozy 1BHK perfect for singles',
            bedrooms: 1,
            bathrooms: 1,
            area: '650 sq ft',
            sustainabilityFeatures: ['Energy Efficient'],
            amenities: ['Security', 'Power Backup'],
            furnished: 'Semi-Furnished',
            parking: 'Available',
            petFriendly: false
        },
        {
            id: 4,
            image: '../../assets/images/property4.jpg',
            price: '₹45,000/month',
            address: 'Whitefield, Bangalore',
            description: 'Premium 4BHK villa with garden',
            bedrooms: 4,
            bathrooms: 4,
            area: '2500 sq ft',
            sustainabilityFeatures: ['Solar Powered', 'Rainwater Harvesting', 'Organic Garden'],
            amenities: ['Private Garden', 'Security', 'Modular Kitchen'],
            furnished: 'Semi-Furnished',
            parking: '2 Slots',
            petFriendly: true
        },
        {
            id: 5,
            image: '../../assets/images/property5.jpg',
            price: '₹28,000/month',
            address: 'JP Nagar, Bangalore',
            description: '2BHK with excellent connectivity',
            bedrooms: 2,
            bathrooms: 2,
            area: '1100 sq ft',
            sustainabilityFeatures: ['Energy Efficient', 'Waste Management'],
            amenities: ['Gym', 'Security', 'Children\'s Play Area'],
            furnished: 'Unfurnished',
            parking: 'Available',
            petFriendly: true
        },
        {
            id: 6,
            image: '../../assets/images/property6.jpg',
            price: '₹32,000/month',
            address: 'Electronic City, Bangalore',
            description: 'Modern 3BHK near Tech Park',
            bedrooms: 3,
            bathrooms: 2,
            area: '1600 sq ft',
            sustainabilityFeatures: ['Solar Powered', 'Water Recycling'],
            amenities: ['Gym', 'Pool', 'Security', 'Club House'],
            furnished: 'Fully Furnished',
            parking: 'Available',
            petFriendly: false
        }
    ];

    // Initialize the page
    function initializePage() {
        const listingsGrid = document.getElementById('savedListingsGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (savedListings.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        // Render listings
        savedListings.forEach(listing => {
            listingsGrid.appendChild(createListingCard(listing));
        });

        // Initialize comparison functionality
        initializeComparison();
    }

    // Create a listing card
    function createListingCard(listing) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.description}">
            </div>
            <div class="listing-content">
                <div class="listing-price">${listing.price}</div>
                <div class="listing-address">
                    <i class="fas fa-map-marker-alt"></i> ${listing.address}
                </div>
                <div class="listing-features">
                    <div class="listing-feature">
                        <i class="fas fa-bed"></i> ${listing.bedrooms} Beds
                    </div>
                    <div class="listing-feature">
                        <i class="fas fa-bath"></i> ${listing.bathrooms} Baths
                    </div>
                    <div class="listing-feature">
                        <i class="fas fa-vector-square"></i> ${listing.area}
                    </div>
                </div>
                <div class="sustainability-features">
                    ${listing.sustainabilityFeatures.map(feature => 
                        `<span class="sustainability-badge">
                            <i class="fas fa-leaf"></i> ${feature}
                        </span>`
                    ).join('')}
                </div>
                <div class="listing-actions">
                    <div class="compare-checkbox">
                        <input type="checkbox" id="compare-${listing.id}" class="compare-check">
                        <label for="compare-${listing.id}">Compare</label>
                    </div>
                    <div class="action-buttons">
                        <a href="listing-details.html?id=${listing.id}" class="btn btn-outline-primary">
                            <i class="fas fa-external-link-alt"></i> View Details
                        </a>
                        <button class="btn btn-outline-danger remove-btn" data-id="${listing.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => removeListing(listing.id));

        const compareCheck = card.querySelector('.compare-check');
        compareCheck.addEventListener('change', updateCompareButton);

        return card;
    }

    // Handle view toggle
    const viewToggleButtons = document.querySelectorAll('.view-toggle .btn');
    viewToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewToggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            const listingsGrid = document.getElementById('savedListingsGrid');
            listingsGrid.className = view === 'grid' ? 'listings-grid' : 'listings-list';
        });
    });

    // Remove listing
    function removeListing(id) {
        if (confirm('Are you sure you want to remove this listing from your saved items?')) {
            const listingCard = document.querySelector(`[data-id="${id}"]`).closest('.listing-card');
            listingCard.remove();
            
            // Check if there are any listings left
            const listingsGrid = document.getElementById('savedListingsGrid');
            if (listingsGrid.children.length === 0) {
                document.getElementById('emptyState').style.display = 'block';
            }
        }
    }

    // Compare functionality
    function updateCompareButton() {
        const selectedCount = document.querySelectorAll('.compare-check:checked').length;
        const compareBtn = document.getElementById('compareBtn');
        
        compareBtn.disabled = selectedCount < 2;
        compareBtn.innerHTML = `<i class="fas fa-exchange-alt"></i> Compare ${selectedCount} Selected`;
    }

    function initializeComparison() {
        const compareBtn = document.getElementById('compareBtn');
        const comparisonModal = new bootstrap.Modal(document.getElementById('comparisonModal'));
        
        compareBtn.addEventListener('click', () => {
            const selectedListings = Array.from(document.querySelectorAll('.compare-check:checked'))
                .map(checkbox => {
                    const id = checkbox.id.replace('compare-', '');
                    return savedListings.find(listing => listing.id === parseInt(id));
                });
            
            showComparison(selectedListings);
            comparisonModal.show();
        });
    }

    function showComparison(listings) {
        const comparisonTable = document.getElementById('comparisonTable');
        const features = [
            'price', 'address', 'bedrooms', 'bathrooms', 'area', 'furnished',
            'parking', 'petFriendly', 'sustainabilityFeatures', 'amenities'
        ];
        
        let html = '<table class="table">';
        
        // Header
        html += '<tr><th>Features</th>';
        listings.forEach(listing => {
            html += `<th>
                <img src="${listing.image}" alt="${listing.description}" style="width: 150px; height: 100px; object-fit: cover;">
                <div class="mt-2">${listing.address}</div>
            </th>`;
        });
        html += '</tr>';
        
        // Features
        features.forEach(feature => {
            html += `<tr>
                <td class="fw-bold">${formatFeatureName(feature)}</td>
                ${listings.map(listing => `<td>${formatFeatureValue(listing[feature])}</td>`).join('')}
            </tr>`;
        });
        
        html += '</table>';
        comparisonTable.innerHTML = html;
    }

    function formatFeatureName(feature) {
        return feature.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase());
    }

    function formatFeatureValue(value) {
        if (Array.isArray(value)) return value.join(', ');
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return value;
    }

    // Initialize the page
    initializePage();
});

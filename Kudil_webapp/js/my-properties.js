// My Properties Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const searchInput = document.querySelector('.search-box input');
    const propertyTypeSelect = document.getElementById('propertyType');
    const statusSelect = document.getElementById('status');
    const minPriceInput = document.querySelector('input[placeholder="Min Price"]');
    const maxPriceInput = document.querySelector('input[placeholder="Max Price"]');
    const sortSelect = document.getElementById('sortBy');
    const propertiesGrid = document.querySelector('.properties-grid .row');
    const emptyState = document.querySelector('.empty-state');

    // Sample properties data (replace with actual data from backend)
    let properties = [
        {
            id: 1,
            name: 'Palm Grove Apartments',
            location: 'Whitefield, Bangalore',
            type: 'apartment',
            beds: 3,
            baths: 2,
            price: 25000,
            status: 'active',
            image: '../../images/property-placeholder.jpg',
            dateAdded: new Date('2025-02-15')
        },
        {
            id: 2,
            name: 'Green Valley Villa',
            location: 'HSR Layout, Bangalore',
            type: 'villa',
            beds: 4,
            baths: 3,
            price: 45000,
            status: 'inactive',
            image: '../../images/property-placeholder.jpg',
            dateAdded: new Date('2025-02-10')
        }
    ];

    // Filter and sort properties
    function filterAndSortProperties() {
        let filteredProperties = [...properties];

        // Apply search filter
        if (searchInput.value) {
            const searchTerm = searchInput.value.toLowerCase();
            filteredProperties = filteredProperties.filter(property => 
                property.location.toLowerCase().includes(searchTerm) ||
                property.name.toLowerCase().includes(searchTerm)
            );
        }

        // Apply property type filter
        if (propertyTypeSelect.value) {
            filteredProperties = filteredProperties.filter(property => 
                property.type === propertyTypeSelect.value
            );
        }

        // Apply status filter
        if (statusSelect.value) {
            filteredProperties = filteredProperties.filter(property => 
                property.status === statusSelect.value
            );
        }

        // Apply price range filter
        const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : 0;
        const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : Infinity;
        filteredProperties = filteredProperties.filter(property => 
            property.price >= minPrice && property.price <= maxPrice
        );

        // Apply sorting
        switch(sortSelect.value) {
            case 'newest':
                filteredProperties.sort((a, b) => b.dateAdded - a.dateAdded);
                break;
            case 'oldest':
                filteredProperties.sort((a, b) => a.dateAdded - b.dateAdded);
                break;
            case 'price_low':
                filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                filteredProperties.sort((a, b) => b.price - a.price);
                break;
        }

        displayProperties(filteredProperties);
    }

    // Display properties in the grid
    function displayProperties(propertiesToShow) {
        if (propertiesToShow.length === 0) {
            propertiesGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            propertiesGrid.style.display = 'flex';
            emptyState.style.display = 'none';

            propertiesGrid.innerHTML = propertiesToShow.map(property => `
                <div class="col-md-6 col-lg-4">
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.name}">
                            <span class="status-badge ${property.status}">${property.status}</span>
                        </div>
                        <div class="property-details">
                            <h3>${property.name}</h3>
                            <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                            <div class="property-info">
                                <span><i class="fas fa-${property.type === 'apartment' ? 'building' : 'home'}"></i> ${property.type}</span>
                                <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                                <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                            </div>
                            <div class="price">₹${property.price.toLocaleString()}/month</div>
                            <div class="card-actions">
                                <a href="post-listing.html?id=${property.id}" class="btn btn-outline-primary">
                                    <i class="fas fa-edit"></i> Edit
                                </a>
                                <button class="btn btn-outline-danger" onclick="confirmDelete(${property.id})">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Delete property
    window.confirmDelete = function(propertyId) {
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        const deleteButton = deleteModal._element.querySelector('.btn-danger');
        
        deleteButton.onclick = function() {
            // Remove property from array (replace with API call)
            properties = properties.filter(p => p.id !== propertyId);
            deleteModal.hide();
            filterAndSortProperties();
        };
        
        deleteModal.show();
    };

    // Event listeners for filters
    searchInput.addEventListener('input', filterAndSortProperties);
    propertyTypeSelect.addEventListener('change', filterAndSortProperties);
    statusSelect.addEventListener('change', filterAndSortProperties);
    minPriceInput.addEventListener('input', filterAndSortProperties);
    maxPriceInput.addEventListener('input', filterAndSortProperties);
    sortSelect.addEventListener('change', filterAndSortProperties);

    // Initialize the display
    filterAndSortProperties();
});

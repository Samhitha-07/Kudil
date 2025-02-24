document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // View Toggle
    const viewToggleButtons = document.querySelectorAll('.view-toggle .btn');
    const requirementsGrid = document.querySelector('.requirements-grid');

    viewToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle grid/list view
            const view = this.dataset.view;
            if (view === 'list') {
                requirementsGrid.classList.add('list-view');
            } else {
                requirementsGrid.classList.remove('list-view');
            }
        });
    });

    // Sort Requirements
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', function() {
        const sortType = this.value;
        sortRequirements(sortType);
    });

    // Location Search
    const locationSearch = document.getElementById('locationSearch');
    const locationChips = document.querySelector('.location-chips');

    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addLocationChip(this.value.trim());
            this.value = '';
            applyFilters();
        }
    });

    // Remove location chips
    locationChips.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-times')) {
            e.target.parentElement.remove();
            applyFilters();
        }
    });

    // Bedroom Selection
    const bedroomButtons = document.querySelectorAll('.bedroom-buttons .btn');
    bedroomButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });

    // Reset Filters
    const resetButtons = document.querySelectorAll('.btn-reset-filters');
    resetButtons.forEach(button => {
        button.addEventListener('click', resetFilters);
    });

    // Apply Filters Button
    const applyFiltersBtn = document.querySelector('.btn-apply-filters');
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Mobile Filters Toggle
    const filtersToggle = document.createElement('button');
    filtersToggle.className = 'btn btn-primary d-lg-none filters-toggle';
    filtersToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
    document.querySelector('.requirements-count').appendChild(filtersToggle);

    filtersToggle.addEventListener('click', function() {
        document.querySelector('.filters-sidebar').classList.toggle('show');
    });
});

// Helper Functions
function addLocationChip(location) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${location} <i class="fas fa-times"></i>`;
    document.querySelector('.location-chips').appendChild(chip);
}

function getSelectedLocations() {
    return Array.from(document.querySelectorAll('.location-chips .chip'))
        .map(chip => chip.textContent.trim().replace(' ×', ''));
}

function getSelectedBedrooms() {
    return Array.from(document.querySelectorAll('.bedroom-buttons .btn.active'))
        .map(btn => btn.textContent.trim());
}

function getPriceRange() {
    const minPrice = document.querySelector('.price-inputs input:first-child').value;
    const maxPrice = document.querySelector('.price-inputs input:last-child').value;
    return { min: minPrice, max: maxPrice };
}

function getSelectedPropertyTypes() {
    return Array.from(document.querySelectorAll('.form-check-input:checked'))
        .map(input => input.id);
}

function applyFilters() {
    const filters = {
        locations: getSelectedLocations(),
        propertyTypes: getSelectedPropertyTypes(),
        priceRange: getPriceRange(),
        bedrooms: getSelectedBedrooms()
    };

    const requirements = document.querySelectorAll('.requirement-card');
    let visibleCount = 0;

    requirements.forEach(card => {
        let show = true;

        // Filter by location
        if (filters.locations.length > 0) {
            const cardLocations = card.querySelector('[data-locations]').dataset.locations.split(',');
            if (!filters.locations.some(loc => cardLocations.includes(loc))) {
                show = false;
            }
        }

        // Filter by property type
        if (filters.propertyTypes.length > 0) {
            const cardTypes = card.querySelector('[data-property-types]').dataset.propertyTypes.split(',');
            if (!filters.propertyTypes.some(type => cardTypes.includes(type))) {
                show = false;
            }
        }

        // Filter by price range
        if (filters.priceRange.min || filters.priceRange.max) {
            const cardPrice = parseInt(card.querySelector('[data-price]').dataset.price);
            if (filters.priceRange.min && cardPrice < filters.priceRange.min) show = false;
            if (filters.priceRange.max && cardPrice > filters.priceRange.max) show = false;
        }

        // Filter by bedrooms
        if (filters.bedrooms.length > 0) {
            const cardBedrooms = card.querySelector('[data-bedrooms]').dataset.bedrooms;
            if (!filters.bedrooms.includes(cardBedrooms)) show = false;
        }

        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    // Update count badge
    document.querySelector('.count-badge').textContent = `${visibleCount} requirements found`;

    // Show/hide empty state
    const emptyState = document.querySelector('.empty-state');
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
}

function resetFilters() {
    // Clear location chips
    document.querySelector('.location-chips').innerHTML = '';

    // Uncheck property types
    document.querySelectorAll('.form-check-input').forEach(input => {
        input.checked = false;
    });

    // Clear price range
    document.querySelectorAll('.price-inputs input').forEach(input => {
        input.value = '';
    });

    // Reset bedroom buttons
    document.querySelectorAll('.bedroom-buttons .btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Apply filters to show all requirements
    applyFilters();
}

function sortRequirements(sortType) {
    const requirementsGrid = document.querySelector('.requirements-grid');
    const requirements = Array.from(document.querySelectorAll('.requirement-card'));

    requirements.sort((a, b) => {
        switch (sortType) {
            case 'newest':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            case 'oldest':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'location':
                return a.dataset.location.localeCompare(b.dataset.location);
            default:
                return 0;
        }
    });

    // Clear and re-append sorted requirements
    requirements.forEach(card => requirementsGrid.appendChild(card));
}

document.addEventListener('DOMContentLoaded', function() {
    const requirementsForm = document.getElementById('requirementsForm');
    const confirmationMessage = document.querySelector('.confirmation-message');
    const locationInput = document.getElementById('location');
    const locationTags = document.getElementById('locationTags');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Store locations
    let locations = [];

    // Handle location input
    locationInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const location = this.value.trim();
            if (location && !locations.includes(location)) {
                locations.push(location);
                updateLocationTags();
                this.value = '';
            }
        }
    });

    // Update location tags display
    function updateLocationTags() {
        locationTags.innerHTML = locations.map(location => `
            <span class="location-tag">
                ${location}
                <i class="fas fa-times remove-tag" data-location="${location}"></i>
            </span>
        `).join('');

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-tag').forEach(button => {
            button.addEventListener('click', function() {
                const locationToRemove = this.dataset.location;
                locations = locations.filter(loc => loc !== locationToRemove);
                updateLocationTags();
            });
        });
    }

    // Validate price range
    function validatePriceRange() {
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);

        if (minPrice && maxPrice && minPrice > maxPrice) {
            maxPriceInput.setCustomValidity('Maximum price should be greater than minimum price');
        } else {
            maxPriceInput.setCustomValidity('');
        }
    }

    minPriceInput.addEventListener('input', validatePriceRange);
    maxPriceInput.addEventListener('input', validatePriceRange);

    // Handle form submission
    requirementsForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!locations.length) {
            locationInput.setCustomValidity('Please add at least one location');
            locationInput.reportValidity();
            return;
        }

        // Get selected amenities
        const selectedAmenities = Array.from(document.querySelectorAll('.amenities-grid input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        // Get selected sustainability features
        const selectedSustainability = Array.from(document.querySelectorAll('.sustainability-grid input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        // Prepare form data
        const formData = {
            locations: locations,
            propertyType: document.getElementById('propertyType').value,
            bedroomCount: document.getElementById('bedroomCount').value,
            priceRange: {
                min: document.getElementById('minPrice').value,
                max: document.getElementById('maxPrice').value
            },
            amenities: selectedAmenities,
            sustainabilityFeatures: selectedSustainability,
            additionalNotes: document.getElementById('additionalNotes').value
        };

        // Add loading state
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show confirmation message
            confirmationMessage.style.display = 'block';

            // Reset form
            this.reset();
            locations = [];
            updateLocationTags();

            // Hide confirmation after 3 seconds
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting your requirements. Please try again.');
        } finally {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
});

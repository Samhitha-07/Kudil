// Initialize Quill rich text editor
const quill = new Quill('#descriptionEditor', {
    theme: 'snow',
    placeholder: 'Describe your property...',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['clean']
        ]
    }
});

// Initialize maps
let addressMap, locationMap, addressMarker, locationMarker;

function initMaps() {
    // Location Map
    locationMap = L.map('locationMap').setView([12.9716, 77.5946], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(locationMap);
    locationMarker = L.marker([12.9716, 77.5946], { draggable: true }).addTo(locationMap);

    // Update marker on drag
    locationMarker.on('dragend', (event) => {
        const position = locationMarker.getLatLng();
        document.getElementById('latitude').value = position.lat;
        document.getElementById('longitude').value = position.lng;
    });
}

// Initialize maps when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMaps();
    updateFormSteps(); // Ensure first step is visible
});

// Form step navigation
let currentStep = 1;
const totalSteps = 5;
const form = document.getElementById('listingForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressSteps = document.querySelector('.progress-steps');

function updateFormSteps() {
    // Update progress bar
    progressSteps.setAttribute('data-current-step', currentStep);

    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');

    // Update progress indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });

    // Update navigation buttons
    prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
    submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

    // Update maps if visible
    if (currentStep === 4) {
        setTimeout(() => {
            locationMap.invalidateSize();
        }, 0);
    }

    // Scroll to top of form
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

// Navigation event listeners
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormSteps();
    }
});

nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateFormSteps();
            saveDraft(); // Auto-save when moving to next step
        }
    }
});

// Form validation
function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('is-invalid');
            
            // Add error message
            let errorMessage = field.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('invalid-feedback')) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'invalid-feedback';
                errorMessage.textContent = 'This field is required';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        } else {
            field.classList.remove('is-invalid');
            const errorMessage = field.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('invalid-feedback')) {
                errorMessage.remove();
            }
        }
    });

    if (!isValid) {
        // Scroll to first invalid field
        const firstInvalid = currentStepElement.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

// Image upload handling
const uploadArea = document.getElementById('uploadArea');
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
let uploadedImages = [];

uploadArea.addEventListener('click', () => {
    imageUpload.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

imageUpload.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (uploadedImages.length + files.length > 10) {
        showNotification('Maximum 10 images allowed', 'error');
        return;
    }

    Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size should not exceed 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Property Image">
                <button type="button" class="remove-image" aria-label="Remove Image">×</button>
            `;
            imagePreview.appendChild(preview);
            uploadedImages.push(file);

            // Add remove functionality
            preview.querySelector('.remove-image').addEventListener('click', () => {
                const index = Array.from(imagePreview.children).indexOf(preview);
                uploadedImages.splice(index, 1);
                preview.remove();
            });
        };
        reader.readAsDataURL(file);
    });
}

// Save draft functionality
function saveDraft() {
    const formData = new FormData(form);
    formData.append('description', quill.root.innerHTML);
    formData.append('currentStep', currentStep);
    
    // Save to localStorage
    const draftData = Object.fromEntries(formData.entries());
    localStorage.setItem('propertyListingDraft', JSON.stringify(draftData));
    
    showNotification('Draft saved', 'success');
}

// Load draft if exists
function loadDraft() {
    const draft = localStorage.getItem('propertyListingDraft');
    if (draft) {
        const draftData = JSON.parse(draft);
        
        // Populate form fields
        Object.entries(draftData).forEach(([key, value]) => {
            const field = form.elements[key];
            if (field) {
                field.value = value;
            }
        });
        
        // Set description
        if (draftData.description) {
            quill.root.innerHTML = draftData.description;
        }
        
        // Set current step
        if (draftData.currentStep) {
            currentStep = parseInt(draftData.currentStep);
            updateFormSteps();
        }
        
        showNotification('Draft loaded', 'success');
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Save draft button
document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);

// Preview button
document.getElementById('previewBtn').addEventListener('click', () => {
    // Create preview modal if it doesn't exist
    let previewModal = document.querySelector('.preview-modal');
    if (!previewModal) {
        previewModal = document.createElement('div');
        previewModal.className = 'preview-modal';
        previewModal.innerHTML = `
            <div class="preview-modal-content">
                <button class="preview-modal-close">&times;</button>
                <div class="preview-content"></div>
            </div>
        `;
        document.body.appendChild(previewModal);
        
        // Close button functionality
        previewModal.querySelector('.preview-modal-close').addEventListener('click', () => {
            previewModal.classList.remove('active');
        });
    }
    
    // Update preview content
    const previewContent = previewModal.querySelector('.preview-content');
    const formData = new FormData(form);
    
    // Build preview HTML
    previewContent.innerHTML = `
        <h2>${formData.get('propertyType')} for ${formData.get('listingType')}</h2>
        <div class="property-location">${formData.get('address')}</div>
        <div class="property-stats">
            <span>${formData.get('bedrooms')} Bedrooms</span> • 
            <span>${formData.get('bathrooms')} Bathrooms</span> • 
            <span>${formData.get('squareFootage')} sq.ft</span>
        </div>
        <div class="property-price">
            ₹${formData.get('price')}${formData.get('listingType') === 'rent' ? '/month' : ''}
        </div>
        <div class="property-description">
            ${quill.root.innerHTML}
        </div>
    `;
    
    // Show modal
    previewModal.classList.add('active');
});

// Load draft on page load
document.addEventListener('DOMContentLoaded', loadDraft);

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
        const formData = new FormData(form);
        formData.append('description', quill.root.innerHTML);
        
        // Add coordinates
        const position = locationMarker.getLatLng();
        formData.append('latitude', position.lat);
        formData.append('longitude', position.lng);
        
        // Add images
        uploadedImages.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });
        
        try {
            // TODO: Send formData to server
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Clear draft after successful submission
            localStorage.removeItem('propertyListingDraft');
            
            // Show success message
            showNotification('Listing submitted successfully!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } catch (error) {
            showNotification('Error submitting listing. Please try again.', 'error');
        }
    }
});

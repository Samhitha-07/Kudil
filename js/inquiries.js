document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle filter form submission
    const filterForm = document.querySelector('.dropdown-menu form');
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyFilters();
    });

    // Handle sort options
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortType = this.dataset.sort;
            sortItems(sortType);
        });
    });

    // Handle visit request actions
    const acceptButtons = document.querySelectorAll('.btn-success[data-bs-toggle="modal"]');
    const declineButtons = document.querySelectorAll('.btn-danger[data-bs-toggle="modal"]');

    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Store the visit request ID in the modal for reference
            const visitId = this.closest('.visit-card').dataset.visitId;
            document.querySelector('#acceptModal').dataset.visitId = visitId;
        });
    });

    declineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Store the visit request ID in the modal for reference
            const visitId = this.closest('.visit-card').dataset.visitId;
            document.querySelector('#declineModal').dataset.visitId = visitId;
        });
    });

    // Handle modal form submissions
    const acceptModal = document.querySelector('#acceptModal');
    const declineModal = document.querySelector('#declineModal');

    acceptModal.querySelector('.btn-success').addEventListener('click', function() {
        const visitId = acceptModal.dataset.visitId;
        const message = acceptModal.querySelector('textarea').value;
        const contactNumber = acceptModal.querySelector('input[type="tel"]').value;
        
        acceptVisitRequest(visitId, message, contactNumber);
        bootstrap.Modal.getInstance(acceptModal).hide();
    });

    declineModal.querySelector('.btn-danger').addEventListener('click', function() {
        const visitId = declineModal.dataset.visitId;
        const reason = declineModal.querySelector('select').value;
        const message = declineModal.querySelector('textarea').value;
        
        declineVisitRequest(visitId, reason, message);
        bootstrap.Modal.getInstance(declineModal).hide();
    });
});

// Filter functions
function applyFilters() {
    const property = document.querySelector('#propertyFilter').value;
    const dateFrom = document.querySelector('#dateFrom').value;
    const dateTo = document.querySelector('#dateTo').value;
    const status = document.querySelector('#statusFilter').value;

    // Get all cards
    const cards = document.querySelectorAll('.inquiry-card, .visit-card');
    
    cards.forEach(card => {
        let show = true;

        // Filter by property
        if (property && card.querySelector('.property-link').textContent !== property) {
            show = false;
        }

        // Filter by date range
        const cardDate = new Date(card.dataset.date);
        if (dateFrom && cardDate < new Date(dateFrom)) {
            show = false;
        }
        if (dateTo && cardDate > new Date(dateTo)) {
            show = false;
        }

        // Filter by status (for visit requests only)
        if (status && card.classList.contains('visit-card')) {
            const cardStatus = card.querySelector('.visit-status').dataset.status;
            if (cardStatus !== status) {
                show = false;
            }
        }

        card.style.display = show ? 'block' : 'none';
    });

    updateEmptyStates();
}

// Sorting function
function sortItems(sortType) {
    const lists = [
        document.querySelector('.inquiries-list'),
        document.querySelector('.visits-list')
    ];

    lists.forEach(list => {
        const cards = Array.from(list.children);
        cards.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortType === 'newest' ? dateB - dateA : dateA - dateB;
        });

        // Clear and re-append sorted cards
        cards.forEach(card => list.appendChild(card));
    });
}

// Update empty states
function updateEmptyStates() {
    const tabs = ['inquiries', 'visits'];
    
    tabs.forEach(tab => {
        const list = document.querySelector(`.${tab}-list`);
        const visibleCards = Array.from(list.querySelectorAll(`.${tab.slice(0, -1)}-card`))
            .filter(card => card.style.display !== 'none');
        
        const emptyState = list.querySelector('.empty-state');
        emptyState.style.display = visibleCards.length === 0 ? 'block' : 'none';
    });
}

// API functions
async function acceptVisitRequest(visitId, message, contactNumber) {
    try {
        const response = await fetch('/api/visits/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitId,
                message,
                contactNumber
            })
        });

        if (!response.ok) {
            throw new Error('Failed to accept visit request');
        }

        // Update UI
        const visitCard = document.querySelector(`[data-visit-id="${visitId}"]`);
        const statusBadge = visitCard.querySelector('.visit-status');
        statusBadge.className = 'visit-status accepted';
        statusBadge.innerHTML = '<i class="fas fa-check"></i> Accepted';
        
        // Hide action buttons
        visitCard.querySelector('.action-buttons').style.display = 'none';

        showNotification('Visit request accepted successfully', 'success');
    } catch (error) {
        console.error('Error accepting visit request:', error);
        showNotification('Failed to accept visit request', 'error');
    }
}

async function declineVisitRequest(visitId, reason, message) {
    try {
        const response = await fetch('/api/visits/decline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitId,
                reason,
                message
            })
        });

        if (!response.ok) {
            throw new Error('Failed to decline visit request');
        }

        // Update UI
        const visitCard = document.querySelector(`[data-visit-id="${visitId}"]`);
        const statusBadge = visitCard.querySelector('.visit-status');
        statusBadge.className = 'visit-status declined';
        statusBadge.innerHTML = '<i class="fas fa-times"></i> Declined';
        
        // Hide action buttons
        visitCard.querySelector('.action-buttons').style.display = 'none';

        showNotification('Visit request declined successfully', 'success');
    } catch (error) {
        console.error('Error declining visit request:', error);
        showNotification('Failed to decline visit request', 'error');
    }
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

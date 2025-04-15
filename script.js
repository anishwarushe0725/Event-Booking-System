// Global variables
let selectedDate = null;
const bookedDates = ['2025-04-18', '2025-04-22', '2025-04-27', '2025-05-10', '2025-05-15'];
const availableDates = ['2025-04-20', '2025-04-25', '2025-05-05', '2025-05-12', '2025-05-20'];

// DOM Elements
const calendarDays = document.getElementById('calendar-days');
const monthYearElement = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const selectedDateElement = document.getElementById('selected-date');
const eventDateInput = document.getElementById('event-date');
const bookingForm = document.getElementById('booking-form');
const summaryBtn = document.getElementById('summary-btn');
const summaryModal = document.getElementById('summary-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const closeConfirmationBtn = document.querySelector('.close-confirmation');
const confirmBookingBtn = document.getElementById('confirm-booking');
const summaryContent = document.getElementById('summary-content');
const bookingReference = document.getElementById('booking-reference');
const eventCardBookButtons = document.querySelectorAll('.event-card .btn');

// Current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Initialize the calendar
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
    setupEventListeners();
    validateFormOnInput();
});

// Set up event listeners
function setupEventListeners() {
    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            openSummaryModal();
        }
    });

    // Summary button
    summaryBtn.addEventListener('click', () => {
        if (validateForm()) {
            openSummaryModal();
        }
    });

    // Confirm booking
    confirmBookingBtn.addEventListener('click', () => {
        summaryModal.style.display = 'none';
        showConfirmation();
    });

    // Close modals
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            summaryModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        });
    });

    closeConfirmationBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        resetForm();
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === summaryModal) {
            summaryModal.style.display = 'none';
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });

    // Event card book buttons
    eventCardBookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get the date from the card
            const card = e.target.closest('.event-card');
            const month = card.querySelector('.month').textContent;
            const day = card.querySelector('.day').textContent;
            const eventName = card.querySelector('h3').textContent;
            
            // Scroll to booking form
            document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
            
            // Set the date and event type
            const eventDate = new Date(currentYear, getMonthNumber(month), parseInt(day));
            selectDate(eventDate);
            
            // Auto-fill form with event type if applicable
            if (eventName.includes('Conference')) {
                document.getElementById('event-type').value = 'conference';
            } else if (eventName.includes('Workshop')) {
                document.getElementById('event-type').value = 'workshop';
            } else if (eventName.includes('Party')) {
                document.getElementById('event-type').value = 'party';
            } else {
                document.getElementById('event-type').value = 'other';
            }
        });
    });
}

// Helper function to get month number from name
function getMonthNumber(monthName) {
    const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return months[monthName];
}

// Render the calendar for a specific month and year
function renderCalendar(month, year) {
    // Clear previous days
    calendarDays.innerHTML = '';
    
    // Update month and year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get the number of days in the previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'other-month');
        dayElement.textContent = daysInPrevMonth - i;
        calendarDays.appendChild(dayElement);
    }
    
    // Add days for current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        
        // Check if it's today
        const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const calendarDateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        if (currentDateString === calendarDateString) {
            dayElement.classList.add('today');
        }
        
        // Check if this date is selected
        if (selectedDate && day === selectedDate.getDate() && 
            month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayElement.classList.add('selected');
        }
        
        // Check if date is available or booked
        if (availableDates.includes(calendarDateString)) {
            dayElement.classList.add('available');
        }
        
        if (bookedDates.includes(calendarDateString)) {
            dayElement.classList.add('unavailable');
        }
        
        // Add click event to select date
        dayElement.addEventListener('click', () => {
            if (!dayElement.classList.contains('unavailable')) {
                const clickedDate = new Date(year, month, day);
                selectDate(clickedDate);
            }
        });
        
        calendarDays.appendChild(dayElement);
    }
    
    // Add days from next month to fill the remaining grid
    const totalDays = calendarDays.childElementCount;
    const remainingDays = 42 - totalDays; // 6 rows of 7 days
    
    for (let day = 1; day <= remainingDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'other-month');
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }
}

// Function to select a date
function selectDate(date) {
    selectedDate = date;
    
    // Update display with selected date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    selectedDateElement.textContent = formattedDate;
    eventDateInput.value = formattedDate;
    
    // Remove selected class from all days
    const allDays = document.querySelectorAll('.day');
    allDays.forEach(day => {
        day.classList.remove('selected');
    });
    
    // If the selected date is in the current month view, add selected class
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const dayElements = document.querySelectorAll('.day:not(.other-month)');
        dayElements[date.getDate() - 1].classList.add('selected');
    } else {
        // If not in current view, navigate to that month
        currentMonth = date.getMonth();
        currentYear = date.getFullYear();
        renderCalendar(currentMonth, currentYear);
    }
    
    // Clear any date selection error
    document.getElementById('date-error').textContent = '';
}

// Form validation
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (name.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Validate phone
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const phoneRegex = /^\d{10,15}$/;
    if (!phone.value.trim()) {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
    } else if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
        phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }
    
    // Validate date
    const dateError = document.getElementById('date-error');
    if (!selectedDate) {
        dateError.textContent = 'Please select a date from the calendar';
        isValid = false;
    } else {
        dateError.textContent = '';
    }
    
    // Validate event type
    const eventType = document.getElementById('event-type');
    const eventTypeError = document.getElementById('event-type-error');
    if (!eventType.value) {
        eventTypeError.textContent = 'Please select an event type';
        isValid = false;
    } else {
        eventTypeError.textContent = '';
    }
    
    // Validate attendees
    const attendees = document.getElementById('attendees');
    const attendeesError = document.getElementById('attendees-error');
    if (!attendees.value) {
        attendeesError.textContent = 'Number of attendees is required';
        isValid = false;
    } else if (attendees.value < 1) {
        attendeesError.textContent = 'Number of attendees must be at least 1';
        isValid = false;
    } else {
        attendeesError.textContent = '';
    }
    
    return isValid;
}

// Set up input validation as user types
function validateFormOnInput() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const eventType = document.getElementById('event-type');
    const attendees = document.getElementById('attendees');
    
    // Add input event listeners
    name.addEventListener('input', () => {
        const nameError = document.getElementById('name-error');
        if (!name.value.trim()) {
            nameError.textContent = 'Name is required';
        } else if (name.value.trim().length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
        } else {
            nameError.textContent = '';
        }
    });
    
    email.addEventListener('input', () => {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Email is required';
        } else if (!emailRegex.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    phone.addEventListener('input', () => {
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^\d{10,15}$/;
        if (!phone.value.trim()) {
            phoneError.textContent = 'Phone number is required';
        } else if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
        } else {
            phoneError.textContent = '';
        }
    });
    
    eventType.addEventListener('change', () => {
        const eventTypeError = document.getElementById('event-type-error');
        if (!eventType.value) {
            eventTypeError.textContent = 'Please select an event type';
        } else {
            eventTypeError.textContent = '';
        }
    });
    
    attendees.addEventListener('input', () => {
        const attendeesError = document.getElementById('attendees-error');
        if (!attendees.value) {
            attendeesError.textContent = 'Number of attendees is required';
        } else if (attendees.value < 1) {
            attendeesError.textContent = 'Number of attendees must be at least 1';
        } else {
            attendeesError.textContent = '';
        }
    });
}

// Open summary modal
function openSummaryModal() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('event-type').value;
    const eventTypeText = document.getElementById('event-type').options[document.getElementById('event-type').selectedIndex].text;
    const attendees = document.getElementById('attendees').value;
    const eventDetails = document.getElementById('event-details').value;
    
    // Format date
    const formattedDate = selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Populate summary content
    summaryContent.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Date:</strong> ${formattedDate}</p>
        <p><strong>Event Type:</strong> ${eventTypeText}</p>
        <p><strong>Number of Attendees:</strong> ${attendees}</p>
        ${eventDetails ? `<p><strong>Additional Details:</strong> ${eventDetails}</p>` : ''}
    `;
    
    // Display the modal
    summaryModal.style.display = 'flex';
}

// Show confirmation after booking
function showConfirmation() {
    // Generate random booking reference
    const reference = `EBS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    bookingReference.textContent = reference;
    
    // Display confirmation modal
    confirmationModal.style.display = 'flex';
}

// Reset form after successful booking
function resetForm() {
    bookingForm.reset();
    selectedDate = null;
    selectedDateElement.textContent = 'None';
    
    // Remove selected class from all days
    const allDays = document.querySelectorAll('.day');
    allDays.forEach(day => {
        day.classList.remove('selected');
    });
}

// Add tooltip functionality for calendar days
function addDayTooltip(dayElement, date) {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    if (availableDates.includes(dateString)) {
        dayElement.setAttribute('title', 'Available for booking');
    } else if (bookedDates.includes(dateString)) {
        dayElement.setAttribute('title', 'Already booked');
    }
}
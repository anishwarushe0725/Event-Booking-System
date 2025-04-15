# Event Booking System UI

A responsive user interface for booking events with an interactive calendar and booking form.

## Project Overview

This Event Booking System UI allows users to:
- Browse an interactive calendar to select available dates
- Complete a booking form with real-time validation
- View upcoming events
- Receive booking confirmations

The system features a clean, modern design that works across all device sizes (mobile, tablet, and desktop).

## Features

### Calendar Integration
- Interactive calendar for date selection
- Visual indicators for available and booked dates
- Month navigation with smooth transitions
- Current date highlighting

### Booking Form
- User-friendly form with proper validation
- Fields for name, email, phone, event type, and attendees
- Real-time validation feedback
- Form submission with confirmation

### Event Listing
- Display of upcoming events with date, time, and location
- "Book Now" buttons for quick access to booking form
- Visual cards with hover effects

### Interactive Elements
- Modal dialogs for booking summary and confirmation
- Smooth animations and transitions
- Form validation with instant feedback

### Responsive Design
- Fully responsive layout that adapts to different screen sizes
- Mobile-friendly navigation and form elements
- Optimized calendar view for small screens

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Vanilla JS for interactivity and validation
- **Font Awesome**: Icon library for improved UI
- **Responsive Design**: Media queries for device adaptation

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/event-booking-system.git
   ```

2. Navigate to the project directory:
   ```
   cd event-booking-system
   ```

3. Open the project in your preferred code editor.

4. You can run the project locally by opening the `index.html` file in your web browser.

## Project Structure

```
event-booking-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Usage Instructions

1. **Calendar Navigation**: 
   - Use the arrow buttons to navigate between months
   - Click on an available date to select it for booking

2. **Booking Form**:
   - Fill in all required fields marked with an asterisk (*)
   - Form validation will provide feedback for any errors
   - Click "View Summary" to review your booking details
   - Click "Submit Booking" to complete the reservation

3. **Upcoming Events**:
   - Browse the event cards in the Upcoming Events section
   - Click "Book Now" on an event card to pre-select that date

## Customization

The system can be customized by modifying:

- The `bookedDates` and `availableDates` arrays in `script.js` to reflect your actual availability
- The color scheme by changing CSS variables in the `:root` section of `styles.css`
- The form fields in `index.html` to collect different information as needed

## Browser Compatibility

The Event Booking System has been tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The system can be deployed to:

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository settings
3. Navigate to Pages section
4. Select your main branch as the source
5. Save to deploy

### Netlify

1. Create an account on Netlify
2. Connect your GitHub repository
3. Select the repository and branch
4. Deploy with default settings

## Future Enhancements

Potential improvements for future versions:
- Integration with a backend for real data storage
- User authentication system
- Email notifications for bookings
- Payment processing integration
- Admin panel for managing bookings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Your Name]

## Acknowledgments

- Font Awesome for icons
- Inspiration from various booking systems

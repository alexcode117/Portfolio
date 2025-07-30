# Portfolio Website

This is a personal portfolio website designed to showcase projects, skills, and professional experience. It's a single-page application with a clean, modern, and responsive design.

## Features

- **Responsive Design**: The layout adapts to different screen sizes, from mobile phones to desktops.
- **Dark/Light Theme**: Users can switch between a light and a dark theme, and their preference is saved in local storage.
- **Animations on Scroll**: Subtle animations are triggered as the user scrolls down the page, powered by the ScrollReveal library.
- **Performance Optimized**: The website is optimized for fast loading times, using techniques like lazy loading for images and asynchronous loading for scripts and styles.
- **Accessible**: The project incorporates accessibility best practices, including ARIA attributes, keyboard navigation, and focus management.
- **Interactive Menu**: A responsive navigation menu that is fully accessible via keyboard.
- **Back to Top Button**: A button that appears on long scrolls to quickly navigate back to the top of the page.
- **Contact Form**: A functional contact form for user inquiries.

## Technologies Used

- **HTML5**: For the structure and content of the website.
- **CSS3**: For styling, including Flexbox, Grid, custom properties (variables), and animations.
- **JavaScript (ES6+)**: For interactivity, DOM manipulation, and handling events.
- **Boxicons**: For the icons used throughout the site.
- **ScrollReveal**: A JavaScript library to easily reveal elements as they enter the viewport.

## File Structure

- `index.html`: The main HTML file containing the structure of the portfolio.
- `style.css`: The stylesheet with all the custom styles for the project.
- `index.js`: The main JavaScript file that handles all the dynamic functionality.
- `assets/`: A directory containing images and other static assets.

## HTML Structure

The `index.html` file is organized into semantic sections:

- **Header**: Contains the logo and navigation menu.
- **Home**: The main landing section with a brief introduction.
- **About**: A section with more details about me.
- **Services**: Describes the services I offer.
- **Skills**: Showcases my technical skills.
- **Portfolio**: A gallery of my projects.
- **Contact**: A contact form and links to social media.
- **Footer**: Contains the copyright information.

## CSS Styling

The `style.css` file is structured to be modular and maintainable:

- **Root Variables**: Defines CSS custom properties for colors, fonts, and other reusable values. This makes it easy to manage the theme and maintain consistency.
- **Theming**: The light and dark themes are managed by changing the CSS variables on the `html` element with a `data-theme` attribute.
- **Responsive Design**: Media queries are used to adjust the layout and styling for different screen sizes (mobile, tablet, and desktop).
- **Animations**: Keyframe animations and transitions are used for hover effects, the mobile menu, and other interactive elements.
- **Accessibility**: Styles for focus states (`:focus`) are included to improve keyboard navigation.

## JavaScript Functionality

The `index.js` file includes the following key functionalities:

- **Menu Toggle**: Toggles the mobile navigation menu and updates ARIA attributes for accessibility.
- **Theme Switcher**: Handles the logic for switching between light and dark themes. The user's choice is saved to `localStorage` to persist across sessions.
- **ScrollReveal Integration**: Initializes the ScrollReveal library and defines the animations for different elements on the page.
- **Back to Top Button**: Shows or hides the button based on the scroll position and handles the smooth scroll to the top when clicked.
- **Performance Optimizations**:
  - **Debounced Scroll Events**: Uses `requestAnimationFrame` to debounce the scroll event listener, which improves performance by preventing the scroll handler from being called too frequently.
  - **Lazy Loading**: Images are lazy-loaded using the `IntersectionObserver` API to improve initial page load time.

This `README.md` provides a comprehensive overview of the project. If you have any questions, feel free to ask!

## NASA Data Explorer - Demo App

An app to explore React.js, MUI, and other fun things.

### Getting Started

Clone this repo, and set up a .env file:

```
VITE_NASA_API_KEY=your_nasa_api_key_here
VITE_NASA_BASE_URL=https://api.nasa.gov

# Get a free API key at: https://api.nasa.gov
# For testing, you can use DEMO_KEY
```

Then run:

```
npm i
npm start
```

1. Click 'START EXPLORING' - View table with filters and pagination. Check different error and empty data states.
2. Click on a photo or View icon to activate the modal component. 
3. Click on 'Return to Dashboard'. Click on PLAN MISSION. Use the form to submit a mission plan.

### Description of Approach and Design Decisions

My Science Museum of Minnesota background and the educational potential of NASA's API inspired the design of this demo app: an educational tool for middle school Physical Sciences classrooms. My goal was to create an interface that captivates kids and adults alike, offers intuitive navigation, and sparks curiosity about research.

### Tech Stack

- React 19 with TypeScript
- Material-UI (MUI) v7+ custom theme 
- Axios
- TanStack Query (React Query) for server state management
- Form Management: React Hook Form with Yup validation
- Build Tool: Vite

### Testing

This project includes Cypress end-to-end testing with TypeScript configuration:

```bash
# Open Cypress Test Runner (interactive)
npm run cypress:open

# Run tests in headless mode
npm run cypress:run

```

**To run tests:**

1. Start the development server: `npm start`
2. In another terminal, run: `npm run cypress:open`
3. Click on `homepage.cy.ts` to run the HomePage tests


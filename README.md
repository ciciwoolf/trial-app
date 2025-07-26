## NASA Data Explorer - Demo App

### Setup and Installation

For a fast preview, click this link: https://trial-app-git-main-ciciwoolfs-projects.vercel.app

Otherwise, clone this repo and run:

```
npm i
npm start
```

### Description of Approach and Design Decisions

I designed this demo app with the vision of it being used in a middle school Physical Sciences classroom. My goal was to create an interface that is visually engaging, easy to navigate, and accessible for both students and teachers.

### Tech Stack

- React 19 with TypeScript
- Material-UI (MUI) v7+ custom theme (I've used Vuetify before, so feels familiar) 
- Axios
- TanStack Query (React Query) for server state management – NEW
- Form Management: React Hook Form with Yup validation – NEW
- Build Tool: Vite

### Assumptions

- I envisioned this demo app to be used in a middle school science classroom.
- Users (students and teachers) are tablet/desktop savvy.
- NASA APIs are available, responsive, and do not require authentication for demo purposes.
- The classroom has internet access.
- The UI is designed for desktop and modern tablet browsers, but still looks and feels good on mobile.

### Improvements for Future Iterations

- Color palette and UI flow should be improved with the help of a designer
- CSS should be better organized; right now I'm using a 'Tailwind CSS' approach, using MUI sx prop for inline styling
- Possibly use Routing to create separate pages
- Send Mission plans somewhere to be printed, etc.

### Testing Error States and Empty Data States

Testing Different Error/No Data States:

### 403

Comment out the real VITE_NASA_API_KEY.
Uncomment the VITE_NASA_API_KEY=INVALID_KEY_FOR_TESTING

You see the NASA Data Error message.

![Screenshot of NASA Data Error](public/NASA_Data_Error.png)

### 404

Corrupt the endpoint (lines 51-57) by uncommenting out the broken endpoint, and commenting out the real endpoint.
You see the NASA Data Error message.

![Screenshot of NASA Data Error](public/NASA_Data_Error.png)

### 429

Change the VITE_NASA_API_KEY value to: DEMO_KEY
Refresh the page multiple times; Change filters rapidly (rover, sol day, camera) - After ~30 requests, you should hit the limit!

![Screenshot of NASA API Limit Reached Error](public/API_Limit_Reached.png)

### Empty Data State

Put in 10,000 for the Sol filter.
You should see the empty data state with a message.

![Screenshot of No Photos Found](public/No_Photos_Found.png)

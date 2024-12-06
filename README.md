# Candidates Management Dashboard

## Overview
This project is a Candidates Management Dashboard built using **Next.js** and **Material-UI**. The application allows users to view, edit, and manage candidates' data efficiently. It utilizes Redux for state management and Axios for API calls.

## Tools and Technologies
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Material-UI**: A popular React UI framework that provides pre-built components for faster development.
- **Redux**: A state management library for JavaScript applications, used here to manage the application's state.
- **Axios**: A promise-based HTTP client for making API requests.
- **React**: A JavaScript library for building user interfaces.

## Features
- **Data Grid**: Displays candidates' information in a tabular format using Material-UI's DataGrid component.
- **Pagination**: Supports pagination for better data management.
- **Modal for Editing**: Allows users to edit candidate details in a modal dialog.
- **Responsive Design**: The application is designed to be responsive, adapting to different screen sizes.

## Approach
1. **State Management**: The application uses Redux to manage the state of candidates and search parameters. The state is updated based on user interactions and API responses.
2. **API Integration**: Axios is used to fetch candidates' data from a backend API. The data is then stored in the Redux state.
3. **UI Components**: Material-UI components are utilized to create a user-friendly interface. The DataGrid component is used for displaying candidates, and modals are used for editing candidate information.
4. **Responsive Design**: The application uses custom hooks to manage responsive widths for different screen sizes.

## Challenges Faced
- **State Management Complexity**: Managing the state of candidates and search parameters required careful planning to ensure that the UI updates correctly based on user actions.
- **API Integration**: Ensuring that the API calls were correctly implemented and that the data was properly handled in the Redux store was a challenge, especially with error handling.
- **Responsive Design**: Making the application responsive across various devices required additional effort in testing and adjusting styles.

## Conclusion
This Candidates Management Dashboard provides a robust solution for managing candidate data with a focus on user experience and performance. The combination of Next.js, Material-UI, and Redux allows for a scalable and maintainable codebase.

## HostedLink- https://codersboutique-frontend.vercel.app/



![Screenshot 2024-12-06 204732](https://github.com/user-attachments/assets/a106ad7e-ea8f-405c-bd79-e4b7206cc5be)

![Screenshot 2024-12-06 204714](https://github.com/user-attachments/assets/76d9ce8a-6169-41ac-9b83-90e0e57d4e6b)

![Screenshot 2024-12-06 204647](https://github.com/user-attachments/assets/979c306d-72cf-4fa2-bb02-5be5200e6e70)

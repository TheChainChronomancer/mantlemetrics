# Mantle Network Dashboard

Our team has developed a dashboard for visualizing Mantle chain data. Here is a step-by-step guide to help you understand what we did:

## 1. Developing the Dashboard Interface
We started by creating the necessary pages for the dashboard. The dashboard is built using React, which is a popular framework for building user interfaces. We used a file called Dashboard.jsx to create the main dashboard page, which contains all the charts and data visualizations. We also used a CSS framework called Tailwind CSS to style the dashboard and make it look more visually appealing.

## 2. Retrieving Information from the Blockchain
Next, we needed to get data from the Mantle blockchain. We did this by using the RPC API, which is a way to send requests to the Mantle network and get information in return. We used the Mantle network documentation to figure out what information we needed and how to retrieve it.

To get the information from the Mantle network and share it across the different parts of our application, we used something called a useContext hook. This is a way to make information available to all the different components in our dashboard, without having to pass the information around manually.

## 3. Developing the Rest of the Charts
Once we had the basic dashboard and data retrieval set up, we started working on the individual charts. We used a library called Recharts, which is specifically designed to create charts in React.

We created six different charts for the dashboard. To create the charts, we needed to get data from the Mantle blockchain and format it in a way that could be displayed by Recharts. We wrote functions to retrieve the necessary data and format it correctly, then used that data to create the charts.

## 4. Improving UI/UX and Developing Navbar
Finally, we made some improvements to the user interface and experience (UI/UX) of the dashboard. We made the charts more visually appealing by enhancing the card component with a title, better styles, and a new page background.

We also added a navbar component to the dashboard to make it easier for users to navigate between different parts of the dashboard. The navbar provides links to the different charts and data visualizations, making it easy for users to find the information they're looking for.

Overall, our team put a lot of work into creating this Mantle network dashboard. We hope that this step-by-step guide has helped you understand what we did and how we did it!

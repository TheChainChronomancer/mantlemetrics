# Mantle network dashboard

## Steps


### 1 - Develop the dashboard interface
I've started creating the necessary pages, which is the Dashboard.jsx files, then I worked on creating the dom elements and styles for it with the tailwindcss. After that I've created the Chart component and inside it i used recharts library to draw the charts.

### 2 - Retrieving information from blockchain
After components and interface created i started trying to retrieve informations from blockchain, so i got the RPC API url and documentation of the mantle networking and start development process. To develop this part i used an useContext hook, to share all the data retrieved around my application.

### 3 - Developing the rest of the charts
After all the info retrieved from blockchain, I had 2 charts developed, so i started developing the rest of them so i created charts 3 4 5 and 6. In this process of developing charts I had to develop functions to get the data from blocks and parse it to the chart component data, those functions are in the Dashboard.jsx and are being called in the useEffect hook.
```
       dataForLine();
       dataForBar();
       dataForTransfersCountandValuePerPeriod();
       getTransactionsPerBlock(300);
```

### 4 - Improving UI/UX and developing navbar
After all charts developed and working 100% i improved the UI/UX improving the card component, giving it a title, giving it a better styles, changing the page background, etc. And finally i developed the navbar component in order to provide a better experience to final user.
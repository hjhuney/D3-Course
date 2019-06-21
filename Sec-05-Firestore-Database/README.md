# Firestore Databases

Firestore is a NoSQL database. Similar to JavaScript objects. 

To use Firebase, go to [firebase.google.com](https://firebase.google.com/). Click "go to console" in upper right hand corner. Create project. Once you've created your project, you can go to the dashboard, "Develop" -> "Database" -> "Create Database (Cloud Firestore). We can then add a collection. Inside collections are "documents". 

## Setting Up Config

Go to "Project Overview" on dashboard. Click on "</>" icon. Copy configuration. 

```
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/6.2.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.1/firebase-firestore.js"></script>



    <script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "xxxxxx",
        authDomain: "xxxx.firebaseapp.com",
        databaseURL: "https://xxxxx.firebaseio.com",
        projectId: "xxxx",
        storageBucket: "xxxx.appspot.com",
        messagingSenderId: "xxxxx",
        appId: "1:xxxxxx9:web:xxxxxx"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true })
    </script>
```

## Update Cycle

The update cycle is one of the most important concepts to learn in D3. It generally looks like this:

```
const update = (data) => {

    // 1. update scales
    y.domain([0,d3.max(data, d => d.orders)]);

    // 2. join updated data to elements
    const rects = graph.selectAll('rect').data(data);

    // 3. remove unwanted shapes using the exit selection
    rects.exit().remove();

    // 4. update current shapes in dom
    rects.attr();

    // 5. append the enter selection to the dom
    rects.enter().append('rect').attr();

}
```

## The Interval Method


```
  // interval method
  d3.interval(() => {
      data[0].orders +=50;
      update(data);
  }, 1000)
```

## Realtime Updates

```
var data = [];

// grab the data
db.collection('dishes').onSnapshot(res => {

    res.docChanges().forEach(change => {

        const doc = {...change.doc.data(), id: change.doc.id};

        switch (change.type) {
            case 'added': 
                data.push(doc);
                break;
            case 'modified':
                const index = data.findIndex(item => item.id == doc.id);
                data[index] = doc;
                break;
            case 'remoed':
                data = data.filter(item => item.id !== doc.id);
                break;
            default: 
                break;
        }

    })

    update(data);
})
```


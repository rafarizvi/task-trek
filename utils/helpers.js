
module.exports = {

    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear() + 5
      }`;
    },

  };

// const fs = require('fs').promises;
// const path = require('path');




// async function appendTaskToFile(taskData) {
//   const filePath = path.join(__dirname, '../seeds', 'taskData.json');

//   try {
//       const dataRaw = await fs.readFile(filePath, 'utf8');
//       const tasks = JSON.parse(dataRaw);

//       tasks.push(taskData);
//       await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
//   } catch (error) {
//       console.error("Failed to append task to file:", error);
//       throw error; 
//   }
// }

<<<<<<< HEAD


module.exports = { appendTaskToFile };
=======
// module.exports = { appendTaskToFile }
>>>>>>> c310490b99d31da4dbea74718cabca6c9e5b6224

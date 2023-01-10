## Web101-Hackademy final project :mortar_board:

### TODO List to planify tasks, homeworks, projects, etc...

This is a simple project implements a  simple list of tasks to be done to which the addition and removal of a simple task is implemented, a message with the name of the task. This project shows the concepts that I've learned over this semester at **WebDev101 from Hackademy**, in special understanding how to write *JavaScript* files.

### BackEnd of the web page :clipboard:

The message is inserted into the placeholder, input task, that will be added at the beginning in the **All & In Progress** sections, because the task at the beginning is assumed not to have been completed. In order for a task to be passed in the **Finished** filter, the section to its left, which is the check, must be checked.

To the right of all tasks is a Settings menu that contains 2 very simple functions: **Edit & Delete**.
***Edit***: change the name of the task to be done, do not change its position in the All, In Progress & Finished filters, the position remains the same, when user clicked on **Edit** span, it will be introduced automatically in the placeholder where user can easily change its name. After **ENTER** keystroke the changes are made.
***Delete***: deletes the past task from all 3 filters, whether it was set as done (checked) or not.

The global **Clear** button deletes all tasks from all filters. When there are no tasks to do in a filter, a task-box message **Planify new tasks | appears below homework | projects**.

### FrontEnd of the web page :art:

Design of the project tried to be *responsive*, as much as I could make it, on many different types of screens, for laptops & computers :computer: it works , but for smarthphones :iphone: can't be made, cause of the size of part of the elemnts of the page that use **px** as central unit measure, like **introducNewTask** which is the place where user can introduce a new task.

In this README I will not go into detail about the structure of the HTML & CSS files. There are already comments that briefly explain these details on how the project was designed.

### Open Source Community

Anyone can contribute to the project, with one condition, to create a new branch and specify the changes made, bugs solved, new, original ideas and concepts. Anyone can contribute to the project, with one condition, to create a branch and specify the changes made, bugs solved, new, original ideas and concepts. Possibly the best way is to create a Pull Request.

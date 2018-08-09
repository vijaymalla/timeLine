/*Designed in modules

three modules - 1. timelineController, 2. timelineUIController, 3. Controller
// Some funcions are incomplete

*/
//Time line controller
var timelineController = (function() {

    var timeLineFinal = function(id, dateTime, description, title, category) {
        this.id = id;
        this.dateTime = dateTime;
        this.title = title;
        this.category = category;
        this.description = description;
    };




    var data = {
        allItems: {
            list_items: []
        },
    };

    // return values
    return {

        addItem: function(category, description, title, dateTime) {
            var newList = [];
            newList = [category, description, title, dateTime]
            var newItem, ID = 0;

            // Not able to create new ID
            if (newList.length > 0) {
                ID = [newList.length - 1].id + 1;
            } else {
                ID = 0;
            }

            newItem = new timeLineFinal(ID, category, description, title, dateTime);

            // Push it into our data structure
            data.allItems['list_items'].push(newItem);
            // Return the new element
            return newItem;
        },
    };

})();




//Time line UIcontroller
var timelineUIController = (function() {

    var DOMobjects = {
        dateTime: 'date-time',
        inputDropdown: 'input_dropdown',
        titleName: 'title-name',
        inputDescription: 'input_description',
        container: 'cd-container'
    };

    //Get Data from Html page
    return {
        getInput: function() {
            return {
                dateTime: document.getElementById(DOMobjects.dateTime).value,
                category: document.getElementById(DOMobjects.inputDropdown).value,
                title: document.getElementById(DOMobjects.titleName).value,
                description: document.getElementById(DOMobjects.inputDescription).value,

            };
        },

        createTimeLine: function(obj) {
            // Creating placeholders
            var cat = 'Work' // the actual Idea is to pass one more argument to check different categories, This step needs to be complete
            switch (cat) {
                case 'Work':
                    var htmlRed = '<div class="cd-timeline-block" id = "block-%id%" ><div class="cd-timeline-img cd-picture"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg" alt="Picture"></div><div class="cd-timeline-content"><h1>%title%</h1><h2><i>%cat%</i></h2><p>%description%</p><button type="button" class="btn btn-danger">Delete</button><span class="cd-date">%dateTime%</span></div></div>';
                    break;
                case 'Communication':
                    var htmlGreen = '<div class="cd-timeline-block"><div class="cd-timeline-img cd-picture"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg" alt="Picture"></div><div class="cd-timeline-content"><h1>%title%</h1><h2><i>%cat%</i></h2><p>%description%</p><button type="button" class="btn btn-danger">Delete</button><span class="cd-date">%dateTime%</span></div></div>';
                    break;
                case 'Important':
                    var htmlYellow = '<article><div class="inner"><span class="date"><span class="day">26<sup>th</sup></span><span class="month">Jan</span><span class="year">2014</span></span><h2>The Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis rutrum nunc, eget dictum massa. Nam faucibus felis nec augue adipiscing, eget commodo libero mattis.</p></div></article>';
                    break;
                case 'Travel':
                    var htmlBLue = '<article><div class="inner"><span class="date"><span class="day">26<sup>th</sup></span><span class="month">Jan</span><span class="year">2014</span></span><h2>The Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis rutrum nunc, eget dictum massa. Nam faucibus felis nec augue adipiscing, eget commodo libero mattis.</p></div></article>';
            }
            // replace html with actual data
            newHtml = htmlRed.replace('%title%', obj.title);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%dateTime%', obj.dateTime);
            newHtml = newHtml.replace('%cat%', obj.category);
            newHtml = newHtml.replace('%id%', obj.id);
            // console.log(obj.id);
            //Insert in to index.html using Docume Object Manipulation
            document.getElementById('cd-timeline').insertAdjacentHTML('beforeend', newHtml);
        },

        // Delete Item form UI
        // deleteTimelineBlock: function(selectorID) {
        //
        //     var el = document.getElementById(selectorID);
        //     el.parentNode.removeChild(el);
        //
        // },

        //New method to clear input fields
        clearFields: function() {
            var fields, fieldArray
            fields = document.querySelectorAll(DOMobjects.dateTime + ',' +
                DOMobjects.category + ',' +
                DOMobjects.title + ',' +
                DOMobjects.description); //Css type selectors so seperated by ' , '
            //Convert list in to an array
            fieldArray = Array.prototype.slice.call(fields);
            fieldArray.forEach(function(current, index, array) {
                current.value = "";
            });

        }


    };

})();




//App controller
var controller = (function(timelineCtrl, timelineUICtrl) {

    // Handles All task required !
    var ctrlTimeLine = function() {

        // 1. Get the data from input fields
        var input = timelineUICtrl.getInput();


        if (input.description !== "" && input.category !== "Choose Category..." && input.title !== "" && input.dateTime !== "") {

            var input, newItem;

            // 2. Add the item to the Timeline controller
            newItem = timelineCtrl.addItem(input.category, input.description, input.title, input.dateTime);

            // 3. display in time line UI
            timelineUICtrl.createTimeLine(input);

            //4. Clear  the clearFields
            timelineUICtrl.clearFields();
        } else {
            alert("Please input some Data...")
        }


        // 5. clear the fields and add new data, yet to be done !

        // 6. Delete the time line blocks
        // timelineUICtrl.deleteListItem(itemID);

    };

    var eventListeners = function() {
        //Event Listener for the submit button
        document.querySelector('.btn-primary').addEventListener('click', ctrlTimeLine); // Calling ctrlTimeLine() function when submit button was pressed
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) { // Event.keyCode gives the key code number
                ctrlTimeLine(); // Calling ctrlTimeLine() function when users hits Enter Key
            }

        })
        // calls ctrlDeleteItem when cd-container class selected
        document.querySelector('.cd-container').addEventListener('click', ctrlDeleteItem);

    };

    var ctrlDeleteItem = function(event) {

        // Select the entire block ID if Delete button was clicked
        var selectId = event.target.parentNode.parentNode.id; // Select block ID when Delete Button was clicked

        if (selectId) {
            timelineUICtrl.deleteTimelineBlock(itemID); // Calling deleteTimelineBlock to delete one block
        }

        //DOM traversing - Selecting parent node when child node selected
        // console.log(event.target);
    };

    // Returns init function to public
    return {
        init: function() {
            console.log('Application started !');
            eventListeners();
        }
    }




})(timelineController, timelineUIController);

controller.init(); // Aplication Starts here by calling eventListeners function in controller module

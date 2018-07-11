const c = console.log;
const cd = console.dir;

// Functional class to create draggable elements
window.allowDrop = function (ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    else
        ev.dataTransfer.dropEffect = "all"; // drop it like it's hot
};

var DraggableElement = function(selector) {
    this.element = document.querySelector(selector);
}

DraggableElement.prototype.drag = function() {
    this.element.addEventListener("dragstart", function (event) {
        c("EVENT: dragstart");

        //event.currentTarget.style.opacity = 0;
       // c(event.currentTarget);
        event.dataTransfer.setData("id", event.target.id);
    }, false);
};

DraggableElement.prototype.dragLeave = function() {
    this.element.addEventListener('dragleave', function(event){
        c('EVENT: dragleave');
        
        // See if we can do something here!
    }, false);
};

var DroppableElement =  function(selector) {
    this.element = document.querySelector(selector);
/*     this.ele = (() => {
        var sel = selector.slice(0, 1);
        if (sel === "#") {
            return document.querySelector(selector);
        }
        return document.querySelectorAll(selector);
    })(); 
*/
};

DroppableElement.prototype.drop = function () {
    this.element.addEventListener('drop', function(event){
        event.preventDefault();
        c("EVENT: drop");
        //cd(event);
        //cd(event.dataTransfer.getData('contactForm'));
        //event.target.innerHTML = event.dataTransfer.getData('contactForm');
        event.target.appendChild(document.getElementById(event.dataTransfer.getData("id")));
    });
};

DroppableElement.prototype.dragOver = function () {
    this.element.addEventListener('dragover', function (event) {
        event.preventDefault();
        c("EVENT: dragover");        
    });
};

// Create Draggable elements

var dg_contactForm = new DraggableElement("#contact-form");
var dr_contactDropZone1 = new DroppableElement("#contact-drop-1");
var dr_contactDropZone2 = new DroppableElement("#contact-drop-2");

dr_contactDropZone1.drop();
dr_contactDropZone2.drop();

dr_contactDropZone1.dragOver();
dr_contactDropZone2.dragOver();

dg_contactForm.drag();
dg_contactForm.dragLeave();








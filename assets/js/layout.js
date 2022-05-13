(function(){

    const datePicker = document.getElementById("due-date");
    const taskContainer = document.getElementById("task-container");
    const infoBtn = document.getElementById("info-btn");
    const infoLeaf = document.getElementById("info-leaf");
    const confirmDeleteAll = document.getElementById("confirm");
    const cancelBtn = document.getElementById("cancel");
    const deleteAll = document.getElementById("delete-all");
    const deleteCompleted = document.getElementById("delete-completed");
    const alertContainer = document.getElementById("alert-container");
    const listItems = document.getElementById("item-list");
    const emptyNotify = document.getElementById("empty-notify");
    const overlay = document.getElementsByClassName("overlay")[0];
    const completeCount = document.getElementById("complete-count");
    // const pendingCount = document.getElementById("pending-count");

    // if the list is empty then notify that there is nothing in list else continue
    if(listItems.childElementCount==0){
        emptyNotify.style.display="block";
    }else{
        emptyNotify.style.display="none";
    }

    // As soon as window loads set the min date of date picker as today
    // ALSO scroll in the list to go to end 
    window.onload = function () {
        var d = new Date();
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        var todayDate = [year, month, day].join('-');
        datePicker.setAttribute("min", todayDate);

        let scrollingHeight = taskContainer.scrollHeight / 50;
        // interval is repeated 50 times as clearInterval is called after 1000 i.e 20*50
        let timer = setInterval(function () {
            taskContainer.scrollBy(0, scrollingHeight);
        }, 20)

        setTimeout(function () {
            clearInterval(timer);
        }, 1000)
    }

    // Know more div visible onclick 
    infoBtn.onclick = function () {
        if (infoLeaf.style.top == "0px") {
            infoLeaf.style.top = "-468px"
        } else {
            infoLeaf.style.top = "0px"
        }
    }

    // CONTROL for deletion of completed items
    deleteCompleted.onclick = function () {
        if (listItems.childElementCount == 0 || completeCount.innerHTML == 0) {
            alert("Nothing to delete!");
            return;
        }
        location.href = "/delete-completed";
    }

    deleteAll.onclick=function(){
        if(listItems.childElementCount==0){
            alert("Nothing to delete!");
            return;
        }
        alertContainer.style.display="flex";
    }

    // CONTROL for deletion of all items
    confirmDeleteAll.onclick = function () {
        location.href = "/delete-all";
    }

    cancelBtn.onclick=function(){
        alertContainer.style.display="none";
    }

    overlay.onclick=cancelBtn.onclick;
}) ();
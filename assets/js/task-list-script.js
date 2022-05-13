(function (){
    // basic requirements
    const categoryDivs = document.getElementsByClassName("category");
    const checkboxes = document.getElementsByClassName("input-check");
    const completeCount = document.getElementById("complete-count");
    const pendingCount = document.getElementById("pending-count");
    const listItems = document.getElementsByClassName("list-items");

    let completed = 0;
    let pending = 0;

    // after state change of any list item there 
    //  must be updation of pending and complete
    let updatePending = function () {
        completeCount.innerHTML = completed;
        pendingCount.innerHTML = pending;
    }

    // deciding the color of the category divs
    for (const it of categoryDivs) {
        if (it.innerHTML.toLowerCase() == "home") {
            it.style.backgroundColor = "#2E7D32";
        }
        else if (it.innerHTML.toLowerCase() == "work") {
            it.style.backgroundColor = "#4527A0";
        }
        else if (it.innerHTML.toLowerCase() == "other") {
            it.style.backgroundColor = "#D81B60";
        }
        else if (it.innerHTML.toLowerCase() == "college") {
            it.style.backgroundColor = "#1565C0";
        }
    }

    //  WHEN RENDERING FOR THE FIRST TIME( ONLY HAPPENS ONCE ON FIRST LOAD )
    //  appropriately showing whether a todo has missed deadline or if it's near
    //  This also marks linethorughs and 
    //  checkboxes of completed items as checked on rendering
    //  It also helps in removing the deadline miss/deadline near tag if item is checked

    for (const chkbox of checkboxes) {
        let parentListElement = chkbox.parentElement.parentElement.parentElement.parentElement;
        // console.log(parentListElement);
        let lastDate = new Date(parentListElement.querySelector(".completion-date-raw").innerHTML);
        let today = new Date();
        let daysLeft = (lastDate.getTime() - today.getTime()) / (60 * 60 * 24 * 1000);
        if (daysLeft <= 0) {
            parentListElement.querySelector(".deadline").innerHTML = "Deadline Miss";
            parentListElement.querySelector(".deadline").style.display = "block";
        }
        else if (daysLeft < 4) {
            parentListElement.querySelector(".deadline").style.display = "block";

        }
        if (parentListElement.querySelector(".state").innerHTML == 1) {
            chkbox.checked = true;
            parentListElement.querySelector(".deadline").style.display = "none";
            parentListElement.style.backgroundColor = "gray";
            parentListElement.querySelector(".completion-date").style.textDecoration = "line-through";
            parentListElement.querySelector(".note").style.textDecoration = "line-through";
            completed++
        } else {
            chkbox.checked = false;
            parentListElement.style.backgroundColor = "white";
            pending++;
        }
    }

  // As soon as JS loads update pending or complete tasks
  updatePending();

  // Setting an on click listener on every checkbox FEATURES :
    // 1 As soon as the state of checbox changes from checked to unchecked it helps in
    // 2 bringing upon some asthetic changes such as color of div, line thorughs, etc
    // 3 it also removes deadline miss or deadline near tag if the item is checked
    // 4 ANOTHER ESSENTIAL FEATURE is that this makes a FETCH API request to 
    //   backend which stores the state of a particular element in it's databsase

    for (const chkbox of checkboxes) {
        let parentListElement = chkbox.parentElement.parentElement.parentElement.parentElement;
        chkbox.onchange = function () {
            let lastDate = new Date(parentListElement.querySelector(".completion-date-raw").innerHTML);
            let today = new Date();
            let daysLeft = (lastDate.getTime() - today.getTime()) / (60 * 60 * 24 * 1000);

            if (chkbox.checked) {
                parentListElement.querySelector(".deadline").style.display = "none";
                parentListElement.style.backgroundColor = "gray";
                parentListElement.querySelector(".completion-date").style.textDecoration = "line-through";
                parentListElement.querySelector(".note").style.textDecoration = "line-through";
                fetch("/update-state?" +"id=" +
                    parentListElement.querySelector(".id").innerHTML
                    + "&state=" + 1).then(response => response.json()).then(data => console.log(data));
                parentListElement.querySelector(".state").innerHTML = 1;
                completed++;
                pending--;
                updatePending();
            }
            else {
                if (daysLeft < 4) {
                    parentListElement.querySelector(".deadline").style.display = "block";
                }
                parentListElement.querySelector(".completion-date").style.textDecoration = "";
                parentListElement.querySelector(".note").style.textDecoration = "";
                parentListElement.style.backgroundColor = "white";
                fetch("/update-state?" + "id=" +
                    parentListElement.querySelector(".id").innerHTML
                    + "&state=" + 0).then(response => response.json()).then(data => console.log(data));
                parentListElement.querySelector(".state").innerHTML = 0;
                pending++;
                completed--;
                updatePending();
            }
        }
    }
})();
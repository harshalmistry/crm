var url = "http://localhost:8000/crm/"

function displayMessage(id){
    $("#"+id).fadeTo(2000, 500).slideUp(500, function(){
        $("#"+id).slideUp(500);
    });
}

function addCrmProfile(){
    var table = document.getElementById("profilestable");
    var tr = table.insertRow(1);
    tr.setAttribute("id", "newprofilerow");

    ["Id","Name", "Imp date", "Email", "Type", "City", "Contact", "Action"].forEach(function(el){
        var td = document.createElement("td");
        if(el == "Id"){
            tr.appendChild(td);
            return;
        }        
        else if(el == 'Action'){
            var saveB = document.createElement("button");
            saveB.className = "btn btn-success btn-sm";
            saveB.style = "margin-right: 5px; margin-bottom: 5px;";
            saveB.setAttribute("onclick", "deleteCrmProfile(1)");
            var submitText = document.createTextNode("Submit");
            saveB.appendChild(submitText);

            /*var cancelB = document.createElement("button");
            cancelB.className = "btn btn-danger btn-sm";
            cancelB.style = "margin-right: 5px; margin-bottom: 5px;";
            cancelB.innerHTML = "Cancel";
            cancelB.setAttribute("onclick", "cancelNewCrmProfile('newprofilerow')");*/
            td.appendChild(saveB);
            //td.appendChild(cancelB);
            tr.appendChild(td);
            return;
        }
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("required", true);
        x.setAttribute("placeholder", el);
        x.className = "form-control";
        td.appendChild(x);
        tr.appendChild(td);
    });
}

/*function cancelNewCrmProfile(rowid){
    var row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
    document.getElementById("addCrmProfile").removeAttribute("disabled");
}*/


function deleteCrmProfile(i){
    document.getElementById("spinner").style.display = "block";
    $.ajax({
        type: "GET",
        url: url + 'profiles/' + i,
        success: function (data) {
            if(data == 1){
                var row = document.getElementById("profilerow"+i);
                row.parentNode.removeChild(row);
                displayMessage("profiledeletemsgsuccess");
            }
            else{
                displayMessage("profiledeletemsgerror");
            }
            window.scrollTo(0,0);
            document.getElementById("spinner").style.display = "none";
        },
        error: function (data) {
            document.getElementById("spinner").style.display = "none";
            displayMessage("profiledeletemsgerror");
            window.scrollTo(0,0);
        }
    });
}

$(document).on('click', '#profiles', function(e){
    document.getElementById("spinner").style.display = "block";
    $.get(url + 'profiles', function(data, status){
        if(status == 'success' && data.length > 0){
            var table = document.createElement("table");
            table.className="table";
            table.setAttribute("id", "profilestable");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            var headRow = document.createElement("tr");
            ["ID","Name","Imp. Date", "Email", "Type", "City", "Contact", "Action"].forEach(function(el) {
                var th=document.createElement("th");
                th.appendChild(document.createTextNode(el));
                headRow.appendChild(th);
            });
            thead.appendChild(headRow);
            table.appendChild(thead); 

            for(i=0; i<data.length; i++){
                var temp = data[i];
                var tr = document.createElement("tr");
                tr.setAttribute("id", "profilerow"+(temp['id']));
                ["id", "name", "imp_date", "email", "type", "city", "contact"].forEach(function(el){
                    var td = document.createElement("td");
                    if(el == 'id'){
                        td.appendChild(document.createTextNode(i+1));    
                    }
                    else{
                        td.appendChild(document.createTextNode(temp[el]));
                    }
                    tr.appendChild(td);
                });
                var td=document.createElement("td");
                var editB = document.createElement("button");
                editB.className = "btn btn-success btn-sm";
                editB.style = "margin-right: 5px; margin-bottom: 5px;";
                editB.setAttribute("onclick", "deleteCrmProfile("+temp['id']+")");
                //var editIcon = document.createElement("span");
                //editIcon.setAttribute("class", "glyphicon glyphicon-edit");
                var editText = document.createTextNode("Edit");
                //editB.appendChild(editIcon);
                editB.appendChild(editText);

                var deleteB = document.createElement("button");
                deleteB.className = "btn btn-danger btn-sm";
                deleteB.style = "margin-right: 5px; margin-bottom: 5px;";
                deleteB.innerHTML = "Delete";
                deleteB.setAttribute("onclick", "deleteCrmProfile("+temp['id']+")");
                td.style = "display: inline-flex;";
                td.appendChild(editB);
                td.appendChild(deleteB);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody); 
            var bottom = document.getElementById("bottomtable");
            bottom.replaceChild(table, bottom.childNodes[0]);
            addCrmProfile();
        }
        else{
            displayMessage("profilesgeterror");
        }

        /*var addNewProfile = document.createElement("button");
        addNewProfile.className = "btn button btn-sm";
        addNewProfile.innerHTML = "Add";
        addNewProfile.setAttribute("onclick", "addCrmProfile()");
        addNewProfile.setAttribute("id", "addCrmProfile");
        var tool = document.getElementById("tool");
        tool.replaceChild(addNewProfile, tool.childNodes[0]);*/

        document.getElementById("spinner").style.display = "none";        
    });
});
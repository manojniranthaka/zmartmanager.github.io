var db = firebase.firestore();

const cname = document.getElementById("cname");
const service = document.getElementById("service");
const assign = document.getElementById("assign");
const task = document.getElementById("task");
const notes = document.getElementById("notes");
const pdate = document.getElementById("pdate");
const cdate = document.getElementById("cdate");
const ddate = document.getElementById("ddate");
const Records = document.getElementById("Records");

const reqcheck = document.getElementById("reqcheck");
const Rrequired = document.getElementById("Rrequired");

var caldate;

const listtablebody = document.getElementById("ListTableBody");

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");


LoadDataTable();
LoadClientList();
LoadServiceList();
LoadTaskList();
LoadStaffList();
$('#addtaskform').trigger("reset");

function LoadDataTable(){

  var curdate = new Date();

  if(UserEmailId == AdminEmailId){

    db.collection("Tasks_List").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  listtablebody.innerHTML +=
                  "<tr><td>"+change.doc.data().Task+
                  "</td><td>"+change.doc.data().ClientName+
                  "</td><td>"+change.doc.data().Pdate+
                  "</td><td><center>"+
                  "<label class=\"custom-control custom-checkbox\">"+
                  "<input type=\"checkbox\" disabled "+change.doc.data().Rrequired+" class=\"custom-control-input\" name=\"example-checkbox1\">"+
                  "<span class=\"custom-control-label\">&nbsp;</span>"+
                  "</label>"+
                  "</td><td><div class='dropdown w-100'>"+
                  "<button type='button' class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Complete+"</button>"+
                    "<div class='dropdown-menu'>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Yes'  onclick='UpdateComplete(this.id,this.name)'>Yes</a>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='No'  onclick='UpdateComplete(this.id,this.name)'>No</a>"+
                      "</div></div>"+
                  "</td><td>"+change.doc.data().Ddate+
                  "</td><td>"+change.doc.data().Assignto+
                  "</td><td>"+(Math.floor((Date.parse(change.doc.data().Ddate) - Date.parse(curdate)) / (1000 * 60 * 60 * 24)))+
                  "</td><td><button onclick=\"LoadDataOnce(id)\" class=\"btn btn-outline-warning\" id='"+change.doc.data().docid+"'><i class=\"fa fa-edit\"></i></button> | "+
                  "<button onclick=\"AssginDeleteId(this.id)\"   id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                  "</td></tr>"

                }
                  console.log("Data Loaded!");

              });

      });

  }else {

    db.collection("Tasks_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  listtablebody.innerHTML +=
                  "<tr><td>"+change.doc.data().Task+
                  "</td><td>"+change.doc.data().ClientName+
                  "</td><td>"+change.doc.data().Pdate+
                  "</td><td><center>"+
                  "<label class=\"custom-control custom-checkbox\">"+
                  "<input disabled type=\"checkbox\" "+change.doc.data().Rrequired+" class=\"custom-control-input\" name=\"example-checkbox1\">"+
                  "<span class=\"custom-control-label\">&nbsp;</span>"+
                  "</label>"+
                  "</td><td><div class='dropdown w-100'>"+
                  "<button type='button' class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Complete+"</button>"+
                    "<div class='dropdown-menu'>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Yes'  onclick='UpdateComplete(this.id,this.name)'>Yes</a>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='No'  onclick='UpdateComplete(this.id,this.name)'>No</a>"+
                      "</div></div>"+
                  "</td><td>"+change.doc.data().Ddate+
                  "</td><td>"+change.doc.data().Assignto+
                  "</td><td>"+(Math.floor((Date.parse(change.doc.data().Ddate) - Date.parse(curdate)) / (1000 * 60 * 60 * 24)))+
                  "</td><td><button onclick=\"LoadDataOnce(id)\" class=\"btn btn-outline-warning\" id='"+change.doc.data().docid+"'><i class=\"fa fa-edit\"></i></button> | "+
                  "<button onclick=\"AssginDeleteId(this.id)\"   id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                  "</td></tr>"

                }
                  console.log("Data Loaded!");

              });

      });

  }


}

function FilterDataTable(filter){
  $("#ListTableBody").empty();

  db.collection("Client_List").where("Status", "==", filter)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {

            listtablebody.innerHTML +=
            "<tr><td>"+doc.data().ClientName+
            "</td><td>"+doc.data().JOpened+
            "</td><td>"+doc.data().ClientRef+
            "</td><td>"+doc.data().JCompleted+
            "</td><td>"+doc.data().Clienttype+
            "</td><td>"+doc.data().Staff+
            "</td><td>"+doc.data().Status+
            "</td><td><select class='form-control'select="+doc.data().Status+" id='pcategories'><option value='Leads'>Leads</option><option value='Active'>Active</option>"+
            "<option value='Completed'>Completed</option><option value='Lost'>Lost</option>"
            "<option value='Archived'>Archived</option></select></td></tr>"


          });
          console.log("Data Loaded!");
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

}

function InsertRecord(){

if(notes.value==""){
    notes.focus();
}else if (pdate.value=="") {
    pdate.focus();
}else if (cdate.value=="") {
    cdate.focus();
}else if (ddate.value=="") {
    ddate.focus();
}else {

  var date = new Date();
  var docRef = db.collection("Tasks_List").doc();

  docRef.set({

          docid:docRef.id,
          UserEmailId:UserEmailId,
          UserNameId:UserNameId,
          CurrentDate:date,
          ClientName:cname.value,
          Service:service.value,
          Assignto:assign.value,
          Rrequired:Rrequired.value,
          Complete:"No",
          Notes:notes.value,
          Task:task.value,
          Pdate:pdate.value,
          Cdate:cdate.value,
          Ddate:ddate.value

  })
  .then(function() {
      console.log("Document written ! ");
      TriggerModal("Task Added");
      RelaodPage();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });

}

}

function LoadDataOnce(id){

document.getElementById("defaultModalLabel").innerText="Edit Task";
document.getElementById("taskeditbtn").name=id;
document.getElementById("taskeditbtn").style.display="block";
document.getElementById("tasksavebtn").style.display="none";
$("#addtask").modal();

var x = null

var docRef = db.collection("Tasks_List").doc(id);

docRef.get().then(function(doc) {

    if (doc.exists) {
        cname.value = doc.data().ClientName;
        service.value = doc.data().Service;
        assign.value = doc.data().Assignto;
        task.value = doc.data().Task;
        notes.value = doc.data().Notes;
        pdate.value = doc.data().Pdate;
        cdate.value = doc.data().Cdate;
        ddate.value = doc.data().Ddate;
        Rrequired.value = doc.data().Rrequired;

        if(doc.data().Rrequired =="checked"){
        document.getElementById("reqcheck").checked = true;
      }else {
        document.getElementById("reqcheck").checked = false;
      }


        console.log("Data Load Success!");

    } else {
        console.log("No such document!");

    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



}

function UpdateComplete(id,statusinfo){

db.collection("Tasks_List").doc(id).update({

  Complete: statusinfo

})
.then(function() {
    console.log("Document Updated. ");
    RelaodPageNotime();
  })
.catch(function(error) {
    console.error("Error adding document: ", error);

});


}

function UpdateRecord(id){

db.collection("Tasks_List").doc(id).update({

  ClientName:cname.value,
  Service:service.value,
  Assignto:assign.value,
  Status:"Completed",
  Rrequired:Rrequired.value,
  Notes:notes.value,
  Task:task.value,
  Pdate:pdate.value,
  Cdate:cdate.value,
  Ddate:ddate.value

})
.then(function() {
    console.log("Document Updated. ");
    TriggerModal("Task Updated");
    RelaodPage();

  })
.catch(function(error) {
    console.error("Error adding document: ", error);
});


}

function AssginDeleteId(id){
  $("#TaskModelDelete").modal();
    document.getElementById("deletetaskbtn").name=id;
}

function DeleteRecord(id){

  db.collection("Tasks_List").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              TriggerModal("Task Deleted");
              RelaodPage();

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

  }

function LoadClientList() {

  db.collection("Client_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                cname.innerHTML +=
                "<option value='"+change.doc.data().ClientName+"'>"+change.doc.data().ClientName+
                "</option>"
              }
                console.log("Data Loaded!");
            });

    });
  }

function LoadServiceList(){

    db.collection("Settings").doc("ManageServices").collection("ManageServicesList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  service.innerHTML +=
                  "<option value='"+change.doc.data().ServiceName+"'>"+change.doc.data().ServiceName+
                  "</option>"
                }
                  console.log("Data Loaded!");
              });

      });
    }

function LoadTaskList(){

        db.collection("Settings").doc("ManageTask").collection("ManageTaskList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                      task.innerHTML +=
                      "<option value='"+change.doc.data().TaskName+"'>"+change.doc.data().TaskName+
                      "</option>"
                    }
                      console.log("Data Loaded!");
                  });

          });
        }

function LoadStaffList(){

                db.collection("Staff_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
                    querySnapshot.docChanges().forEach(function(change) {
                      if (change.type === "added") {
                              assign.innerHTML +=
                              "<option value='"+change.doc.data().FirstName+" "+change.doc.data().LastName+"'>"+change.doc.data().FirstName+" "+change.doc.data().LastName+
                              "</option>"
                            }
                              console.log("Data Loaded!");
                          });

                  });
                }

function TriggerModal(message){
$("#TaskModelmessage").html(message);
$("#TaskModel").modal();
}

function AddNewTaskModal(){
  document.getElementById("defaultModalLabel").innerText="Create a new task";
  document.getElementById("taskeditbtn").style.display="none";
  document.getElementById("tasksavebtn").style.display="block";
  $('#addtaskform').trigger("reset");
    $("#addtask").modal();
}

 function SelectOption() {
  document.getElementById("mySelect").value = "banana";
}

 function RelaodPage(){
   setTimeout(function(){
     window.location.reload(1);
   },2000);
 }

 function RelaodPageNotime(){
   setTimeout(function(){
     window.location.reload(1);
   });
 }

function checkboxchecked(){

  $("#clickedcheck").on("click", function() {
    if (this.checked) {
        this.setAttribute("checked", "checked");
    } else {
        this.removeAttribute("checked");
    }
    snippet.log(this.parentNode.innerHTML);
  });
}

function calculatedaysleft(ddate){

  var date = new Date();

  var startDate = Date.parse("2020-08-1");
  var endDate = Date.parse("2020-08-30");
  var timeDiff = endDate - startDate;
  daysDiff = Math.floor((Date.parse("2020-08-30") -Date.parse("2020-08-1")) / (1000 * 60 * 60 * 24));

  return daysDiff;
}

$(function(){
    $("#reqcheck").click(function(e){
        $("#Rrequired").val($("#Rrequired").val() == "checked" ? "" : "checked");
    });
});

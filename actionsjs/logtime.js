var db = firebase.firestore();

const Clients = document.getElementById("ClientsList");
const MatterTask = document.getElementById("MatterTask");
const Staff = document.getElementById("RecordedBy");
const EntryDate = document.getElementById("EntryDate");
const TotalHours = document.getElementById("TotalHours");
const TotalMinutes = document.getElementById("TotalMinutes");
const BillingStatus = document.getElementById("BillingStatus");
const Notes = document.getElementById("Notes");


const StaffListTableBody = document.getElementById("StaffListTableBody");
const ClietsListTableBody = document.getElementById("ClietsListTableBody");
const MatterTaskListTableBody = document.getElementById("MatterTaskListTableBody");

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");


LoadDataTableStaff(UserEmailId);
LoadDataTableClient(UserEmailId);
LoadDataTableTaskMatters(UserEmailId)
LoadClientList(UserEmailId);
LoadTaskList(UserEmailId);
LoadStaffList(UserEmailId);

function LoadDataTableStaff(ID){

db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("UserEmailId", "==", ID).onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
              StaffListTableBody.innerHTML +=
              "<tr><td>"+change.doc.data().Staff+
              "</td><td>"+change.doc.data().LastTimeRecord+
              "</td><td>"+change.doc.data().EntryDate+
              "</td><td>"+Math.floor(((parseFloat(change.doc.data().Billable))+(parseFloat(change.doc.data().NonBillable)))/60)+" : "+(parseFloat(change.doc.data().Billable) +parseFloat(change.doc.data().NonBillable))%60+
              "</td><td>"+change.doc.data().Capacity+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().Billable)/60)+" : "+parseFloat(change.doc.data().Billable)%60+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().NonBillable)/60)+" : "+parseFloat(change.doc.data().NonBillable)%60+
              "</td></tr>"

            }
              console.log("Data Loaded!");
          });

  });
}

function LoadDataTableClient(ID){

db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("UserEmailId", "==", ID).onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
              ClietsListTableBody.innerHTML +=
              "<tr><td>"+change.doc.data().Client+
              "</td><td>"+change.doc.data().LastTimeRecord+
              "</td><td>"+change.doc.data().EntryDate+
              "</td><td>"+change.doc.data().Staff+
              "</td><td>"+Math.floor(((parseFloat(change.doc.data().Billable))+(parseFloat(change.doc.data().NonBillable)))/60)+" : "+(parseFloat(change.doc.data().Billable) +parseFloat(change.doc.data().NonBillable))%60+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().Billable)/60)+" : "+parseFloat(change.doc.data().Billable)%60+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().NonBillable)/60)+" : "+parseFloat(change.doc.data().NonBillable)%60+
              "</td></tr>"

            }
              console.log("Data Loaded!");
          });

  });
}

function LoadDataTableTaskMatters(ID){

db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("UserEmailId", "==", ID).onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
              MatterTaskListTableBody.innerHTML +=
              "<tr><td>"+change.doc.data().MatterTask+
              "</td><td>"+change.doc.data().LastTimeRecord+
              "</td><td>"+change.doc.data().EntryDate+
              "</td><td>"+change.doc.data().Staff+
              "</td><td>"+Math.floor(((parseFloat(change.doc.data().Billable))+(parseFloat(change.doc.data().NonBillable)))/60)+" : "+(parseFloat(change.doc.data().Billable) +parseFloat(change.doc.data().NonBillable))%60+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().Billable)/60)+" : "+parseFloat(change.doc.data().Billable)%60+
              "</td><td>"+Math.floor(parseFloat(change.doc.data().NonBillable)/60)+" : "+parseFloat(change.doc.data().NonBillable)%60+
              "</td></tr>"

            }
              console.log("Data Loaded!");
          });

  });
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

function InsertRecord() {
  if(EntryDate.value==""){
    EntryDate.focus();
  }else if(BillingStatus.options[BillingStatus.selectedIndex].value == "Billable"){
    Billable();
    TriggerModal("Logtime Updated");
    InsertRecordFroClient();
    //document.getElementById("logtimeform").reset();
  }else {
    NonBillable();
    TriggerModal("Logtime Updated");
    InsertRecordFroClient();
    //document.getElementById("logtimeform").reset();
  }

}

function Billable(){

  var billablevalue=0;

  var staffname = Staff.options[Staff.selectedIndex].value;

  var docRef = db.collection("LogTime_List").doc("Staff_List").collection("Staff").doc(staffname);
  var docRef2 = db.collection("Staff_List").where("FullName","==",staffname);

  var th = ((parseFloat(TotalHours.value)*60) + parseFloat(TotalMinutes.value));

  db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("Staff","==",Staff.value).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

          billablevalue= parseFloat(doc.data().Billable) +th;
    });
});

    docRef2.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          var Capacity= doc.data().Department;

            docRef.update({

              docid:docRef.id,
              Client:Clients.value,
              MatterTask:MatterTask.value,
              Staff:Staff.value,
              EntryDate:EntryDate.value,
              TotalHours:TotalHours.value,
              TotalMinutes:TotalMinutes.value,
              LastTimeRecord:TotalHours.value+" Hours : "+TotalMinutes.value+" Minutes",
              Billable:billablevalue,
              Capacity:Capacity,
              Notes:Notes.value

            })
            .then(function() {
                console.log("Document written ! ");
                RelaodPage();
              })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                docRef.set({

                  docid:docRef.id,
                  Client:Clients.value,
                  UserNameId:UserNameId,
                  UserEmailId:UserEmailId,
                  MatterTask:MatterTask.value,
                  Staff:Staff.value,
                  EntryDate:EntryDate.value,
                  TotalHours:TotalHours.value,
                  TotalMinutes:TotalMinutes.value,
                  LastTimeRecord:TotalHours.value+" Hours : "+TotalMinutes.value+" Minutes",
                  Billable:th,
                  NonBillable:"0",
                  Capacity:Capacity,
                  Notes:Notes.value

                })
                .then(function() {
                    console.log("Document written ! ");
                    RelaodPage();
                  })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            });

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);

    });

}

function NonBillable(){

  var nonbillablevalue=0;

  var staffname = Staff.options[Staff.selectedIndex].value;

  var docRef = db.collection("LogTime_List").doc("Staff_List").collection("Staff").doc(staffname);
  var docRef2 = db.collection("Staff_List").where("FullName","==",staffname);

  var th = ((parseFloat(TotalHours.value)*60) + parseFloat(TotalMinutes.value));

  db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("Staff","==",Staff.value).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

          nonbillablevalue= parseFloat(doc.data().NonBillable)+th;
    });
});

    docRef2.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          var Capacity= doc.data().Department;

            docRef.update({

              docid:docRef.id,
              Client:Clients.value,
              MatterTask:MatterTask.value,
              Staff:Staff.value,
              EntryDate:EntryDate.value,
              TotalHours:TotalHours.value,
              TotalMinutes:TotalMinutes.value,
              LastTimeRecord:TotalHours.value+" Hours : "+TotalMinutes.value+" Minutes",
              NonBillable:nonbillablevalue,
              Capacity:Capacity,
              Notes:Notes.value

            })
            .then(function() {
                console.log("Document written ! ");
                RelaodPage();
              })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                docRef.set({

                  docid:docRef.id,
                  Client:Clients.value,
                  UserNameId:UserNameId,
                  UserEmailId:UserEmailId,
                  MatterTask:MatterTask.value,
                  Staff:Staff.value,
                  EntryDate:EntryDate.value,
                  TotalHours:TotalHours.value,
                  TotalMinutes:TotalMinutes.value,
                  LastTimeRecord:TotalHours.value+" Hours : "+TotalMinutes.value+" Minutes",
                  Billable:"0",
                  NonBillable:th,
                  Capacity:Capacity,
                  Notes:Notes.value

                })
                .then(function() {
                    console.log("Document written ! ");
                    RelaodPage();
                  })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            });

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);

    });

}

function InsertRecordFroClient(){

var docRefClient = db.collection("LogTime_List").doc("Staff_List").collection("Client").doc();

  docRefClient.set({

    docid:docRefClient.id,
    Client:Clients.value,
    UserNameId:UserNameId,
    UserEmailId:UserEmailId,
    MatterTask:MatterTask.value,
    Staff:Staff.value,
    EntryDate:EntryDate.value,
    TotalHours:TotalHours.value,
    TotalMinutes:TotalMinutes.value,
    LastTimeRecord:TotalHours.value+" Hours : "+TotalMinutes.value+" Minutes"

  })
  .then(function() {
      console.log("Document written For Client ! ");

    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });


}

function LoadDataOnce(id){
document.getElementById("defaultModalLabel").innerText="Edit Task";
document.getElementById("taskeditbtn").name=id;
document.getElementById("taskeditbtn").style.display="block";
document.getElementById("tasksavebtn").style.display="none";
$("#addtask").modal();

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
  Records:"<input type=\"checkbox\"  data-toggle=\"toggle\" data-style=\"ios\">",
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

function LoadClientList(id) {

  db.collection("Client_List").where("UserEmailId", "==",id).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                Clients.innerHTML +=
                "<option value='"+change.doc.data().ClientName+"'>"+change.doc.data().ClientName+
                "</option>"
              }
                console.log("Data Loaded!");
            });

    });
  }

function LoadStaffList(id){

    db.collection("Staff_List").where("UserEmailId", "==",id).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  Staff.innerHTML +=
                  "<option value='"+change.doc.data().FullName+"'>"+change.doc.data().FullName+
                  "</option>"
                }
                  console.log("Data Loaded!");
              });

      });
    }

function LoadTaskList(id){

        db.collection("Settings").doc("ManageTask").collection("ManageTaskList").where("UserEmailId", "==",id).onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                      MatterTask.innerHTML +=
                      "<option value='"+change.doc.data().TaskName+"'>"+change.doc.data().TaskName+
                      "</option>"
                    }
                      console.log("Data Loaded!");
                  });

          });
        }

function TriggerModal(message){
$("#LogtimeModelmessage").html(message);
$("#LogtimeModel").modal();
}

function AddNewTaskModal(){
  document.getElementById("defaultModalLabel").innerText="Create a new task";
  document.getElementById("taskeditbtn").style.display="none";
  document.getElementById("tasksavebtn").style.display="block";
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

var db = firebase.firestore();

const Clients = document.getElementById("Clientss");
const Services = document.getElementById("Services");
const Staff = document.getElementById("Staff");
const Tasks = document.getElementById("Tasks");

const Notes = document.getElementById("Notes");
const EntryDate = document.getElementById("EntryDate");
const FutureNotes = document.getElementById("FutureNotes");
//const ddate = document.getElementById("ddate");
//const Records = document.getElementById("Records");
var caldate;

const NoteList = document.getElementById("NoteList");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");



LoadDataTable();
LoadClientList();
LoadServiceList();
LoadTaskList();
LoadStaffList();

function LoadDataTable(){
  var initElem =  NoteList.innerHTML
  NoteList.innerHTML += "<div>Loading....<div>"
  var index = 0
  var side

  var docRef = db.collection("Notice_List").where("UserEmailId", "==",UserEmailId);
  //.orderBy("EntryDate", "desc");

  docRef.onSnapshot(function(querySnapshot) {
    NoteList.innerHTML  = initElem
    querySnapshot.docChanges().forEach(function (change) {

      if (change.type === "added") {
        index++
        side = index % 2 === 0 ? 'l' : 'r'
        NoteList.innerHTML +=
          // "<li class=\"list-inline-item event-list pb-4\">" +
          // "<div class=\"px-4 pb-4\">" +
          // "<div class=\"event-date bg-soft-danger text-danger\">" + change.doc.data().EntryDate + "</div>" +
          // "<h5 class=\"font-size-16\">" + change.doc.data().Service + "</h5>" +
          // "<h5 class=\"font-size-16\">By " + change.doc.data().StaffMember + ",For " + change.doc.data().ClientName + "</h5>" +
          // "<p class=\"text-muted\">" + change.doc.data().Notes + "</p><div>" +
          // "<button class=\"btn btn-primary\">Read more</button>" +
          // "</div></div></li>" +

          "<li>" +
          "<div class='direction-" + side + "' >" +
          "<div class='flag-wrapper'>" +
          "<span class='flag' > " + change.doc.data().Service + "</span >" +
          "<span class='time-wrapper'><span class='time'>" + change.doc.data().EntryDate + "</span></span>" +
          "</div>" +
          "<div class='by'>By " + change.doc.data().StaffMember + ", For " + change.doc.data().ClientName + "</div>" +
          "<div class='desc' id=\'"+change.doc.id+"\'>" + change.doc.data().Notes + "</div>" +
          "</div>" +
          "</li> "
          }

          var newReadMeButton = document.createElement('button')
          newReadMeButton.innerHTML ="Read More"
          newReadMeButton.className = "btn btn-outline-primary btn-sm readMore"
          setReadMoreButton(change.doc.id,newReadMeButton,change.doc.data().Notes,8)
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

  var date = new Date();
  var docRef = db.collection("Notice_List").doc();

  docRef.set({

          docid:docRef.id,
          UserEmailId:UserEmailId,
          UserNameId:UserNameId,
          ClientName:Clients.value,
          Service:Services.value,
          StaffMember:Staff.value,
          Task:Tasks.value,
          Notes:Notes.value,
          EntryDate:EntryDate.value,
          FutureNotes:FutureNotes.value

  })
  .then(function() {
      console.log("Document written ! ");
      InsertRnoticetoclient();
      TriggerModal("Notice Added");
      RelaodPage();
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
  Records:Records.innerHTML,
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
                Clients.innerHTML +=
                "<option name='"+change.doc.data().docid+"' value='"+change.doc.data().ClientName+"'>"+change.doc.data().ClientName+
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
                  Services.innerHTML +=
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
                      Tasks.innerHTML +=
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
                              Staff.innerHTML +=
                              "<option value='"+change.doc.data().FirstName+" "+change.doc.data().LastName+"'>"+change.doc.data().FirstName+" "+change.doc.data().LastName+
                              "</option>"
                            }
                              console.log("Data Loaded!");
                          });

                  });
                }

function InsertRnoticetoclient(){

  var docnameid= $("#Clientss").find('option:selected').attr("name");

  db.collection("Client_List").doc(docnameid).update({

    RecentNote:Notes.value
  })
  .then(function() {
      console.log("Document written. ");

    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}

function TriggerModal(message){
$("#NoticeBoardmessage").html(message);
$("#NoticeBoardModel").modal();
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

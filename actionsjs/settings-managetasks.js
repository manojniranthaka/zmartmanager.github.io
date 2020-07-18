var db = firebase.firestore();

const taskname = document.getElementById("taskname");
const managetasklist = document.getElementById("managetasklist");

var UserNameId = localStorage.getItem("UserNameId");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");

LoadDataTableTask();

function LoadDataTableTask(){

if(UserEmailId == AdminEmailId){

  db.collection("Settings").doc("ManageTask").collection("ManageTaskList").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                managetasklist.innerHTML +=
                "<div class=\"col-sm-12 col-lg-3 p-3\">"+
                      "<div class=\"card h-100\">"+
                          "<div class=\"card-body\">"+
                            "<h5 class=\"card-title\">"+change.doc.data().TaskName+"</h5>"+
                              "<p>Added By:"+change.doc.data().UserNameId+"</p>"+
                            "<div class=\"border-top my-3\"></div>"+
                            "<button  class='btn btn-outline-warning btn-sm m-1'>Edit</button>"+
                            "<button onclick=\"AssginDeleteTaskId(this.id)\" id=\""+change.doc.data().docid+"\" class='btn btn-outline-warning btn-sm m-1'>Delete</button>"+
                          "</div>"
                      "</div></div>"
              }
                console.log("Data Loaded!");

            });

    });

}else {

  db.collection("Settings").doc("ManageTask").collection("ManageTaskList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                managetasklist.innerHTML +=
                "<div class=\"col-sm-12 col-lg-3 p-3\">"+
                      "<div class=\"card h-100\">"+
                          "<div class=\"card-body\">"+
                            "<h5 class=\"card-title\">"+change.doc.data().TaskName+"</h5>"+
                            "<p>Added By:"+change.doc.data().UserNameId+"</p>"+
                            "<div class=\"border-top my-3\"></div>"+
                            "<button  class='btn btn-outline-warning btn-sm m-1'>Edit</button>"+
                            "<button onclick=\"AssginDeleteTaskId(this.id)\" id=\""+change.doc.data().docid+"\" class='btn btn-outline-warning btn-sm m-1'>Delete</button>"+
                          "</div>"
                      "</div></div>"
              }
                console.log("Data Loaded!");

            });

    });

}



}

function InsertRecordTask() {

  if(taskname.value==""){
      taskname.focus();

  }else {
    var date = new Date();
    var docRef = db.collection("Settings").doc("ManageTask").collection("ManageTaskList").doc();

    docRef.set({

            docid:docRef.id,
            TaskName: taskname.value,
            UserNameId:UserNameId,
            UserEmailId:UserEmailId

    })
    .then(function() {
        console.log("Document written ! ");
          DismissModel("#myModal-managetaskaddtask");
          TriggerModal("Task Added");
        document.getElementById("settingstaskform").reset();


      })
    .catch(function(error) {
        console.error("Error adding document: ", error);

    });
  }


}

function AssginDeleteTaskId(id){
  $("#myModal-taskdelete").modal();
    document.getElementById("taskdeletetaskbtn").name=id;
}

function DeleteRecordTask(id){

db.collection("Settings").doc("ManageTask").collection("ManageTaskList").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            TriggerModal("Task Deleted");
            RelaodPage();

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

}

function TriggerModal(message){

$("#SettingModelmessage").html(message);
$("#SettingModel").modal();
 }

function DismissModel(modal){
  $(modal).modal('toggle');
}

function RelaodPage(){
  setTimeout(function(){
    window.location.reload(1);
  },2000);

}

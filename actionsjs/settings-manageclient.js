var db = firebase.firestore();

const clienttype = document.getElementById("clienttype");
var manageclientlist = document.getElementById("manageclientlist");
var UserNameId = localStorage.getItem("UserNameId");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");

LoadDataTableClient();

function LoadDataTableClient(){

  if(UserEmailId == AdminEmailId){

db.collection("Settings").doc("ManageClients").collection("ManageClientsList").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {

        manageclientlist.innerHTML +=
        "<div class=\"col-sm-12 col-lg-3 p-3\">"+
              "<div class=\"card h-100\">"+
                  "<div class=\"card-body\">"+
                    "<h5 class=\"card-title\">"+change.doc.data().ClientType+"</h5>"+
                    "<p>Added By:"+change.doc.data().UserNameId+"</p>"+
                    "<div class=\"border-top my-3\"></div>"+
                    "<button href=\"#\" class='btn btn-outline-warning btn-sm m-1'>Edit</button>"+
                    "<button href=\"#\" onclick=\"DeleteRecordClient(this.id)\" id=\""+change.doc.data().docid+"\" class='btn btn-outline-warning btn-sm m-1'>Delete</button>"+
                  "</div>"
              "</div></div>"
            }
              console.log("Data Loaded!");

          });

  });

}else {

  db.collection("Settings").doc("ManageClients").collection("ManageClientsList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {

          manageclientlist.innerHTML +=
          "<div class=\"col-sm-12 col-lg-3 p-3\">"+
                "<div class=\"card h-100\">"+
                    "<div class=\"card-body\">"+
                      "<h5 class=\"card-title\">"+change.doc.data().ClientType+"</h5>"+
                      "<p>Added By:"+change.doc.data().UserNameId+"</p>"+
                      "<div class=\"border-top my-3\"></div>"+
                      "<button href=\"#\" class='btn btn-outline-warning btn-sm m-1'>Edit</button>"+
                      "<button href=\"#\" onclick=\"DeleteRecordClient(this.id)\" id=\""+change.doc.data().docid+"\" class='btn btn-outline-warning btn-sm m-1'>Delete</button>"+
                    "</div>"
                "</div></div>"
              }
                console.log("Data Loaded!");

            });

    });

}

}

function InsertRecordClient() {


  if(clienttype.value==""){
    clienttype.focus();
  }else{

    var date = new Date();
    var docRef = db.collection("Settings").doc("ManageClients").collection("ManageClientsList").doc();

    docRef.set({

            docid:docRef.id,
            UserNameId:UserNameId,
            UserEmailId:UserEmailId,
            ClientType: clienttype.value
    })
    .then(function() {
        console.log("Document written ! ");
        DismissModel("#myModal-clienttypesadd")
        TriggerModal("Client Type Added");
        document.getElementById("settingclientform").reset();


      })
    .catch(function(error) {
        console.error("Error adding document: ", error);

    });

  }
}

function DeleteRecordClient(id){

db.collection("Settings").doc("ManageClients").collection("ManageClientsList").doc(id).delete().then(function() {

            console.log("Document successfully deleted!");
            TriggerModal("Client Type Deleted");
            RelaodPage();

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

}

function TriggerModal(message){

$("#SettingModelmessage").html(message);
     $("#SettingModel").modal();
 }

function RelaodPage(){
  setTimeout(function(){
    window.location.reload(1);
  },2000);

}

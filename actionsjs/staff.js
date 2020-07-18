var db = firebase.firestore();

const FirstName = document.getElementById("FirstName");
const LastName = document.getElementById("LastName");
const DateofBirth = document.getElementById("DateofBirth");
const Gender = document.getElementById("Gender");
const Department = document.getElementById("Department");
const Position = document.getElementById("Position");
const Phone = document.getElementById("Phone");
const Email = document.getElementById("Email");

const WebsiteURL = document.getElementById("WebsiteURL");
const Facebook = document.getElementById("Facebook");
const Twitter = document.getElementById("Twitter");
const LinkedIN = document.getElementById("LinkedIN");
const Behance = document.getElementById("Behance");
const Messages = document.getElementById("Messages");

const stafflist = document.getElementById("stafflist");
const StaffTableBody = document.getElementById("StaffTableBody");

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var FirmName = localStorage.getItem("FirmName");

updateformatt();
LoadDataList();
LoadDataTable();
/*
LoadClientList();
LoadServiceList();
LoadTaskList();
*/

function LoadDataList(){

  if(UserEmailId == AdminEmailId){

    db.collection("Staff_List").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {

          if (change.type === "added") {
                  stafflist.innerHTML +=
                  "<div class=\"col-xl-4 col-lg-4 col-md-6\"><div class=\"card\"><div class=\"card-body text-center ribbon\">"+
                              "<div class=\"ribbon-box indigo\">"+change.doc.data().Position+"</div>"+
                              "<img class=\"rounded-circle img-thumbnail w100\" src=\"assets/images/sm/avatar3.jpg\" alt=\"\">"+
                              "<h6 class=\"mt-3 mb-0\">"+change.doc.data().FirstName+" "+change.doc.data().LastName+"</h6>"+
                              "<span>"+change.doc.data().Email+"</span>"+
                              "<ul class=\"mt-3 list-unstyled d-flex justify-content-center\">"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Twitter+"\"><i class=\"fa fa-twitter\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Facebook+"\"><i class=\"fa fa-facebook\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Behance+"\"><i class=\"fa fa-slack\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().LinkedIN+"\"><i class=\"fa fa-linkedin\"></i></a></li></ul>"+
                              "<!--<button class=\"btn btn-default btn-sm\">View Profile</button>"+
                              "<button class=\"btn btn-default btn-sm\">Message</button>-->"+
                              "<div class=\"row text-center mt-4\">"+
                                "<div class=\"col-6 border-right\">"+
                                      "<label class=\"mb-0\">Client Portfolio</label>"+
                                      "<h4 id=\""+change.doc.data().docid+"\" class=\"font-18\"></h4></div>"+
                                  "<div class=\"col-6\">"+
                                      "<label class=\"mb-0\">Tasks Outstanding</label>"+
                                      "<h4 class=\""+change.doc.data().docid+"\"class=\"font-18\"></h4>"+
                                  "</div></div></div></div></div>"

                }
                  console.log("Data Loaded!");
                  ClientPortfolio(change.doc.data().docid,change.doc.data().FullName);
                  TasksOutstanding(change.doc.data().docid,change.doc.data().FullName);
              });

      });

  }else{

    db.collection("Staff_List").where("UserEmailId", "==",UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  stafflist.innerHTML +=
                  "<div class=\"col-xl-4 col-lg-4 col-md-6\"><div class=\"card\"><div class=\"card-body text-center ribbon\">"+
                              "<div class=\"ribbon-box indigo\">"+change.doc.data().Position+"</div>"+
                              "<img class=\"rounded-circle img-thumbnail w100\" src=\"assets/images/sm/avatar3.jpg\" alt=\"\">"+
                              "<h6 class=\"mt-3 mb-0\">"+change.doc.data().FirstName+" "+change.doc.data().LastName+"</h6>"+
                              "<span>"+change.doc.data().Email+"</span>"+
                              "<ul class=\"mt-3 list-unstyled d-flex justify-content-center\">"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Twitter+"\"><i class=\"fa fa-twitter\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Facebook+"\"><i class=\"fa fa-facebook\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().Behance+"\"><i class=\"fa fa-slack\"></i></a></li>"+
                                  "<li><a class=\"p-3\" target=\"_blank\" href=\""+change.doc.data().LinkedIN+"\"><i class=\"fa fa-linkedin\"></i></a></li></ul>"+
                              "<!--<button class=\"btn btn-default btn-sm\">View Profile</button>"+
                              "<button class=\"btn btn-default btn-sm\">Message</button>-->"+
                              "<div class=\"row text-center mt-4\">"+
                                "<div class=\"col-6 border-right\">"+
                                      "<label class=\"mb-0\">Client Portfolio</label>"+
                                      "<h4 id=\""+change.doc.data().docid+"\" class=\"font-18\">14</h4></div>"+
                                  "<div class=\"col-6\">"+
                                      "<label class=\"mb-0\">Tasks Outstanding</label>"+
                                      "<h4 class=\""+change.doc.data().docid+"\"class=\"font-18\">52</h4>"+
                                  "</div></div></div></div></div>"

                }
                  ClientPortfolio(change.doc.data().docid,change.doc.data().FullName);
                  TasksOutstanding(change.doc.data().docid,change.doc.data().FullName);
                  console.log("Data Loaded!");
              });

      });

  }


}

function LoadDataTable(){

  if(UserEmailId == AdminEmailId){

    db.collection("Staff_List").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  StaffTableBody.innerHTML +=
                  "<tr><td>"+change.doc.data().FirstName+" "+ change.doc.data().LastName+
                  "</td><td>"+change.doc.data().Email+
                  "</td><td id="+change.doc.data().docid+"a"+">"+
                  "</td><td class="+change.doc.data().docid+">"+
                  "</td><td>"+change.doc.data().Position+
                  "</td><td>"+change.doc.data().Phone+
                      "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                      "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                      "</td></tr>"
                }
                  console.log("Data Loaded!");
                  ClientPortfolio(change.doc.data().docid+"a",change.doc.data().FullName);
              });

      });

  }else{

    db.collection("Staff_List").where("UserEmailId", "==",UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  StaffTableBody.innerHTML +=
                  "<tr><td>"+change.doc.data().FirstName+" "+ change.doc.data().LastName+
                  "</td><td>"+change.doc.data().Email+
                  "</td><td id="+change.doc.data().docid+"a"+">"+
                  "</td><td class="+change.doc.data().docid+">"+
                  "</td><td>"+change.doc.data().Position+
                  "</td><td>"+change.doc.data().Phone+
                      "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                      "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                      "</td></tr>"
                }
                  console.log("Data Loaded!");
                  ClientPortfolio(change.doc.data().docid+"a",change.doc.data().FullName);

              });

      });

  }


}

function InsertRecord() {

if(FirstName.value==""){FirstName.focus();}
else if (LastName.value=="") {LastName.focus();}
else if (DateofBirth.value=="") {DateofBirth.focus();}
else if (Gender.value=="") {Gender.focus();}
else if (Department.value=="") {Department.focus();}
else if (Position.value=="") {Position.focus();}
else if (Phone.value=="") {Phone.focus();}
else if (Email.value=="") {Email.focus();}
else if (WebsiteURL.value=="") {WebsiteURL.focus();}
else if (Facebook.value=="") {Facebook.focus();}
else if (Twitter.value=="") {Twitter.focus();}
else if (LinkedIN.value=="") {LinkedIN.focus();}
else if (Behance.value=="") {Behance.focus();}
else if (Messages.value=="") {Messages.focus();}
else {
  var docRef = db.collection("Staff_List").doc();

  docRef.set({

          docid:docRef.id,
          UserEmailId:UserEmailId,
          FirstName:FirstName.value,
          LastName:LastName.value,
          FullName:FirstName.value+" "+LastName.value,
          DateofBirth:DateofBirth.value,
          Gender:Gender.value,
          Department:Department.value,
          Position:Position.value,
          Phone:Phone.value,
          Email:Email.value,
          WebsiteURL:WebsiteURL.value,
          Facebook:Facebook.value,
          Twitter:Twitter.value,
          LinkedIN:LinkedIN.value,
          Behance:Behance.value,
          Messages:Messages.value,
          BelongsFirmName:FirmName

  })
  .then(function() {
      console.log("Document written ! ");
      TriggerModal("Employee Added.")
      document.getElementById("staffform").reset();
      RelaodPage();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });

}

}

function LoadDataOnce(id){

document.getElementById("staffupdatebtn").name=id;
$("#LoadStaff").modal();

var docRef = db.collection("Staff_List").doc(id);

docRef.get().then(function(doc) {

    if (doc.exists) {
      FirstName2.value = doc.data().FirstName;
      LastName2.value = doc.data().LastName;
      DateofBirth2.value = doc.data().DateofBirth;
      Gender2.value = doc.data().Gender;
      Department2.value = doc.data().Department;
      Position2.value = doc.data().Position;
      Phone2.value = doc.data().Phone;
      Email2.value = doc.data().Email;
      WebsiteURL2.value = doc.data().WebsiteURL;
      Facebook2.value = doc.data().Facebook;
      Twitter2.value = doc.data().Twitter;
      LinkedIN2.value = doc.data().LinkedIN;
      Behance2.value = doc.data().Behance;
      Messages2.value = doc.data().Messages;

        console.log("Data Load Success!");
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

function UpdateRecord(id){

  if(FirstName2.value==""){FirstName2.focus();}
  else if (LastName2.value=="") {LastName2.focus();}
  else if (DateofBirth2.value=="") {DateofBirth2.focus();}
  else if (Gender2.value=="") {Gender2.focus();}
  else if (Department2.value=="") {Department2.focus();}
  else if (Position2.value=="") {Position2.focus();}
  else if (Phone2.value=="") {Phone2.focus();}
  else if (Email2.value=="") {Email2.focus();}
  else if (WebsiteURL2.value=="") {WebsiteURL2.focus();}
  else if (Facebook2.value=="") {Facebook2.focus();}
  else if (Twitter2.value=="") {Twitter2.focus();}
  else if (LinkedIN2.value=="") {LinkedIN2.focus();}
  else if (Behance2.value=="") {Behance2.focus();}
  else if (Messages2.value=="") {Messages2.focus();}
  else {

db.collection("Staff_List").doc(id).update({

  FirstName:FirstName2.value,
  LastName:LastName2.value,
  FullName:FirstName2.value+" "+LastName.value2,
  DateofBirth:DateofBirth2.value,
  Gender:Gender2.value,
  Department:Department2.value,
  Position:Position2.value,
  Phone:Phone2.value,
  Email:Email2.value,
  WebsiteURL:WebsiteURL2.value,
  Facebook:Facebook2.value,
  Twitter:Twitter2.value,
  LinkedIN:LinkedIN2.value,
  Behance:Behance2.value,
  Messages:Messages2.value

})
.then(function() {
    console.log("Document Updated. ");
    TriggerModal("Employee Details Updated");
    RelaodPage();

  })
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}
}

function AssginDeleteId(id){
  $("#StaffModelDelete").modal();
    document.getElementById("deletestafftbtn").name=id;
}

function DeleteRecord(id){

  db.collection("Staff_List").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              TriggerModal("Employee Deleted");
              RelaodPage();

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

  }

function ClientPortfolio(CDocId,StaffNameID){

  var clients =0;

  db.collection("Client_List").where("OtherLevels","==",StaffNameID).where("ActiveStatus", "==","Active")
      .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {

            clients++
          /*
          if( change.doc.data().OtherLevels == StaffNameID){

          }
          */
      });

      $("#"+CDocId).html(clients);
      //console.log(clients);
  });





}

function TasksOutstanding(CDocId,StaffNameID){

  var outstandingTasks =0;

  db.collection("Tasks_List").where("Assignto", "==",StaffNameID)
      .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
          if( change.doc.data().Complete !== "Yes"){
              outstandingTasks++
          }
      });
      $("."+CDocId).html(outstandingTasks);
      console.log(outstandingTasks);
  });


}

function TriggerModal(message){
  $("#ClientModelmessage").html(message);
  $("#StaffModel").modal();
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

 function updateformatt(){

   const FirstName2 = document.getElementById("FirstName2");
   const LastName2 = document.getElementById("LastName2");
   const DateofBirth2 = document.getElementById("DateofBirth2");
   const Gender2 = document.getElementById("Gender2");
   const Department2 = document.getElementById("Department2");
   const Position2 = document.getElementById("Position2");
   const Phone2 = document.getElementById("Phone2");
   const Email2 = document.getElementById("Email2");

   const WebsiteURL2 = document.getElementById("WebsiteURL2");
   const Facebook2 = document.getElementById("Facebook2");
   const Twitter2 = document.getElementById("Twitter2");
   const LinkedIN2 = document.getElementById("LinkedIN2");
   const Behance2 = document.getElementById("Behance2");
   const Messages2 = document.getElementById("Messages2");



 }

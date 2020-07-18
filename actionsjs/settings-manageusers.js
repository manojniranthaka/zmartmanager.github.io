var db = firebase.firestore();
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");

var RUserEmail = document.getElementById("Ruseremail");
var RUserPass = document.getElementById("Ruserpass");
var RUserName = document.getElementById("Rusername");
var PCurrencyCode = localStorage.getItem("PCurrencyCode");

const listtablebody = document.getElementById("UsersTableBoady");

LoadUsersDataTable(UserEmailId);

function LoadUsersDataTable(ID){

  db.collection("Registerd_UserList").where("Belongsto", "==", ID).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {

            listtablebody.innerHTML +=
              "<tr>"+
              "</td><td>"+change.doc.data().RUserEmail+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateOnBoarding('"+change.doc.data().docid+"','"+change.doc.data().OnBoarding+"')\" type=\"button\" value="+change.doc.data().OnBoarding+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateClients('"+change.doc.data().docid+"','"+change.doc.data().Clients+"')\" type=\"button\" value="+change.doc.data().Clients+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateMattersAndTasks('"+change.doc.data().docid+"','"+change.doc.data().MattersAndTasks+"')\" type=\"button\" value="+change.doc.data().MattersAndTasks+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateFeeIncome('"+change.doc.data().docid+"','"+change.doc.data().FeeIncome+"')\" type=\"button\" value="+change.doc.data().FeeIncome+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateLogTime('"+change.doc.data().docid+"','"+change.doc.data().LogTime+"')\" type=\"button\" value="+change.doc.data().LogTime+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateNoticeBoard('"+change.doc.data().docid+"','"+change.doc.data().NoticeBoard+"')\" type=\"button\" value="+change.doc.data().NoticeBoard+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateStaffZone('"+change.doc.data().docid+"','"+change.doc.data().StaffZone+"')\" type=\"button\" value="+change.doc.data().StaffZone+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateEauditPapers('"+change.doc.data().docid+"','"+change.doc.data().EauditPapers+"')\" type=\"button\" value="+change.doc.data().EauditPapers+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateReports('"+change.doc.data().docid+"','"+change.doc.data().Reports+"')\" type=\"button\" value="+change.doc.data().Reports+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateClouDoc('"+change.doc.data().docid+"','"+change.doc.data().ClouDoc+"')\" type=\"button\" value="+change.doc.data().ClouDoc+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdatePracticeFunding('"+change.doc.data().docid+"','"+change.doc.data().PracticeFunding+"')\" type=\"button\" value="+change.doc.data().PracticeFunding+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettings('"+change.doc.data().docid+"','"+change.doc.data().Settings+"')\" type=\"button\" value="+change.doc.data().Settings+">"+

              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsPractice('"+change.doc.data().docid+"','"+change.doc.data().SettingsPractice+"')\" type=\"button\" value="+change.doc.data().SettingsPractice+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsCalendar('"+change.doc.data().docid+"','"+change.doc.data().SettingsCalendar+"')\" type=\"button\" value="+change.doc.data().SettingsCalendar+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsUsers('"+change.doc.data().docid+"','"+change.doc.data().SettingsUsers+"')\" type=\"button\" value="+change.doc.data().SettingsUsers+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsSubscription('"+change.doc.data().docid+"','"+change.doc.data().SettingsSubscription+"')\" type=\"button\" value="+change.doc.data().SettingsSubscription+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsAuditTrail('"+change.doc.data().docid+"','"+change.doc.data().SettingsAuditTrail+"')\" type=\"button\" value="+change.doc.data().SettingsAuditTrail+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsTax('"+change.doc.data().docid+"','"+change.doc.data().SettingsTax+"')\" type=\"button\" value="+change.doc.data().SettingsTax+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsService('"+change.doc.data().docid+"','"+change.doc.data().SettingsService+"')\" type=\"button\" value="+change.doc.data().SettingsService+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsInvoices('"+change.doc.data().docid+"','"+change.doc.data().SettingsInvoices+"')\" type=\"button\" value="+change.doc.data().SettingsInvoices+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsTasks('"+change.doc.data().docid+"','"+change.doc.data().SettingsTasks+"')\" type=\"button\" value="+change.doc.data().SettingsTasks+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsClients('"+change.doc.data().docid+"','"+change.doc.data().SettingsClients+"')\" type=\"button\" value="+change.doc.data().SettingsClients+">"+
              "</td><td><input class=\"btn btn-outline-warning\" onclick=\"UpdateSettingsRecurring('"+change.doc.data().docid+"','"+change.doc.data().SettingsRecurring+"')\" type=\"button\" value="+change.doc.data().SettingsRecurring+">"+
              "</td><td><button id="+change.doc.data().docid+" onclick=\"AssginDeleteUserId(this.id)\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>"+
              "</td></tr>"
            }
                console.log("Data Loaded!");
            });

    });



}

function UpdateOnBoarding(Docid,PStatus){

  if(localStorage.getItem("OnBoarding") == "D"){

  window.alert("You do not have access for enable it !");

  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        OnBoarding:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        OnBoarding:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}

}
function UpdateClients(Docid,PStatus){

  if(localStorage.getItem("Clients") == "D"){

  window.alert("You do not have access for enable it !");

  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        Clients:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        Clients:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateMattersAndTasks(Docid,PStatus){

  if(localStorage.getItem("MattersAndTasks") == "D"){

  window.alert("You do not have access for enable it !");

  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        MattersAndTasks:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        MattersAndTasks:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateFeeIncome(Docid,PStatus){

  if(localStorage.getItem("FeeIncome") == "D"){

  window.alert("You do not have access for enable it !");

  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        FeeIncome:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        FeeIncome:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateLogTime(Docid,PStatus){

  if(localStorage.getItem("LogTime") == "D"){

  window.alert("You do not have access for enable it !");

  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        LogTime:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        LogTime:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateNoticeBoard(Docid,PStatus){

  if(localStorage.getItem("NoticeBoard") == "D"){

  window.alert("You do not have access for enable it !");

  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        NoticeBoard:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        NoticeBoard:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}
function UpdateStaffZone(Docid,PStatus){

  if(localStorage.getItem("StaffZone") == "D"){

  window.alert("You do not have access for enable it !");

  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        StaffZone:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        StaffZone:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateEauditPapers(Docid,PStatus){

  if(localStorage.getItem("EauditPapers") == "D"){

  window.alert("You do not have access for enable it !");

  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        EauditPapers:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        EauditPapers:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateReports(Docid,PStatus){

  if(localStorage.getItem("Reports") == "D"){
  window.alert("You do not have access for enable it !");
  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        Reports:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        Reports:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}
function UpdateClouDoc(Docid,PStatus){

  if(localStorage.getItem("ClouDoc") == "D"){
  window.alert("You do not have access for enable it !");
  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        ClouDoc:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        ClouDoc:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdatePracticeFunding(Docid,PStatus){

  if(localStorage.getItem("PracticeFunding") == "D"){
  window.alert("You do not have access for enable it !");
  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        PracticeFunding:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        PracticeFunding:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}
}
function UpdateSettings(Docid,PStatus){

  if(localStorage.getItem("Settings") == "D"){
  window.alert("You do not have access for enable it !");
  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        Settings:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        Settings:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}

function UpdateSettingsPractice(Docid,PStatus){

  if(localStorage.getItem("SettingsPractice") == "D"){
  window.alert("You do not have access for enable it !");
  }else {

  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsPractice:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsPractice:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


}
}
function UpdateSettingsCalendar(Docid,PStatus){
  if(localStorage.getItem("SettingsCalendar") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsCalendar:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsCalendar:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}
function UpdateSettingsUsers(Docid,PStatus){
  if(localStorage.getItem("SettingsUsers") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsUsers:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsUsers:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}
function UpdateSettingsSubscription(Docid,PStatus){
  if(localStorage.getItem("SettingsSubscription") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsSubscription:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsSubscription:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

}

}
function UpdateSettingsAuditTrail(Docid,PStatus){
  if(localStorage.getItem("SettingsAuditTrail") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsAuditTrail:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsAuditTrail:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}
function UpdateSettingsTax(Docid,PStatus){
  if(localStorage.getItem("SettingsTax") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsTax:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsTax:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}
function UpdateSettingsService(Docid,PStatus){
  if(localStorage.getItem("SettingsService") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsService:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsService:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}
function UpdateSettingsInvoices(Docid,PStatus){
  if(localStorage.getItem("SettingsInvoices") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsInvoices:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsInvoices:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}
function UpdateSettingsTasks(Docid,PStatus){
  if(localStorage.getItem("SettingsTasks") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsTasks:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsTasks:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}

}
function UpdateSettingsClients(Docid,PStatus){
  if(localStorage.getItem("SettingsClients") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsClients:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsClients:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}
function UpdateSettingsRecurring(Docid,PStatus){
  if(localStorage.getItem("SettingsRecurring") == "D"){
  window.alert("You do not have access for enable it !");
  }else {
  if(PStatus == "D"){

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsRecurring:"E"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else {

    db.collection("Registerd_UserList").doc(Docid).update({

        SettingsRecurring:"D"
    })
    .then(function() {
        console.log("Document Updated.");
        $("#UsersTableBoady").empty();
        LoadUsersDataTable(UserEmailId);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
}


}

function FilterUserTable(){

$("#UsersTableBoady").empty();

db.collection("Registerd_UserList").where("Belongsto", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            listtablebody.innerHTML +=
              "<tr>"+
              "</td><td>"+change.doc.data().RUserEmail+
              "</td><td>"+change.doc.data().OnBoarding+
              "</td><td>"+change.doc.data().Clients+
              "</td><td>"+change.doc.data().MattersAndTasks+
              "</td><td>"+change.doc.data().FeeIncome+
              "</td><td>"+change.doc.data().LogTime+
              "</td><td>"+change.doc.data().NoticeBoard+
              "</td><td>"+change.doc.data().StaffZone+
              "</td><td>"+change.doc.data().EauditPapers+
              "</td><td>"+change.doc.data().Reports+
              "</td><td>"+change.doc.data().ClouDoc+
              "</td><td>"+change.doc.data().PracticeFunding+
              "</td><td>"+change.doc.data().Settings+

              "</td><td>"+change.doc.data().SettingsPractice+
              "</td><td>"+change.doc.data().SettingsCalendar+
              "</td><td>"+change.doc.data().SettingsUsers+
              "</td><td>"+change.doc.data().SettingsSubscription+
              "</td><td>"+change.doc.data().SettingsAuditTrail+
              "</td><td>"+change.doc.data().SettingsTax+
              "</td><td>"+change.doc.data().SettingsService+
              "</td><td>"+change.doc.data().SettingsInvoices+
              "</td><td>"+change.doc.data().SettingsTasks+
              "</td><td>"+change.doc.data().SettingsClients+
                "</td><td>"+change.doc.data().SettingsRecurring+
              "</td><td><button id="+change.doc.data().docid+" onclick=\"DeleteUser(this.id)\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>"+
              "</td></tr>"
            }
                console.log("Data Loaded!");
            });

    });


}

function RegisterUser(){

if(RUserEmail.value=="" || RUserPass.value=="" || RUserName.value=="" ){
  window.alert("Please Fill Details Correcly !");
}else {

  firebase.auth().createUserWithEmailAndPassword(RUserEmail.value, RUserPass.value).then(function() {
    setTimeout(function(){
      SaveRegDetails();
    },1000);

},function(error) {
  window.alert("Something Went Worng, Please Try Again !")
  var errorCode = error.code;
  var errorMessage = error.message;

});

}

}

function AssginDeleteUserId(id){
  $("#myModal-manageusersdelete").modal();
    document.getElementById("userdeletetaskbtn").name=id;
}

function DeleteUser(id){

  db.collection("Registerd_UserList").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              TriggerModal("User Deleted.");
              RelaodPage();

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

}

function SaveRegDetails(){

var docRef = db.collection("Registerd_UserList").doc();

docRef.set({

        docid:docRef.id,
        Belongsto:UserEmailId,
        UserType:"User",
        PFirmName:FirmName,
        UserNameId:RUserName.value,
        UserEmailId:RUserEmail.value,
        RUserEmail:RUserEmail.value,
        RUserPass:RUserPass.value,
        PCurrencyCode:PCurrencyCode,
        OnBoarding:"D",
        Clients:"D",
        MattersAndTasks:"D",
        FeeIncome:"D",
        LogTime:"D",
        NoticeBoard:"D",
        StaffZone:"D",
        EauditPapers:"D",
        Reports:"D",
        ClouDoc:"D",
        PracticeFunding:"D",
        Settings:"D",
        SettingsPractice:"D",
        SettingsCalendar:"D",
        SettingsUsers:"D",
        SettingsSubscription:"D",
        SettingsAuditTrail:"D",
        SettingsTax:"D",
        SettingsService:"D",
        SettingsInvoices:"D",
        SettingsTasks:"D",
        SettingsClients:"D",
        SettingsRecurring:"D"

})
.then(function() {
    $('#myModal-manageusersadduser').modal('hide');
    console.log("Document written ! ");
    window.alert("You have been Registerd.");
    $('#userregform').trigger("reset");
  })
.catch(function(error) {
    console.error("Error adding document: ", error);

});

}

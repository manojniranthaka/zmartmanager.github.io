localStorage.clear();
var db = firebase.firestore();
$('#userregform').trigger("reset");
var UserEmail = document.getElementById("useremail");
var UserPass = document.getElementById("userpass");

var RUserEmail = document.getElementById("Ruseremail");
var RUserPass = document.getElementById("Ruserpass");
var RUserName = document.getElementById("Rusername");

localStorage.setItem("AdminEmail","admin@gmail.com");
var SuperAdmin = localStorage.getItem("AdminEmail");


function IsUserAlreadyLoged(){

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem("LoginUserID",user.email);

    } else {
      window.location = "login.html";
    }
  });

}

function Login(){

  firebase.auth().signInWithEmailAndPassword(UserEmail.value,UserPass.value)
  .then(function(){
  localStorage.setItem("LoginUserID",UserEmail.value);
  UserPrivileges(UserEmail.value);
  setTimeout(function(){
    window.location = "index.html";
  },1500);

}),(function(error) {
  window.alert(error.code);
  var errorCode = error.code;
  var errorMessage = error.message;

});

}

function UserPrivileges(GetUserEmail) {

      db.collection("Registerd_UserList").where("RUserEmail","==",GetUserEmail)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
          localStorage.setItem("UserNameId",doc.data().UserNameId);
          localStorage.setItem("UserType",doc.data().UserType);
          localStorage.setItem("FirmName",doc.data().PFirmName);
          //localStorage.setItem("Belongsto",doc.data().Belongsto);
          localStorage.setItem("DocId",doc.data().docid);
          localStorage.setItem("PCurrencyCode",doc.data().PCurrencyCode);
          localStorage.setItem("OnBoarding",doc.data().OnBoarding);
          localStorage.setItem("Clients",doc.data().Clients);
          localStorage.setItem("MattersAndTasks",doc.data().MattersAndTasks);
          localStorage.setItem("FeeIncome",doc.data().FeeIncome);
          localStorage.setItem("LogTime",doc.data().LogTime);
          localStorage.setItem("NoticeBoard",doc.data().NoticeBoard);
          localStorage.setItem("StaffZone",doc.data().StaffZone);
          localStorage.setItem("EauditPapers",doc.data().EauditPapers);
          localStorage.setItem("Reports",doc.data().Reports);
          localStorage.setItem("ClouDoc",doc.data().ClouDoc);
          localStorage.setItem("PracticeFunding",doc.data().PracticeFunding);
          localStorage.setItem("Settings",doc.data().Settings);

          localStorage.setItem("SettingsPractice",doc.data().SettingsPractice);
          localStorage.setItem("SettingsCalendar",doc.data().SettingsCalendar);
          localStorage.setItem("SettingsUsers",doc.data().SettingsUsers);
          localStorage.setItem("SettingsSubscription",doc.data().SettingsSubscription);
          localStorage.setItem("SettingsAuditTrail",doc.data().SettingsAuditTrail);
          localStorage.setItem("SettingsTax",doc.data().SettingsTax);
          localStorage.setItem("SettingsService",doc.data().SettingsService);
          localStorage.setItem("SettingsInvoices",doc.data().SettingsInvoices);
          localStorage.setItem("SettingsTasks",doc.data().SettingsTasks);
          localStorage.setItem("SettingsClients",doc.data().SettingsClients);
          localStorage.setItem("SettingsRecurring",doc.data().SettingsRecurring);

          });
              console.log("Data Loaded!");
          })
          .catch(function(error) {
              window.location = "login.html";
              console.log("Error getting documents: ", error);
              window.alert("Your Account is disabled,Contact Admin")
          });

    }

function RegisterAdmin(){


  firebase.auth().createUserWithEmailAndPassword(RUserEmail.value, RUserPass.value).then(function() {
    SaveRegDetails();
    RelaodPage();

},function(error) {
  window.alert("Something Went Worng, Please Try Again !")
  var errorCode = error.code;
  var errorMessage = error.message;

});

}

function SaveRegDetails(){

var docRef = db.collection("Registerd_UserList").doc();

docRef.set({

        docid:docRef.id,
        Belongsto:SuperAdmin,
        UserType:"Admin",
        UserNameId:RUserName.value,
        RUserEmail:RUserEmail.value,
        RUserPass:RUserPass.value,
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
        SettingsRecurring:"D",

        PFirmName:"",
        PContactPerson:"",
        PAddress:"",
        PYourLocation:"",
        PYourCountry:"",
        PCity:"",
        PPostCode:"",
        PEmail:"",
        PPhoneNumber:"",
        PMobileNumber:"",
        PFaxNumber:"",
        PWebSite:"",
        PFirmType:"",
        PTimeZone:"",
        PCurrencyName:"",
        PCurrencyCode:""

})
.then(function() {
    $('#RegisterAdmin').modal('hide');
    console.log("Document written ! ");
    window.alert("You have been Registerd.");
    $('#userregform').trigger("reset");
  })
.catch(function(error) {
    console.error("Error adding document: ", error);

});

}

function ForgetPassword(){


var forgetemail = $("#forgetemail").val();

if(forgetemail != ""){

  firebase.auth().sendPasswordResetEmail(forgetemail).then(function(){

      window.alert("Email Hass Send To you!");
      forgetemail.reset();
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert("Message :" +errorMessage);
  });

}else{
  window.alert("Please Enter Your Email");
}

}

function RelaodPage(){
  setTimeout(function(){
    window.location.reload(1);
  },2000);
}

function ClientLogin(){

  var   ClientEmail = $("#ClientEmail").val();
  var   ClientPassword = $("#ClientPassword").val();

  db.collection("Client_List")//.where("ClientEmail","==",ClientEmail)
      .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
          if( change.doc.data().ClientEmail == ClientEmail && change.doc.data().ClientPassword == ClientPassword){
            localStorage.setItem("ClientDocID",change.doc.data().docid);
            $("#ErrorAlert").html("<div id=\"ErrorAlert\" class=\"alert alert-success\" role=\"alert\">"+
            " Login Success</div>");
            setTimeout(function(){
            window.location = "clientaccount.html";
            },1500);

          }else{

            $("#ErrorAlert").html("<div id=\"ErrorAlert\" class=\"alert alert-danger\" role=\"alert\">"+
            "InCorrect Login Details</div>");
          }
      });

  });







}

var db = firebase.firestore();
const PFirmName = document.getElementById("PFirmName");
const PContactPerson = document.getElementById("PContactPerson");
const PAddress = document.getElementById("PPAddress");
const PYourLocation = document.getElementById("PYourLocation");
const PYourCountry = document.getElementById("PYourCountry");
const PCity = document.getElementById("PCity");
const PPostCode = document.getElementById("PPostCode");
const PEmail = document.getElementById("PEmail");
const PPhoneNumber = document.getElementById("PPhoneNumber");
const PMobileNumber = document.getElementById("PMobileNumber");
const PWebSite = document.getElementById("PWebSite");
const PFirmType = document.getElementById("PFirmType");
const PCurrencyName = document.getElementById("PCurrencyName");
const PPCurrencyCode = document.getElementById("PCurrencyCode");

var UserNameId = localStorage.getItem("UserNameId");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var DocId = localStorage.getItem("DocId");



function LoadDataPracticeData(){

  var docRef = db.collection("Registerd_UserList").doc(DocId);

  docRef.get().then(function(doc) {

      if (doc.exists) {
        PFirmName.value = doc.data().PFirmName;
        PContactPerson.value = doc.data().PContactPerson;
        PAddress.value = doc.data().PAddress;
        PYourLocation.value = doc.data().PYourLocation;
        PYourCountry.value = doc.data().PYourCountry;
        PCity.value = doc.data().PCity;
        PPostCode.value = doc.data().PPostCode;
        PEmail.value = doc.data().PEmail;
        PPhoneNumber.value = doc.data().PPhoneNumber;
        PMobileNumber.value = doc.data().PMobileNumber;
        PWebSite.value = doc.data().PWebSite;
        PCurrencyName.value = doc.data().PCurrencyName;
        PPCurrencyCode.value = doc.data().PCurrencyCode;

        console.log("Data Load Success!");

      } else {
        console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}
function UpdatePractice(){

  db.collection("Registerd_UserList").doc(DocId).update({

    PFirmName:PFirmName.value,
    PContactPerson:PContactPerson.value,
    PAddress:PAddress.value,
    PYourLocation:PYourLocation.value,
    PYourCountry:PYourCountry.value,
    PCity:PCity.value,
    PPostCode:PPostCode.value,
    PEmail:PEmail.value,
    PPhoneNumber:PPhoneNumber.value,
    PMobileNumber:PMobileNumber.value,
    PFaxNumber:PFaxNumber.value,
    PWebSite:PWebSite.value,
    PFirmType:PFirmType.value,
    PTimeZone:PTimeZone.value,
    PCurrencyName:PCurrencyName.value,
    PCurrencyCode:PPCurrencyCode.value

  })
  .then(function() {
      console.log("Document Updated. ");
      TriggerModal("Client Details Updated");
      RelaodPage();

    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
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

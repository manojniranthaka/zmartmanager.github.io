var db = firebase.firestore();

const taxname = document.getElementById("taxname");
const absavation = document.getElementById("absavation");
const description = document.getElementById("description");
const taxnumber = document.getElementById("taxnumber");
const taxrate = document.getElementById("taxrate");

var managetaxtablebody = document.getElementById("managetaxtablebody");

var UserNameId = localStorage.getItem("UserNameId");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");


LoadDataTableTax();

function LoadDataTableTax(){

  if(UserEmailId == AdminEmailId){

    db.collection("Settings").doc("ManageTaxes").collection("ManageTaxesList").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  managetaxtablebody.innerHTML +=
                  "<tr><td>"+change.doc.data().Taxname+
                  "</td><td><i id=\""+change.doc.data().docid+"\" class=\"fa fa-edit\"></i> | <i id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecordTax(this.id)\"  class=\"fa fa-trash\"></i>"+
                  "</td></tr>"
                }
                  console.log("Data Loaded!");

              });

      });

  }else {

    db.collection("Settings").doc("ManageTaxes").collection("ManageTaxesList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  managetaxtablebody.innerHTML +=
                  "<tr><td>"+change.doc.data().Taxname+
                  "</td><td><i id=\""+change.doc.data().docid+"\" class=\"fa fa-edit\"></i> | <i id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecordTax(this.id)\"  class=\"fa fa-trash\"></i>"+
                  "</td></tr>"
                }
                  console.log("Data Loaded!");

              });

      });

  }



}

function InsertRecordTax() {

  if(taxname.value==""){
      taxname.focus();
  }else if (absavation.value=="") {
      absavation.focus();
  }else if (description.value=="") {
      description.focus();
  }else if (taxnumber.value=="") {
      taxnumber.focus();
  }else if (taxrate.value=="") {
      taxrate.focus();
  }else {

  var date = new Date();
  var docRef = db.collection("Settings").doc("ManageTaxes").collection("ManageTaxesList").doc();

  docRef.set({

          docid:docRef.id,
          UserNameId:UserNameId,
          UserEmailId:UserEmailId,
          Taxname: taxname.value,
          Absavation: absavation.value,
          Description: description.value,
          Taxnumber:taxnumber.value,
          Taxrate:taxrate.value

  })
  .then(function() {
      console.log("Document written ! ");
      TriggerModal("Tax Added");
      document.getElementById("managetaxes").reset();


    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });
}
}

function DeleteRecordTax(id){

db.collection("Settings").doc("ManageTaxes").collection("ManageTaxesList").doc(id).delete().then(function() {
            TriggerModal("Tax Deleted");
            console.log("Document successfully deleted!");
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

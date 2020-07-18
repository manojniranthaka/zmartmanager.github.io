var db = firebase.firestore();

const servicecode = document.getElementById("servicecode");
const servicename = document.getElementById("servicename");
const servicediscription = document.getElementById("servicediscription");
const servicepreview = document.getElementById("servicepreview");
const serviceprice = document.getElementById("serviceprice");
const servicecurrency = document.getElementById("servicecurrency");BillStatus
const billstatus = document.getElementById("BillStatus")
var servicestablebody = document.getElementById("servicestablebody");

var UserNameId = localStorage.getItem("UserNameId");
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var PCurrencyCode = localStorage.getItem("PCurrencyCode");

servicecurrency.value = PCurrencyCode;


LoadDataTableServices();

function LoadDataTableServices(){

  if(UserEmailId == AdminEmailId){

db.collection("Settings").doc("ManageServices").collection("ManageServicesList").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
              servicestablebody.innerHTML +=
              "<tr><td><input type=\"checkbox\">&nbsp;"+change.doc.data().ServiceName+
              "</td><td>"+change.doc.data().Billed+
              "</td><td>"+change.doc.data().ServicePrice+
              "</td><td><i id=\""+change.doc.data().docid+"\" class=\"fa fa-edit\"></i> | <i id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecordServices(id)\"  class=\"fa fa-trash\"></i>"+
              "</td></tr>"
            }

              console.log("Data Loaded!");

          });

  });

}else {

  db.collection("Settings").doc("ManageServices").collection("ManageServicesList").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                servicestablebody.innerHTML +=
                "<tr><td><input type=\"checkbox\">&nbsp;"+change.doc.data().ServiceName+
                "</td><td>"+change.doc.data().Billed+
                "</td><td>"+change.doc.data().ServicePrice+
                "</td><td><i id=\""+change.doc.data().docid+"\" class=\"fa fa-edit\"></i> | <i id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecordServices(id)\"  class=\"fa fa-trash\"></i>"+
                "</td></tr>"
              }

                console.log("Data Loaded!");

            });

    });




}

}

function InsertRecordServices() {

if(servicecode.value==""){
    servicecode.focus();
}else if (servicename.value=="") {
    servicename.focus();
}else if (servicediscription.value=="") {
    servicediscription.focus();
}else if (servicepreview.value=="") {
    servicepreview.focus();
}else if (serviceprice.value=="") {
    serviceprice.focus();
}else if (servicecurrency.value=="") {
    servicecurrency.focus();
}else {
  var date = new Date();
  var docRef = db.collection("Settings").doc("ManageServices").collection("ManageServicesList").doc();

  docRef.set({

          docid:docRef.id,
          UserNameId:UserNameId,
          UserEmailId:UserEmailId,
          ServiceCode: servicecode.value,
          ServiceName: servicename.value,
          ServiceDiscription: servicediscription.value,
          ServicePreview:servicepreview.value,
          ServicePrice:serviceprice.value,
          ServiceCurrency:servicecurrency.value,
          Billed:billstatus.value

  })
  .then(function() {
      console.log("Document written ! ");
      TriggerModal("Service Added");
      document.getElementById("manageservicesform").reset();
       RelaodPage();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });
}

}

function DeleteRecordServices(id){

db.collection("Settings").doc("ManageServices").collection("ManageServicesList").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
              TriggerModal("Service Deleted");
            RelaodPage();

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

}

function TriggerModal(message){


$("#SettingModelmessage").html(message);


     $("#SettingModel").modal();
 }

 function RelaodPageNotime(){
    setTimeout(function(){
      window.location.reload(1);
    });
  }

function RelaodPage(){
  setTimeout(function(){
    window.location.reload(1);
  },2000);

}

$(function(){
    $("#tglbill").click(function(e){
        $("#BillStatus").val($("#BillStatus").val() == "Yes" ? "No" : "Yes");
    });
});

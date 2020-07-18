
var db = firebase.firestore();

const ClientName = document.getElementById("ClientName");
const LegalName = document.getElementById("LegalName");
const ClientType = document.getElementById("ClientType");
const ClientEmail = document.getElementById("ClientEmail");
const PhoneNumber = document.getElementById("PhoneNumber");

const ClientCode = document.getElementById("ClientCode");
const Description = document.getElementById("Description");
const ActiveStatus = document.getElementById("ActiveStatus");
const Tags = document.getElementById("Tags");

const AccountingDay = document.getElementById("AccountingDay");
const AccountingMonth = document.getElementById("AccountingMonth");
const Reference = document.getElementById("Reference");

const CollectionReference = document.getElementById("CollectionReference");
const LegalAddress = document.getElementById("LegalAddress");
const LegalCity = document.getElementById("LegalCity");

const LegalRegion = document.getElementById("LegalRegion");
const LegalPostCode = document.getElementById("LegalPostCode");
const LegalCountry = document.getElementById("LegalCountry");

const TaxReferenceNumber = document.getElementById("TaxReferenceNumber");
const NicNumber = document.getElementById("NicNumber");


const NNumber = document.getElementById("Number");
const RegistrationDate = document.getElementById("RegistrationDate");
const SchemeDate = document.getElementById("SchemeDate");

const TrandingAddress = document.getElementById("TrandingAddress");
const TrandingCity = document.getElementById("TrandingCity");
const TrandingRegion = document.getElementById("TrandingRegion");

const TrandingPostCode = document.getElementById("TrandingPostCode");
const TrandingCountry = document.getElementById("TrandingCountry");
const OtherLevels = document.getElementById("OtherLevels");


const listtablebody = document.getElementById("ListTableBody");
const clientsfilterbody = document.getElementById("clientsfilter");
const modalmessage =document.getElementById("ModalMessage");
const clientsTasksList = document.getElementById("ClientsTasksLists");
const clientLogTimesList = document.getElementById("ClientLogTimesLists");
//document.getElementById('#clientdetailsfrom').reset();

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");
var FirmName = localStorage.getItem("FirmName");

var x = 0;

$(document).ready(function () {
  $("#dtBasicExample").DataTable();
});

LoadDataTable();
LoadClientTypeList();
LoadOtherLeavelList();
LoadClientTypeFilter();

function LoadDataTable(){

if(UserEmailId == AdminEmailId){

  db.collection("Client_List").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          listtablebody.innerHTML +=
              "<tr onclick=\"ViewClientModal('"+change.doc.data().docid.toString()+"','"+change.doc.data().ClientName.toString()+"')\" style=\"cursor:pointer\"><td>"+change.doc.data().ClientCode+
              "</td><td>"+change.doc.data().ClientName+
              //"</td><td>"+change.doc.data().UserNameId+
              "</td><td id="+change.doc.data().docid+">"+
              "</td><td class="+change.doc.data().docid+">"+
              "</td><td><button disabled  type=\"button\" class=\"btn btn-outline-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""+change.doc.data().RecentNote+"\">...</button>"+
              "</td><td>"+change.doc.data().OtherLevels+
                  "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id, event)\" class=\"btn btn-outline-warning \"><i class=\"fa fa-edit\"></i></button> | "+
                  "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id, event)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                  "</td></tr>"
            }
                console.log("Data Loaded!");
                CalTaskOutstanding(change.doc.data().docid,change.doc.data().ClientName);
                CalTaskOutstandingIndays(change.doc.data().docid,change.doc.data().ClientName);
            });

    });

}else{


  db.collection("Client_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {

        if (change.type === "added") {
            listtablebody.innerHTML +=
              "<tr onclick=\"ViewClientModal('"+change.doc.data().docid.toString()+"','"+change.doc.data().ClientName.toString()+"')\" style=\"cursor:pointer\"><td>"+change.doc.data().ClientCode+
              "</td><td>"+change.doc.data().ClientName+
              "</td><td id="+change.doc.data().docid+">"+
              "</td><td class="+change.doc.data().docid+">"+
              "</td><td><button disabled  type=\"button\" class=\"btn btn-outline-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""+change.doc.data().RecentNote+"\">...</button>"+
              "</td><td>"+change.doc.data().OtherLevels+
              "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id, event)\" class=\"btn btn-outline-warning \"><i class=\"fa fa-edit\"></i></button> | "+
              "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id, event)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
              "</td></tr>"
            }
              $("#Belongsto" ).hide();
                console.log("Data Loaded!");
                CalTaskOutstanding(change.doc.data().docid,change.doc.data().ClientName);
                CalTaskOutstandingIndays(change.doc.data().docid,change.doc.data().ClientName);

            });

    });


    }
}

function LoadClientTypeFilter(){

  db.collection("Settings").doc("ManageClients").collection("ManageClientsList").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {

          clientsfilterbody.innerHTML +=
                "<a href=\"#\" onclick=\"FilterDataTable('"+change.doc.data().ClientType+"')\"  class=\"list-group-item list-group-item-action bg\" style=\"height: 60px\">"+change.doc.data().ClientType+"</a>"
              }
                console.log("Data Loaded!");

            });

    });

}

function FilterDataTable(filter){
  $("#ListTableBody").empty();

    db.collection("Client_List").where("ClientType", "==", filter).where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {

          if (change.type === "added") {
              listtablebody.innerHTML +=
                "<tr onclick=\"ViewClientModal('"+change.doc.data().docid.toString()+"','"+change.doc.data().ClientName.toString()+"')\" style=\"cursor:pointer\"><td>"+change.doc.data().ClientCode+
                "</td><td>"+change.doc.data().ClientName+
                "</td><td id="+change.doc.data().docid+">"+
                "</td><td class="+change.doc.data().docid+">"+
                "</td><td><button disabled  type=\"button\" class=\"btn btn-outline-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""+change.doc.data().RecentNote+"\">...</button>"+
                "</td><td>"+change.doc.data().OtherLevels+
                "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id, event)\" class=\"btn btn-outline-warning \"><i class=\"fa fa-edit\"></i></button> | "+
                "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id, event)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                "</td></tr>"
              }
                $("#Belongsto" ).hide();
                  console.log("Data Loaded!");
                  CalTaskOutstanding(change.doc.data().docid,change.doc.data().ClientName);
                  CalTaskOutstandingIndays(change.doc.data().docid,change.doc.data().ClientName);

              });

      });
}

function FilterDataTableAI(filter){
  $("#ListTableBody").empty();

  db.collection("Client_List").where("ActiveStatus", "==", filter).where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {

        if (change.type === "added") {
            listtablebody.innerHTML +=
              "<tr onclick=\"ViewClientModal('"+change.doc.data().docid.toString()+"','"+change.doc.data().ClientName.toString()+"')\" style=\"cursor:pointer\"><td>"+change.doc.data().ClientCode+
              "</td><td>"+change.doc.data().ClientName+
              "</td><td id="+change.doc.data().docid+">"+
              "</td><td class="+change.doc.data().docid+">"+
              "</td><td><button disabled  type=\"button\" class=\"btn btn-outline-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""+change.doc.data().RecentNote+"\">...</button>"+
              "</td><td>"+change.doc.data().OtherLevels+
              "</td><td><button id="+change.doc.data().docid+" onclick=\"LoadDataOnce(this.id, event)\" class=\"btn btn-outline-warning \"><i class=\"fa fa-edit\"></i></button> | "+
              "<button id="+change.doc.data().docid+" onclick=\"AssginDeleteId(this.id, event)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
              "</td></tr>"
            }
              $("#Belongsto" ).hide();
                console.log("Data Loaded!");
                CalTaskOutstanding(change.doc.data().docid,change.doc.data().ClientName);
                CalTaskOutstandingIndays(change.doc.data().docid,change.doc.data().ClientName);

            });

    });

}

function InsertRecord() {

  var PartnerLevel = $('#OtherLevels option:selected').attr('name');

  if(ClientName.value==""){ClientName.focus();}
  else if (LegalName.value=="") {LegalName.focus();}
  else if (ClientType.value=="") {ClientType.focus();}
  else if (ClientEmail.value=="") {ClientEmail.focus();}
  else if (PhoneNumber.value=="") {PhoneNumber.focus();}
  else if (ClientCode.value=="") {ClientCode.focus();}
  /*
  else if (Description.value=="") {Description.focus();}
  else if (Tags.value=="") {Tags.focus();}
  else if (AccountingDay.value=="") {AccountingDay.focus();}
  else if (AccountingMonth.value=="") {AccountingMonth.focus();}
  else if (Reference.value=="") {Reference.focus();}
  else if (CollectionReference.value=="") {CollectionReference.focus();}
  else if (LegalAddress.value=="") {LegalAddress.focus();}
  else if (LegalCity.value=="") {LegalCity.focus();}
  else if (LegalRegion.value=="") {LegalRegion.focus();}
  else if (LegalPostCode.value=="") {LegalPostCode.focus();}
  else if (LegalCountry.value=="") {LegalCountry.focus();}
  else if (TaxReferenceNumber.value=="") {TaxReferenceNumber.focus();}
  else if (NicNumber.value=="") {NicNumber.focus();}
  else if (NNumber.value=="") {NNumber.focus();}
  else if (RegistrationDate.value=="") {RegistrationDate.focus();}
  else if (SchemeDate.value=="") {SchemeDate.focus();}
  else if (TrandingAddress.value=="") {TrandingAddress.focus();}
  else if (TrandingCity.value=="") {TrandingCity.focus();}
  else if (TrandingRegion.value=="") {TrandingRegion.focus();}
  else if (TrandingPostCode.value=="") {TrandingPostCode.focus();}
  else if (TrandingCountry.value=="") {TrandingCountry.focus();}*/
  //else if (PartnerLevel.value=="") {PartnerLevel.focus();}
  else if (OtherLevels.value=="") {OtherLevels.focus();}
  else {
  var date = new Date();
  var docRef = db.collection("Client_List").doc();

  docRef.set({

          docid:docRef.id,
          UserEmailId:UserEmailId,
          UserNameId:UserNameId,
          ClientName: ClientName.value,
          LegalName: LegalName.value,
          ClientType: ClientType.value,
          ClientEmail: ClientEmail.value,
          PhoneNumber: PhoneNumber.value,
          ClientCode: ClientCode.value,
          ClientPassword: date.getTime(),
          Description: Description.value,
          ActiveStatus:ActiveStatus.value,
          Tags: Tags.value,
          AccountingDay: AccountingDay.value,
          AccountingMonth:AccountingMonth.value,
          Reference: Reference.value,
          CollectionReference: CollectionReference.value,
          LegalAddress: LegalAddress.value,
          LegalCity: LegalCity.value,
          LegalRegion: LegalRegion.value,
          LegalPostCode: LegalPostCode.value,
          LegalCountry: LegalCountry.value,
          TaxReferenceNumber:TaxReferenceNumber.value,
          NicNumber: NicNumber.value,
          Number: NNumber.value,
          RegistrationDate: RegistrationDate.value,
          SchemeDate: SchemeDate.value,
          TrandingAddress: TrandingAddress.value,
          TrandingCity: TrandingCity.value,
          TrandingRegion: TrandingRegion.value,
          TrandingPostCode:TrandingPostCode.value,
          TrandingCountry: TrandingCountry.value,
          PartnerLevel: PartnerLevel,
          OtherLevels: OtherLevels.value,
          BelongsFirmName:FirmName
  })
  .then(function() {
      console.log("Document written ! ");

      TriggerModal("Client Details Added");
      RelaodPage();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });
}

}

function LoadDataOnce(id,event){
event.stopPropagation();
document.getElementById("defaultModalLabel").innerText="Edit Client";
document.getElementById("clienteditbtn").name=id;
document.getElementById("clienteditbtn").style.display="block";
document.getElementById("clientsavebtn").style.display="none";
$("#AddClient").modal();

var docRef = db.collection("Client_List").doc(id);

docRef.get().then(function(doc) {

    if (doc.exists) {
      ClientName.value = doc.data().ClientName;
      LegalName.value = doc.data().LegalName;
      ClientType.value = doc.data().ClientType;
      ClientEmail.value = doc.data().ClientEmail;
      PhoneNumber.value = doc.data().PhoneNumber;
      ClientCode.value = doc.data().ClientCode;
      Description.value = doc.data().Description;
      ActiveStatus.value = doc.data().ActiveStatus;
      Tags.value = doc.data().Tags;
      AccountingDay.value = doc.data().AccountingDay;
      AccountingMonth.value = doc.data().AccountingMonth;
      Reference.value = doc.data().Reference;
      CollectionReference.value = doc.data().CollectionReference;
      LegalAddress.value = doc.data().LegalAddress;
      LegalCity.value = doc.data().LegalCity;
      LegalRegion.value = doc.data().LegalRegion;
      LegalPostCode.value = doc.data().LegalPostCode;
      LegalCountry.value = doc.data().LegalCountry;
      TaxReferenceNumber.value = doc.data().TaxReferenceNumber;
      NicNumber.value = doc.data().NicNumber;
      NNumber.value = doc.data().Number;
      RegistrationDate.value = doc.data().RegistrationDate;
      SchemeDate.value = doc.data().SchemeDate;
      TrandingAddress.value = doc.data().TrandingAddress;
      TrandingCity.value = doc.data().TrandingCity;
      TrandingRegion.value = doc.data().TrandingRegion;
      TrandingPostCode.value = doc.data().TrandingPostCode;
      TrandingCountry.value = doc.data().TrandingCountry;
      //PartnerLevel.value = doc.data().PartnerLevel;
      OtherLevels.value = doc.data().OtherLevels;
      console.log("Data Load Success!");

      // $("#ActiveStatus").val($("#ActiveStatus").val() == "Active" ? "Inactive" : "Active");

    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

function ViewClientModal(id,ClientName){

  document.getElementById("defaultModalLabel").innerText="Client View";
    $("#ViewClient").modal()
    LoadDataToProfileView(id);
    $("#ClientsTasksLists").empty();
    LoadClientsTasks(ClientName);
    $("#ClientLogTimesLists").empty();
    LoadClientsLogtime(ClientName);

}

function LoadDataToProfileView(id){

  event.stopPropagation();

  const pro_clientName = document.getElementById("pro_clientName");
  const pro_clientLegalName = document.getElementById("pro_clientLegalName");
  const pro_clientType = document.getElementById("pro_clientType");
  const pro_clientIndustry = document.getElementById("pro_clientIndustry");
  const pro_ClientDescription = document.getElementById("pro_ClientDescription");
  const pro_ClientCode = document.getElementById("pro_ClientCode");
  const pro_ClientEmail = document.getElementById("pro_ClientEmail");
  const pro_ClientPhoneNumber = document.getElementById("pro_ClientPhoneNumber");
  const pro_ClientCountry = document.getElementById("pro_ClientCountry");

  const pro_ClientLegalAddress = document.getElementById("pro_ClientLegalAddress");
  const pro_ClientLegalCity = document.getElementById("pro_ClientLegalCity");
  const pro_ClientLegalPostalCode = document.getElementById("pro_ClientLegalPostalCode");
  const pro_ClientLegalCountry = document.getElementById("pro_ClientLegalCountry");

  const pro_ClientTradingAddress = document.getElementById("pro_ClientTradingAddress");
  const pro_ClientTradingCity = document.getElementById("pro_ClientTradingCity");
  const pro_ClientTradingPostalCode = document.getElementById("pro_ClientTradingPostalCode");
  const pro_ClientTradingCountry = document.getElementById("pro_ClientTradingCountry");

  const pro_ClientYearEndDay = document.getElementById("pro_ClientYearEndDay");
  const pro_ClientYearEndMonth = document.getElementById("pro_ClientYearEndMonth");

  const pro_ClientPayrollRef = document.getElementById("pro_ClientPayrollRef");
  const pro_ClientPayrollCollectionRef = document.getElementById("pro_ClientPayrollCollectionRef");

  const pro_ClientTaxRef = document.getElementById("pro_ClientTaxRef");
  const pro_ClientTaxNicNumber = document.getElementById("pro_ClientTaxNicNumber");

  const pro_ClientVATNum = document.getElementById("pro_ClientVATNum");
  const pro_ClientVATRegDate = document.getElementById("pro_ClientVATRegDate");
  const pro_ClientVATSchemeDate = document.getElementById("pro_ClientVATSchemeDate");

  const pro_ClientRespStaffPosition = document.getElementById("pro_ClientRespStaffPosition");
  const pro_ClientRespStaffName = document.getElementById("pro_ClientRespStaffName");


  // $("#ViewClient").modal();

  var docRef = db.collection("Client_List").doc(id);

    docRef.get().then(function(doc) {

      if (doc.exists) {
        data = doc.data()
        pro_clientName.innerText = data.ClientName;
        pro_clientLegalName.innerText = data.LegalName;
        pro_clientType.innerHTML = data.ClientType;
        pro_ClientCountry.innerHTML = data.LegalCountry;

        pro_ClientEmail.innerText = data.ClientEmail;
        pro_ClientPhoneNumber.innerText = data.PhoneNumber;
        pro_ClientCode.innerText = data.ClientCode;
        pro_ClientDescription.innerText = data.Description;
        pro_clientIndustry.innerText = data.Tags +" Industry";

        pro_ClientYearEndDay.innerText = data.AccountingDay;
        pro_ClientYearEndMonth.innerText = data.AccountingMonth;

        pro_ClientPayrollRef.innerText = data.Reference;
        pro_ClientPayrollCollectionRef.innerText = data.CollectionReference;

        pro_ClientLegalAddress.innerText = data.LegalAddress;
        pro_ClientLegalCity.innerText = data.LegalCity;
        // pro_ClientLegalCity.innerText = data.LegalRegion;
        pro_ClientLegalPostalCode.innerText = data.LegalPostCode;
        pro_ClientLegalCountry.innerText = data.LegalCountry;

        pro_ClientTaxRef.innerText = data.TaxReferenceNumber;
        pro_ClientTaxNicNumber.innerText = data.NicNumber;

        pro_ClientVATNum.innerText = data.Number;
        pro_ClientVATRegDate.innerText = data.RegistrationDate;
        pro_ClientVATSchemeDate.innerText = data.SchemeDate;

        pro_ClientTradingAddress.innerText = data.TrandingAddress;
        pro_ClientTradingCity.innerText = data.TrandingCity;
        // value = data.TrandingRegion;
        pro_ClientTradingPostalCode.innerText = data.TrandingPostCode;
        pro_ClientTradingCountry.innerText = data.TrandingCountry;

        pro_ClientRespStaffPosition.innerText = data.PartnerLevel;
        pro_ClientRespStaffName.innerText = data.OtherLevels;
        console.log("Data Load Success!");

      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  }

function LoadClientsTasks(Cname){

  db.collection("Tasks_List").where("ClientName", "==",Cname).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {

          clientsTasksList.innerHTML +=
              "<tr><td>"+change.doc.data().Task+
              "</td><td>"+change.doc.data().Assignto+
              "</td><td>"+change.doc.data().Ddate+
              "</td><td>"+change.doc.data().Pdate+
              "</td><td>"+change.doc.data().Cdate+
              "</td><td>"+change.doc.data().Complete+
              "</td></tr>"

        }
                console.log("Data Loaded!");

            });

    });
}

function LoadClientsLogtime(Cname){

  db.collection("LogTime_List").doc("Staff_List").collection("Client").where("Client", "==",Cname).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {

          clientLogTimesList.innerHTML +=
              "<tr><td>"+change.doc.data().MatterTask+
              "</td><td>"+change.doc.data().EntryDate+
              "</td><td>"+change.doc.data().LastTimeRecord+
              "</td><td>"+change.doc.data().Staff+
              "</td></tr>"

        }
                console.log("Data Loaded!");

            });

    });
}

function UpdateRecord(id){

  if(ClientName.value==""){ClientName.focus();}
  else if (LegalName.value=="") {LegalName.focus();}
  else if (ClientType.value=="") {ClientType.focus();}
  else if (ClientEmail.value=="") {ClientEmail.focus();}
  else if (PhoneNumber.value=="") {PhoneNumber.focus();}
  else if (ClientCode.value=="") {ClientCode.focus();}
  /*
  else if (Description.value=="") {Description.focus();}
  else if (Tags.value=="") {Tags.focus();}
  else if (AccountingDay.value=="") {AccountingDay.focus();}
  else if (AccountingMonth.value=="") {AccountingMonth.focus();}
  else if (Reference.value=="") {Reference.focus();}
  else if (CollectionReference.value=="") {CollectionReference.focus();}
  else if (LegalAddress.value=="") {LegalAddress.focus();}
  else if (LegalCity.value=="") {LegalCity.focus();}
  else if (LegalRegion.value=="") {LegalRegion.focus();}
  else if (LegalPostCode.value=="") {LegalPostCode.focus();}
  else if (LegalCountry.value=="") {LegalCountry.focus();}
  else if (TaxReferenceNumber.value=="") {TaxReferenceNumber.focus();}
  else if (NicNumber.value=="") {NicNumber.focus();}
  else if (NNumber.value=="") {NNumber.focus();}
  else if (RegistrationDate.value=="") {RegistrationDate.focus();}
  else if (SchemeDate.value=="") {SchemeDate.focus();}
  else if (TrandingAddress.value=="") {TrandingAddress.focus();}
  else if (TrandingCity.value=="") {TrandingCity.focus();}
  else if (TrandingRegion.value=="") {TrandingRegion.focus();}
  else if (TrandingPostCode.value=="") {TrandingPostCode.focus();}
  else if (TrandingCountry.value=="") {TrandingCountry.focus();}*/
  //else if (PartnerLevel.value=="") {PartnerLevel.focus();}
  else if (OtherLevels.value=="") {OtherLevels.focus();}
  else {
var PartnerLevel = $('#OtherLevels option:selected').attr('name');

db.collection("Client_List").doc(id).update({


  ClientName: ClientName.value,
  LegalName: LegalName.value,
  ClientType: ClientType.value,
  ClientEmail: ClientEmail.value,
  PhoneNumber: PhoneNumber.value,
  ClientCode: ClientCode.value,
  Description: Description.value,
  ActiveStatus:ActiveStatus.value,
  Tags: Tags.value,
  AccountingDay: AccountingDay.value,
  AccountingMonth:AccountingMonth.value,
  Reference: Reference.value,
  CollectionReference: CollectionReference.value,
  LegalAddress: LegalAddress.value,
  LegalCity: LegalCity.value,
  LegalRegion: LegalRegion.value,
  LegalPostCode: LegalPostCode.value,
  LegalCountry: LegalCountry.value,
  TaxReferenceNumber:TaxReferenceNumber.value,
  NicNumber: NicNumber.value,
  Number: NNumber.value,
  RegistrationDate: RegistrationDate.value,
  SchemeDate: SchemeDate.value,
  TrandingAddress: TrandingAddress.value,
  TrandingCity: TrandingCity.value,
  TrandingRegion: TrandingRegion.value,
  TrandingPostCode:TrandingPostCode.value,
  TrandingCountry: TrandingCountry.value,
  PartnerLevel: PartnerLevel,
  OtherLevels: OtherLevels.value

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

}

function AssginDeleteId(id, event){
  event.stopPropagation();

  $("#ClientModelDelete").modal();
    document.getElementById("deleteclientbtn").name=id;
}

function DeleteRecord(id){

  db.collection("Client_List").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              TriggerModal("Task Deleted");
              RelaodPage();

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

  }

function LoadClientTypeList() {

  db.collection("Settings").doc("ManageClients").collection("ManageClientsList").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                ClientType.innerHTML +=
                "<option value='"+change.doc.data().ClientType+"'>"+change.doc.data().ClientType+
                "</option>"
              }
                console.log("Data Loaded!");
            });

    });
  }

function CalTaskOutstanding(CDocId,ClientNameID){

  var outstandingTasks =0;

  db.collection("Tasks_List").where("ClientName", "==",ClientNameID)
      .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
          if( change.doc.data().Complete !== "Yes"){
              outstandingTasks++
          }
      });


      $("#"+CDocId).html(outstandingTasks);
      console.log(outstandingTasks);
  });


}

function CalTaskOutstandingIndays(CDocId,ClientNameID){

  var curdate = new Date();
  var outstandingTaskIndays =0;

  db.collection("Tasks_List").where("ClientName", "==",ClientNameID)
      .onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
    var daysleft = (Math.floor((Date.parse(change.doc.data().Ddate) - Date.parse(curdate)) / (1000 * 60 * 60 * 24)));
          if( change.doc.data().Complete !== "Yes" && daysleft <= 7 ){
              outstandingTaskIndays++
          }
      });

      $("."+CDocId).html(outstandingTaskIndays);
      console.log(outstandingTaskIndays);
  });


}

function LoadOtherLeavelList() {

    db.collection("Staff_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  OtherLevels.innerHTML +=
                  "<option name='"+change.doc.data().Position+"' value='"+change.doc.data().FirstName+" "+change.doc.data().LastName+"'>"+change.doc.data().FirstName+" "+change.doc.data().LastName+
                  " - "+change.doc.data().Position+"</option>"
                }
                  console.log("Data Loaded!");
              });

      });
    }

function TriggerModal(message){
  $("#ClientModelmessage").html(message);
  $("#ClentModel").modal();
  }

function AddNewClientModal(){

  document.getElementById("defaultModalLabel").innerText="Complete New Client Details";
  document.getElementById("clienteditbtn").style.display="none";
  document.getElementById("clientsavebtn").style.display="block";
  $("#AddClient").modal();

  ClientName.value="";
   LegalName.value="";
   ClientType.value="";
   ClientEmail.value="";
   PhoneNumber.value="";
   ClientCode.value="";
   Description.value="";
   Tags.value="";
   AccountingDay.value="";
   AccountingMonth.value="";
   Reference.value="";
   CollectionReference.value="";
   LegalAddress.value="";
   LegalCity.value="";
   LegalRegion.value="";
   LegalPostCode.value="";
   LegalCountry.value="";
   TaxReferenceNumber.value="";
   NicNumber.value="";
   NNumber.value="";
   RegistrationDate.value="";
   SchemeDate.value="";
   TrandingAddress.value="";
   TrandingCity.value="";
   TrandingRegion.value="";
   TrandingPostCode.value="";
   TrandingCountry.value="";
   ActiveStatus.value="";


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

 $(function(){
     $("#tglSendValue").click(function(e){
         $("#ActiveStatus").val($("#ActiveStatus").val() == "Active" ? "Inactive" : "Active");
     });
 });

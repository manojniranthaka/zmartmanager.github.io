
var db = firebase.firestore();
document.getElementById("loeform").reset();
var ClientName = document.getElementById("ClientName");
//var From = document.getElementById("From");
//var To = document.getElementById("To");
var Accounts = document.getElementById("Accounts");
var Bookkeeping = document.getElementById("Bookkeeping");
var CT600Return = document.getElementById("CT600Return");
var Payroll = document.getElementById("Payroll");
var AutoEnrolment = document.getElementById("AutoEnrolment");
var VatReturn = document.getElementById("VatReturn");
var ManagementAccounts = document.getElementById("ManagementAccounts");
var ConfirmationStatements = document.getElementById("ConfirmationStatements");
var Cis = document.getElementById("CIS");
var P11D = document.getElementById("P11D");
var PEmail = document.getElementById("Email");
var EmailCopy = document.getElementById("EmailCopy");
var Message = document.getElementById("Message");

var ClientId2;
var ContactPerson2;
var ClientEmail2;

var OnboadingStatus ;
const listtablebody = document.getElementById("ListTableBody");
//const modalmessage =document.getElementById("ModalMessage");

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");

LoadDataTable();
LoadClientList();
LoadCurrency();
hidecurrencybutton();


function LoadCurrency(){
var PCurrencyCode = localStorage.getItem("PCurrencyCode");
   $("#A").html(PCurrencyCode);
   $("#B").html(PCurrencyCode);
   $("#C").html(PCurrencyCode);
   $("#P").html(PCurrencyCode);
   $("#Au").html(PCurrencyCode);
   $("#Va").html(PCurrencyCode);
   $("#Ma").html(PCurrencyCode);
   $("#Co").html(PCurrencyCode);
   $("#Ci").html(PCurrencyCode);
   $("#PD").html(PCurrencyCode);
   $(".EmalCurrency").html(PCurrencyCode);
}

function LoadDataTable(){

if(UserEmailId == AdminEmailId){

db.collection("Projects_List").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
              listtablebody.innerHTML +=
              "<tr><td>"+change.doc.data().ClientName+
              "</td><td>"+change.doc.data().ClientId+
              "</td><td>"+change.doc.data().ContactPerson+
              "</td><td>"+change.doc.data().ClientEmail+
              "</td><td>"+change.doc.data().TotalValue+
              "</td><td><div class='dropdown w-100' >"+
              "<button type='button' id='btnstatus' "+change.doc.data().Disable+" class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                "<div class='dropdown-menu'>"+
                  "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Draft'  onclick='UpdateRecord(this.id,this.name)'>Draft</a>"+
                  "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='In Review'  onclick='UpdateRecord(this.id,this.name)'>In Review</a>"+
                  "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Send'  onclick='LoadSendEmailForm(this.id,this.name)'>Send</a>"+
                  "</div></div></td>"+
                  "</td><td><button "+change.doc.data().Disable+" onclick=\"LoadDataOnce(this.id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                  "<button "+change.doc.data().Disable+" onclick=\"AssginDeleteId(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                  "</td></tr>"

            }

              console.log("Data Loaded!");
          });

  });

}else{

  db.collection("Projects_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                listtablebody.innerHTML +=
                "<tr><td>"+change.doc.data().ClientName+
                "</td><td>"+change.doc.data().ClientId+
                "</td><td>"+change.doc.data().ContactPerson+
                "</td><td>"+change.doc.data().ClientEmail+
                "</td><td>"+change.doc.data().TotalValue+
                "</td><td><div class='dropdown w-100' >"+
                "<button type='button' id='btnstatus'"+change.doc.data().Disable+" class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                  "<div class='dropdown-menu'>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Draft'  onclick='UpdateRecord(this.id,this.name)'>Draft</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='In Review'  onclick='UpdateRecord(this.id,this.name)'>In Review</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Send'  onclick='LoadSendEmailForm(this.id,this.name)'>Send</a>"+
                    "</div></div></td>"+
                    "</td><td><button "+change.doc.data().Disable+" onclick=\"LoadDataOnce(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                    "<button "+change.doc.data().Disable+" onclick=\"AssginDeleteId(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                    "</td></tr>"

              }

                console.log("Data Loaded!");
            });

    });


}

}

function FilterDataTable(filter){


  if(UserEmailId == AdminEmailId){
    $("#ListTableBody").empty();
  db.collection("Projects_List").where("Status", "==", filter).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                listtablebody.innerHTML +=
                "<tr><td>"+change.doc.data().ClientName+
                "</td><td>"+change.doc.data().ClientId+
                "</td><td>"+change.doc.data().ContactPerson+
                "</td><td>"+change.doc.data().ClientEmail+
                "</td><td>"+change.doc.data().TotalValue+
                "</td><td><div class='dropdown w-100' >"+
                "<button type='button' id='btnstatus' "+change.doc.data().Disable+" class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                  "<div class='dropdown-menu'>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Draft'  onclick='UpdateRecord(this.id,this.name)'>Draft</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='In Review'  onclick='UpdateRecord(this.id,this.name)'>In Review</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Send'  onclick='LoadSendEmailForm(this.id,this.name)'>Send</a>"+
                    "</div></div></td>"+
                    "</td><td><button onclick=\"LoadDataOnce(this.id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                    "<button onclick=\"AssginDeleteId(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                    "</td></tr>"

              }

                console.log("Data Loaded!");
            });

    });

  }else{
    $("#ListTableBody").empty();
    db.collection("Projects_List").where("UserEmailId", "==", UserEmailId).where("Status", "==", filter).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  listtablebody.innerHTML +=
                  "<tr><td>"+change.doc.data().ClientName+
                  "</td><td>"+change.doc.data().ClientId+
                  "</td><td>"+change.doc.data().ContactPerson+
                  "</td><td>"+change.doc.data().ClientEmail+
                  "</td><td>"+change.doc.data().TotalValue+
                  "</td><td><div class='dropdown w-100' >"+
                  "<button type='button' id='btnstatus'"+change.doc.data().Disable+" class='btn btn-outline-secondary btn-sm dropdown-toggle w-100' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                    "<div class='dropdown-menu'>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Draft'  onclick='UpdateRecord(this.id,this.name)'>Draft</a>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='In Review'  onclick='UpdateRecord(this.id,this.name)'>In Review</a>"+
                      "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Send'  onclick='LoadSendEmailForm(this.id,this.name)'>Send</a>"+
                      "</div></div></td>"+
                      "</td><td><button onclick=\"LoadDataOnce(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                      "<button onclick=\"AssginDeleteId(id)\" id='"+change.doc.data().docid+"' class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                      "</td></tr>"

                }

                  console.log("Data Loaded!");
              });

      });


  }


}

function InsertRecord() {

if(ClientName.value==""){ClientName.focus();}
//else if(From.value==""){From.focus();}
//else if(To.value==""){To.focus();}
//else if(Accounts.value==""){Accounts.focus();}
//else if(Bookkeeping.value==""){Bookkeeping.focus();}
//else if(Payroll.value==""){Payroll.focus();}
//else if(AutoEnrolment.value==""){AutoEnrolment.focus();}
//else if(VatReturn.value==""){VatReturn.focus();}
//else if(ManagementAccounts.value==""){ManagementAccounts.focus();}
//else if(ConfirmationStatements.value==""){ConfirmationStatements.focus();}
//else if(Cis.value==""){Cis.focus();}
//else if(P11D.value==""){P11D.focus();}
else if(PEmail.value==""){PEmail.focus();}
else if(EmailCopy.value==""){EmailCopy.focus();}
else if(Message.value==""){Message.focus();}
else {

  var cliname = ClientName.options[ClientName.selectedIndex].value;
  var date = new Date();
  var docRef = db.collection("Projects_List").doc();
  var docRef2 = db.collection("Client_List").where("ClientName","==",cliname);

    docRef2.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          ClientId2= doc.data().ClientCode;
          ContactPerson2 = doc.data().OtherLevels;
          ClientEmail2 = doc.data().ClientEmail;
            docRef.set({
                    docid:docRef.id,
                    UserEmailId:UserEmailId,
                    UserNameId:UserNameId,
                    ClientName:ClientName.value,
                    ClientId:ClientId2,
                    ContactPerson:ContactPerson2,
                    ClientEmail:ClientEmail2,
                    Status:"Draft",
                    Accounts:Accounts.value,
                    Bookkeeping:Bookkeeping.value,
                    CT600Return:CT600Return.value,
                    Payroll:Payroll.value,
                    AutoEnrolment:AutoEnrolment.value,
                    VatReturn:VatReturn.value,
                    ManagementAccounts:ManagementAccounts.value,
                    ConfirmationStatements:ConfirmationStatements.value,
                    Cis:Cis.value,
                    P11D:P11D.value,
                    TotalValue: (parseFloat(Accounts.value) + parseFloat(Bookkeeping.value) + parseFloat(CT600Return.value) + parseFloat(Payroll.value)
                                + parseFloat(AutoEnrolment.value) + parseFloat(VatReturn.value) + parseFloat(ManagementAccounts.value) + parseFloat(ConfirmationStatements.value)
                                + parseFloat(Cis.value) + parseFloat(P11D.value)),
                    Email:PEmail.value,
                    EmailCopy:EmailCopy.value,
                    Message:Message.value

            })
            .then(function() {
                console.log("Document written ! ");
                document.getElementById("loeform").reset();
                TriggerModal("New LOE Added");
                RelaodPage();
              })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}
}

function LoadDataOnce(id){

//document.getElementById("defaultModalLabel").innerText="Edit Client";
document.getElementById("loeeditbtn").name=id;
document.getElementById("loeeditbtn").style.display="block";
document.getElementById("leosavebtn").style.display="none";
$("#myModal").modal();


var docRef = db.collection("Projects_List").doc(id);

docRef.get().then(function(doc) {

    if (doc.exists) {
      ClientName.value = doc.data().ClientName;
      //From.value = doc.data().From;
      //To.value = doc.data().To;
      Accounts.value = doc.data().Accounts;
      Bookkeeping.value = doc.data().Bookkeeping;
      CT600Return.value = doc.data().CT600Return;
      Payroll.value = doc.data().Payroll;
      AutoEnrolment.value = doc.data().AutoEnrolment;
      VatReturn.value = doc.data().VatReturn;
      ManagementAccounts.value = doc.data().ManagementAccounts;
      ConfirmationStatements.value = doc.data().ConfirmationStatements;
      Cis.value = doc.data().Cis;
      P11D.value = doc.data().P11D;
      PEmail.value = doc.data().Email;
      EmailCopy.value = doc.data().EmailCopy;
      Message.value = doc.data().Message;

        console.log("Data Load Success!");

    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

function LoadSendEmailForm(id){

  $("#EmailFormModal").modal();
  $('#EmailSendbtn').attr('name',id);

  var docRef = db.collection("Projects_List").doc(id);

  docRef.get().then(function(doc) {

      if (doc.exists) {

        $("#EmailClientName").val(doc.data().ClientEmail);
        $("#EmailConPerson").val(doc.data().ContactPerson);
        $("#Accounts2").val(doc.data().Accounts);
        $("#Bookkeeping2").val(doc.data().Bookkeeping);
        $("#CT600Return2").val(doc.data().CT600Return);
        $("#Payroll2").val( doc.data().Payroll);
        $("#AutoEnrolment2").val( doc.data().AutoEnrolment);
        $("#VatReturn2").val(doc.data().VatReturn);
        $("#ManagementAccounts2").val(doc.data().ManagementAccounts);
        $("#ConfirmationStatements2").val(doc.data().ConfirmationStatements);
        $("#CIS2").val(doc.data().Cis);
        $("#P11D2").val(doc.data().P11D);
        $("#EmailTotalValue").val(doc.data().TotalValue);

          console.log("Data Load Success!");

      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}

function SendEmailToClient(Did){

  var ClientEmail  = $("#EmailClientName").val();
  var ContactPerson   = $("#EmailConPerson").val();
  var Subject   = $("#EmailSubject").val();
  var Note   = $("#EmailNote").val();
  var Footer = $("#EmailFooter").val();

  var EmailBoady = "<tr><td>"+$('#Accounts3').val()+"</td><td>"+$('#Accounts2').val()+"</td></tr>"+
                  "<tr><td>"+$('#Bookkeeping3').val()+"</td><td>"+$('#Bookkeeping2').val()+"</td></tr>"+
                  "<tr><td>"+$('#CT600Return3').val()+"</td><td>"+$('#CT600Return2').val()+"</td></tr>"+
                  "<tr><td>"+$('#Payroll3').val()+"</td><td>"+$('#Payroll2').val()+"</td></tr>"+
                  "<tr><td>"+$('#AutoEnrolment3').val()+"</td><td>"+$('#AutoEnrolment2').val()+"</td></tr>"+
                  "<tr><td>"+$('#VatReturn3').val()+"</td><td>"+$('#VatReturn2').val()+"</td></tr>"+
                  "<tr><td>"+$('#ManagementAccounts3').val()+"</td><td>"+$('#ManagementAccounts2').val()+"</td></tr>"+
                  "<tr><td>"+$('#ConfirmationStatements3').val()+"</td><td>"+$('#ConfirmationStatements2').val()+"</td></tr>"+
                  "<tr><td>"+$('#CIS3').val()+"</td><td>"+$('#CIS2').val()+"</td></tr>"+
                  "<tr><td>"+$('#P11D3').val()+"</td><td>"+$('#P11D2').val()+"</td></tr><br>"+
                  "<tr><td>Total Value</td><td>"+$('#EmailTotalValue').val()+"</td></tr>";

  SendEmail(Did,ClientEmail,ContactPerson,Subject,Note,EmailBoady,Footer);

}

function UpdateLoe(id){

  if(ClientName.value==""){ClientName.focus();}
  //else if(From.value==""){From.focus();}
  //else if(To.value==""){To.focus();}
  //else if(Accounts.value==""){Accounts.focus();}
  //else if(Bookkeeping.value==""){Bookkeeping.focus();}
  //else if(Payroll.value==""){Payroll.focus();}
  //else if(AutoEnrolment.value==""){AutoEnrolment.focus();}
  //else if(VatReturn.value==""){VatReturn.focus();}
  //else if(ManagementAccounts.value==""){ManagementAccounts.focus();}
  //else if(ConfirmationStatements.value==""){ConfirmationStatements.focus();}
  //else if(Cis.value==""){Cis.focus();}
  //else if(P11D.value==""){P11D.focus();}
  else if(PEmail.value==""){PEmail.focus();}
  else if(EmailCopy.value==""){EmailCopy.focus();}
  else if(Message.value==""){Message.focus();}
  else {

    var cliname = ClientName.options[ClientName.selectedIndex].value;
    var date = new Date();
    var docRef = db.collection("Projects_List").doc(id);
    var docRef2 = db.collection("Client_List").where("ClientName","==",cliname);

      docRef2.get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {

            ClientId2= doc.data().ClientCode;
            ContactPerson2 = doc.data().OtherLevels;
            ClientEmail2 = doc.data().ClientEmail;
              docRef.update({
                      docid:docRef.id,
                      UserEmailId:UserEmailId,
                      UserNameId:UserNameId,
                      ClientName:ClientName.value,
                      ClientId:ClientId2,
                      ContactPerson:ContactPerson2,
                      ClientEmail:ClientEmail2,
                      Status:"Draft",
                      Accounts:Accounts.value,
                      Bookkeeping:Bookkeeping.value,
                      CT600Return:CT600Return.value,
                      Payroll:Payroll.value,
                      AutoEnrolment:AutoEnrolment.value,
                      VatReturn:VatReturn.value,
                      ManagementAccounts:ManagementAccounts.value,
                      ConfirmationStatements:ConfirmationStatements.value,
                      Cis:Cis.value,
                      P11D:P11D.value,
                      TotalValue: (parseFloat(Accounts.value) + parseFloat(Bookkeeping.value) + parseFloat(CT600Return.value) + parseFloat(Payroll.value)
                                  + parseFloat(AutoEnrolment.value) + parseFloat(VatReturn.value) + parseFloat(ManagementAccounts.value) + parseFloat(ConfirmationStatements.value)
                                  + parseFloat(Cis.value) + parseFloat(P11D.value)),
                      Email:PEmail.value,
                      EmailCopy:EmailCopy.value,
                      Message:Message.value

              })
              .then(function() {
                console.log("Document written ! ");
                //document.getElementById("loeform").reset();
                TriggerModal("LOE is Updated");
                RelaodPage();
                })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

  }

}

function UpdateRecord(id,statusinfo){

if(statusinfo == "Send"){
db.collection("Projects_List").doc(id).update({

  docid: id,
  Status: statusinfo,
  Disable:"disabled"
})
.then(function() {
    console.log("Document Updated.");
    SendEmailtoClient();

  })
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}else {
  db.collection("Projects_List").doc(id).update({

    docid: id,
    Status: statusinfo,
    Disable:""

  })
  .then(function() {
      console.log("Document Updated. ");
      RelaodPageNotime();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });
}


}

function LoadClientList() {

  db.collection("Client_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                ClientName.innerHTML +=
                "<option value='"+change.doc.data().ClientName+"'>"+change.doc.data().ClientName+
                "</option>"
              }
                console.log("Data Loaded!");
            });

    });
  }

function AssginDeleteId(id){
    $("#OnBoardingModelDelete").modal();
      document.getElementById("deleteloebtn").name=id;
  }

function DeleteRecord(id){

db.collection("Projects_List").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              TriggerModal("LOE Deleted")
              RelaodPage();

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

  }

function TriggerModal(message){
    $("#OnBoardingModelmessage").html(message);
    $("#OnBoardingModel").modal();
    }

function SendEmail(id,Cemail,Cperson,Csubject,Cnote,Cmailcontent,Cfooter){

    var info = {
       clientemail: Cemail,
       contactperson : Cperson,
       subject: Csubject,
       note: Cnote,
       mailcontent: Cmailcontent,
       footertext:Cfooter
    };

    $.ajax({
        type: "POST",
        url: "https://zmartmanager.herokuapp.com/user/sendmail",
        data: info,
        crossDomain: true,
        dataType: "json",
        complete: function () {
        },
        success: function (msg) {
          TriggerModal("Email has sent !");
           //console.log(data);
           UpdateRecord(id,statusinfo);
           UpdateRecord(id,"Send");
           RelaodPage();
        },
        error: function (msg) {
            TriggerModal("Email has sent !");
            UpdateRecord(id,"Send");
            RelaodPage();
        }
    });


}

function TriggerModalNewLoe(){
  document.getElementById("loeeditbtn").style.display="none";
  document.getElementById("leosavebtn").style.display="block";
     $("#myModal").modal();
     document.getElementById("loeform").reset();
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

 function hidecurrencybutton(){

   $(document).ready(function(){

    $("#tglAccounts").click(function(){
      $("#Accounts").toggle();
      $("#A").toggle();
    });

    $("#tglBookkeeping").click(function(){
      $("#Bookkeeping").toggle();
      $("#B").toggle();
    });

    $("#tglCT600Return").click(function(){
      $("#CT600Return").toggle();
      $("#C").toggle();
    });

    $("#tglPayroll").click(function(){
      $("#Payroll").toggle();
      $("#P").toggle();
    });

    $("#tglAutoEnrolment").click(function(){
      $("#AutoEnrolment").toggle();
      $("#Au").toggle();
    });

    $("#tglVatReturn").click(function(){
      $("#VatReturn").toggle();
      $("#Va").toggle();
    });

    $("#tglManagementAccounts").click(function(){
      $("#ManagementAccounts").toggle();
      $("#Ma").toggle();
    });

    $("#tglConfirmationStatements").click(function(){
      $("#ConfirmationStatements").toggle();
      $("#Co").toggle();
    });

    $("#tglCIS").click(function(){
      $("#CIS").toggle();
      $("#Ci").toggle();
    });

    $("#tglP11D").click(function(){
      $("#P11D").toggle();
      $("#PD").toggle();
    });


  });

 }

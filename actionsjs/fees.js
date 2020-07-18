var db = firebase.firestore();

const cname = document.getElementById("Client");
const cproject = document.getElementById("Project");
const cemail = document.getElementById("Email");
const ctax = document.getElementById("Tax");
const cdescription = document.getElementById("Description");
const cbillingaddress = document.getElementById("BillingAddress");
const idate = document.getElementById("InvoiceDate");
const ddate = document.getElementById("DueDate");
const oinfo = document.getElementById("OtherInformation");
const invoice = document.getElementById("invoice");

const listtablebody = document.getElementById("ListTableBody");
const modalmessage =document.getElementById("ModalMessage");

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");

LoadDataTable();

function LoadDataTable(){

if(UserEmailId == AdminEmailId){

  db.collection("Fees_List").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                listtablebody.innerHTML +=
                "<tr><td>"+change.doc.data().docid+
                "</td><td>"+change.doc.data().Client+
                "</td><td>"+change.doc.data().InvoiceDate+
                "</td><td>"+change.doc.data().DueDate+
                "</td><td>"+change.doc.data().DueDate+
                "</td><td><div class='dropdown w-100'>"+
                "<button type='button' class='w-100 btn btn-outline-warning btn-sm dropdown-toggle' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                  "<div class='dropdown-menu '>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Due'  onclick='UpdateStatus(this.id,this.name)'>Due</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Paid'  onclick='UpdateStatus(this.id,this.name)'>Paid</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Overdue'  onclick='UpdateStatus(this.id,this.name)'>Overdue</a>"+
                    "</div></div></td>"+
                    "</td><td><button  class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                    "<button id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecord(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                    "</td></tr>"
              }
                console.log("Data Loaded!");
            });

    });
}else{

  db.collection("Fees_List").where("UserEmailId", "==", UserEmailId).onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                listtablebody.innerHTML +=
                "<tr><td>"+change.doc.data().docid+
                "</td><td>"+change.doc.data().Client+
                "</td><td>"+change.doc.data().InvoiceDate+
                "</td><td>"+change.doc.data().DueDate+
                "</td><td>"+change.doc.data().DueDate+
                "</td><td><div class='dropdown w-100'>"+
                "<button type='button' class='w-100 btn btn-outline-warning btn-sm dropdown-toggle' data-toggle='dropdown'>"+change.doc.data().Status+"</button>"+
                  "<div class='dropdown-menu '>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Due'  onclick='UpdateStatus(this.id,this.name)'>Due</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Paid'  onclick='UpdateStatus(this.id,this.name)'>Paid</a>"+
                    "<a class='dropdown-item'id='"+change.doc.data().docid+"' href='#' name='Overdue'  onclick='UpdateStatus(this.id,this.name)'>Overdue</a>"+
                    "</div></div></td>"+
                    "</td><td><button  class=\"btn btn-outline-warning\"><i class=\"fa fa-edit\"></i></button> | "+
                    "<button id=\""+change.doc.data().docid+"\" onclick=\"DeleteRecord(this.id)\" class=\"btn btn-outline-warning\"><i class=\"fa fa-trash\"></i></button>"+
                    "</td></tr>"
              }
                console.log("Data Loaded!");
            });

    });

}


}

function InsertRecord() {
  var date = new Date();
  var docRef = db.collection("Fees_List").doc();

  docRef.set({
    docid:docRef.id,
    UserEmailId:UserEmailId,
    UserNameId:UserNameId,
    Client: cname.value,
    Project: cproject.value,
    Tax:ctax.value,
    Description:cdescription.value,
    BillingAddress:cbillingaddress.value,
    InvoiceDate:idate.value,
    DueDate:ddate.value,
    Status:"Undefined",
    OtherInformation:oinfo.value,
    Invoice:invoice.innerHTML

  })
  .then(function() {
      console.log("Document written ! ");
      modalmessage.innerHTML = "<div class='p-3 mb-2 bg-success text-white'>Client Added Success</div>";
      //TriggerModal();
      RelaodPage();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });

}

function DeleteRecord(id){

db.collection("Fees_List").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            modalmessage.innerHTML = "<div class='p-3 mb-2 bg-success text-white'>Tax Delete Success</div>";
            RelaodPageNotime()

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

}

function UpdateStatus(id,statusinfo){

db.collection("Fees_List").doc(id).update({

  docid: id,
  Status: statusinfo

})
.then(function() {
    console.log("Document Updated. ");


    RelaodPageNotime();
  })
.catch(function(error) {
    console.error("Error adding document: ", error);

});


}

function TriggerModal(){
     $("#myModal").modal();
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

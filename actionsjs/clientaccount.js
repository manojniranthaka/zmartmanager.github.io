var db = firebase.firestore();
var ClientDocId = localStorage.getItem("ClientDocID");
const Uploadedfilelist = document.getElementById("uploadedfilelist");
const MattersTableBody = document.getElementById("MattersTableBody");
const NotificationsTableBody = document.getElementById("NotificationsTableBody");
$('#fileuploadform')[0].reset();
var ClientDocID = $("#ClientID").val();
var UploadFileName = $("#FileName").val();
var UClientName = $("#ClientName").val();
var UClientCode = $("#ClientCode").val();


LoadClientDetalis();
LoaodClientUploadList();
LoaodClientUploadList(ClientDocId);
LoadDataToProfileView(String(ClientDocId));


function LoadClientDetalis(){

if(ClientDocId==null){
  window.location = "login.html";
}

var docRef = db.collection("Client_List").doc(ClientDocId);

docRef.get().then(function(doc) {
    if (doc.exists) {
      $("#welcomemessage").html("Hello "+doc.data().ClientName+"!");
      $("#ClientID").val(doc.data().docid);
      $("#ClientName").val(doc.data().ClientName);
      $("#ClientCode").html(doc.data().ClientCode);
      LoadClientTaskTable(String(doc.data().ClientName));

    } else {
      window.alert("Something Went Worng ,Contact Your Service Provider !")
      window.location = "login.html";
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



}

function FileUploadApi(){

  var UploadFileName = $("#FileName").val();
  var clientfile = document.getElementById("filechooser");

  			// get file
  	  var file = clientfile.files[0];

      var Uploadedate = new Date();
      var Filepath = 'ClientsUploads/'+ClientDocID+'/'+Uploadedate+'/'+file.name;
  			// create a storage ref
  			var storageRef = firebase.storage().ref(Filepath);

  			// upload file
  			var uploadTask = storageRef.put(file);


  			// update progress bar
  			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  				function (snapshot) {
  					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  				    $('#progressbar').css('width',Math.floor(progress)+'%' );
              $('#progressbar').html(Math.floor(progress)+'%');
  					  //console.log('Upload is ' + progress + '% done');
  					switch (snapshot.state) {
  						case firebase.storage.TaskState.PAUSED: // or 'paused'
  							console.log('Upload is paused');
  							break;
  						case firebase.storage.TaskState.RUNNING: // or 'running'
  							console.log('Upload is running');
  							break;
  					}
  				}, function (error) {

  					switch (error.code) {
  						case 'storage/unauthorized':
  							 window.alert("User doesn't have permission to access the object");
  							break;

  						case 'storage/canceled':
              window.alert("User canceled the upload");
  							// User canceled the upload
  							break;

  						case 'storage/unknown':
                window.alert("Unknown error occurred, inspect error.serverResponse");
  							// Unknown error occurred, inspect error.serverResponse
  							break;
  					}
  				}, function () {
  					// Upload completed successfully, now we can get the download URL
  					// save this link somewhere, e.g. put it in an input field
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

               console.log('File available at', downloadURL);
               SaveUploadData(ClientDocID,UClientName,UClientCode,UploadFileName,Uploadedate,Filepath,downloadURL);
            });

  				});



}

function SaveUploadData(CID,CName,CCode,FileName,ADate,CFilepath,Dlink){

  docRef = db.collection("Client_List").doc(String(CID)).collection("Client_Uploads").doc();

  docRef.set({

          docid:docRef.id,
          ClientId:CID,
          ClientName:CName,
          ClientCode:CCode,
          FileName:FileName,
          Filepath:CFilepath,
          AddedDate:ADate.toDateString(),
          AddedTime:ADate.toTimeString(),
          DownloadLink:Dlink

  })
  .then(function() {
      console.log("Document written ! ");
      $('#fileuploadform')[0].reset();
      window.location.reload();
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });


}

function LoaodClientUploadList(CDocID){

  db.collection("Client_List").doc(String(CDocID)).collection("Client_Uploads").orderBy("AddedDate", "asc").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
                Uploadedfilelist.innerHTML +=
                "<tr><td>"+change.doc.data().FileName+
                "</td><td>"+change.doc.data().AddedDate+
                "</td><td>"+change.doc.data().AddedTime+
                "</td><td><a href=\""+change.doc.data().DownloadLink+"\" target=\"_blank\" download><button class=\"btn btn-warning\">Downlaod</button></a>"+
                "</td><td><button id=\""+change.doc.data().docid+"\" name=\""+change.doc.data().Filepath+"\" onclick=\"DeleteFileFromStorage(this.name,this.id)\" class=\"btn btn-warning\"><i class=\"fa fa-trash\"></i></button>"+
                "</td></tr>"
              }
                console.log("Data Loaded!");

            });

    });

}

function LoadDataToProfileView(id){

/*
  const pro_clientName = document.getElementById("pro_clientName");
  const pro_clientLegalName = document.getElementById("pro_clientLegalName");
  const pro_clientType = document.getElementById("pro_clientType");
  const pro_clientIndustry = document.getElementById("pro_clientIndustry");
  const pro_ClientDescription = document.getElementById("pro_ClientDescription");
  const pro_ClientCode = document.getElementById("pro_ClientCode");
  const pro_ClientEmail = document.getElementById("pro_ClientEmail");
  const pro_ClientPhoneNumber = document.getElementById("pro_ClientPhoneNumber");
  const pro_ClientCountry = document.getElementById("pro_ClientCountry");
*/
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
        //pro_clientName.innerText = data.ClientName;
        //pro_clientLegalName.innerText = data.LegalName;
        //pro_clientType.innerHTML = data.ClientType;
        //pro_ClientCountry.innerHTML = data.LegalCountry;

        //pro_ClientEmail.innerText = data.ClientEmail;
        //pro_ClientPhoneNumber.innerText = data.PhoneNumber;
        //pro_ClientCode.innerText = data.ClientCode;
        //pro_ClientDescription.innerText = data.Description;
      //  pro_clientIndustry.innerText = data.Tags +" Industry";

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

        //pro_ClientTradingAddress.innerText = data.TrandingAddress;
        //pro_ClientTradingCity.innerText = data.TrandingCity;
        // value = data.TrandingRegion;
      //  pro_ClientTradingPostalCode.innerText = data.TrandingPostCode;
        //pro_ClientTradingCountry.innerText = data.TrandingCountry;

        //pro_ClientRespStaffPosition.innerText = data.PartnerLevel;
        //pro_ClientRespStaffName.innerText = data.OtherLevels;
        console.log("Data Load Success!");

      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  }

function DeleteFileFromStorage(DocrefLink,Docid){

  var storageRef = firebase.storage().ref();
  var desertRef = storageRef.child(DocrefLink);
  // Delete the file
  desertRef.delete().then(function() {
    console.log("File deleted successfully");
    DeleteFileData(Docid);
  }).catch(function(error) {
    console.log(error);
  });

}

function DeleteFileData(id){

  db.collection("Client_List").doc(ClientDocID).collection("Client_Uploads").doc(id).delete().then(function() {
          $("#uploadedfilelist").empty();
          LoaodClientUploadList(ClientDocId);
          console.log("Doc Deleted");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

}

function LoadClientTaskTable(TClientName){

  var curdate = new Date();

    db.collection("Tasks_List").where("ClientName", "==",TClientName).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
                  MattersTableBody.innerHTML +=
                  "<tr><td>"+change.doc.data().Task+
                  "</td><td>"+change.doc.data().Assignto+
                  "</td><td>"+change.doc.data().Ddate+
                  "</td><td>"+change.doc.data().Pdate+
                  "</td><td>"+change.doc.data().Cdate+
                  "</td><td>"+change.doc.data().Complete+
                  "</td></tr>"

                  NotificationsTableBody.innerHTML +=
                  "<tr><td>"+change.doc.data().Pdate+
                  "</td><td>"+change.doc.data().Notes+
                  "</td></tr>"
                }


              });
                console.log("Client Tasks Loaded!");
      });

}

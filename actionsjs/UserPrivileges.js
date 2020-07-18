
var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserType = localStorage.getItem("UserType");
var UserNameId = localStorage.getItem("UserNameId");
var DocId = localStorage.getItem("DocId");
var PCurrencyCode = localStorage.getItem("PCurrencyCode");

var FirmName = localStorage.getItem("FirmName");

$(".FirmName").html(FirmName);
$(".Hellouser").html("Hello " +UserNameId +" !");

UserPrivileges();
UserID();

function UserPrivileges(){

  if(localStorage.getItem("OnBoarding") == "D"){ //$("#OnBoarding").hide();
  $("#OnBoardingAcessModal").modal();
  $("#mainpageOnBoarding").hide();}
  if(localStorage.getItem("Clients") == "D"){ //$("#Clients").hide();
  $("#ClientsAcessModal").modal();
  $("#mainpageClients").hide();}
  if(localStorage.getItem("MattersAndTasks") == "D"){ //$("#MattersAndTasks").hide();
  $("#MattersAndTasksAcessModal").modal();
  $("#mainpageMattersAndTasks").hide();}
  if(localStorage.getItem("FeeIncome") == "D"){ //$("#FeeIncome").hide();
  $("#FeeIncomeAcessModal").modal();
  $("#mainpageFeeIncome").hide();}
  if(localStorage.getItem("LogTime") == "D"){ //$("#LogTime").hide();
  $("#LogTimeAcessModal").modal();
  $("#mainpageLogTime").hide();}
  if(localStorage.getItem("NoticeBoard") == "D"){ //$("#DticeBoard").hide();
  $("#NoticeBoardAcessModal").modal();
  $("#mainpageNoticeBoard").hide();}
  if(localStorage.getItem("StaffZone") == "D"){ //$("#StaffZone").hide();
  $("#StaffZoneAcessModal").modal();
  $("#mainpageStaffZone").hide();}
  if(localStorage.getItem("EauditPapers") == "D"){ //$("#EauditPapers").hide();
  $("#EauditPapersAcessModal").modal();
  $("#mainpageEauditPapers").hide();}
  if(localStorage.getItem("Reports") == "D"){ //$("#Reports").hide();
  $("#ReportsAcessModal").modal();
  $("#mainpageReports").hide();}
  if(localStorage.getItem("ClouDoc") == "D"){ //$("#ClouDoc").hide();
  $("#ClouDocAcessModal").modal();
  $("#mainpageClouDoc").hide();}
  if(localStorage.getItem("PracticeFunding") == "D"){ //$("#PracticeFunding").hide();
  //$("#SettingAcessModal").modal();
  $("#mainpagePracticeFunding").hide();}
  if(localStorage.getItem("Settings") == "D"){ //$("#Settings").hide();
  $("#SettingAcessModal").modal();
  $("#mainpageSettings").hide();}

  if(localStorage.getItem("SettingsPractice") == "D"){ $("#SettingsPractice").hide();}
  if(localStorage.getItem("SettingsCalendar") == "D"){ $("#SettingsCalendar").hide();}
  if(localStorage.getItem("SettingsUsers") == "D"){ $("#SettingsUserss").hide();
  }
  if(localStorage.getItem("SettingsSubscription") == "D"){ $("#SettingsSubscription").hide();}
  if(localStorage.getItem("SettingsAuditTrail") == "D"){ $("#SettingsAuditTrail").hide();}
  if(localStorage.getItem("SettingsTax") == "D"){ $("#SettingsTax").hide();}
  if(localStorage.getItem("SettingsService") == "D"){ $("#SettingsService").hide();}
  if(localStorage.getItem("SettingsInvoices") == "D"){ $("#SettingsInvoices").hide();}
  if(localStorage.getItem("SettingsTasks") == "D"){ $("#SettingsTasks").hide();}
  if(localStorage.getItem("SettingsClients") == "D"){ $("#SettingsClients").hide();}
  if(localStorage.getItem("SettingsRecurring") == "D"){ $("#SettingsRecurring").hide();}

}

function UserID(){
  if(UserEmailId == null || UserNameId == null ){
      window.alert("Something Went Worng!,Contact Admin");
      window.location = "login.html";

  }
  console.log(UserNameId);
  console.log(UserEmailId);
  console.log(DocId);
  console.log(AdminEmailId);

}

function Logout(){

firebase.auth().signOut().then(function() {
localStorage.clear();
window.location = "login.html";
console.log("logout done");
}).catch(function(error) {
console.log(error);
});

}

$(function(){
    $('.date').datepicker({
        format: 'yyyy-mm-dd',
        endDate: '+0d',
        autoclose: true
    });
});

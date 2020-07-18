var db = firebase.firestore();

var UserEmailId = localStorage.getItem("LoginUserID");
var AdminEmailId = localStorage.getItem("AdminEmail");
var UserNameId = localStorage.getItem("UserNameId");
var UserType = localStorage.getItem("UserType");
var Belongsto


function Logout(){

firebase.auth().signOut().then(function() {
localStorage.clear();
window.location = "login.html";
console.log("logout done");
}).catch(function(error) {
console.log(error);
});

}

function loadCountsForTopBar() {
    const activeClientsCountElement =  document.getElementById("activeClientsCount")
    const outstandingTasksCountElement =  document.getElementById("outstandingTasksCount")
    const newOnboardingsCountElement =  document.getElementById("newOnboardingsCount")
    const feesOutstandingsCountElement =  document.getElementById("feesOutstandingsCount")
    const newestNoticesCountElement =  document.getElementById("newestNoticesCount")
    const totTimeRecordingsCountElement =  document.getElementById("totTimeRecordingsCount")

    var activeClients = 0
    var outstandingTasks = 0
    var newOnboardings = 0
    var feesOutstandings = 0
    var newestNotices = 0
    var totTimeRecordings = "0h 0m"

    if(UserEmailId==AdminEmailId){

                  db.collection("Client_List")
                      .onSnapshot(function(querySnapshot) {
                      querySnapshot.docChanges().forEach(function(change) {
                          if( change.doc.data().ActiveStatus == "Active"){
                              activeClients++
                          }
                      });
                      activeClientsCountElement.innerHTML =  activeClients
                  });

                  db.collection("Tasks_List")
                      .onSnapshot(function(querySnapshot) {
                      querySnapshot.docChanges().forEach(function(change) {
                          if( change.doc.data().Complete !== "Yes"){
                              outstandingTasks++
                          }
                      });
                      outstandingTasksCountElement.innerHTML =  outstandingTasks
                  });

                  var totalHours = 0
                  var totalMinutes = 0
                  db.collection("LogTime_List").doc("Staff_List").collection("Staff")
                      .onSnapshot(function(querySnapshot) {
                      querySnapshot.docChanges().forEach(function(change) {
                          totalHours +=  Number(change.doc.data().TotalHours)
                          totalMinutes += Number(change.doc.data().TotalMinutes)

                          if( change.doc.data().EntryDate === new Date().toISOString().split("T")[0] ){
                              newOnboardings++
                          }
                      });

                      totTimeRecordings = totalHours + "h "+totalMinutes+"m"
                      newOnboardingsCountElement.innerHTML = newOnboardings
                      totTimeRecordingsCountElement.innerHTML=   totTimeRecordings
                  });

                  db.collection("Fees_List")
                      .onSnapshot(function(querySnapshot) {
                      querySnapshot.docChanges().forEach(function(change) {
                          if( change.doc.data().Status === "Due" || change.doc.data().Status === "Overdue" ){
                              feesOutstandings++
                          }
                      });
                      feesOutstandingsCountElement.innerHTML =  feesOutstandings
                  });

                  db.collection("Notice_List").orderBy("EntryDate", "desc").limit(1)
                      .onSnapshot(function(querySnapshot) {
                      querySnapshot.docChanges().forEach(function(change) {

                        newestNoticesCountElement.innerHTML +=
                          "<h6>"+change.doc.data().EntryDate+" : "+change.doc.data().Notes+"</h6>"

                      });
                      //newestNoticesCountElement.innerHTML =  newestNotices
                  });

    } else{

      db.collection("Client_List").where("UserEmailId", "==",UserEmailId)
          .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {
              if( change.doc.data().ActiveStatus == "Active"){
                  activeClients++
              }
          });
          activeClientsCountElement.innerHTML =  activeClients
      });

      db.collection("Tasks_List").where("UserEmailId", "==",UserEmailId)
          .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {
              if( change.doc.data().Complete !== "Yes"){
                  outstandingTasks++
              }
          });
          outstandingTasksCountElement.innerHTML =  outstandingTasks
      });

      var totalHours = 0
      var totalMinutes = 0
      db.collection("LogTime_List").doc("Staff_List").collection("Staff").where("UserEmailId", "==",UserEmailId)
          .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {
              totalHours +=  Number(change.doc.data().TotalHours)
              totalMinutes += Number(change.doc.data().TotalMinutes)

              if( change.doc.data().EntryDate === new Date().toISOString().split("T")[0] ){
                  newOnboardings++
              }
          });

          totTimeRecordings = totalHours + "h "+totalMinutes+"m"
          newOnboardingsCountElement.innerHTML = newOnboardings
          totTimeRecordingsCountElement.innerHTML=   totTimeRecordings
      });

      db.collection("Fees_List").where("UserEmailId", "==",UserEmailId)
          .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {
              if( change.doc.data().Status === "Due" || change.doc.data().Status === "Overdue" ){
                  feesOutstandings++
              }
          });
          feesOutstandingsCountElement.innerHTML =  feesOutstandings
      });

      db.collection("Notice_List").where("UserEmailId", "==",UserEmailId).orderBy("EntryDate", "desc").limit(1)
          .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {

            newestNoticesCountElement.innerHTML +=
            "<h6>"+change.doc.data().EntryDate+" : "+change.doc.data().Notes+"</h6>"

          });
          //newestNoticesCountElement.innerHTML =  newestNotices
      });

  }

}

function LoadClientTypeCounts() {
    var clientTypes = []
    var totalClients = 0

        db.collection("Settings").doc("ManageClients").collection("ManageClientsList").onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                  clientTypes.push([
                    change.doc.data().ClientType,
                    0
                  ])
                }
            });
        });

        db.collection("Client_List")
            .onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
                totalClients++
                clientTypes.forEach( (type) =>{
                   if( type[0] ===  change.doc.data().ClientType){
                       type[1]++;
                   }
                })
            });

            var t
            var avg
            clientTypes.forEach((type) => {
                t = type[0]
                avg = type[1] !== 0 ? (type[1]/totalClients*100).toPrecision(3):"0.0"
                type[0] = t+" ("+ avg+"%)";
            })
            console.log("Tot",totalClients);
        });


        console.log("Loaded ClientTypeCounts",clientTypes);
        return clientTypes

    }

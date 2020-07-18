
/** 
 * Adds a Read More Element( Ex: Button ) next to a description Element( Ex: <div>A Description</div> )  ) 
 * based on provided initial Displaying WordCount
 * 
 * @author NisugaJ https://stackoverflow.com/users/10010326/nisuga-jayawardana
 * 
 * @param {String} descriptionElementId 
 * @param {Element} buttonElement 
 * @param {String} fullText 
 * @param {Number} initlDisplayingWordCount          
 *                 
 * ************* Example Usage *************
 * 
 * var newReadMeButton = document.createElement('button')
 * newReadMeButton.innerHTML ="Read More"
 * newReadMeButton.className = "btn btn-outline-primary btn-sm readMore"
 * 
 * setReadMoreButton("description_123da2123dq2", newReadMoreButton,"Lorem Lorem Lorem lorem ipsum dolor sit amet dolor sit", 5);
 */

function setReadMoreButton(descriptionElementId, buttonElement, fullText, initlDisplayingWordCount) {

    //Spliting the description to a word array
    var splitted = fullText.trim().split(" ")

    //Is the description length longer than initlDisplayingWordCount ?
    if(splitted.length > initlDisplayingWordCount){
      var descriptionElem = document.getElementById(descriptionElementId)

      //Saving the words which have to be hidden 
      var remaining = splitted.slice(8, splitted.length+1)
      
      //Adding attributes to the new button element
      buttonElement.id = "readme_btn_"+descriptionElementId
      buttonElement.setAttribute("remaining",remaining)
      buttonElement.setAttribute("onclick","addOrRemoveReadMore()")
      
      //Inserting the Read Me button elem next to the description
      descriptionElem.parentNode.insertBefore(buttonElement, descriptionElem.nextSibling)
      
      descriptionElem.innerHTML = ''
      //Inserting the initial words to the description
      for (let index = 0; index < initlDisplayingWordCount; index++) {
        splitted[index] ? descriptionElem.innerHTML += splitted[index] + " " : null
      }
    }
}


/**
 * Executes when the Read More button is clicked
 * 
 */
function addOrRemoveReadMore(){
  // document.getElementById(buttonElement.id).addEventListener('click',function(){
  //Getting the descriptionElem from DOM
  const descEle = document.getElementById(event.target.id.split('readme_btn_')[1])
  var allCurrentText = descEle.innerHTML

  var remaining = document.getElementById(event.target.id).getAttribute('remaining')
  var remaining = remaining.split(",")
  var remainingText = " "
  remaining.forEach(element => {
    remainingText += element + " "
  })

  //Appending the remaining words to the current displaying description
  allCurrentText+=remainingText
  
  // Displaying all the text in the description
  if(event.target.innerHTML==="Read More"){
    descEle.innerHTML =  allCurrentText
    event.target.innerHTML="Read Less"
  }
  // Hiding the description according the specified word length
  else if(event.target.innerHTML==="Read Less"){
    descEle.innerHTML = descEle.innerHTML.split(remainingText)[0]
    event.target.innerHTML="Read More"
  }
}
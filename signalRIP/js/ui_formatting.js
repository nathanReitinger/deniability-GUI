
// resizes the message so that they don't overlap. also fixes the height parameter.
function resize_message(message_div){

    try{
        lowest_message = find_prev_message(message_div)
        lowest_message_loc = parseInt(lowest_message.style.top, 10)
        last_message_data_row = lowest_message.getAttribute("data-row")
        lowest_message_height = parseInt(lowest_message.style.height, 10)
    } catch(e){
        lowest_message_loc = 256-57
        last_message_data_row = "0"
        lowest_message_height = 57
    }
    

    new_data_row = "" + ( parseInt(last_message_data_row, 10) + 1 )
    message_div.setAttribute("data-row", new_data_row)

    try{
        message_height_offset = 9
        message_div_height = message_div.getElementsByClassName("module-message__container-outer")[0].clientHeight + message_height_offset    

    } catch (e){
        message_height_offset = 41
        message_div_height = message_div.getElementsByClassName("module-inline-notification-wrapper")[0].clientHeight + message_height_offset
      
    }

  
    message_div.style.height = message_div_height + "px"
    message_div.style.top = (lowest_message_loc + lowest_message_height ) + "px"


}




function adjust_position(message_div){
    lowest_message = find_prev_message(message_div)
    lowest_message_loc = parseInt(lowest_message.style.top, 10)
    message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10) ) + "px"

}

function adjust_position_all_messages(){
    all_messages = document.getElementsByClassName("module-timeline__message-container")
    for(message of all_messages){
        try{
            adjust_position(message)
        } catch(e){}
    }

}



function resize_message_container(){
    outer_container = document.getElementById("where_all_the_messages_go")

    message_div = find_prev_message(null)

    new_height = ( parseInt(message_div.style.top, 10) + parseInt(message_div.style.height, 10) ) 
    new_height_offset =   40 // parseInt(outer_container.style.height, 10) - lowest_message_loc - parseInt(lowest_message.style.height)

    outer_container.style.height = (new_height + new_height_offset)  + "px"
    outer_container.style.setProperty("max-height", outer_container.style.height)
}


// gets message prior to the one given. If given sometihng we don't have yet, return the last message.
function find_prev_message(message_div){
    all_messages = document.getElementsByClassName("module-timeline__message-container")

    prev_message = 0
    for(message of all_messages){
        if( message_div && message.id === message_div.id ){
            return(prev_message)
        }
        prev_message = message
    }

    return prev_message
}

function delete_message(message_id){
    document.getElementById(message_id).remove()
}




function add_message(text_to_add, text_box){
    outer_container = document.getElementById("where_all_the_messages_go")

    message_inners_outgoing = `<div class="module-message module-message--outgoing" tabindex="0" role="button"><div class="module-message__buttons module-message__buttons--outgoing"><div role="button" class="module-message__buttons__react" aria-label="React to Message"></div><div role="button" aria-label="Reply to Message" class="module-message__buttons__reply module-message__buttons__download--outgoing"></div><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--outgoing"></div></div></div><div class="module-message__container-outer"><div class="module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"><div dir="auto" class="module-message__text module-message__text--outgoing"><span contenteditable="">That sure sounds like a big&nbsp;plan</span></div><div class="module-message__metadata module-message__metadata--outgoing"><span class="module-message__metadata__date module-message__metadata__date--outgoing" title="Thu, Sep 16, 2021 10:28 PM"><span contenteditable>39m</span></span><div class="module-expire-timer module-expire-timer--20 module-expire-timer--outgoing"></div><div class="module-message__metadata__status-icon module-message__metadata__status-icon--read"></div></div></div></div></div>`
    message_inners_incoming = `<div class="module-message module-message--incoming" tabindex="0" role="button"><div class="module-message__container-outer"><div class="module-message__container module-message__container--incoming"><div dir="auto" class="module-message__text module-message__text--incoming"><span contenteditable>Yes I'm&nbsp;here</span></div><div class="module-message__metadata module-message__metadata--incoming"><span class="module-message__metadata__date module-message__metadata__date--incoming" title="Mon, Sep 20, 2021 10:49 AM"><span contenteditable>1m</span></span><div class="module-expire-timer module-expire-timer--60 module-expire-timer--incoming"></div></div></div></div><div class="module-message__buttons module-message__buttons--incoming"><div role="button" class="module-message__buttons__react" aria-label="React to Message"></div><div role="button" aria-label="Reply to Message" class="module-message__buttons__reply module-message__buttons__download--incoming"></div><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--incoming"></div></div></div></div>`

    all_messages = document.getElementsByClassName("module-timeline__message-container")

    rand_vals = new Uint32Array(4)
    window.crypto.getRandomValues(rand_vals)
    new_id=""
    for(val of rand_vals){
        new_id += val.toString(16)
    }

    // new message creation
    let message_div = document.createElement('div');
    message_div.setAttribute("id", new_id)
    //message_div.setAttribute("contenteditable", true)
    message_div.setAttribute("class", "module-timeline__message-container" )
    message_div.setAttribute("role", "row" )
    message_div.setAttribute("style", "height: 64px; left: 0px; position: absolute; top: 1779px; width: 446px;")

    // if prev message is same sender, then edit border property
    let message_identifier_incoming = "module-message__container module-message__container--incoming"
    let message_identifier_outgoing = "module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"
    let prev_message = find_prev_message(message_div)

    // if incoming message, use HTML properties from incoming
    if ($("#popupSelect").val() == 'Incoming') {
        message_div.innerHTML = message_inners_incoming
        if (prev_message.innerHTML.includes(message_identifier_incoming)) {
            var editable_div_previous = prev_message.getElementsByClassName(message_identifier_incoming)[0]
            var editable_div_current = message_div.getElementsByClassName(message_identifier_incoming)[0]
            editable_div_previous.style.cssText += 'border-bottom-left-radius: 5px';
            editable_div_current.setAttribute("style", "border-top-left-radius: 5px")
        }
    // if outgoing message, use HTML properties from outgoing
    } else {
        message_div.innerHTML = message_inners_outgoing
        if (prev_message.innerHTML.includes(message_identifier_outgoing)) {
            console.log(prev_message.getElementsByClassName(message_identifier_outgoing)[0])
            var editable_div_previous = prev_message.getElementsByClassName(message_identifier_outgoing)[0]
            var editable_div_current = message_div.getElementsByClassName(message_identifier_outgoing)[0]
            editable_div_previous.style.cssText += 'border-bottom-right-radius: 5px';
            editable_div_current.setAttribute("style", "border-top-right-radius: 5px")
        }
    }

    text_displayed = message_div.getElementsByTagName("span")[0]
    console.log(text_displayed)
    text_displayed.innerHTML = text_to_add

    outer_container.appendChild(message_div)

    for(span of message_div.getElementsByTagName("span")){
        span.addEventListener("keyup", resize_listener)
    }


    resize_message(message_div)
    resize_message_container()


    document.getElementsByClassName("timeline-placeholder")[0].setAttribute("style", "bottom: -3em;")
    message_div.scrollIntoView();

}

function resize_listener(event){

    all_messages = document.getElementsByClassName("module-timeline__message-container")

    found = false
    for(message of all_messages){
        if(message.contains(event.currentTarget)){
            resize_message(message)
            found=true
        } else if(found){
            adjust_position(message)
        }
    }
    resize_message_container()
}

var observer = ""


function deleteButtonListener(event){
    message_to_del = event.currentTarget.parentElement.parentElement.parentElement.parentElement
    console.log(message_to_del.id)
    delete_message(message_to_del.id)
    adjust_position_all_messages()
}

$(function(){

    text_box = document.getElementsByClassName("ql-editor ql-blank ql-editor--loaded")[0]
    icon = document.getElementsByClassName('module-sticker-button__button')[0]
    text_box.addEventListener('focusin', (event) => {
        text_box.setAttribute("data-placeholder", "")
        // text_box.setAttribute("style", "float: left")
        icon.setAttribute("style", "display:none")
    });


    text_box.addEventListener('keydown', (event) => {

        if (event.which == 13 || event.keyCode == 13){
            add_message(text_box.innerText, text_box)
        }
    });

    text_box.addEventListener('keyup', (event) => {

        if (event.which == 13 || event.keyCode == 13){
            text_box.innerHTML = ""
        }
    });

    text_box.addEventListener('focusout', (event) => {
        if(text_box.innerHTML == "" || text_box.innerHTML == "<br>"){
            text_box.setAttribute("data-placeholder", "Send a message")
            icon.setAttribute("style", "display:")
        }
    });

    // these are the message resizers. 
    $("span").on("keyup", resize_listener);

    delete_btns = document.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--outgoing")
    for(delete_b of delete_btns){
        delete_b.addEventListener('click', deleteButtonListener);
    }
    delete_btns = document.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--incoming")
    for(delete_b of delete_btns){
        delete_b.addEventListener('click', deleteButtonListener);
    }






});






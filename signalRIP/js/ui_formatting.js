


function add_message(text_to_add, text_box){
    outer_container = document.getElementById("where_all_the_messages_go")

    message_inners_outgoing = `<div class="module-message module-message--outgoing" tabindex="0" role="button"><div class="module-message__buttons module-message__buttons--outgoing"><div role="button" class="module-message__buttons__react" aria-label="React to Message"></div><div role="button" aria-label="Reply to Message" class="module-message__buttons__reply module-message__buttons__download--outgoing"></div><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--outgoing"></div></div></div><div class="module-message__container-outer"><div class="module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"><div dir="auto" class="module-message__text module-message__text--outgoing"><span contenteditable="">That sure sounds like a big&nbsp;plan</span></div><div class="module-message__metadata module-message__metadata--outgoing"><span class="module-message__metadata__date module-message__metadata__date--outgoing" title="Thu, Sep 16, 2021 10:28 PM"><span contenteditable>39m</span></span><div class="module-expire-timer module-expire-timer--20 module-expire-timer--outgoing"></div><div class="module-message__metadata__status-icon module-message__metadata__status-icon--read"></div></div></div></div></div>`
    message_inners_incoming = `<div class="module-message module-message--incoming" tabindex="0" role="button"><div class="module-message__container-outer"><div class="module-message__container module-message__container--incoming"><div dir="auto" class="module-message__text module-message__text--incoming"><span contenteditable>Yes I'm&nbsp;here</span></div><div class="module-message__metadata module-message__metadata--incoming"><span class="module-message__metadata__date module-message__metadata__date--incoming" title="Mon, Sep 20, 2021 10:49 AM"><span contenteditable>1m</span></span><div class="module-expire-timer module-expire-timer--60 module-expire-timer--incoming"></div></div></div></div><div class="module-message__buttons module-message__buttons--incoming"><div role="button" class="module-message__buttons__react" aria-label="React to Message"></div><div role="button" aria-label="Reply to Message" class="module-message__buttons__reply module-message__buttons__download--incoming"></div><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--incoming"></div></div></div></div>`

    all_messages = document.getElementsByClassName("module-timeline__message-container")
    console.log(all_messages)


    lowest_message_loc = 0
    last_message_data_row = 0
    lowest_message = null   
    for( item of all_messages){
        temp_top = parseInt(item.style.top, 10)
        console.log(temp_top)
        if(temp_top > lowest_message_loc){
            lowest_message_loc = temp_top
            last_message_data_row = item.getAttribute("data-row")
            lowest_message = item
        }
    }

    console.log(lowest_message_loc)

    // new message creation
    let message_div = document.createElement('div');
    message_div.setAttribute("id", "randomo_stiring")
    new_data_row = "" + ( parseInt(last_message_data_row, 10) + 1 )
    message_div.setAttribute("data-row", new_data_row)
    message_div.setAttribute("class", "module-timeline__message-container" )
    message_div.setAttribute("role", "row" )
    message_div.setAttribute("style", "height: 64px; left: 0px; position: absolute; top: 1779px; width: 446px;")

    if ($("#popupSelect").val() == 'Incoming') {
        message_div.innerHTML = message_inners_incoming
    } else {
        message_div.innerHTML = message_inners_outgoing
    }

    // message_div.innerHTML = message_inners_incoming


    text_displayed = message_div.getElementsByTagName("span")[0]
    console.log(text_displayed)
    text_displayed.innerHTML = text_to_add


    outer_container.appendChild(message_div)

    message_div = outer_container.childNodes[outer_container.childNodes.length-1]


    message_height_offset = 9

    message_div_height = message_div.getElementsByClassName("module-message__container-outer")[0].clientHeight + message_height_offset
    console.log("asdfasfasdf  " +  message_div_height)
    message_div.style.height = message_div_height + "px"

    message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10) ) + "px"

    new_height = ( parseInt(message_div.style.top, 10) + parseInt(message_div.style.height, 10) ) 
    new_height_offset =   40 // parseInt(outer_container.style.height, 10) - lowest_message_loc - parseInt(lowest_message.style.height)
    console.log("lowest height", lowest_message.style.height)
    console.log("new offset", new_height_offset)
    outer_container.style.height = (new_height + new_height_offset)  + "px"
    outer_container.style.setProperty("max-height", outer_container.style.height)


    console.log(text_box)
    text_box.innerHTML = ""
    console.log(text_box.innerHTML)

    document.getElementsByClassName("timeline-placeholder")[0].setAttribute("style", "bottom: -3em;")
    message_div.scrollIntoView();

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
            gotoBottom(document.getElementById("where_all_the_messages_go"))
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

});








function add_message(text_to_add){
    elem = document.getElementById("where_all_the_messages_go")
    console.log(elem)

    message = elem.childNodes[53]

    message.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML = text_to_add
    message.style.top = "2100px" //elem.childNodes[elem.childNodes.length-2].style.height


    elem.appendChild(message)

    return elem
    
}
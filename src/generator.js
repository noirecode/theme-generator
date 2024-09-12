//layout elements
let rootStyles = document.querySelector(':root').style
let body = document.querySelector('body')
let topElement = document.querySelector('#top')
let container = document.querySelector('#container')
let header = document.querySelector('header')
let desc = document.querySelector('#description')
let navigation = document.querySelector('nav')
let main = document.querySelector('main')
let leftSidebar = document.querySelector('#left')
let rightSidebar = document.querySelector('#right')
let postElement = document.querySelector('#post')
let footer = document.querySelector('footer')

// OPTION LISTENERS
allOptions = []
inputs = document.querySelector('#panel').querySelectorAll('input')
selects = document.querySelector('#panel').querySelectorAll('select')

allOptions.push.apply(allOptions, inputs)
allOptions.push.apply(allOptions, selects)

allOptions.forEach((elem)=>{
    if(elem.id == 'select-sidebar'){
        elem.addEventListener('change', sidebarOption)
    }
    if(elem.name == 'border-check'){
        elem.addEventListener('change', borderOption)
    }
    if(elem.id == 'header-check' || elem.id == 'footer-check' || elem.id == 'desc-check'){
        elem.addEventListener('change', elemToggle)
    }
    if(elem.id == 'independent-check'){
        elem.addEventListener('change', independentHeader)
    }
    if(elem.type == 'text'){
        elem.addEventListener('input', optionSelector)
    }
    if(elem.id == 'nav-position'){
        elem.addEventListener('change', navOption)
    }
    else{
        elem.addEventListener('change', optionSelector)
    }
})

///option functions
function checkAvailability(value, elem = null){
    function headerGap(){
        document.querySelector('#--header-gap').disabled = (document.querySelector('header')==null || document.querySelector('#description')==null) || value
    }
    if(elem == 'independent-header'){
        headerGap()
    }
    if(elem == header){
        document.querySelector('#--header-background-image').disabled = !value
        document.querySelector('#border-header').disabled = !value
        document.querySelector('#--header-height').disabled = !value
        headerGap()
    }
    if(elem == desc){
        document.querySelector('#border-desc').disabled = !value
        document.querySelector('#--desc-bg-color').disabled = !value
        headerGap()
    }
    if(elem == footer){
        document.querySelector('#border-footer').disabled = !value
        document.querySelector('#--footer-bg-color').disabled = !value
    }
    if(elem == 'sidebars'){
        if((leftSidebar || rightSidebar)){
            document.querySelector('#border-sideright').disabled = value=='leftSidebar' || value =='noSidebar'
            document.querySelector('#border-sideleft').disabled = value=='rightSidebar' || value =='noSidebar'
            document.querySelector('#--sidebar-align-items').disabled = value =='noSidebar'
            document.querySelector('#--main-gap').disabled = value =='noSidebar'
            document.querySelector('#--sidebar-bg-color').disabled = value =='noSidebar'
        }
    }
    noTop = (document.querySelector('header')==null && document.querySelector('#description')==null) || (document.querySelector('#independent-check').checked && document.querySelector('#description')==null)
    if(noTop){
        topElement.remove()
    }
    document.querySelector('#--container-gap').disabled = noTop
}
function optionSelector(evt){
    elem_id = evt.target.id
    elem_name = evt.target.name
    elem_value = this.value

    if (elem_name == 'borders'){
        elem_value = elem_value+'px'
    }
    if (elem_name == 'padding'){
        elem_value = elem_value+'vw'
    }
    if (elem_name == 'margin'){
        elem_value = elem_value+'vh'
    }
    if (elem_id == '--header-background-image' || elem_id == '--background-image'){
        elem_value = "url('"+elem_value+"')"
    }
    rootStyles.setProperty(elem_id,elem_value)  
}
function elemToggle(){
    switch(this.id){
        case 'header-check':
            elem = header
            break
        case 'footer-check':
            elem = footer
            break
        case 'desc-check':
            elem = desc
            break
    }
    if (this.checked ){
        if(document.querySelector('#topElement')==null){
            container.prepend(topElement)
        }
        if(elem == header){
            if(document.querySelector('#independent-check').checked){
                body.prepend(header)
            }
            else{
                topElement.prepend(header)
            }
        }
        else if(elem == desc){
            topElement.append(desc)
        }
        else{
            container.append(footer)
        }
    }
    else{
        elem.remove()
    }
    checkAvailability(this.checked, elem)
}
function navOption(){
    switch(this.value){
        case 'inHeader':
            desc.append(navigation)
            break
        case 'inLeft':
            leftSidebar.append(navigation)
            break
        case 'inRight':
            rightSidebar.append(navigation)
    }
}
function sidebarOption(){
    switch(this.value){
        case 'bothSidebars':
            main.prepend(leftSidebar)
            main.append(rightSidebar)
            break          
        case 'leftSidebar':
            rightSidebar.remove()
            main.prepend(leftSidebar)
            break    
        case 'rightSidebar':
            leftSidebar.remove();
            main.append(rightSidebar)
             break
        case 'noSidebar':
            rightSidebar.remove()
            leftSidebar.remove()
    }
    checkAvailability(this.value, 'sidebars')
}
function borderOption(evt){
    switch (evt.target.id){
        case 'border-header':
            elem = header
            break
        case 'border-desc':
            elem = desc
            break
        case 'border-sideleft':
            elem = leftSidebar
            break
        case 'border-sideright':
            elem = rightSidebar
            break
        case 'border-posts':
            elem = postElement
            break
        case 'border-footer':
             elem = footer
             break
        case 'border-container':
            elem = container
            break
    }

    if (this.checked){
        elem.style.border = 'var(--border-size) var(--border-style) var(--border-color)'
        elem.style.borderRadius = 'var(--border-radius)'
     }
    else{
        elem.style.border = 'none'
        elem.style.borderRadius = '0px'
    }
}
function independentHeader(){
    if(this.checked){
        body.prepend(header)
    }
    else{
        topElement.prepend(header)
    }
    
    checkAvailability(this.checked,'independent-header')
}

let bar = document.querySelector('#bar')
let hide = document.querySelector('#hide')
let show = document.querySelector('#show')
let optPanel = document.querySelector('#p-content')
let panel = document.querySelector('#panel')
let outputArea = document.querySelector('textarea')
let generateButton = document.querySelector("#generate-btn")
generateButton.addEventListener('click', generate)


//SHOW & HIDE
show.remove()
hide.addEventListener('click', manage_panel)
show.addEventListener('click', manage_panel)
optPanel.style.display = 'block'

function manage_panel(){
    if(optPanel.style.display === 'block'){
        optPanel.style.display = 'none'
        bar.style.borderBottom = 'none'
        panel.style.opacity = '0.3'
        hide.remove();
        bar.append(show);
    }
    else{
        optPanel.style.display = 'block'        
        bar.style.borderBottom = '1px solid black'
        panel.style.opacity = '1'
        show.remove()
        bar.append(hide)
    }
}

dragElement(document.querySelector('#panel'))

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  bar.onmousedown = dragMouseDown

  function dragMouseDown(e) {
    e = e || window.Event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.Event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}

///generate html+css

function generate(){
    let templateHTML = '<!--\n  CREATED BY: noirecode @ github\n-->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1.0">\n  <link rel="shortcut icon" href="YOUR FAVICON URL HERE" type="image/x-icon" />\n  <title>YOUR PAGE TITLE HERE</title>\n'

    template = templateHTML + generateCSS() + '\n</head>\n' +'<body>\n'+container.outerHTML+'\n</body>\n</html>'
   
    outputArea.innerHTML = template
    outputArea.style.display = 'block'
    outputArea.addEventListener('click', ()=>{
        outputArea.select()
    });
   console.log(template)
}

let varList = ['--background-image','--container-margin-top','--container-padding','--container-width','--container-gap','--main-gap','--main-height','--background-color','--container-bg-color','--post-bg-color','--sidebar-bg-color','--desc-bg-color','--footer-bg-color','--element-padding','--font-size','--text-alignment','--text-font','--text-color','--title-alignment','--title-font','--title-color','--link-color','--link-hover-color','--link-decoration','--header-background-image','--header-height','--header-gap','--nav-link-color','--nav-link-hover-color','--nav-link-bg-color','--nav-link-gap','--nav-link-border-style','--nav-link-border-size','--nav-link-border-radius','--sidebar-align-items','--border-style','--border-size','--border-radius','--border-color']
let varValues = ['url()','0vh','0vw','50vw','1vw','1vw','auto','#e7e7e7','#e7e7e7','#ffffff','#ffffff','#ffffff','#ffffff','0.7vw','100%','left','Helvetica, sans-serif', '#000000', 'left', 'Helvetica, sans-serif', '#000000','#000000','#000000','underline', 'url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg")', '30vh','1vw','#000000','#000000','#ffffff','1vw', 'solid','1px', '0px','stretch', 'solid','1px','0px','#000000']
function generateCSS(){
    let modifiedVars = ''
    let varLen = varList.length
    let rootLen = rootStyles.length
    for(i = 0; i < varLen; i++){
        let value = varValues[i]
        for(j = 0; j < rootLen; j++){
            if(varList[i] == rootStyles[j]){
                value = String(rootStyles.getPropertyValue(rootStyles[j]))
            }
        }
        value = value+';'
        modifiedVars=modifiedVars+('  '+varList[i]+': '+value+'\n')
    }
    let styleElem ='<style>\n'+':root{\n'+modifiedVars +'}\n' + document.querySelector('style').innerHTML+'\n</style>'
    return styleElem
    
}

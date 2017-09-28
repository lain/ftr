<!--
/********* Hide/Show Text vars ************/
gSTR_PRODUCT_INQUIRYLIST = "Product Inquiry List";
gSRT_PREPARE_ORDER = "Prepare Order";
gSTR_PLACE_ORDER = "Place Order";
gSTR_SELECT_DISTI = "Select Distributor";
gSTR_REVIEW_TRANSFER_LIST = "Review and Transfer List";


var str_browser;
var int_version;
var show;
var hide;
var str_DOMDocument;
var undefined = "undefined";


str_browser = navigator.appName;
int_version = navigator.appVersion;
if (str_browser == "Microsoft Internet Explorer") {
    if (int_version.indexOf("MSIE 5") != -1) {
        str_browser = "ie";
        int_version = "5";
    }
    if (int_version.indexOf("MSIE 4") != -1) {
        str_browser = "ie";
        int_version = "4";
    }
    if (int_version.indexOf("MSIE 3") != -1) {
        str_browser = "ie";
        int_version = "3";
    } else {
        str_browser = "ie";
        int_version = "0"
    }
} else if (str_browser == "Netscape") {
    if (parseInt(int_version) == 5) {
        str_browser = "nn";
        int_version = "5";
    } else if (parseInt(int_version) == 4) {
        str_browser = "nn";
        int_version = "4";
    } else if (parseInt(int_version) == 3) {
        str_browser = "nn";
        int_version = "3";
    } else if (parseInt(int_version) == 2) {
        str_browser = "nn";
        int_version = "2";
    } else {
        str_browser = "nn";
        int_version = "0";
    }

}
if (str_browser == "ie") {
    str_DOMDocument = "document.all";
} else if (str_browser == "nn") {
    if (int_version == 5) {
        str_DOMDocument = "document.getElementById";
    } else {
        str_DOMDocument = "document.layers";
    }
}
if (str_browser == "ie") {
    show = "visible";
    hide = "hidden";
} else {
    if (str_browser == "nn" && int_version == "5") {
        show = "visible";
        hide = "hidden";
    } else {
        show = "show";
        hide = "hide";
    }

    // Reload document when user
    // resizes window. This is necessary as
    // Netscape often fails to re-translate 
    // css styles and js code. when document
    // is resized.
    //if( document.layers )
    if (str_browser == "nn"); {;
        window.captureEvents(Event.RESIZE);
        window.onresize = reloadDoc;
    }
}

function reloadDoc() {
    parent.location.reload();
}


// To be declared once!

var gOR_popup = new Object();
gOR_popup.OR_popupWindow = null;;
gOR_popup.bool_isModal = false;
gOR_popup.setProperties = function() {
    this.OR_popupWindow = null;
    this.bool_isModal = false;
}

//var newWin = null;
function OpenWindow(str_url, str_title, int_width, int_height, bool_menubar, bool_toolbar, bool_status, bool_resizeable, bool_scrollbars) {
    gOR_popup.setProperties();
    gOR_popup.bool_isModal = false;
    gOR_popup.OR_popupWindow = window.open(str_url, str_title, 'width=' + int_width + ',height=' + int_height + ',menubar=' + bool_menubar + ',toolbar=' + bool_toolbar + ',status=' + bool_status + ',resizeable=' + bool_resizeable + ',scrollbars=' + bool_scrollbars);
}


function OpenModalWindow(str_url, str_title, AA_args, int_width, int_height, int_top, int_left, bool_isCentered) {
    gOR_popup.setProperties();
    gOR_popup.bool_isModal = true;
    if (str_browser == "ie") gOR_popup.OR_popupWindow = this.showModalDialog(str_url, AA_args, ("'dialogWidth:" + int_width + ";dialogHeight:" + int_height + ";center:" + bool_isCentered + "'"))
    else {
        OpenWindow(str_url, str_title, int_width, int_height, 0, 0, 0, 0, 0);
        gOR_popup.OR_popupWindow.captureEvents(Event.BLUR);
        gOR_popup.OR_popupWindow.onblur = function() {
            gOR_popup.OR_popupWindow.focus();
        }
        //gOR_popup.OR_popupWindow.onblur = test;
    }
}


function pickStyleSheet() {
    if (navigator.appVersion.indexOf("Mac") != -1) {
        return "../css/ie_main.css";
    } else if (navigator.appVersion.indexOf("X11") != -1) {
        return "../css/ie_main.css";
    } else if (str_browser == "nn") {
        return "../css/nn_main.css";
    } else {
        return "../css/ie_main.css";
    }
}

function introspect(obj) {
    var prop;
    var content = "Properties key/vals:\n";

    for (prop in obj) {
        content += (prop + " = " + obj[prop] + '\n');
    }
    return content;
}

Object.prototype.isAnObject = isAnObject;
Object.prototype.isAnArray = isAnArray;
Object.prototype.isObjectAssigned = isObjectAssigned;

function isAnObject() {
    return (typeof this == "object") ? true : false;
}

function isAnArray() {
    return (typeof this == "object" && this.length >= 0) ? true : false;
}


function isObjectAssigned() {
    return (this.isAnObject() && this != null) ? true : false;
}


function changeElementContent(str_id, arb_content, str_state) {
    if (str_browser == "ie") eval(str_DOMDocument + "." + str_id + ".innerHTML = '" + arb_content + "'");
}


Array.prototype.setIndexToNull = setIndexToNull;

function setIndexToNull(int_index) {
    this[int_index] = null;
}


/******************************* String object functions *********************/
String.prototype.bool_isNull = bool_isNull;

function bool_isNull() {
    return (this == "null") ? true : false;
}

/******************************* Rollover Functions and Objects **************/
///////////////////
//
// Rollover Object
//
///////////////////

function rolloverObject(imageReference, normalState, rolloverState, rolloverText) {
    // Properties \\

    this.imageReference = imageReference;
    this.normalState = new Image();
    this.rolloverState = new Image();
    this.rolloverText = rolloverText;
    this.normalState.src = normalState;
    this.rolloverState.src = rolloverState;
}
rolloverObject.prototype.over = mouseOverCommand;
rolloverObject.prototype.out = mouseOutCommand;
rolloverObject.prototype.swapImage = swapImage;

function mouseOverCommand() {
    document.images[this.imageReference].src = this.rolloverState.src;
    setWindowStatus(this.rolloverText);

    return true; // Required for the window.status to change.
}

function mouseOutCommand() {
    document.images[this.imageReference].src = this.normalState.src;
    setWindowStatus(' ');

    return true; // Required for the window.status to change.
}


function setWindowStatus(str_text) {
    self.status = str_text; //set the status bar of the current window.
}

function swapImage(str_imageSrc, str_imageName) {
    document.images[this.imageReference].src = str_imageSrc;
    document.images[this.imageReference].name = str_imageName;
}


function swapContent(str_domId, str_state, int_top, int_left) {
    var str_domElement = (str_browser == "ie") ? (str_DOMDocument + "." + str_domId + ".style.") : (str_DOMDocument + "." + str_domId + ".");
    eval(str_domElement + "visibility=" + str_state);
    if (str_state == "show" || str_state == "hide") {
        eval(str_domElement + "top=" + int_top);
        eval(str_domElement + "left=" + int_left);
    }
}


// The increase() and decrease() functions will be assigned as events to all 
// 'Qty' text fields for integration.
function increaseFormTextFieldNumeric(formObj) {
    var currentValue = formObj.value;
    formObj.value = ((currentValue - 0) + 1);
}

function decreaseFormTextFieldNumeric(formObj) {
    var currentValue = formObj.value;
    if (currentValue > 0) formObj.value = ((currentValue - 0) - 1);
}

// Form/form element functions
// Pass in form.element(s) and iteration will set all to the empty string
function clearFormElementValues() {
    var A_elements;

    if (arguments[0].isAnArray()) // single argument passed in is an array of form elements.
    A_elements = arguments[0];
    else if (arguments.length >= 1) // 1+ form.element(s) passed in
    A_elements = arguments;

    for (var i = 0; i < A_elements.length; i++)
    A_elements[i].value = "";

    A_elements = null;
}


// Forces the form.element passed in to gain focus. Previous value will remain.
function forceFormElementFocus(formElement) {
    if (!formElement.focus()) formElement.focus();
}


function getFormattedRequestString(A_values, char_delimeter) {
    var str_values = "";
    for (var i = 0; i < A_values.length; i++)
    if (A_values[i] != null) str_values += (A_values[i] + char_delimeter)

    return str_values;
}


// returns array of numerics representing the positions
// of all elements of type 'typeofElement' in the form.elements array
function getFormElementTypePositions(OA_elementsArray, str_typeofElement) {
    var OA_arrayOfElementPositions = new Array();
    var length = OA_elementsArray.length;

    for (var i = 0, j = 0; i < length; i++)
    if (OA_elementsArray[i].type == str_typeofElement) {
        OA_arrayOfElementPositions[j] = i;
        j++;
    }
    return OA_arrayOfElementPositions;
}


function registerFormFieldsForEvents(OA_frmElements, str_action, R_eventFunction) {
    for (var i = 0; i < OA_formElements.length; i++) {
        eval("OA_frmElements[i]." + str_action + "= handler");
    } // end for loop
}


function handler(e) {
    if (str_browser == "ie") {
        e = window.event;
        eval(R_eventFunction);
        e.cancelBubble = true;
    } else if (str_browser == "nn") {
        if ((e.which - 0) == 13) {;
            // Will launch a seperate window
            eval(R_eventFunction);
        }
    } // end function def
}

function getRequestStringOneToMany(str_key, A_strValuesList, char_delimeter) {
    var str_commonVals = str_key;
    for (var i = 0, j = 0; i < A_strValuesList.length; i++) {
        if (A_strValuesList[i] != null) {
            str_commonVals += A_strValuesList[i];
            str_commonVals += (j < A_strValuesList.length - 1) ? char_delimeter : '';
            //str_commonVals += char_delimeter;
            j++;
        }
    }
    return str_commonVals;
}


function getRequestOneToOne(str_key, A_strValuesList, char_delimeter) {
    var str_commonVals = str_key;
    for (var i = 0, j = 0; i < A_strValuesList.length; i++) {
        if (A_strValuesList[i] != null) {
            str_commonVals += A_strValuesList[i];
            //str_commonVals += ( j < this.int_numEntries-1 ) ? char_delimeter : '';
            str_commonVals += char_delimeter;
            j++;
        }
    }
    return str_commonVals;
}

// takes an arbitrary value and assigns an object property
// that value 
function setObjectProperty(O_obj, str_objProperty, arb_val) {
    O_obj[str_objProperty] = arb_val;
}

//Close a popup
//On IE this actually closes the window. On Netscape the parent takes responsibility
//for closing this popup
//This was introduced for 2 reasons
//1. On Netscape 6.2 a submit followed by a close in the popup kills the request
//To solve this we close the popup in the parent frame on the OnUnload
//That however was erratic on IE where the onUnload is not called consistently
//2.To solve both issues we now close the popup for IE while leaving it open for the 
//parent to close in the case of Netscape
function closeSelf() {
    if (str_browser == "ie") {
        self.close();
    } else {
        //Do nothing
    }
}

function validateLength(str, l) {
    if (str.length <= l) return true;
    else return false;
}

function validateSearchForm(v) {
    var queryName = v.value;
    if (queryName == "") {
        alert("Please specify query string.");
        v.focus();
        return false;
    }

    var listStr = queryName.split(' ');

    for (var i = 0; i < listStr.length; i++) {
        if (listStr[i].charAt(0) == "*" || listStr[i].charAt(0) == "?") {
            alert('Search word cannot start with "*" or "?".');
            v.focus();
            return false;
        }
    }

    if (!validateLength(queryName, 256)) {
        alert("Please enter a search string less than 256 characters long.");
        v.focus();
        return false;
    }
    return true;
}

function resizeMiniList() {
    if (!document.getElementById('MiniList')) return;
    if (navigator.appName == "Microsoft Internet Explorer") {
        document.getElementById('MiniList').style.height = window.frames['MiniList'].document.body.scrollHeight;
    }
}

//-->

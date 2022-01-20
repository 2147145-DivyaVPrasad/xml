

var xmlDoc
var xmlFile ='newemployeexml.xml'

//function to load xml doc
function loadXML()
{
    var xmlReq = new XMLHttpRequest;
    xmlReq.onreadystatechange = function()
    {
        console.log(xmlReq.readyState)
        if((xmlReq.readyState == 4) && (xmlReq.status == 200))
        {
            //xml doc successfully retrieved
            console.log(xmlReq.readyState)

            xmlDoc = xmlReq.responseXML
            displayTable()
        }
    }
    xmlReq.open('GET',xmlFile, true)
    xmlReq.send()
}

//function to display html table from xml data
function displayTable()
{
    var i;
    var table = "<tr><th>EMP ID</th><th>FIRST NAME</th><th>LAST NAME</th><th>SALARY</th><th>MOBILE NO</th><th>EMAIL ID</th><th>Edit</th><th>Delete</th></tr>"

    var x = xmlDoc.getElementsByTagName("Employee")
    for (i = 0; i < x.length; i++)
    {
        table += "<tr><td>" +
            x[i].getElementsByTagName("Employee_id")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("Employee_fname")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("Employee_lname")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("Employee_salary")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("Employee_mob")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("Employee_email")[0].childNodes[0].nodeValue + "</td>" +
            
            "<td><span class='material-icons' onclick='editRecord(" +i+ ")'>edit</span></td>" +
            "<td><span class='material-icons' onclick='deleteRecord(" +i+ ")'>delete</span></td></tr>";
    }
    document.getElementById("table").innerHTML = table
}

//function to delete record from XML
function deleteRecord(i)
{
    y = xmlDoc.getElementsByTagName("Employee")[i]
    var id = y.getElementsByTagName("Employee_id")[0].childNodes[0].nodeValue
    var reply = confirm("Do you want to delete record? \nEMP ID: " + id)
    if(reply == true)
    {
        xmlDoc.documentElement.removeChild(y)
        console.log("Record deleted: " + id)
        displayTable()
    }
}



//function to add new record to xml
function addNewRecord()
{
    event.preventDefault()
    var i
    var details = []
    var x = document.getElementById("addRecordForm")
    var Patient = xmlDoc.createElement("Employee")
    details[0] = xmlDoc.createElement("Employee_id")
    details[1] = xmlDoc.createElement("Employee_fname")
    details[2] = xmlDoc.createElement("Employee_lname")
    details[3] = xmlDoc.createElement("Employee_salary")
    details[4] = xmlDoc.createElement("Employee_mob")
    details[5] = xmlDoc.createElement("Employee_email")
   

    for(i = 0; i < 6; i++)
    {
        details[i].appendChild(xmlDoc.createTextNode(x.elements[i].value))
        Patient.appendChild(details[i])
    }
    xmlDoc.documentElement.appendChild(Patient);
    console.log("Record added: " + x.elements[0].value)
    displayTable()
    closeForm()
}

loadXML();

function openForm() {
    document.getElementById("form_popup").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("form_popup").style.display = "none";
  }
var wert ='';
function loadDoc(xmlFile) 
{	
document.getElementById("example").innerHTML='';
document.getElementById("seminar").style.display="block";
document.getElementById("demo").style.display="inline";
document.getElementById("demo1").innerHTML='';
	//alert(xmlFile);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			//alert(this);
			//console.log('hhh');
			myFunction(this);			
		}
	};
	xhttp.open("GET", xmlFile, true);
	xhttp.send();
}
// to search in Seminare XML Data
function filter( obj )
{
	var search = obj.value.toLowerCase();
	//alert(search);
	var where = document.getElementsByClassName(obj.id);
	for( var i = 0; i < where.length; i++ )
	{
		if( where[i].innerHTML.toLowerCase().search( search ) == -1 )
			where[i].parentElement.style.display = 'none';
			//where[i].parentElement.style.visibility = 'hidden';
		else
			where[i].parentElement.style.display = '';
			//where[i].parentElement.style.visibility = '';
	}
}
// to display Seminare XML Data
function myFunction(xml) 
{
	var i;
	var xmlDoc = xml.responseXML;
	var table='<table><tr><th>ID</th><th>Title</th>';
	table += '<th>Beschreibung</th><th>Preis</th><th>kategorie</th><th></th></tr>';
	var x = xmlDoc.getElementsByTagName("seminar");
	//alert(x);
	for (i = 0; i <x.length; i++) 
	{
		var kat_id=x[i].getElementsByTagName("kategorie_id")[0].childNodes[0].nodeValue;
		
		//alert(kat_id);
		var kategoriName = loadkategori(kat_id); 
		//console.log("1 "+kategoriName);
		table += "<tr onclick = 'displaySeminar(this)'>" +
		'<td>' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '</td>' +
		'<td class="title">' + x[i].getElementsByTagName("titel")[0].childNodes[0].nodeValue +
		'</td>' +
		'<td>' + x[i].getElementsByTagName("beschreibung")[0].childNodes[0].nodeValue + '</td>' +
		'<td>' + x[i].getElementsByTagName("preis")[0].childNodes[0].nodeValue + '</td>' +		
		'<td class="kategoriName">' + kategoriName + '</td><td style="visibility: hidden">' +
		x[i].getElementsByTagName("kategorie_id")[0].childNodes[0].nodeValue + '</td></tr>';
		//alert(kategoriName);
	}
	table += '</table>';
	document.getElementById("demo").innerHTML = table;
}

function loadkategori(kat_id) 
{
	//alert(kat_id);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "data/kategorien.xml", false);
	xhttp.send();
	return (katFunction(xhttp.responseXML,kat_id));
		
	/*
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			//alert(this);
			//myFunction(this,kat_id);
			//console.log("2 "+);
			var wert = katFunction(this,kat_id);
			console.log("2 "+wert);			
			return(wert);			
		}
	};
	xhttp.open("GET", "data/kategorien.xml", true);
	xhttp.send();
	*/	
}

// to get Katigori name from kategorien XML Data
function katFunction(xmlDoc,kat_id)
 {
    var x, i;
	//alert(kat_id);
	//var xmlDoc = xml1Doc.responseXML;
    //xmlDoc = xml1.responseXML;
	var x = xmlDoc.getElementsByTagName("kategori");
	//alert(x.length);
	for (i = 0; i <x.length; i++) 
	{
		var xml_kat_id=x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
		//alert(xml_kat_id);
		if (kat_id==xml_kat_id)
		{
			//alert(x[i].getElementsByTagName("kategori_name")[0].childNodes[0].nodeValue);
			return(x[i].getElementsByTagName("kategori_name")[0].childNodes[0].nodeValue);
		}
	
	}
}

// to display the clicked Seminar Data
function displaySeminar(obj) 
{
	//alert(obj);
	var node = obj.childNodes;	
	document.getElementById("example").innerHTML =
		"Seminar Name: " + (node[1].innerHTML) +
		"<br>Beschreibung: " +	(node[2].innerHTML)+
		"<br>Katigori: " + (node[4].innerHTML) + 
		"<br>Preis: " + (node[3].innerHTML) +
		"<br>Katigori_ID: " + (node[5].innerHTML);
	var seminar_id = node[0].innerHTML;
	//alert(seminar_id);
	displayTeilnemher(seminar_id);
}

// to display nimmt_teil XML Data
function displayTeilnemher(seminar_id) 
{	
//document.getElementById("example").innerHTML='';
//document.getElementById("seminar").style.display="block";
//document.getElementById("demo").style.display="block";
	//alert(seminar_id);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			//alert(this);
			// console.log('hhh');
			getTeilnehmer(this,seminar_id);
			
		}
	};
	xhttp.open("GET", "data/nimmt_teil.xml", true);
	xhttp.send();
}

// to display nimmt_teil XML Data
function getTeilnehmer(xml,sem_id) 
{
	//alert(sem_id);
	var i;
	var xmlDoc = xml.responseXML;
	var table1='<table><tr><th>ID</th><th>Name</th></tr>';
	var x = xmlDoc.getElementsByTagName("nehmer");
	//alert(x);
	for (i = 0; i <x.length; i++) 
	{
		//alert(i);
		//alert(x.length);
		//alert(x[i].getElementsByTagName("seminar_id")[0].childNodes[0].nodeValue);
		if(sem_id == x[i].getElementsByTagName("seminar_id")[0].childNodes[0].nodeValue)
		{		
			//alert(kat_id);
			//console.log("1 "+i);
			table1 += '<tr><td>' + x[i].getElementsByTagName("seminar_id")[0].childNodes[0].nodeValue +
			'</td><td>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
			'</td></tr>';
			//alert(table);
		}
	}
	table1 += '</table>';
	document.getElementById("demo1").innerHTML = table1;
}


function loadXMLDoc(filename)
{
if (window.ActiveXObject)
  {
  xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  }
else 
  {
  xhttp = new XMLHttpRequest();
  }
xhttp.open("GET", filename, false);
try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
xhttp.send("");
return xhttp.responseXML;
}
// to display Katigorien XML Data
function displayResult()
{
// alert("hallo");
document.getElementById("example").innerHTML ="";
document.getElementById("example").style.display="block";
document.getElementById("seminar").style.display="none";
document.getElementById("demo").innerHTML ="";
document.getElementById("demo1").innerHTML ="";
xml = loadXMLDoc("data/kategorien.xml");
xsl = loadXMLDoc("data/xsl_choose.xsl");
// code for IE
if (window.ActiveXObject || xhttp.responseType == "msxml-document")
  {
  ex = xml.transformNode(xsl);
  document.getElementById("example").innerHTML = ex;
  }
// code for Chrome, Firefox, Opera, etc.
else if (document.implementation && document.implementation.createDocument)
  {
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(xml, document);
  document.getElementById("example").appendChild(resultDocument);
  }
}


// display SVG design 
function displaySVG()
{
	document.getElementById("example").innerHTML ="";
	document.getElementById("example").style.display="block";
	document.getElementById("seminar").style.display="none";
	document.getElementById("demo").style.display="none";
	document.getElementById("demo1").innerHTML ="";
	var xmlhttp, xmlDoc;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "bilder/svg1.svg", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseText;
	document.getElementById("example").innerHTML = xmlDoc;
}
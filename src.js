 function loadDoc(url) {
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes="+"age,gender", true);
  xhttp.setRequestHeader("Content-Type","application/json");
  xhttp.setRequestHeader("Ocp-Apim-Subscription-Key","3451255c43764662bb3fcacef2e66e14");


  xhttp.onreadystatechange = function() {
    
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    console.log(status);
     var js = JSON.parse(xhttp.responseText);
     var Gender = js[0].faceAttributes.gender;
     var Age = js[0].faceAttributes.age;
     var bookTitle = SearchValue(Gender , Age);
     setTimeout(GoogleBooks(bookTitle),500);
    
    }
    
  };
  data = '{"url": "' + url +'"}'   
  //console.log(data);                                                                
 // data = '{"url": "http://dreamicus.com/data/face/face-06.jpg"}';

  xhttp.send(data);



};


  function SearchValue(gen ,age){
  	var BookTitle1 ;
  	var BookTitle2 ;
       if (gen == "male" && age <= 15) {BookTitle1 = "adventure";BookTitle2 ="Dictionaries";} 
     else if (gen == "male" && age > 15 && age <=20) {BookTitle1 = "mystery"; BookTitle2 ="comics";} 
       else if (gen == "male" && age > 20 && age <=30) {BookTitle1 = "Travel"; BookTitle2 ="Education";} 
       	else if (gen == "male" && age > 30 && age <= 50) {BookTitle1 = "Health" ; BookTitle2="fantasy";} 
       		else if (gen == "female" && age <=15 ) {BookTitle1 = "fantasy"; BookTitle2="Art";} 
       			else if (gen == "female" && age > 15 && age <=20) {BookTitle1 = "Romance"; BookTitle2="Drama";} 
       			else if (gen == "female" && age > 20 && age <=30) {BookTitle1 = "Cookbooks"; BookTitle2="Romance";}
       				else if (gen == "female" && age > 30 && age <= 50) {BookTitle1= "Health"; BookTitle2="Poetry";} 
       return [BookTitle1 ,BookTitle2];
  }


function GoogleBooks(arrayoftypes){

var myRequest = new XMLHttpRequest();
var param = arrayoftypes[0]+"+"+arrayoftypes[1];
var maxResults = 10;

myRequest.onreadystatechange = function() {
if (myRequest.readyState === 4 && myRequest.status === 200) {
// console.log(myRequest.responseText);


var results = myRequest.responseText;

results = JSON.parse(results);
var ar = results.items;
var booksNum ;
 var BookInformation ;
for ( booksNum = 0; booksNum < ar.length ; booksNum++) {
	 var BookAuther = "";
     BookInformation = ar[booksNum].volumeInfo;
	 //var BookInformation = ar[booksNum].volumeInfo;
     for(var i = 0 ; i < BookInformation.authors.length ;i++ ){
	    if(BookAuther == ""){
	       BookAuther =  BookInformation.authors[i];
        
	     } 
	     else {
		    BookAuther =  BookAuther +" & " + BookInformation.authors[i];
       
	     }
     }
var table = document.getElementById("myTable1");
var row = table.insertRow(booksNum);

var Booktit = BookInformation.subtitle +", "+BookInformation.title;
Booktit = Booktit.replace("undefined" , "");
var cell1 = row.insertCell(0);
cell1.innerHTML = Booktit;

var BooktImage = BookInformation.imageLinks.thumbnail;
var cell2 = row.insertCell(1);
cell2.innerHTML = "<a href="+BooktImage +" target ='_blank'>Book Image</a>";
var cell3 = row.insertCell(2);
cell3.innerHTML = BookAuther;
var BooktPreview = BookInformation.previewLink;
var cell4 = row.insertCell(3);
cell4.innerHTML = "<a href="+BooktPreview +" target ='_blank'>Book preview</a>";

console.log(BookAuther);

//console.log(Booktit);
//console.log(BooktImage);
//console.log(BooktPreview);

}



console.log(BookAuther);
//console.log(Booktit);
//console.log(BooktImage);
//console.log(BooktPreview);
//console.log(results.items);
//console.log(BookInformation);

// for(var i in results.genres){
// }
}
};
myRequest.open("GET", "https://www.googleapis.com/books/v1/volumes?q="+param+"&maxResults="+maxResults, true);
myRequest.send();
}


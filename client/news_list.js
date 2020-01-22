var news_list = document.getElementById("list_section");
var select_language_filter = document.getElementById("select_language_filter");
var select_category_filter = document.getElementById("select_category_filter");
var keyword_filter = document.getElementById("keyword_search_filter");
var submit_btn = document.getElementById("submit_filter");
var order_selector = document.getElementById("order_by_selector");
var fake_news_button = document.getElementById("fake_news_button");

var rest_url_request;
var apikey = "fe58f34f6b704b9fb65352fb072a2f1a";
//0 is for the normal news api, 1 for the api created by myself
var state_of_page = 0; 


$(document).ready(function () {
	/*state_of_page = sessionStorage.getItem('state_of_page');
	if(state_of_page == 1){
		switchToFakeNewsMood();
	}else{
		switchToNormalMood();
	}*/
	buildRestURL();
	loadCategoryList();
	//load back the state of the site
})

/*
 *	load the list ofn news based on the response given by the api
 *  this method is completely independent from the nature of rest request,
 *  it send an httpXMLrequest to the url in param: rest_url_request and load the results 
 *  in a list of items created programmatically
 */
function loadCategoryList(){
	
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
         alert('Giving up :( Cannot create an XMLHTTP instance');
         return false;
    }
    httpRequest.onreadystatechange = alertCategoryList;
    httpRequest.open("GET", rest_url_request);
    httpRequest.send();
	
    function alertCategoryList(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status == 200) {
                var jsonData = JSON.parse(httpRequest.responseText);
				var resource = jsonData['articles'];

				if(resource.length==0){
				   alert("Zero notizie trovate con questi parametri");
				   return false;
				}
				
				//for each news create an item, load the parameters and insert in the list
				for (var i = 0; i < resource.length; i++) {
	
					var counter = resource[i];
					
					var single_element = $( "#single_item" ).clone(true);
					single_element.find("#title").text(counter.title);
					single_element.find("#author").text(counter.author);
					single_element.find("#source").text(counter.source.name);
					//set the id of the cloned elment 
					//in order to understand which item of the list is clicked
					single_element.attr('new_id',i); 
					single_element.on('click',function () {
						sessionStorage.setItem('item_details', JSON.stringify(resource[jQuery(this).attr('new_id')]));
						sessionStorage.setItem('state_of_page', state_of_page);
						window.location.href = "news_detail.html";
					});
					single_element.appendTo( "#list_section" );			
				}		
				
				var first_div = document.getElementById('single_item');
				first_div.style.display = 'none';
            }
            else{
                alert("there was some problems loading the page");
            }
        }
     }
  }

/*
 * build the url based on the filters that the user insert
 */
function buildRestURL(){
	
	rest_url_request = "https://newsapi.org/v2/top-headlines?";
	
	//NEWS SEARCH WITH TEXT FIELD
	//default value of keyword is bitcoin
	var keyword = keyword_filter.value;
	if(keyword != ""){
		rest_url_request = rest_url_request + "q=" + keyword + "&";
	}
	
	//LANGUAGE SELECTION
    var selected_language = select_language_filter.options[select_language_filter.selectedIndex].value;
    if (selected_language != "non")
   	{
    	rest_url_request = rest_url_request + "country=" + selected_language + "&";
   	}
	else{
    	rest_url_request = rest_url_request + "country=us&";
	}
	
	//CATEGORY SELECTION
	var selected_category = select_category_filter.options[select_category_filter.selectedIndex].value;
	if (selected_category != "non")
   	{
		rest_url_request = rest_url_request + "category=" + selected_category + "&";
   	}
	
	//ORDER BY FILTER
	var order_criteria = order_selector.value;
	if(order_criteria!="non"){
		//rest_url_request.replace("top-headlines", "everything");
	    rest_url_request = rest_url_request + "sortBy=" + order_criteria + "&";
		//alert(rest_url_request);
	}
	
	//set apikey
	rest_url_request = rest_url_request + "pageSize=100&apiKey=" +apikey;
}

/*
 ********************************	LISTENERS	****************************************
 */
/*
 * depending on the cases, this method listener change the layout of the website and load the 
 * right list.
 */
fake_news_button.addEventListener("click", function(){ 
	if(state_of_page == 0){
		rest_url_request = "http://bettypower.it/fake_news_api/api/news/read.php";
		clearList();
		loadCategoryList();
		changeWebsiteState();
		state_of_page = 1;
	}
	else{
		updateData();
		changeWebsiteState();
		state_of_page = 0;
	}
}); 

/*
 *	update the data to get them in order
 */
order_selector.addEventListener("change", function() {
	
    if(order_selector.value != "non" && state_of_page == 0)
    {
			updateData();
    }

});

/*
 *	
 */
submit_btn.addEventListener("click", function(){ 
	if(state_of_page == 0){
	   	updateData();
	}else{
		alert("I filtri per le fake news non sono ancora implementati...");
	}
	
}); 

/*
 ********************************	UTILS	****************************************
 */

/*
 * when the fake news button is pressed the site layout change
 * this method change the layput of the page and the behaviour of some input fields
 */
function changeWebsiteState(){
	//switch to fake news mood
	if(state_of_page == 0){
	   	switchToFakeNewsMood();
	}
	//switch to normal mood
	else{
		switchToNormalMood();
	}
}

/*
 * change the layout of the page to red
 * this indicate that you are looking the API created by Giulio Pette
 */
function switchToFakeNewsMood(){
	fake_news_button.style.background = "#34495E";
	fake_news_button.style.borderColor = "#34495E";
	fake_news_button.innerHTML = "News API";
	order_selector.style.backgroundColor = "#C0392B";
	submit_btn.style.background = "#C0392B";
	document.getElementById("main_titile").style.background = "#C0392B";
	document.getElementById("title").style.color = "#C0392B";
	document.getElementById("title_of_page").innerHTML = "Fake News List";
	document.getElementById("pagination").style = "display:none";
}

/*
 *	change the layout of the page to blue which correspond to the normal mood
 *  this indicate that you are looking the official API
 */
function switchToNormalMood(){
	fake_news_button.style.background = "#C0392B";
	fake_news_button.style.borderColor = "#C0392B";
	fake_news_button.innerHTML = "Fake News";
	order_selector.style.backgroundColor = "#34495E";
	submit_btn.style.background = "#34495E";
	document.getElementById("main_titile").style.background = "#34495E";
	document.getElementById("title").style.color = "#34495E";
	document.getElementById("title_of_page").innerHTML = "News List";
	document.getElementById("pagination").style = "visible";
}

/*
 * in order to update the data in the list, you firstly need to clear it,
 * this method clear the list by delating all the elemnts except one,
 * the remaining element will be used for populating the list again
 */
function clearList(){
	var div = document.getElementById("list_section");
	while(div.childElementCount >1){
    	div.removeChild(div.firstChild);
	}
	//restore the Loading...
	document.getElementById("title").innerHTML = "Loading...";
	document.getElementById("author").innerHTML = "Loading...";
	document.getElementById("source").innerHTML = "Loading...";
}

/*
 * THIS M
 */
function updateData(){
	buildRestURL();
	//in order to refresh you first need to clear the old content
	clearList();
	loadCategoryList();
}


var content = sessionStorage.getItem('item_details');
var state_of_page = sessionStorage.getItem('state_of_page');
var jsonData = JSON.parse(content);

document.getElementById("news_image").src = jsonData.urlToImage;
document.getElementById("news_detail_title").innerHTML = jsonData.title;
document.getElementById("news_detail_description").innerHTML = jsonData.description;
document.getElementById("news_detail_content").innerHTML = jsonData.content;
document.getElementById("news_detail_date").innerHTML = '"' + jsonData.publishedAt + '"';
document.getElementById("news_detail_author").innerHTML = jsonData.author;
document.getElementById('news_detail_link').href = jsonData.url;
document.getElementById('news_detail_link').innerHTML = jsonData.source.name;

//if it is a fake news the title will be red
if(state_of_page == 1){
   document.getElementById("news_detail_title").style.color = "red";
}



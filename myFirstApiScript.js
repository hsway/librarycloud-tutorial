// Do the search
function doSearch(){

	var searchbx = document.getElementById("searchbox"); // get the searchbox
	var searchterm = searchbx.value; // get the search term

	// if it's blank, give up
	if (searchterm == ""){
		alert("Enter a search term"); // put up an explanation for the user
		return; // jump out of this funciton
	}

	// Do the API call
	$.ajax({
	        url: 'http://api.lib.harvard.edu/v2/items.dc.json',
	        type: 'GET',
	        data: {q : searchterm},
	        success: function(r){
	        // alert(JSON.stringify(r));
	        displayResults(r);
	        },
	        error: function(e){
	            alert("Something went wrong: " + e);
	        }
	});
} // end doSearch function

// display the results of the query
function displayResults(results){

	// get the div where the results will be shown
	var showdiv = document.getElementById("resultsdiv");

	// empty that div of its current contents
	showdiv.innerHTML = "";

	var titleInfo, title, authorInfo, author; // create a variable or two

	// cycle through each of the elements of the results array
	for (i=0; i< results.items.dc.length; i++){
		// get the author
		authorInfo = results.items.dc[i].creator;
		// if no "creator", look for a "contributor"
		if (authorInfo == undefined){
			authorInfo = results.items.dc[i].contributor;
		}
		// if there was no author key, provide some helpful content
		if (authorInfo == undefined){
			authorInfo = "[No author listed]";
		}
		// is it an array?
		if ($.isArray(authorInfo)){
			author = authorInfo.join("; ");
		}
		else { // if it's not an Array
			author = authorInfo;
		}

		// get the title
		titleInfo = results.items.dc[i].title;
		// if there was no title key, provide some helpful content
		if (titleInfo == undefined){
			titleInfo = "[No title listed]";
		}
		// is it an array?
		if ($.isArray(titleInfo)){
			title = titleInfo.join(" - ");
		}
		else { // if it's not an Array
			title = titleInfo;
		}

		// create a new div for the title and add it to the page
		var currentcontent = showdiv.innerHTML;
		showdiv.innerHTML = currentcontent + "<div class='oneresult'><span class='titleclass'>" + title + "</span>, by <span class='authorclass'>" + author + "</span></div>";

	} // end of for loop

} //end displayResults function
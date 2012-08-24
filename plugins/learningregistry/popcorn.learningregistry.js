(function (Popcorn) {
       Popcorn.plugin( "learningregistry" , {
         _setup : function( options ) {
            // setup code, fire on initialization
            // options refers to the options passed into the plugin on init
            // this refers to the popcorn object
        	 
         },
         start: function( event, options ){
            // fire on options.start
            // event refers to the event object
            // options refers to the options passed into the plugin on init
            // this refers to the popcorn object
        	 console.log(JSON.stringify(options));
        	 if(options.keyword && options.target) {
	        	 Popcorn.xhr({
	        		  
	        		        url: "http://alpha.mimas.ac.uk/slice?any_tags="+ options.keyword +"&callback=jsonp",
	        		        dataType: "jsonp",
	        		        success: function( data ) {
	        		        	var target = document.getElementById(options.target);
	        		        	if(target && data && data.documents) {
	        		        		target.innerHTML = "";
	        		        		var size = data.documents.length;
	        		        		if(options.limit && size > options.limit) {
	        		        			size = options.limit;
	        		        		}
	        		        		var ul=document.createElement("ul");
	        		        		ul.className="learning-registry-ul";
	        		        		target.appendChild(ul);
	        		        		for (var i = 0; i < size; i++) {

	        		        		//Popcorn.forEach( data.documents, function( value, key, item ) {
	        		        			var value = data.documents[i].resource_data_description;
	        		        			
	        		        			var li=document.createElement("li");
	        		        			li.className="learning-registry-li";
	        		        			ul.appendChild(li);
	        		        			
	        		        			var childUl=document.createElement("ul");
	        		        			childUl.className="learning-registry-ul";
	        		        			li.appendChild(childUl);
	        		        			
	        		        			var childLi=document.createElement("li");
	        		        			childLi.className="learning-registry-li";
	        		        			childUl.appendChild(childLi);
	        		        			
	        		        			var link = document.createElement("a");
	        		        			link.setAttribute("href", value.resource_locator);
	        		        			link.setAttribute("target", "_blank");
	        		        			link.innerHTML = value.resource_locator;
	        		        			childLi.appendChild(link);
	        		        			
	        		        			if(value.keys) {
	        		        				var keys=document.createElement("span");
	        		        				var textEle = document.createTextNode(value.keys.join(", "));
	        		        				keys.className = "learning-registry-span";
	        		        				keys.appendChild(textEle);
	        		        				childLi.appendChild(keys);
	        		        			}
	        		        		//});
	        		        		}
	        		        	}
	        		          /*
	        		            `data` will be the parsed json object
	        		  
	        		          */
	        		       }
	        	 });
        	 }
         },
         end: function( event, options ){
        	 if(options.cleanupAtEnd) {
	        	 var target = document.getElementById(options.target);
	        	 if(target) {
	        		 target.innerHTML = "";
	        	 }
        	 }
            // fire on options.end
            // event refers to the event object
            // options refers to the options passed into the plugin on init
            // this refers to the popcorn object
         },
         frame: function( event, options ) {
              // when frameAnimation is enabled, fire on every frame between start and end
              // event refers to the event object
              // options refers to the options passed into the plugin on init
              // this refers to the popcorn object
         },
         toString: function( event, options ) {
            // provide a custom toString method for each plugin
            // defaults to return start, end, id, and target
            // event refers to the event object
            // options refers to the options passed into the plugin on init
            // this refers to the popcorn object
         } 
       });
})(Popcorn);
/**
 * @fileoverview
 * Defines the Standardtext plugin.
 * @author choward
 */
CKEDITOR.plugins.add('standardtext',
{
	lang:['en'], // add languages here - each language must have a corresponding language file in the lang folder
	init: function( editor )
	{
	  if(typeof(standardTexts) != "undefined" ){
		if(standardTexts != null){
		editor.addCommand( 'standardtextDialog', new CKEDITOR.dialogCommand( 'standardtextDialog' ) );
		editor.ui.addButton( 'StandardText',
		{
			label:  editor.lang.standardtext.standardtext.buttonLabel,
			command: 'standardtextDialog',
			icon: this.path + 'images/icon_replace.gif'
		} );

		window['backFromGetStandardtextItem'] = function (theStandardtext,theDialog) {
			updateHTML(theStandardtext,theDialog);
		};

		CKEDITOR.dialog.add( 'standardtextDialog', function( editor )
		{
			// create an array of filter items for the filter dropdown
			// param: theFilters - an array containing all of the current findings 
			// param: theFilter - a finding item containing the label and id
			insertFilter= function(theFilters,theFilter){
				var found = false;
				var i = 0;
				// Make sure we haven't already got this one - we only want it listed once
				for(i = 0; i < theFilters.length; i++){
					if(theFilters[i][1] == theFilter.value){
						found = true;
						break;
					}
				}
				if(!found){
					//this is a new one so add it to the list
					theFilters.push([theFilter.label,theFilter.value]);
					
					// and sort the list by label
					theFilters.sort(function(a,b){
						return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
					});
					
				}
			};
			// create a filtered list of items for the items dropdown
			// param: theItems - an array containing all of the current findings 
			// param: theItem - a standard text item containing the label and id
			// param: theDialog - the standard text dialog object containing the controls
			insertItem = function(theItems,theItem,theDialog){
				var found = false;
				var i = 0;
				// Make sure we haven't already got this one - we only want it listed once
				for(i = 0; i < theItems.length; i++){
					if(theItems[i] == theItem.id){
						found = true;
						break;
					}
				}
				if(!found){
					// add it to the dropdown
					theDialog.getContentElement( 'general', 'stditems' ).add(theItem.title,theItem.id);
					// put it in the list to stop duplicates
					theItems.push(theItem.id);
				}
				return theItems;
			};
			// display the standard text for the selected item
			// param: theItemID - a standard text item containing the text to be displayed
			// param: theDialog - the standard text dialog object containing the controls
			displayText= function(theItemID, theDialog){
				var index = 0;
				var stdtext = standardTexts.getStandardtext();
				if(theItemID == "0"){
					// this is the blank selection so clear the panel
					theDialog.getContentElement( 'general', 'contents' ).setValue('');
					clearHTML(theDialog);					
				}else{
					// search the standard text items for the matching id
					for (index = 0; index < stdtext.length; index++){
						if( stdtext[index].id == theItemID){	
							if(stdtext[index].text == ""){
								// not yet loaded, so go and get it
								updateHTML(editor.lang.standardtext.standardtext.loadingText,theDialog);	
								standardTexts.getStandardtextItem(stdtext[index].title,theDialog);
							}else{
								// we have it, so save it and display it				
								updateHTML(stdtext[index].text,theDialog);	
								 break;
							}
						}
					}
				}
			};
			// Filter the standard text items using the selected finding
			// param: theFilterID - a finding item id to use as a filter
			// param: theDialog - the standard text dialog object containing the controls
			filterText= function(theFilterID, theDialog){
				var index = 0, item = 0;
				// clear the standard text dropdown
				theDialog.getContentElement( 'general', 'stditems' ).clear();
				theDialog.getContentElement( 'general', 'stditems' ).add(" ","0");
				//clear the selected text
				theDialog.getContentElement( 'general', 'contents' ).setValue("");
				clearHTML(theDialog);	
				var stdtext = standardTexts.getStandardtext();
				var theItems = [];
				for (index = 0; index < stdtext.length; index++){
					if(stdtext[index].activeFindings != null){
						for (item = 0; item < stdtext[index].activeFindings.length; item++){
							// if no filter selected then insert all of them
							if(theFilterID == "0"){
								theItems = insertItem(theItems,stdtext[index],theDialog);
							}else{
								// check if the finding is active
								if( stdtext[index].activeFindings[item].finding.value == theFilterID){	
									// it is so insert it
									theItems = insertItem(theItems,stdtext[index],theDialog);
									 break;
								}
							}
						}
					}else{
						// no findings assigned to this item - but still show it if no filter is selected
						if(theFilterID == "0"){
							theItems = insertItem(theItems,stdtext[index],theDialog);
						}				
					}
				}
			};
			// Update the Preview display panel
			// param: theText - a text to be displayed
			// param: theDialog - the standard text dialog object containing the controls
			updateHTML = function (theText,theDialog){
				var document = theDialog.getElement().getDocument();
				var element = document.getById( 'mcckeContent'+editor.element.getId() );
				if ( element ){
					theDialog.getContentElement( 'general', 'contents' ).setValue(theText);
					element.setHtml(theText);
				}
			}
			// Clear the standard display panel
			// param: theDialog - the standard text dialog object containing the controls		
			clearHTML = function (theDialog){
				var document = theDialog.getElement().getDocument();
				var element = document.getById( 'mcckeContent'+editor.element.getId() );
				if ( element ){
					element.setHtml('');
				}
			}
			///////////////////////////////////////////////////////////////////////////////////////////////////////
			// load the findings into the filter dropdown
			var index,index2;
			var textitems = [];
			var filteritems = [];
			filteritems.push([" ","0"]);
			textitems.push([" ","0"]);
			var stdtext = standardTexts.getStandardtext();
			for (index = 0; index < stdtext.length; index++){
				textitems.push([stdtext[index].title,stdtext[index].id]);
				if(stdtext[index].activeFindings != null){
					for (index2 = 0; index2 < stdtext[index].activeFindings.length; index2++){
						insertFilter(filteritems,stdtext[index].activeFindings[index2].finding);
					}
				}
			}
			// layout the controls
			return {
				title : editor.lang.standardtext.standardtext.title,
				minWidth : 600,
				minHeight : 400,
				contents :
				[
					{
						id : 'general',
						label : 'Settings',
						elements :
						[
							{
								type : 'html',
								className : 'inputLabel',
								html : editor.lang.standardtext.standardtext.headerLabel		
							},
							{
								type : 'select',
								id : 'filteritems',
								label : editor.lang.standardtext.standardtext.filterLabel,
								className : 'form-group',
								onChange : function( data )
								{
									filterText(this.getValue(),this.getDialog());					
								},

								items : filteritems,
								enable : true
							},
							{
								type : 'select',
								id : 'stditems',
								label : editor.lang.standardtext.standardtext.itemLabel,
								className : 'form-group',
								onChange : function( data )
								{
									displayText(this.getValue(),this.getDialog());							
								},

								items : textitems,
								enable : true
							},
							{
								type : 'html',
								className : 'inputLabel',
								html : '<p>'+ editor.lang.standardtext.standardtext.previewLabel +'</p><div id="mcckeContent'+editor.element.getId()+'" class="mcckeDiv"></div>'		
							},
							{
								type : 'textarea',
								id : 'contents',
								label : 'Displayed Text',
								validate : CKEDITOR.dialog.validate.notEmpty( editor.lang.standardtext.standardtext.notEmptyMessage ),
								required : true,
								style : 'display:none;',
								commit : function( data )
								{
									data.contents = this.getValue();
								}
							}				
						]
					}
				],
				onOk : function()
				{
					var dialog = this,
						data = {},
					mytext = editor.document.createElement( 'p' );
					this.commitContent( data );
					mytext.setHtml( data.contents );
					// Insert the selected text into the editor control 
					editor.insertElement( mytext );
				},
				onShow : function(e)
				{
					// if we have a finding set then pre-set the filter
					if($("#findingFinding option:selected").val() != null){
						this.getContentElement( 'general', 'filteritems' ).setValue($("#findingFinding option:selected").val(),false);
					}
					// If there is just a 'blank' entry with no findings available, use it
					if ((this.getContentElement( 'general', 'filteritems' ).items.length == 1) && 
						(this.getContentElement( 'general', 'filteritems' ).items[0][1] == "0")) {
						filterText("0",this);
					}
					$("table.cke_dialog").css("z-index","999999");
					$("table.cke_dialog").find("tr").addClass("noHover");
				}
			};
		}); //add
		
	}} // if
	}//init


});	

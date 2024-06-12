/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.extraPlugins = 'standardtext';
	config.toolbar = 'BasicMC';
	config.disableNativeSpellChecker = false;
	config.fontSize_sizes = '8/8pt;9/9pt;10/10pt;10.5/10.5pt;11/11pt;12/12pt;14/14pt;16/16pt;18/18pt;20/20pt;22/22pt;24/24pt;26/26pt;28/28pt;36/36pt;48/48pt;72/72pt;';
	config.pasteFromWordRemoveFontStyles=false;
	config.toolbar_BasicMC =
	[
	    ['Bold','-','Italic','-','Underline','-','Strike','-','Subscript','-','Superscript'],
	    ['BGColor','-','TextColor'],
	    ['NumberedList','-','BulletedList'],
	    ['Format','-','Font','-','FontSize'],
	   	['RemoveFormat'],
		['Table','-','SpecialChar','Find'],
	    ['StandardText']
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';
	config.toolbarCanCollapse = true;
	config.toolbarStartupExpanded = true;

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.font_names =
    'Helvetica, Arial, sans-serif;' +
    'Times New Roman/Times New Roman, Times, serif;' +
    'Verdana;MS Gothic;Century;MS Mincho;MS PGothic';

	config.entities = false;
};

CKEditor 4 - Notes for MasterControl Developers
===============================================

This version of CKEditor was generated from https://ckeditor.com/cke4/builder
as a "FULL" installation with all plugins, the "Moono" skin and all languages.
The generated code is modified for our needs as follows:

## config.js

 1. References our custom plugin "StandardText" for Audit module
 2. Specifies a toolbar layout
 3. Specifies specific allowable font names, sizes, and formats

## ckeditor.js

 1. To allow Webdriver testing and other javascript functions access
   to CKEditor controls, the source javascript has this added line of
   code to give ID attributes to CKEditor iframes:

   After the line:
      g.addClass("cke_wysiwyg_frame").addClass("cke_reset");

   add the following:
      g.setAttribute("id","ckeditor_"+a.name+"_frame");

 2. Removed a section of code calling 
   https://cke4.ckeditor.com/ckeditor4-secure-version/versions.json
   because calls to outside sites are restricted in some areas
   where our software is used

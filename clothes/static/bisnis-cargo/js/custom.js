function autocomplet_set_google_autocomplete(){jQuery(input_fields).each(function(){let e=new google.maps.places.Autocomplete(this);e.addListener("place_changed",function(){e.getPlace();jQuery(input_fields).trigger("change")})})}jQuery(window).on("load",function(){autocomplet_set_google_autocomplete()});
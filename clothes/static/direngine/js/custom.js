function openWA(number, initial_text) {
    //var number = document.getElementById("waNumber").value;
    //if (isMobile()=="true")
    // initial_text: Hai, Saya ada pertanyaan tentang cara membuat website di https://authbox.web.id/
    console.log('number',number);
    window.open("https://api.whatsapp.com/send?phone="+ number +"&text=" + initial_text,"_blank");
    //else
    //   alert("This link will open Whatsapp on android");
 }

 $(document).on("ready", function() {
    /*[ Back to top ]*/
    try {
        var windowH = $(window).height()/2;

        $(window).on('scroll',function(){
            if ($(this).scrollTop() > windowH) {
                $("#myBtn").addClass('show-btn-back-to-top');
            } else {
                $("#myBtn").removeClass('show-btn-back-to-top');
            }
        });

        $('#myBtn').on("click", function(){
            $('html, body').animate({scrollTop: 0}, 300);
        });
    } catch(er) {console.log(er);}
    
 });
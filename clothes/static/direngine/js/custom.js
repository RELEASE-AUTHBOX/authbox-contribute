function openWA(number, initial_text) {
    //var number = document.getElementById("waNumber").value;
    //if (isMobile()=="true")
    // initial_text: Hai, Saya ada pertanyaan tentang cara membuat website di https://authbox.web.id/
    console.log('number',number);
    window.open("https://api.whatsapp.com/send?phone="+ number +"&text=" + initial_text,"_blank");
    //else
    //   alert("This link will open Whatsapp on android");
 }
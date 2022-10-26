

//Change color of purple buttons
$(".purpleBtn").mouseover(function() {

    gsap.to(this, { backgroundColor: "#FFFFFF", color: "#210082", duration: .3});

});


$(".purpleBtn").mouseout(function() {

    gsap.to(this, { backgroundColor: "#210082", color: "#FFFFFF", duration: .3});

});



//Change color of purple nav buttons and hamburger icon
$(".navBtn, .hamburgerMenu").mouseover(function () {

    gsap.to(this, { color: "#E5AC49", duration: .3 });

});

$(".navBtn, .hamburgerMenu").mouseout(function () {

    gsap.to(this, { color: "#FFFFFF", duration: .3 });

});



//Scroll down to contact form when they click button on top of main image
$(".imageBtn").click(function () {

    $(".contactFormRow")[0].scrollIntoView({ behavior: 'smooth' });
  

});



//Code for when they submit the form
$('form[name=contactForm]').submit(function (e) {
    e.preventDefault();

    //Send the info to the airtable database
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'key9C2IN2GPW2OJ1z' }).base('appOFm2WWDsJnPX8Q');

    //Variables to store info in contact form
    let userName = $("#firstName").val() + " " + $("#lastName").val();
    let email = $("#email").val();
    let zipCode = $("#zipCode").val();
    let state = $("#state").val();

    base('Entries').create([
        {
            "fields": {
                "Name": userName,
                "Email": email,
                "Zip Code": zipCode,
                "State": state
            }
        }

    ], function (err, records) {

        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });



    });

    //Hide the contact form, and show the feedback
    $(".contactForm").css("display", "none");
    $(".contactTitle").css("display", "none");
    $(".feedbackText").css("display", "block");

    gsap.fromTo(".feedbackText", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });



});



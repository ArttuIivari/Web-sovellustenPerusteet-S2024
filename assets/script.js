
function myFunction(){
let x = 3;
    switch(x){
        case 0:
            document.getElementById("demo").innerHTML = "TSUKKEELIS";
            break;
        case 1:
            document.getElementById("demo").innerHTML = "Hello JavaScript!";
            break;
        default:
            break;
    }
 

};
window.onload = function () {
    setTimeout(function () {
        alert("Hello guys!");
    }, 2000);

};
document.querySelector("#p1").innerHTML = "Hello";

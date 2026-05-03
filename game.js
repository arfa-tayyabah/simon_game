let buttons;
function press_button(key) {
    const btn = buttons[key];
    if(btn){
        btn.classList.add('active');
        btn.click();
        setTimeout(() => {
            btn.classList.remove('active');
        }, 100);
    }
}
function generate_color(){
    let num = Math.floor(Math.random() * 4);
    press_button(num);
}
document.addEventListener('DOMContentLoaded', function(){
    buttons = document.querySelectorAll('button');
    generate_color();
});
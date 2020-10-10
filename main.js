/* to-do:
-Navbar response to users postion, therefore if user viewport is at section X then the corresponding X will be hovered inside the navbar a.k.a tracking users positon
*/

// Checking if element is visible
function checkViewPort(el) {
    if (el.classList.contains("hidden")){
        return false;
    }
    else{
        const check = el.getBoundingClientRect();
        return (
            check.top >= 0 &&
            check.left >= 0 &&
            check.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            check.right <= (window.innerWidth || document.documentElement.clientWidth)
    
        );
    }
}
async function typingAnimation(el) {

    // initializing variables
    let HTML = el.innerHTML;
    el.innerHTML = "";
    let tag = "",
        writingTag = false,
        tagOpen = false,
        interval = 1; 
    // function itself
    let typing = function (x) {
        if (writingTag === true) {
            tag += HTML[x];
        }
        if (HTML[x] === "<") {
            switch (tagOpen) {
                case true:
                    tagOpen = false;
                    writingTag = true;
                    break;
                default:
                    tag = "";
                    tagOpen = true;
                    writingTag = true;
                    tag += HTML[x];
                    break;
            }
        }

        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[x];
        }

        if (!writingTag && !tagOpen) {
            el.innerHTML += HTML[x];
        }
        if (writingTag === true && HTML[x] === ">") {
            writingTag = false;
            switch (tagOpen) {
                case true:
                    let newSpan = document.createElement("span");
                    el.appendChild(newSpan);
                    newSpan.innerHTML = tag;
                    tag = newSpan.firstChild;
                    break;
            }

        }
    }
    // iteration for each character
    for (let x = 0; x < HTML.length; x++) {
        setTimeout(() => {
            typing(x);
        }, interval += 40);
    }
}

// listener handler
async function listenerAction() {    
    let codeSection = document.querySelectorAll('.hidden');
    let placeHolder = document.querySelectorAll('.placeHolder');
    // removing placeholders
    for (let x = 0, len1 = placeHolder.length; x < len1; x++) {
        if (!checkViewPort(codeSection[x]) && checkViewPort(placeHolder[x])) { //checkViewPort(codeSection[x]) returns false if element is hidden
            codeSection[x].classList.add("typewriter");
            typingAnimation(codeSection[x]);
            placeHolder[x].classList.add("hidden");
            codeSection[x].classList.remove("hidden");
            

        }

    }

}





// setting up listner
let timeout = 0;
document.addEventListener('scroll', () => {
    setTimeout(() => {
        listenerAction();
    }, timeout += 5);
});

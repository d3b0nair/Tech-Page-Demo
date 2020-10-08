/* to-do:
implement nav bar carousel 
*/

//checking if element is visible
function checkViewPort(el) {
    const check = el.getBoundingClientRect();
    return (
        check.top >= 0 &&
        check.left >= 0 &&
        check.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        check.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

//appending innerHTML with content
async function typingAnimation(el) {

    // initializing variables
    let HTML = el.innerHTML;
    el.innerHTML = "";
    let tag = "",
        writingTag = false,
        tagOpen = false,
        delay = 1;
    //function itself
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
        }, delay += 40);
    }
}

//listnener handler
async function listnerAction() {
    let codeSection = document.querySelectorAll('.hidden');
    let placeHolder = document.querySelectorAll('.placeHolder');
    let checkDublicates = document.querySelectorAll('.typewriter');
    //removing placeholders
    for (let x = 0, len1 = placeHolder.length - 1; x < len1; x++) {
        if (checkViewPort(placeHolder[x])) {
            placeHolder[x].classList.add("hidden");
            console.log(`x ${x}, len ${len1}`);
        }

    }
    //replacing the placeholders with actual content
    for (let i = 0, len2 = codeSection.length - 1; i < len2; i++) {
        if (checkViewPort(codeSection[i]) && !checkDublicates[i]) {
            codeSection[i].classList.add("typewriter");
            typingAnimElem = document.querySelectorAll('.typewriter');
            typingAnimation(typingAnimElem[i]);
            codeSection[i].classList.remove("hidden");

        }
    }


}

//setting up listner
let timeout = 0;
document.addEventListener('scroll', () => {
    setTimeout(() => {
        listnerAction();
    }, timeout += 5);
});
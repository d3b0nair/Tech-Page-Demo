/* to-do:
implement listener to track users location,
implement nav bar carousel 
maybe try to creater code playground*/

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
        let HTML = el.innerHTML; //copying given element's content
        let size = HTML.length;
        el.innerHTML = ""; //erasing that content. We work with innerHTML because its checks style, which we need for this project
        let tag = "", //we will need this 3 following variables to seperate tags from displaying us them to user upon adding content
            writingTag = false,
            tagOpen = false,
            typeSpeed = 5, // base speed of typing
            tempTypeSpeed = 5; // we will use this variable make typing look more humanlike
        for (let x = 0; x < size; x++) {
            setTimeout(() => {
                if (writingTag === true) {
                    tag += HTML[x];
                }
                if (HTML[x] === "<") {
                    tempTypeSpeed = 0;
                    if (tagOpen) {
                        tagOpen = false;
                        writingTag = true;
                    } else {
                        tag = "";
                        tagOpen = true;
                        writingTag = true;
                        tag += HTML[x];
                    }
                }

                if (!writingTag && tagOpen) {
                    tag.innerHTML += HTML[x];
                }

                if (!writingTag && !tagOpen) {
                    if (HTML[x] === " ") {
                        tempTypeSpeed = 0;
                    } else {
                        tempTypeSpeed = (Math.random() * typeSpeed) + 35;
                    }
                    el.innerHTML += HTML[x];
                }
                if (writingTag === true && HTML[x] === ">") {
                    tempTypeSpeed = (Math.random() * typeSpeed) + 35;
                    writingTag = false;
                    if (tagOpen) {
                        let newSpan = document.createElement("span");
                        el.appendChild(newSpan);
                        newSpan.innerHTML = tag;
                        tag = newSpan.firstChild;
                    }

                }
            }, tempTypeSpeed += (Math.random() * typeSpeed) + 25);
        }
}
var test = 0;

//listnener handler
async function listnerAction() {
    const pre = document.querySelectorAll('pre');
    for (let i = 0; i < pre.length; i++) {
        if (checkViewPort(pre[i])) {
        pre[i].classList.add("typewriter");}
    }
    typingAnimElem = document.querySelectorAll('.typewriter');
    if (test<typingAnimElem.length-1){
        await typingAnimation(typingAnimElem[test]);
        test +=1 ;
    }

    /*
    for (let i = 0; i < pre.length; i++) {
        if ((pre[i].classList.contains("typewriter")) == false) {
            if (checkViewPort(pre[i])) {
                pre[i].classList.add("typewriter");
                typingAnimElem = document.querySelectorAll('.typewriter');
                setTimeout(() => {
                await typingAnimation(typingAnimElem[i]);
            }, timeout += (Math.random() * timeout) + 25);
            }
        }
    }*/
}

//setting up listner
document.addEventListener('scroll', () => {
    let timeout = 100;
    setTimeout(() => {
    listnerAction(); //checking if elements for typing are visible for user}//checking if typing animation is busy
}, timeout += (Math.random() * timeout) + 25);
console.log(timeout);
});
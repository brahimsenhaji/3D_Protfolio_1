document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

const wraps = document.querySelectorAll('.wrap');

wraps.forEach(wrap => {
    wrap.addEventListener('dragstart', dragStart);
    wrap.addEventListener('dragend', dragEnd);
});

function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

const content = document.querySelector('.content');

content.addEventListener('dragover', dragOver);
content.addEventListener('dragenter', dragEnter);
content.addEventListener('dragleave', dragLeave);
content.addEventListener('drop', dragDrop);

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    const draggingElement = document.querySelector('.dragging');
    const newPositionX = event.clientX - content.getBoundingClientRect().left - (draggingElement.offsetWidth / 2);
    const newPositionY = event.clientY - content.getBoundingClientRect().top - (draggingElement.offsetHeight / 2);
    draggingElement.style.left = `${newPositionX}px`;
    draggingElement.style.top = `${newPositionY}px`;
}

//===============================================================================================
const wrappers = document.querySelectorAll('.wrap');
const selectedIcon = document.querySelector('.selectedIcon');
const message = document.querySelector('.message');
const about = document.querySelector('.about');
const works = document.querySelector('.works');
const Skills = document.querySelector('.Skills');
const Contact = document.querySelector('.Contact');
const close = document.querySelector('#close');
const closeWorks = document.querySelector('#closeWorks');
const NoBtn = document.querySelector('.NoBtn');
const yesBtn = document.querySelector('.yesBtn');

wrappers.forEach(wrap => {
    wrap.addEventListener('click', getImageSource);
});

function getImageSource(event) {
    const image = this.querySelector('img');
    const title = this.querySelector('h5');
    if (!image || !title) return;

    const source = image.getAttribute('src');
    const titleText = title.textContent;
    
    const existingText = selectedIcon.querySelector(`p[data-title="${titleText}"]`);
    if (!existingText) {
        const p = document.createElement('p');
        p.setAttribute('data-title', titleText);
        p.textContent = titleText;
        if(titleText != "Telegram" && titleText != "Linkedin" && titleText != "GitHub"){
            selectedIcon.appendChild(p);
        }
    
        const Icon = document.createElement('img');
        Icon.setAttribute('src', source);
        Icon.addEventListener('click', () => {
            if (titleText === "About") {
                about.classList.toggle('displayAbout');
            }
            if(titleText === "Works"){
                works.classList.toggle('displayWork');
            }
            if(titleText === "Skills"){
                Skills.classList.toggle("minusSkillsApp");
            }
            if(titleText === "Contact"){
                Contact.classList.toggle("displayContact");
            }
        });
        if(titleText != "Telegram" && titleText != "Linkedin" && titleText != "GitHub"){
            selectedIcon.appendChild(Icon);
        }
    }

    if (titleText === "Desktop") {
        message.classList.add('displayMessage');
        message.style.zIndex = "50";
        about.style.zIndex = "45";
        works.style.zIndex = "45";
    }
    if (titleText === "About") {
        about.classList.add('displayAbout');
        about.style.zIndex = "50";
        works.style.zIndex = "45";
        message.style.zIndex = "45";
    }
    if (titleText === "Works") {
        works.classList.add('displayWork');
        works.style.zIndex = "50";
        about.style.zIndex = "45";
        message.style.zIndex = "45";
    }
    if (titleText === "Skills") {
        Skills.classList.add('displaySkills');
        Skills.style.zIndex = "50";
        works.style.zIndex = "45";
        about.style.zIndex = "45";
        message.style.zIndex = "45";
    }
    if (titleText === "Contact") {
        Contact.classList.add('displayContact');
        Contact.style.zIndex = "50";
        Skills.style.zIndex = "45";
        works.style.zIndex = "45";
        about.style.zIndex = "45";
        message.style.zIndex = "45";
    }
    
}

close.addEventListener('click', () => {
    about.classList.remove('displayAbout');
    let element = close.getAttribute('data-value');
    removeSelectedIcon(element);
});
closeWorks.addEventListener('click', () => {
    works.classList.remove('displayWork');
    let element = closeWorks.getAttribute('data-value');
    removeSelectedIcon(element);
});
const closeSkills = document.querySelector('#closeSkills');

closeSkills.addEventListener('click', () => {
    Skills.classList.remove('displaySkills');
    Skills.classList.remove('plusSkillsapp');
    let element = closeSkills.getAttribute('data-value');
    console.log(element)
    removeSelectedIcon(element);
});
const closeContact = document.querySelector('#closeContact');

closeContact.addEventListener('click', () => {
    Contact.classList.remove('displayContact');
    let element = closeContact.getAttribute('data-value');
    console.log(element)
    removeSelectedIcon(element);
});

NoBtn.addEventListener('click', () => {
    message.classList.remove('displayMessage');
    let elemen = NoBtn.getAttribute('data-value')
    removeSelectedIcon(elemen);
});

yesBtn.addEventListener('click', () => {
    const content = document.querySelector('.content');
    message.classList.remove('displayMessage');
    content.classList.remove('showcontent');
    content.classList.add('removecontent');
    message.classList.remove('displayMessage');
    let elemen = yesBtn.getAttribute('data-value')
    removeSelectedIcon(elemen);
});

function removeSelectedIcon(elementText) {
    const selectedIcon = document.querySelector('.selectedIcon');
    const icons = selectedIcon.querySelectorAll('img');
    const paragraphs = selectedIcon.querySelectorAll('p');

    // Loop through paragraphs to find the one with the matching text
    paragraphs.forEach(paragraph => {
        if (paragraph.textContent.trim() === elementText) {
            // Find the corresponding icon based on the index of the paragraph
            const icon = icons[Array.from(paragraphs).indexOf(paragraph)];

            // Remove the paragraph and its associated icon
            selectedIcon.removeChild(paragraph);
            selectedIcon.removeChild(icon);
        }
    });
}

        
//=======================================================================================
function getTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed
    const timeString = hours + ':' + minutes + ' ' + ampm;
    return timeString;
}

function getDate() {
    const now = new Date();
    const month = now.getMonth() + 1; // Month is zero-based
    const day = now.getDate();
    const year = now.getFullYear();
    const dateString = month + '/' + day + '/' + year;
    return dateString;
}

function updateClock() {
    const timeDiv = document.getElementById('times');
    const dateDiv = document.getElementById('date');
    if (timeDiv && dateDiv) {
        timeDiv.textContent = getTime();
        dateDiv.textContent = getDate();
    }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();

//========================================================================================
let plus = document.querySelector('#plus');

plus.addEventListener('click', ()=>{
    about.classList.toggle('plusAbout');
});

let minus = document.querySelector('#minus');
minus.addEventListener('click', ()=>{
    about.classList.remove('displayAbout');
});

let plusWorks = document.querySelector('#plusWorks')
plusWorks.addEventListener('click',()=>{
    works.classList.toggle('plusWorks')
});
let minusWorks = document.querySelector('#minusWorks');
minusWorks.addEventListener('click', ()=>{
    works.classList.remove('displayWork');
});

let plusContact = document.querySelector('#plusContact')
plusContact.addEventListener('click',()=>{
    Contact.classList.toggle('plusContact')
});
let minusContact = document.querySelector('#minusContact');
minusContact.addEventListener('click', ()=>{
    Contact.classList.toggle('displayContact');
    Contact.classList.remove('plusContact');
});

//===========================================================================================
const wrapper = document.querySelectorAll('.wrapper');
let aboutTextCreated = false; // Flag to track if aboutText has been created
let resumeTextCreated = false; // Flag to track if resumeText has been created
let aboutcontainer = document.querySelector('.aboutcontainer');

wrapper.forEach(wrapper => {
    wrapper.addEventListener('click', function() {
        const filename = this.querySelector('.Pdftext h5').textContent;

        // Clear the container before displaying new content
        aboutcontainer.innerHTML = '';

        if (filename === "about.pdf") {
            if (!aboutTextCreated) {
                let aboutText = document.createElement('div');
                aboutText.classList.add('aboutText');

                let h1 = document.createElement('h1');
                h1.textContent = "My name is Brahim Senhaji";
                aboutText.appendChild(h1);

                let p = document.createElement('p');
                p.textContent = "I'm a full-stack web developer with a strong belief in my ability to continuously expand my skills and foster creativity. I have a penchant for thinking outside the box when it comes to crafting digital solutions, and I'm passionate about bridging the realms of logic and creative design. My goal is to create visually captivating, user-friendly websites and applications that are both accessible and engaging.";
                aboutText.appendChild(p);

                aboutcontainer.appendChild(aboutText);

                // Set aboutTextCreated flag to true
                aboutTextCreated = true;
                resumeTextCreated = false; // Reset resumeTextCreated flag
            }
        } else if (filename === "resume.pdf") {
            if (!resumeTextCreated) {
                let resumeText = document.createElement('div');
                resumeText.classList.add('resumeText');

                resumeText.innerHTML = `
                <h1>Brahim Senhaji</h1>
                <p>Full-stack developer</p>
                <p>Address: Sidi Slimane</p>
                <p>Phone: + 212 690488279</p>
                <p>E-mail: brahimsenhaji36@gmail.com</p>
                <p>Website: www.brahimsenhaji.com</p>
                <p>Dedicated Full Stack Developer skilled in creating web and desktop applications.
                Proficient in various technologies and frameworks. Seeking new challenges in software
                development to apply my expertise effectively.</p>
                <h2>Skills</h2>
                <ul>
                    <li>HTML5 - CSS3</li>
                    <li>JavaScript - React</li>
                    <li>PHP - Laravel</li>
                    <li>C# Windows Forms Application .NET - MySQL</li>
                </ul>
                <h2>Professional Experience</h2>
                <p>Full Stack Web Application Developer Intern, Hedoma</p>
                <ul>
                    <li>Developed a full stack web application, collaborating with team members.</li>
                    <li>Designed and implemented database structures for efficient data management.</li>
                    <li>Utilized [specific technologies or frameworks] for frontend and backend development.</li>
                    <li>Demonstrated adaptability and eagerness to learn within a professional environment.</li>
                </ul>
                <p>As a Freelance Full Stack Developer</p>
                <ul>
                    <li>Collaborated with clients to tailor solutions to their business needs.</li>
                    <li>Developed responsive web apps with HTML5, CSS3, JavaScript, React, PHP, and MySQL.</li>
                    <li>Optimized code for performance and scalability.</li>
                    <li>Rigorously tested and debugged software. Successfully managed multiple projects, meeting
                    deadlines.</li>
                </ul>
                <p>Internship at Sigit</p>
                <ul>
                    <li>Developed a desktop application for inventory management.</li>
                    <li>Designed a dedicated desktop tool for swift identification and resolution of production issues,
                     minimizing downtime.</li>
                    <li>Actively collaborated with the team to improve processes and embraced opportunities for
                    learning and skill development.</li>
                </ul>
                <h2>Education</h2>
                <p>Bac + 2, IT-Development</p>
                <p>MIAGE Sidi Slimane</p>
                <h2>Languages</h2>
                <p>French: Fluent (Medium)</p>
                <p>English: Proficient (Good)</p>
            `;

                aboutcontainer.appendChild(resumeText);

                // Set resumeTextCreated flag to true
                resumeTextCreated = true;
                aboutTextCreated = false; // Reset aboutTextCreated flag
            }
        }
    });
});

//=============================================================================================
// Function to create a DOM element with specified attributes and children
function createElement(tag, attributes, children) {
    const element = document.createElement(tag);
    if (attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (children && children.length > 0) {
        children.forEach(child => {
            element.appendChild(child);
        });
    }
    return element;
}

// Function to handle click on wrappe element
function handleWrappeClick() {
    const appName = this.querySelector('h5').textContent;

    const workAppDiv = createElement('div', { class: 'workApp' });
    const headDiv = createElement('div', { class: 'head', id: 'aboutHead' });
    const headIconsDiv = createElement('div', { class: 'headIcons' });
    const closeIcon = createElement('i', { class: 'fa-solid fa-circle-xmark', id: 'closeworkfolder', 'data-value': 'About' });
    const plusIcon = createElement('i', { class: 'fa-solid fa-circle-plus', id: 'plusworkfolder' });
    const headTitleDiv = createElement('div', { class: 'headTitle' }, [document.createTextNode(appName)]);

    headIconsDiv.appendChild(closeIcon);
    headIconsDiv.appendChild(plusIcon);
    headDiv.appendChild(headIconsDiv);
    headDiv.appendChild(headTitleDiv);
    workAppDiv.appendChild(headDiv);
    document.body.appendChild(workAppDiv);

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const appData = data.find(app => app.title + " app" === appName);
            if (appData) {
                const images = appData.img;
                const imageContainer = createElement('div', { class: 'imageContainer' });
                images.forEach(imgUrl => {
                    const filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
                    const isTextSvg = filename.includes('text.svg');
                    const imgElement = createElement('img', { src: imgUrl, class: isTextSvg ? 'ReadMe' : '', style: isTextSvg ? 'width: 80px' : '' });
                    const titleParagraph = createElement('p', null, [document.createTextNode(isTextSvg ? 'Read Me' : filename)]);
                    if(isTextSvg){
                        imgElement.addEventListener('click', ()=>{
                            let SelectedImage = document.querySelector('.SelectedImage');
                            SelectedImage.style.display = "block";

                            let headTitle = SelectedImage.querySelector('.headTitle');
                            headTitle.textContent = "Read Me";


                            let p = document.createElement('p');
                            p.textContent = appData.description;
                            p.classList.add('imageOf');

                            SelectedImage.appendChild(p);
                        });
                    }else{
                        imgElement.addEventListener('click', ()=>{
                            let SelectedImage = document.querySelector('.SelectedImage');
                            SelectedImage.style.display = "block";

                            let headTitle = SelectedImage.querySelector('.headTitle');
                            headTitle.textContent = filename;

                            let img = document.createElement('img');
                            img.setAttribute('src' , imgUrl);
                            img.classList.add('imageOf');

                            SelectedImage.appendChild(img);
                        });
                    }
                    const imageDiv = createElement('div', { class: 'imageDiv' }, [imgElement, titleParagraph]);
                    imageContainer.appendChild(imageDiv);
                });
                workAppDiv.appendChild(imageContainer);
            } else {
                console.error('App data not found for', appName);
            }
        })
        .catch(error => {
            console.error('Error fetching JSON: ', error);
            alert('Failed to fetch app data. Please try again later.');
        });
}


// Event listeners
document.querySelectorAll('.wrappe').forEach(wrappe => {
    wrappe.addEventListener('click', handleWrappeClick);
});

document.addEventListener('click', function (event) {
    const targetId = event.target.id;
    if (targetId === 'plusworkfolder') {
        const workApp = document.querySelector('.workApp');
        workApp.classList.toggle('plusWorksApp');
    } else if (targetId === 'closeworkfolder') {
        const workApp = document.querySelector('.workApp');
        workApp.remove();
    } else if (targetId === 'plusImage') {
        const SelectedImage = document.querySelector('.SelectedImage');
        SelectedImage.classList.toggle('plusclickedImage');
    } else if (targetId === 'closeImage') {
        const SelectedImage = document.querySelector('.SelectedImage');
        SelectedImage.style.display = "none";

        let imageOf = document.querySelector('.imageOf');
        SelectedImage.removeChild(imageOf);
    }
});
document.addEventListener('click', function (event) {
    const targetId = event.target.id;
    if (targetId === 'plusSkills') {
        const Skills = document.querySelector('.Skills');
        Skills.classList.toggle('plusSkillsapp');
    } else if (targetId === 'minusSkills') {
        const Skills = document.querySelector('.Skills');
        Skills.classList.toggle('minusSkillsApp');
    }
});



//===============================================================================

//===============================================================================


var isFirstTime = localStorage.getItem("isFirstTime");

if (!isFirstTime) {
    // Display the loading element
    document.getElementById("loading").style.display = "flex";
    setTimeout(function() {
        localStorage.setItem("isFirstTime", "true");
        // Hide the loading element after setting isFirstTime to true
        document.getElementById("loading").style.display = "none";

        // Run the typing effect after setting isFirstTime
        runTypingEffect();
    }, 4000);
} else {
    // Hide the loading element if it's not the first time
    document.getElementById("loading").style.display = "none";

    // Run the typing effect directly
    runTypingEffect();
}

function runTypingEffect() {
    function typeText(element, speed, wordBreakCount) {
        const text = element.innerText;
        element.innerText = '';
        let index = 0;
        let wordCount = 0;

        function typeEffect() {
            if (index < text.length) {
                const char = text.charAt(index);

                if (char === ' ') {
                    wordCount++;
                    if (wordCount % wordBreakCount === 0) {
                        element.innerHTML += '<br>'; // Add line break after every wordBreakCount word
                    } else {
                        element.innerHTML += '&nbsp;'; // Add non-breaking space between words
                    }
                } else {
                    element.innerText += char;
                }

                index++;
                setTimeout(typeEffect, speed);
            }
        }

        typeEffect();
    }

    document.querySelectorAll('.textContainer').forEach(container => {
        typeText(container.querySelector('#typedText'), 50, 3);
    });

    document.querySelectorAll('.textContainer h1, .textContainer h2').forEach(heading => {
        typeText(heading, 100, 4);
    });
}

 
     //======================================================================================
     //function to send a message

const btn = document.getElementById('button');


document.getElementById('form')
.addEventListener('submit', function (event) {
event.preventDefault();

   btn.textContent = 'SENDING...';

   const serviceID = 'default_service';
   const templateID = 'template_fijonbb';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.textContent = 'SEND MESSAGE';
      //if u want to alert a messag
       
      //Delet the input filde after sending the message
        let from_name = document.querySelector('#from_name');
        let email_id = document.querySelector('#email_id');
        let message = document.querySelector('#message');
            from_name.value = '';
            email_id.value = '';
            message.value = '';

    }, (err) => {
      btn.textContent = 'SEND MESSAGE';
      alert(JSON.stringify(err));
    });


});


//===============================================================================

const cardContents = document.querySelectorAll('#card');

cardContents.forEach(card => {
    card.addEventListener('click', () => {
        // Increase z-index of clicked card
        card.style.zIndex = "50";
        
        // Decrease z-index of other cards
        cardContents.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.zIndex = "45";
            }
        });
    });
});
/*
document.addEventListener("DOMContentLoaded", function() {
    const heads = document.querySelectorAll('.head');

    heads.forEach(head => {
        head.draggable = true;

        head.addEventListener("mousedown", function(event) {
            startDrag(event);
        });
    });

    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", drag);

    let offsetX, offsetY;
    let isDragging = false;
    let currentCard = null;

    function startDrag(event) {
        // Check if the clicked element is the head of a card
        const card = event.target.closest('.about, .works, .SelectedImage, .Skills, .Contact');
        if (card) {
            isDragging = true;
            currentCard = card;

            // Calculate the offset between mouse position and card position
            offsetX = event.clientX - card.offsetLeft;
            offsetY = event.clientY - card.offsetTop;

            // Add a class to indicate that the card is being dragged
            card.classList.add('dragging');
        }
    }

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            if (currentCard) {
                currentCard.classList.remove('dragging');
                currentCard = null;
            }
        }
    }

    function drag(event) {
        if (isDragging && currentCard) {
            // Update the position of the card based on mouse position
            currentCard.style.left = (event.clientX - offsetX) + 'px';
            currentCard.style.top = (event.clientY - offsetY) + 'px';
        }
    }
});

*/

const cards = document.querySelectorAll('.about, .works, .SelectedImage, .Skills, .Contact');

cards.forEach(card => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    card.addEventListener('mousedown', mouseDown);

    function mouseDown(e) {
        e.preventDefault(); // Prevent default behavior to avoid text selection while dragging

        isDragging = true;
        offsetX = e.clientX - card.getBoundingClientRect().left;
        offsetY = e.clientY - card.getBoundingClientRect().top;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        card.style.left = x + 'px';
        card.style.top = y + 'px';
    }

    function mouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
});

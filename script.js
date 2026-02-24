let interviewList = [];
let rejectedList = [];
 let currentStatus = 'all'; 

 let totalCount = document.getElementById('total-count');
 let interviewcount = document.getElementById('interview-count');
 let rejectedCount = document.getElementById('rejected-count');

const allFilter = document.getElementById('filter-all');
const filterInterview = document.getElementById('filter-interview');
const filterRejected = document.getElementById('filter-rejected');
 const jobsCards = document.getElementById('jobCards');
 const allJobCards = document.getElementById('jobCards');

function calculateCount(){
    totalCount.innerText = allJobCards.children.length;
    interviewcount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
 calculateCount();

function toggleStyle(id){

// Add all bg[#F1F2F4] for all buttons
    allFilter.classList.add('bg-[#F1F2F4]', 'text-[#64748B]');
    filterInterview.classList.add('bg-[#F1F2F4]', 'text-[#64748B]');
    filterRejected.classList.add('bg-[#F1F2F4]', 'text-[#64748B]');

// Remove any button if it is blue
    allFilter.classList.remove('bg-blue-500', 'text-white');
    filterInterview.classList.remove('bg-blue-500', 'text-white');
    filterRejected.classList.remove('bg-blue-500', 'text-white');

// Adding Blue bg for clicked button.
    const selected = document.getElementById(id);
    selected.classList.add('bg-blue-500', 'text-white');
    currentStatus = id ;

if(id == 'filter-interview'){
        jobsCards.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id == 'filter-all'){
        jobsCards.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if( id == 'filter-rejected'){
       jobsCards.classList.add('hidden');
        filterSection.classList.remove('hidden'); 
        renderRejected();
    }
};

    const mainContainer = document.querySelector('main');
    const filterSection = document.getElementById('filtered-section');

mainContainer.addEventListener('click', function(event){
    
 if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;
    const jobTitle = parentNode.querySelector('.jobTitle').innerText;
    const jobRole = parentNode.querySelector('.jobRole').innerText;
    const jobSalary = parentNode.querySelector('.jobSalary').innerText;
    const statusBtn = parentNode.querySelector('.status-btn').innerText;
    const jobInfo = parentNode.querySelector('.jobInfo').innerText;

    parentNode.querySelector('.status-btn').innerText = 'INTERVIEW';
    const cardInfo = {
        jobTitle,
        jobRole,
        jobSalary,
        statusBtn:'INTERVIEW', 
        jobInfo
    }

    const jobExist = interviewList.find(item=> item.jobTitle == cardInfo.jobTitle);

if(!jobExist){
        interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(item => item.jobTitle != cardInfo.jobTitle);
    if(currentStatus == 'filter-rejected'){
        renderRejected();
    }
    
calculateCount();
    
    }
    else if(event.target.classList.contains('rejected-btn')){
        const parentNode = event.target.parentNode.parentNode;
    const jobTitle = parentNode.querySelector('.jobTitle').innerText;
    const jobRole = parentNode.querySelector('.jobRole').innerText;
    const jobSalary = parentNode.querySelector('.jobSalary').innerText;
    const statusBtn = parentNode.querySelector('.status-btn').innerText;
    const jobInfo = parentNode.querySelector('.jobInfo').innerText;

parentNode.querySelector('.status-btn').innerText = 'REJECTED';
const cardInfo = {
        jobTitle,
        jobRole,
        jobSalary,
        statusBtn:'REJECTED', 
        jobInfo
    }

    const jobExist = rejectedList.find(item=> item.jobTitle == cardInfo.jobTitle);

if(!jobExist){
        rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(item => item.jobTitle != cardInfo.jobTitle);
    
    if (currentStatus == 'filter-interview'){
        renderInterview();
    }
        calculateCount();
    }
    else if(event.target.classList.contains('delete-btn')){
        const cardContainer = event.target.closest('#jobCards > div, #filtered-section > div');
        if(!cardContainer){
            return;
        }

        const titleNode = cardContainer.querySelector('.jobTitle');
        if(!titleNode){
            return;
        }

        const jobTitle = titleNode.innerText;
        const mainCard = Array.from(allJobCards.children).find((card) => {
            const cardTitle = card.querySelector('.jobTitle');
            return cardTitle && cardTitle.innerText === jobTitle;
        });

        if(mainCard){
            mainCard.remove();
        }

        interviewList = interviewList.filter((item) => item.jobTitle !== jobTitle);
        rejectedList = rejectedList.filter((item) => item.jobTitle !== jobTitle);

        if(currentStatus === 'filter-interview'){
            renderInterview();
        }
        else if(currentStatus === 'filter-rejected'){
            renderRejected();
        }

        calculateCount();
    }
});

function renderEmpty(){
    filterSection.innerHTML = `
    <div class="w-11/12 max-w-[1110px] mx-auto mt-6 md:mt-12 bg-[#F1F2F4] rounded-md min-h-80 flex flex-col items-center justify-center text-center px-4">
        <img src="jobs.png" alt="" class="w-16 h-16 mb-4" />
        <h4 class="text-[#002C5C] text-2xl font-bold">No jobs available</h4>
        <p class="text-[#64748B] mt-2">Check back soon for new job opportunities</p>
    </div>
    `;
}

function renderInterview(){
    filterSection.innerHTML = '';

if(interviewList.length === 0){
        renderEmpty();
    return;
    }

    for(interview of interviewList){
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'px-5 py-6 bg-[#F1F2F4] rounded-md w-11/12 max-w-[1110px] mx-auto mt-6 md:mt-12 space-y-6';
        div.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h3 class="jobTitle text-lg font-semibold">${interview.jobTitle}</h3>
                <p class="jobRole text-[#64748B]">Junior Instructor</p>
                <p class="jobSalary text-[#64748B] mt-3">Remote • Full-time • 20,000 - 50,000</p>
                <button class="status-btn bg-[#EEF4FF] py-2 px-6 rounded text-[#002C5C] mt-3">${interview.statusBtn}</button>
                <p class="jobInfo mt-4">Manage Web Development Basic Course, is designed to build a strong foundation in modern web development for beginners who want to start their journey as a web developer.</p>
                <div class="flex flex-col sm:flex-row gap-3 mt-5">
                    <button class="interview-btn px-4 py-2 border-2 border-green-400 text-green-400 rounded-md">INTERVIEW</button>
                    <button class="rejected-btn px-4 py-2 border-2 border-red-500 text-red-500 rounded-md">REJECTED</button>
                </div>
            </div>
            <div><i class="delete-btn fa-regular fa-trash-can"></i></div>
        </div>
        `
    filterSection.appendChild(div);
    }
};

function renderRejected(){
    filterSection.innerHTML = '';

    if(rejectedList.length === 0){
        renderEmpty();
    return;
    }

    for(rejected of rejectedList){

        let div = document.createElement('div');
        div.className = 'px-5 py-6 bg-[#F1F2F4] rounded-md w-11/12 max-w-[1110px] mx-auto mt-6 md:mt-12 space-y-6';
        div.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h3 class="jobTitle text-lg font-semibold">${rejected.jobTitle}</h3>
                <p class="jobRole text-[#64748B]">Junior Instructor</p>
                <p class="jobSalary text-[#64748B] mt-3">Remote • Full-time • 20,000 - 50,000</p>
                <button class="status-btn bg-[#EEF4FF] py-2 px-6 rounded text-[#002C5C] mt-3">${rejected.statusBtn}</button>
                <p class="jobInfo mt-4">Manage Web Development Basic Course, is designed to build a strong foundation in modern web development for beginners who want to start their journey as a web developer.</p>
                <div class="flex flex-col sm:flex-row gap-3 mt-5">
                    <button class="interview-btn px-4 py-2 border-2 border-green-400 text-green-400 rounded-md">INTERVIEW</button>
                    <button class="rejected-btn px-4 py-2 border-2 border-red-500 text-red-500 rounded-md">REJECTED</button>
                </div>
            </div>
            <div><i class="delete-btn fa-regular fa-trash-can"></i></div>
        </div>
        `
filterSection.appendChild(div);
    }
};

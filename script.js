let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let interviewcount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilter = document.getElementById('filter-all');
const filterInterview = document.getElementById('filter-interview');
const filterRejected = document.getElementById('filter-rejected');

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

};

const mainContainer = document.querySelector('main');
mainContainer.addEventListener('click', function(event){

});





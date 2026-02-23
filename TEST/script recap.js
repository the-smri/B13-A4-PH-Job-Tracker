// Job data with meaningful company names and positions (no lorem ipsum)
const jobsData = [
    {
        id: 1,
        company: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: null // null = unanswered, 'interview', 'rejected'
    },
    {
        id: 2,
        company: "CloudScale Systems",
        position: "Senior Backend Engineer",
        location: "Austin, TX",
        type: "Hybrid",
        salary: "$150,000 - $190,000",
        description: "Design and implement scalable microservices architecture using Node.js and AWS. Lead technical decisions for the team.",
        status: null
    },
    {
        id: 3,
        company: "FinTech Innovations",
        position: "UI/UX Designer",
        location: "New York",
        type: "On-site",
        salary: "$110,000 - $145,000",
        description: "Create intuitive financial dashboards and mobile banking experiences. Work closely with product and engineering teams.",
        status: null
    },
    {
        id: 4,
        company: "HealthTech Solutions",
        position: "Full Stack Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$125,000 - $160,000",
        description: "Develop healthcare management platforms using React and Python. Build features that improve patient care.",
        status: null
    },
    {
        id: 5,
        company: "EcoRetail",
        position: "DevOps Engineer",
        location: "Seattle",
        type: "Remote",
        salary: "$140,000 - $175,000",
        description: "Manage AWS infrastructure and CI/CD pipelines. Implement containerization with Docker and Kubernetes.",
        status: null
    },
    {
        id: 6,
        company: "AI Analytics",
        position: "Machine Learning Engineer",
        location: "San Francisco",
        type: "Hybrid",
        salary: "$160,000 - $210,000",
        description: "Build and deploy ML models for predictive analytics. Work with Python, TensorFlow, and large-scale data processing.",
        status: null
    },
    {
        id: 7,
        company: "CyberSecure",
        position: "Security Analyst",
        location: "Washington DC",
        type: "On-site",
        salary: "$115,000 - $150,000",
        description: "Conduct security assessments and penetration testing. Implement security best practices across the organization.",
        status: null
    },
    {
        id: 8,
        company: "EdTech Pioneers",
        position: "Frontend Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$105,000 - $135,000",
        description: "Build interactive learning platforms using Vue.js and modern CSS. Create engaging educational experiences.",
        status: null
    }
];

// DOM Elements
const jobSection = document.getElementById('available-job-section');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const jobsCountEl = document.querySelector('#available-jobs-heading p');

// Create tabs container if not exists
let tabsContainer = document.querySelector('.btns');
if (!tabsContainer) {
    tabsContainer = document.createElement('div');
    tabsContainer.className = 'btns flex gap-2 mt-6';
    document.querySelector('#available-jobs-heading').after(tabsContainer);
}

// Clear existing static cards
const staticCards = document.querySelectorAll('.job-card-1');
staticCards.forEach(card => card.remove());

// Create tabs
tabsContainer.innerHTML = `
    <button class="tab-btn active-tab bg-blue-500 py-2.5 px-8 rounded-sm text-white" data-tab="all">All</button>
    <button class="tab-btn bg-[#F1F2F4] py-2.5 px-8 rounded-sm text-[#64748B]" data-tab="interview">Interview</button>
    <button class="tab-btn bg-[#F1F2F4] py-2.5 px-8 rounded-sm text-[#64748B]" data-tab="rejected">Rejected</button>
`;

// Create jobs container
const jobsContainer = document.createElement('div');
jobsContainer.id = 'jobs-container';
jobsContainer.className = 'mt-6';
jobSection.appendChild(jobsContainer);

// Current active tab
let currentTab = 'all';

// Update counts function
function updateCounts() {
    const total = jobsData.length;
    const interview = jobsData.filter(job => job.status === 'interview').length;
    const rejected = jobsData.filter(job => job.status === 'rejected').length;
    
    totalCountEl.textContent = total;
    interviewCountEl.textContent = interview;
    rejectedCountEl.textContent = rejected;
    jobsCountEl.textContent = `${total} Jobs`;
}

// Render jobs based on current tab
function renderJobs() {
    let filteredJobs = jobsData;
    
    if (currentTab === 'interview') {
        filteredJobs = jobsData.filter(job => job.status === 'interview');
    } else if (currentTab === 'rejected') {
        filteredJobs = jobsData.filter(job => job.status === 'rejected');
    }
    
    if (filteredJobs.length === 0) {
        // Show empty state
        jobsContainer.innerHTML = `
            <div class="empty-state text-center py-16 bg-[#F8FAFC] rounded-lg">
                <svg class="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h3 class="text-2xl font-semibold text-gray-700 mt-4">No jobs Available</h3>
                <p class="text-gray-500 mt-2">Check back soon for new job updates!</p>
            </div>
        `;
    } else {
        // Render job cards
        jobsContainer.innerHTML = filteredJobs.map(job => `
            <div class="job-card bg-[#F1F2F4] mt-4 rounded-md p-4" data-job-id="${job.id}" data-status="${job.status || 'none'}">
                <h3 class="font-bold text-lg">${job.company}</h3>
                <p class="text-[#64748B]">${job.position}</p>
                <br>
                <p class="text-[#64748B]">${job.location} • ${job.type} • ${job.salary}</p>
                <br>
                <p class="mb-4 text-gray-600">${job.description}</p>
                <div class="buttons flex gap-3">
                    <button class="interview-btn px-3 py-2 border-2 border-green-400 rounded-md text-green-400 hover:bg-green-50 transition-colors ${job.status === 'interview' ? 'bg-green-50' : ''}" 
                            data-job-id="${job.id}">
                        INTERVIEW
                    </button>
                    <button class="rejected-btn px-3 py-2 border-2 border-red-500 rounded-md text-red-500 hover:bg-red-50 transition-colors ${job.status === 'rejected' ? 'bg-red-50' : ''}" 
                            data-job-id="${job.id}">
                        REJECTED
                    </button>
                    <button class="delete-btn px-3 py-2 border-2 border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition-colors" 
                            data-job-id="${job.id}">
                        DELETE
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateCounts();
}

// Handle job status change
function handleStatusChange(jobId, newStatus) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    // Toggle functionality: if same status, set to null; otherwise set to new status
    if (job.status === newStatus) {
        job.status = null;
    } else {
        job.status = newStatus;
    }
    
    // Re-render based on current tab
    renderJobs();
}

// Handle job deletion
function handleDelete(jobId) {
    const jobIndex = jobsData.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
        jobsData.splice(jobIndex, 1);
        renderJobs();
    }
}

// Event delegation for job actions
jobsContainer.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;
    
    const jobId = parseInt(target.dataset.jobId);
    if (!jobId) return;
    
    if (target.classList.contains('interview-btn')) {
        handleStatusChange(jobId, 'interview');
    } else if (target.classList.contains('rejected-btn')) {
        handleStatusChange(jobId, 'rejected');
    } else if (target.classList.contains('delete-btn')) {
        handleDelete(jobId);
    }
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active tab styles
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active-tab', 'bg-blue-500', 'text-white');
            b.classList.add('bg-[#F1F2F4]', 'text-[#64748B]');
        });
        
        this.classList.remove('bg-[#F1F2F4]', 'text-[#64748B]');
        this.classList.add('active-tab', 'bg-blue-500', 'text-white');
        
        // Update current tab and re-render
        currentTab = this.dataset.tab;
        renderJobs();
    });
});

// Initial render
renderJobs();

// Add CSS for responsive design
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        #card-container {
            flex-direction: column;
        }
        .btns {
            flex-wrap: wrap;
        }
        .tab-btn {
            flex: 1 1 auto;
            min-width: 100px;
        }
        .buttons {
            flex-wrap: wrap;
        }
        .buttons button {
            flex: 1 1 auto;
        }
    }
`;
document.head.appendChild(style);
… (existing code remains) …

// Add PDF view/download links
function loadUploads(){
  const arr = getUploads();
  const ul = document.getElementById('uploadedList');
  ul.innerHTML = '';
  arr.forEach((u,i) => {
    const li = document.createElement('li');
    li.innerHTML = `${u.name} - ${u.date}
      <button onclick="viewPDF(${i})">View</button>
      <button onclick="downloadPDF(${i})">Download</button>`;
    ul.appendChild(li);
  });
}

function viewPDF(i) {
  const arr = getUploads();
  const url = URL.createObjectURL(arr[i].fileBlob);
  window.open(url, '_blank');
}

function downloadPDF(i) {
  const arr = getUploads();
  const a = document.createElement('a');
  const url = URL.createObjectURL(arr[i].fileBlob);
  a.href = url;
  a.download = arr[i].name;
  a.click();
}

// Store blobs in uploads
function uploadHomework() {
  const inp = document.getElementById('hwUpload');
  if(!inp.files.length) return alert('Select a PDF');
  const file = inp.files[0];
  if(file.type!=='application/pdf') return alert('Only PDFs');
  const reader = new FileReader();
  reader.onload = () => {
    const arr = getUploads();
    arr.push({ name: file.name, date: new Date().toLocaleString(), fileBlob: reader.result });
    saveUploads(arr);
    loadUploads();
    notify(`${file.name} uploaded`, `Uploaded on ${new Date().toLocaleString()}`);
  };
  reader.readAsDataURL(file);
}

// ADMIN functions
function deleteAllQuestions(){
  if(confirm('Delete all quiz questions?')){
    localStorage.removeItem('quizQuestions');
    location.reload();
  }
}

function clearUploads(){
  if(confirm('Delete all uploads?')){
    localStorage.removeItem('uploads');
    loadUploads();
    updateStats();
  }
}

// STATS
function updateStats(){
  document.getElementById('statsUsers').innerText = getUsers().length;
  document.getElementById('statsQs').innerText = JSON.parse(localStorage.getItem('quizQuestions')||'[]').length;
  document.getElementById('statsUploads').innerText = getUploads().length;
}

// At end of showDashboard(u)
loadUploads();
updateStats();

… (rest unchanged) …

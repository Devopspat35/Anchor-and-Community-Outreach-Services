const defaultData = {
  stakeholders: [
    {id:"s1",name:"Jordan Williams",role:"Community Partner",email:"jordan@example.org",phone:"(000) 000-0001",photo:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",bio:"Community partner focused on building local relationships and connecting people with resources."},
    {id:"s2",name:"Maria Thompson",role:"Program Coordinator",email:"maria@example.org",phone:"(000) 000-0002",photo:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",bio:"Coordinates outreach programs, community events, and stakeholder engagement."},
    {id:"s3",name:"David Anderson",role:"Board / Advisory Member",email:"david@example.org",phone:"(000) 000-0003",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",bio:"Supports organizational strategy, partnerships, and community development."}
  ],
  members: [
    {id:"m1",name:"Amina Johnson",role:"Community Member",email:"amina@example.org",phone:"",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",bio:"Active community member and participant in outreach activities."},
    {id:"m2",name:"Samuel Brown",role:"Program Participant",email:"samuel@example.org",phone:"",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",bio:"Participates in community programs and peer support activities."},
    {id:"m3",name:"Grace Miller",role:"Volunteer Member",email:"grace@example.org",phone:"",photo:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",bio:"Volunteer who helps with events and community engagement."}
  ]
};

let data = JSON.parse(localStorage.getItem("anchorData")) || defaultData;

const $ = id => document.getElementById(id);
function save(){localStorage.setItem("anchorData", JSON.stringify(data));}
function escapeHtml(s=""){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function render(type){
  const grid = $(type === "stakeholders" ? "stakeholderGrid" : "memberGrid");
  grid.innerHTML = data[type].map(p => `
    <article class="profile-card">
      <img class="profile-photo" src="${escapeHtml(p.photo || 'https://via.placeholder.com/900x600?text=Profile+Photo')}" alt="${escapeHtml(p.name)}">
      <div class="profile-body">
        <span class="role">${escapeHtml(p.role)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="bio">${escapeHtml(p.bio)}</p>
        <div class="profile-actions">
          <button class="small-btn" onclick="editProfile('${type}','${p.id}')">Edit Profile</button>
          ${p.email ? `<a class="small-btn" href="mailto:${escapeHtml(p.email)}">Email</a>` : ""}
        </div>
      </div>
    </article>`).join("");
}
function renderAll(){render("stakeholders");render("members");}

function openModal(id){$(id).classList.add("show")}
function closeModal(id){$(id).classList.remove("show")}

function newProfile(type){
  $("profileType").value=type;$("profileId").value="";
  $("profileModalEyebrow").textContent=type==="members"?"MEMBER":"STAKEHOLDER";
  $("profileModalTitle").textContent=type==="members"?"Add Member":"Add Stakeholder";
  ["profileName","profileRole","profileEmail","profilePhone","profilePhoto","profileBio"].forEach(x=>$(x).value="");
  $("deleteProfile").style.display="none";openModal("profileModal");
}
function editProfile(type,id){
  const p=data[type].find(x=>x.id===id); if(!p)return;
  $("profileType").value=type;$("profileId").value=id;
  $("profileModalEyebrow").textContent=type==="members"?"MEMBER":"STAKEHOLDER";
  $("profileModalTitle").textContent="Edit Profile";
  $("profileName").value=p.name||"";$("profileRole").value=p.role||"";$("profileEmail").value=p.email||"";
  $("profilePhone").value=p.phone||"";$("profilePhoto").value=p.photo||"";$("profileBio").value=p.bio||"";
  $("deleteProfile").style.display="inline-block";openModal("profileModal");
}

$("profileForm").addEventListener("submit",e=>{
  e.preventDefault();
  const type=$("profileType").value,id=$("profileId").value;
  const p={id:id||crypto.randomUUID(),name:$("profileName").value,role:$("profileRole").value,email:$("profileEmail").value,phone:$("profilePhone").value,photo:$("profilePhoto").value,bio:$("profileBio").value};
  if(id){data[type]=data[type].map(x=>x.id===id?p:x)}else data[type].push(p);
  save();renderAll();closeModal("profileModal");
});
$("deleteProfile").onclick=()=>{
  const type=$("profileType").value,id=$("profileId").value;
  if(id && confirm("Delete this profile?")){data[type]=data[type].filter(x=>x.id!==id);save();renderAll();closeModal("profileModal");}
};

$("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  if($("loginPassword").value.length<4){alert("Please enter a password with at least 4 characters.");return;}
  closeModal("loginModal");
  $("dashStakeholders").textContent=data.stakeholders.length;
  $("dashMembers").textContent=data.members.length;
  openModal("dashboardModal");
});

$("openLogin").onclick=()=>openModal("loginModal");
$("heroLogin").onclick=()=>openModal("loginModal");
$("addStakeholder").onclick=()=>newProfile("stakeholders");
$("addMember").onclick=()=>newProfile("members");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));
$("menuBtn").onclick=()=>$("mainNav").classList.toggle("open");
renderAll();

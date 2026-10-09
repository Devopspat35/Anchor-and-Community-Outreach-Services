const backdrop=document.getElementById('modalBackdrop');
const title=document.getElementById('modalTitle'), intro=document.getElementById('modalIntro'), submit=document.getElementById('submitAccount'), sw=document.getElementById('switchMode'), nameField=document.getElementById('memberName'), message=document.getElementById('modalMessage');
let mode='signin';
function setMode(next){mode=next;const reg=mode==='register';title.textContent=reg?'Create Member Account':'Member Sign In';intro.textContent=reg?'Create an account to access your member profile.':'Access your profile and manage your information.';submit.textContent=reg?'Create Account':'Sign In';nameField.style.display=reg?'block':'none';nameField.required=reg;sw.textContent=reg?'Already a member? Sign in':'New member? Create an account';message.textContent='Prototype preview only. Connect Supabase or another authentication provider before collecting real member data.'}
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{backdrop.hidden=false;setMode(b.dataset.modal)}));
document.getElementById('closeModal').addEventListener('click',()=>backdrop.hidden=true);
backdrop.addEventListener('click',e=>{if(e.target===backdrop)backdrop.hidden=true});
sw.addEventListener('click',()=>setMode(mode==='signin'?'register':'signin'));
document.getElementById('accountForm').addEventListener('submit',e=>{e.preventDefault();message.textContent='This visual demo is not connected to a secure authentication service yet. Connect Supabase and enable database access policies before launch.'});
document.getElementById('saveContact').addEventListener('click',()=>{document.getElementById('contactMessage').textContent='Preview updated. For secure, persistent admin-only edits, connect this form to Supabase and restrict writes to administrator accounts.';const brand=document.querySelectorAll('.brand b');brand.forEach(el=>el.textContent=document.getElementById('orgName').value);});
document.getElementById('year').textContent=new Date().getFullYear();
setMode('signin');

const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));const menu=$("#menu"),nav=$("#nav");menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"✕ Close":"☰ Menu"});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰ Menu"}));
$$(".filter").forEach(b=>b.addEventListener("click",()=>{$$(".filter").forEach(x=>{x.classList.remove("active");x.setAttribute("aria-pressed","false")});b.classList.add("active");b.setAttribute("aria-pressed","true");$$(".work-card").forEach(c=>c.hidden=b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter)}));
const dlg=$("#projectdialog");function showCard(c){$("#dialogTitle").textContent=c.dataset.title;$("#dialogDesc").textContent=c.dataset.desc;if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","")}$$(".work-card").forEach(c=>{c.addEventListener("click",()=>showCard(c));c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showCard(c)}})});$("#closeDialog").addEventListener("click",()=>dlg.close());dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
$("#contactform").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f),subject="Portfolio inquiry — "+d.get("topic"),body=`Hello Kutub,\\n\\n${d.get("message")}\\n\\nName: ${d.get("name")}\\nEmail: ${d.get("email")}\\nTopic: ${d.get("topic")}\\n`;$("#status").textContent="Your email app should open with the message prepared. If it does not, use the email link shown on this page.";location.href="mailto:muhammad.kutub@outlook.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)});
// Accessible product presentation slide decks
$$(".presentation-card").forEach(card=>{
  const slides=Array.from(card.querySelectorAll(".deck-slide")), dots=Array.from(card.querySelectorAll(".slide-dot")), status=card.querySelector(".slide-status");
  let current=0;
  function show(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{const active=i===current;slide.classList.toggle("active",active);slide.setAttribute("aria-hidden",String(!active));});
    dots.forEach((dot,i)=>{const active=i===current;dot.classList.toggle("active",active);dot.setAttribute("aria-pressed",String(active));});
    status.textContent=`Slide ${current+1} of ${slides.length}`;
  }
  Array.from(card.querySelectorAll(".slide-arrow")).forEach(btn=>btn.addEventListener("click",()=>show(current+Number(btn.dataset.direction))));
  dots.forEach((dot,i)=>dot.addEventListener("click",()=>show(i)));
  card.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(current-1);if(e.key==="ArrowRight")show(current+1);});
});

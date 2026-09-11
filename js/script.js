const platforms=["AWS","Azure","VMware","Windows","Linux","Citrix","Security"]
  const cx=212, cy=212, R=166;
  const g=document.getElementById('orbitNodes');
  platforms.forEach((p,i)=>{
    const a=(i/platforms.length)*Math.PI*2 - Math.PI/2;
    const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
    const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",x); c.setAttribute("cy",y); c.setAttribute("r",28);
    c.setAttribute("fill","#0a1226"); c.setAttribute("stroke", i%2===0?"#4f8bff":"#38d6d0"); c.setAttribute("stroke-width","1.2");
    g.appendChild(c);
    const t=document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",x); t.setAttribute("y",y+3.2); t.setAttribute("text-anchor","middle");
    t.setAttribute("class","platform-label"); t.setAttribute("font-family","IBM Plex Mono");
    t.textContent=p;
    g.appendChild(t);
  });

/* ---- next script block ---- */

document.getElementById('year').textContent = new Date().getFullYear();
  const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:0.15});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

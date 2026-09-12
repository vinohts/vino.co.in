const platforms=["AWS","Azure","VMware","Windows","Linux","Citrix","Security"]
  const cx=212, cy=212, R=166;
  const g=document.getElementById('orbitNodes');
  const orbitDuration=105; // seconds per full revolution — slow, ambient drift

  platforms.forEach((p,i)=>{
    const a=(i/platforms.length)*Math.PI*2 - Math.PI/2;
    const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);

    // outer group: revolves around the fixed center point
    const orbitG=document.createElementNS("http://www.w3.org/2000/svg","g");
    orbitG.classList.add("orbit-node");
    orbitG.style.transformBox="view-box";
    orbitG.style.transformOrigin=`${cx}px ${cy}px`;
    orbitG.style.animation=`orbit ${orbitDuration}s linear infinite`;

    // inner group: counter-rotates so circle+label stay upright
    const counterG=document.createElementNS("http://www.w3.org/2000/svg","g");
    counterG.classList.add("orbit-counter");
    counterG.style.transformBox="view-box";
    counterG.style.transformOrigin=`${x}px ${y}px`;
    counterG.style.animation=`counter-orbit ${orbitDuration}s linear infinite`;

    const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",x); c.setAttribute("cy",y); c.setAttribute("r",28);
    c.setAttribute("fill","#0a1226"); c.setAttribute("stroke", i%2===0?"#4f8bff":"#38d6d0"); c.setAttribute("stroke-width","1.2");

    const t=document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",x); t.setAttribute("y",y+3.2); t.setAttribute("text-anchor","middle");
    t.setAttribute("class","platform-label"); t.setAttribute("font-family","IBM Plex Mono");
    t.textContent=p;

    counterG.appendChild(c);
    counterG.appendChild(t);
    orbitG.appendChild(counterG);
    g.appendChild(orbitG);
  });

/* ---- next script block ---- */

document.getElementById('year').textContent = new Date().getFullYear();
  const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:0.15});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
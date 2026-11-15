(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('menu');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.classList.toggle('menu-open',o);});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}});}

  var box,img,cap,licz,grupa=[],idx=0,ostatni=null;
  function zbuduj(){
    box=document.createElement('div');box.className='lb-box';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Podgląd zdjęcia');
    box.innerHTML='<span class="lb-licz"></span><figure><img alt=""><figcaption></figcaption></figure><button class="lb-p" aria-label="Poprzednie zdjęcie">&#8249;</button><button class="lb-n" aria-label="Następne zdjęcie">&#8250;</button><button class="lb-x" aria-label="Zamknij">&#215;</button>';
    document.body.appendChild(box);img=box.querySelector('img');cap=box.querySelector('figcaption');licz=box.querySelector('.lb-licz');
    box.querySelector('.lb-x').onclick=zamknij;box.querySelector('.lb-p').onclick=function(){krok(-1)};box.querySelector('.lb-n').onclick=function(){krok(1)};
    box.addEventListener('click',function(e){if(e.target===box||e.target.tagName==='FIGURE')zamknij();});
    var x0=null;box.addEventListener('pointerdown',function(e){x0=e.clientX});box.addEventListener('pointerup',function(e){if(x0===null)return;var d=e.clientX-x0;x0=null;if(Math.abs(d)>50)krok(d<0?1:-1);});
  }
  function pokaz(){var a=grupa[idx];img.src=a.getAttribute('href');var t=a.getAttribute('data-podpis')||(a.querySelector('img')&&a.querySelector('img').alt)||'';img.alt=t;cap.textContent=t;licz.textContent=grupa.length>1?(idx+1)+' / '+grupa.length:'';
    box.querySelector('.lb-p').style.display=box.querySelector('.lb-n').style.display=grupa.length>1?'':'none';}
  function krok(d){idx=(idx+d+grupa.length)%grupa.length;pokaz();}
  function zamknij(){box.classList.remove('open');document.body.style.overflow='';if(ostatni)ostatni.focus();}
  document.addEventListener('click',function(e){var a=e.target.closest('a.lb');if(!a)return;e.preventDefault();if(!box)zbuduj();
    var g=a.closest('[data-galeria]');grupa=g?[].slice.call(g.querySelectorAll('a.lb')):[a];idx=grupa.indexOf(a);ostatni=a;pokaz();box.classList.add('open');document.body.style.overflow='hidden';box.querySelector('.lb-x').focus();});
  document.addEventListener('keydown',function(e){if(!box||!box.classList.contains('open'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowRight')krok(1);if(e.key==='ArrowLeft')krok(-1);});

  var f=document.querySelector('form.form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();f.classList.add('wyslany');});
})();

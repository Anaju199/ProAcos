document.getElementById("searchForm").addEventListener("submit",(async function(t){t.preventDefault();const e=document.getElementById("start_date").value,n=document.getElementById("end_date").value,a=document.createElement("table"),d=document.getElementById("results");try{const t=await fetch(`/api?start_date=${e}&end_date=${n}`);if(!t.ok)throw new Error("Erro ao buscar os dados");const s=await t.json();d.innerHTML="";const o='\n        <table class="table table-light">\n          <thead>\n            <tr>\n              <th>ID</th>\n              <th>Item</th>\n              <th>Quant.</th>\n              <th>Entrada</th>\n              <th>Saída</th>\n           </tr>\n          </thead>\n          <tbody>\n      ';a.innerHTML=o,s.forEach(((t,e)=>{const n=new Date(t.datalote).toLocaleDateString("pt-BR"),d=new Date(t.datavenda).toLocaleDateString("pt-BR"),s=`\n          <tr class="${e%2==0?"odd":"even"}">\n            <td class='lista'>${t.id}</td>\n            <td class='lista'>${t.item}</td>\n            <td class='lista'>${t.quant}</td>\n            <td class='lista'>${n}</td>\n            <td class='lista'>${d}</td>\n         </tr>\n        `;a.innerHTML+=s})),a.innerHTML+="</tbody></table>",d.appendChild(a)}catch(t){console.error(t),d.textContent="Erro ao buscar os dados"}}));
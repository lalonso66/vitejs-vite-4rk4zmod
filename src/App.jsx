import { useState } from "react";

const SHEETS_URL="https://script.google.com/macros/s/AKfycbxRrfWAoCngO2I7iZVtcNFtTDKc-IIQqHyms4KF-FSY61ldKozHsdeyehO5JUj80SDf/exec";
const WA="5535999894181";
const INSTA="https://instagram.com/laconsultancybr";
const EMAIL_CTT="laconsultancybr@gmail.com";

const BENCH_NOTE=`As referências usadas neste diagnóstico foram desenvolvidas pela LA Consultancy em parceria com o CIAF, baseadas na metodologia Winning by Design e aperfeiçoadas para a realidade do varejista e empresário brasileiro. Não existe certo ou errado — o objetivo é te dar um ponto de partida honesto para enxergar onde estão as maiores oportunidades no seu negócio.`;

const FOMO={
  leads:["Negócios que não medem quem chega até eles perdem em média 40% das oportunidades sem saber","Saber de onde vêm seus melhores clientes pode reduzir seu custo de divulgação pela metade","A maioria dos donos de negócio chuta esse número — e chuta errado"],
  mql:["Você provavelmente está gastando energia com pessoas que nunca vão comprar","Qualificar melhor pode dobrar sua taxa de fechamento sem aumentar o time","Negócios que definem o perfil ideal do cliente vendem mais com menos esforço"],
  sql:["Demora no retorno é a principal razão de perda de venda no varejo brasileiro","Um processo simples de follow-up pode recuperar 20-30% das vendas perdidas","Quem responde primeiro tende a vender mais — independente do preço"],
  opp:["A maioria dos negócios não sabe quantos orçamentos abertos têm agora — e isso custa caro","Propostas sem acompanhamento são dinheiro na mesa que ninguém vai buscar","Um pipeline organizado prevê o faturamento do próximo mês antes que ele aconteça"],
  won:["Conquistar o cliente errado custa mais do que não conquistar nenhum","Clientes mal escolhidos pedem desconto, reclamam mais e saem cedo","Os melhores negócios crescem sendo mais seletivos, não menos"],
  onb:["A maioria dos cancelamentos começa nos primeiros 30 dias — silenciosamente","Cliente que não começa bem não fica. E quase nunca avisa por quê","Um bom processo de boas-vindas pode reduzir o abandono em até 3x"],
  ado:["Cliente que não usa o que comprou está prestes a cancelar — mesmo sem falar nada","Engajamento ativo é o maior sinal de que a renovação vai acontecer","Negócios que acompanham o uso retêm até 2x mais clientes"],
  ret:["Perder 1 cliente por mês parece pouco. Em 1 ano você perdeu parte relevante da base","Reter é até 7x mais barato do que conquistar um cliente novo","O balde furado: quanto mais você coloca, mais vaza pelo buraco do churn"],
  exp:["Seu maior potencial de crescimento está nos clientes que você já tem","Vender mais para quem já confia em você custa até 5x menos","Negócios que exploram expansão crescem mesmo em meses ruins de aquisição"],
  adv:["Indicação é o canal mais barato e mais ignorado do varejo brasileiro","Clientes que indicam têm ticket médio 16% maior que os captados por anúncio","Se seus clientes não falam de você, alguém está falhando em criar momentos memoráveis"],
};

const RAMOS=["Auto Peças / Acessórios","Auto Mecânica / Oficina","Pet Shop / Veterinária","Livraria / Papelaria","Pequena Indústria","Média Indústria","Distribuidora / Atacado","Loja de Móveis / Decoração","Material de Construção","Escola / Curso Técnico","Academia / Studio Fitness","Salão de Beleza / Estética","Alimentação / Lanchonete","Moda / Vestuário","SaaS / Software","Consultoria / Serviços","Financeiro / FinTech","Agro / AgroTech","Outro"];
const AREAS=["Dono / Sócio","CEO / Diretor Geral","Diretor Comercial","Gerente de Vendas","Responsável pelo Marketing","Gestor de Atendimento / CS","Outro"];

const MODELS={
  low:{label:"Low Touch",sub:"Venda pelo site / sem vendedor",desc:"O cliente descobre, escolhe e compra sozinho.",examples:["Loja virtual de auto peças","Pet shop com delivery online","Livraria com e-commerce","Loja de moda com Instagram Shop","Curso gravado / EAD"],color:"#3B82F6",b:{l_mql:5,mql_sql:15,sql_opp:30,opp_won:20,onb:70,ado:50,ret:85,exp:15,adv:10,nrr:100,churn:3,payback:12,ltv_cac:3}},
  medium:{label:"Medium Touch",sub:"Venda com ajuda da equipe",desc:"O cliente precisa de um atendente ou vendedor para fechar.",examples:["Auto mecânica / oficina","Pet shop físico com recorrência","Distribuidora regional","Escola técnica / cursos presenciais","Pequena indústria com representantes"],color:"#8B5CF6",b:{l_mql:15,mql_sql:25,sql_opp:40,opp_won:25,onb:80,ado:65,ret:90,exp:25,adv:20,nrr:110,churn:1.5,payback:18,ltv_cac:4}},
  high:{label:"High Touch",sub:"Venda consultiva / relacionamento",desc:"A venda exige visitas, propostas e negociação com múltiplos decisores.",examples:["Média indústria / fornecedor B2B","Distribuidora com contratos anuais","Empresa de reformas / construção","Fornecedor de máquinas e equipamentos","Serviços terceirizados (limpeza, segurança, TI)"],color:"#10B981",b:{l_mql:10,mql_sql:30,sql_opp:50,opp_won:35,onb:90,ado:75,ret:95,exp:35,adv:30,nrr:120,churn:0.5,payback:24,ltv_cac:5}}
};

const POPUPS={
  leads:{title:"Visitantes e Leads",what:"Todo mundo que demonstrou interesse: entrou na loja, visitou o site, pediu orçamento ou foi indicado.",why:"Se poucas pessoas chegam, o problema é atração. Se chegam muitas mas compram poucas, o problema é conversão.",impact:"Sem esse número, é impossível melhorar qualquer etapa."},
  mql:{title:"Lead com Potencial Real",what:"Dos que chegaram, quantos têm perfil certo para comprar?",why:"Muitos negócios perdem tempo tentando vender para quem nunca vai comprar.",impact:"Sem qualificação, você gasta energia igual com quem vai comprar e quem só está pesquisando."},
  sql:{title:"Prontos para Comprar",what:"Dos qualificados, quantos estão prontos para receber uma proposta?",why:"Revela se seu processo de atendimento está funcionando.",impact:"Quando baixo, geralmente é abordagem errada ou demora no retorno."},
  opp:{title:"Propostas em Aberto",what:"Quantos orçamentos ou negociações estão abertos agora?",why:"É o termômetro das suas vendas.",impact:"Se esse número cai, o faturamento cai logo em seguida."},
  won:{title:"Clientes Novos Conquistados",what:"Quantos clientes novos você conquista por mês?",why:"É o resultado direto de toda a máquina de aquisição.",impact:"Cliente mal escolhido consome energia, pede desconto e sai cedo."},
  onb:{title:"Clientes que Começaram Bem",what:"De cada 100 clientes novos, quantos realmente começaram como você esperava?",why:"Aqui o cliente decide se vai continuar ou abandonar.",impact:"Cliente que não começa bem, não fica."},
  ado:{title:"Clientes Ativos e Engajados",what:"Dos seus clientes, quantos estão realmente engajados e percebendo valor?",why:"Uso ativo é o maior sinal de que o cliente vai ficar.",impact:"Clientes inativos são os primeiros a ir embora."},
  ret:{title:"Clientes que Ficaram",what:"De cada 100 clientes, quantos continuam comprando de você?",why:"Sem retenção, você corre só para manter o que tem.",impact:"Perder 20% dos clientes por ano significa repor todos eles só para não encolher."},
  exp:{title:"Clientes que Compraram Mais",what:"Dos clientes atuais, quantos compraram algo adicional?",why:"Vender mais para quem já é seu cliente custa até 5x menos.",impact:"Sem expansão, você depende 100% de novos clientes para crescer."},
  adv:{title:"Clientes que Te Indicaram",what:"Quantos clientes recomendam seu negócio sem você pedir?",why:"Indicação é o sinal mais forte de valor entregue.",impact:"Negócios de indicação têm custo de aquisição próximo de zero."},
  ticket:{title:"Quanto Cada Cliente Paga por Ano",what:"Some tudo que um cliente médio paga em 12 meses.",why:"Define o modelo comercial que você pode sustentar.",impact:"Quem não sabe o que cada cliente vale não sabe se está lucrando."},
  ltv:{title:"Valor Total de Um Cliente",what:"Tudo que um cliente paga enquanto permanece com você.",why:"Responde: quanto posso gastar para conquistar um cliente e ainda lucrar?",impact:"Sem saber o LTV, você chuta o custo de aquisição."},
  cac:{title:"Quanto Custa Conquistar Um Cliente",what:"Tudo gasto para trazer um novo cliente dividido pelos clientes novos.",why:"CAC crescendo é o primeiro sinal de que algo está errado.",impact:"CAC alto + cliente que paga pouco = prejuízo por venda."},
  midia:{title:"Investimento Mensal em Divulgação",what:"Tudo que vai para Google, Instagram, panfletos, patrocínios.",why:"Permite calcular se os canais pagos estão trazendo retorno.",impact:"Crescer só por anúncio pago é caro e arriscado."},
  nrr:{title:"Sua Receita Está Crescendo ou Encolhendo?",what:"Considera clientes que saíram, reduziram E os que compraram mais. Acima de 100% = cresce sozinha.",why:"É o número mais importante do lado direito do funil.",impact:"Acima de 100% = cresce sem novos clientes. Abaixo = perde receita mesmo mantendo todos."},
  churn:{title:"Quantos Clientes Você Perde Todo Mês",what:"Se tinha 100 clientes e perdeu 5, seu churn é 5%.",why:"O churn é o buraco no balde.",impact:"5% ao mês = metade da base perdida em 1 ano."},
  ciclo:{title:"Quanto Tempo Leva Para Fechar Uma Venda",what:"Do primeiro contato até o dinheiro na conta.",why:"Ciclo longo = fluxo de caixa imprevisível.",impact:"Reduzir 20% do ciclo aumenta a capacidade do time em até 25%."},
  equipe_cs:{title:"Time de Pós-Venda / Atendimento",what:"Quantas pessoas cuidam dos clientes depois que eles compram?",why:"A proporção time/clientes define a qualidade do atendimento.",impact:"Time pequeno demais = atendimento reativo."},
  clientes_cs:{title:"Quantos Clientes Cada Pessoa Atende",what:"Total de clientes ativos dividido pelo time de pós-venda.",why:"Diz se seu time tem capacidade de atender bem.",impact:"Acima de 150 sem automação = atendimento vira apagador de incêndios."}
};

const BOWTIE=[
  {id:"leads",label:"Visitantes e Leads",short:"LEADS",side:"left",i:0,unit:"pessoas/mês",ph:"Ex: 500"},
  {id:"mql",label:"Leads com Potencial",short:"POTENCIAL",side:"left",i:1,unit:"leads/mês",ph:"Ex: 80"},
  {id:"sql",label:"Prontos para Comprar",short:"PRONTOS",side:"left",i:2,unit:"leads/mês",ph:"Ex: 30"},
  {id:"opp",label:"Propostas Abertas",short:"PROPOSTAS",side:"left",i:3,unit:"orçamentos/mês",ph:"Ex: 15"},
  {id:"won",label:"Clientes Novos",short:"FECHADOS",side:"center",unit:"clientes/mês",ph:"Ex: 5"},
  {id:"onb",label:"Clientes que começaram bem (%)",short:"INÍCIO",side:"right",ri:0,unit:"%",ph:"Ex: 60",popsicle:true},
  {id:"ado",label:"Clientes ativos e engajados (%)",short:"ATIVO",side:"right",ri:1,unit:"%",ph:"Ex: 40",popsicle:true},
  {id:"ret",label:"Clientes que ficaram (%)",short:"FICARAM",side:"right",ri:2,unit:"%",ph:"Ex: 75"},
  {id:"exp",label:"Clientes que compraram mais (%)",short:"MAIS",side:"right",ri:3,unit:"%",ph:"Ex: 10"},
  {id:"adv",label:"Clientes que indicaram (%)",short:"INDICOU",side:"right",ri:4,unit:"%",ph:"Ex: 5"},
];

const BIZF=[
  {id:"ticket",label:"Quanto cada cliente paga por ano (R$)",unit:"R$/ano",ph:"Ex: 3600"},
  {id:"ltv",label:"Valor total de um cliente (R$)",unit:"R$",ph:"Ex: 10800"},
  {id:"cac",label:"Quanto custa conquistar um cliente novo (R$)",unit:"R$",ph:"Ex: 800"},
  {id:"midia",label:"Investimento mensal em anúncios (R$)",unit:"R$/mês",ph:"Ex: 1500"},
  {id:"nrr",label:"Sua receita cresce com os clientes atuais? (%)",unit:"%",ph:"Ex: 95"},
  {id:"churn",label:"% de clientes que você perde por mês",unit:"%/mês",ph:"Ex: 5"},
  {id:"ciclo",label:"Dias para fechar uma venda",unit:"dias",ph:"Ex: 15"},
  {id:"equipe_cs",label:"Pessoas no pós-venda / atendimento",unit:"pessoas",ph:"Ex: 1"},
  {id:"clientes_cs",label:"Clientes por pessoa do atendimento",unit:"clientes/pessoa",ph:"Ex: 50"},
];

const BIZ_LAYERS=[
  {id:"revenue",label:"O que cada cliente vale",sub:"Ticket médio e valor de longo prazo",color:"#3B82F6",icon:"◈",fields:["ticket","ltv"]},
  {id:"acquisition",label:"O que você gasta para conquistar",sub:"Custo de aquisição, mídia e ciclo",color:"#F59E0B",icon:"◎",fields:["cac","midia","ciclo"]},
  {id:"retention",label:"O que você faz para manter e crescer",sub:"Crescimento da base, abandono e atendimento",color:"#10B981",icon:"◉",fields:["nrr","churn","equipe_cs","clientes_cs"]},
];

const VH=160;
const lPts=i=>{const x1=i*70,x2=(i+1)*70,m1=i*13,m2=i<3?(i+1)*13:60;return`${x1},${m1} ${x2},${m2} ${x2},${VH-m2} ${x1},${VH-m1}`;};
const wonPts="280,60 360,60 360,100 280,100";
const rPts=i=>{const x1=360+i*56,x2=360+(i+1)*56,m1=12*(5-i),m2=12*(4-i);return`${x1},${m1} ${x2},${m2} ${x2},${VH-m2} ${x1},${VH-m1}`;};
const PREV={mql:"leads",sql:"mql",opp:"sql",won:"opp"};
const BKEY={mql:"l_mql",sql:"mql_sql",opp:"sql_opp",won:"opp_won",onb:"onb",ado:"ado",ret:"ret",exp:"exp",adv:"adv"};
const perfClr=(v,b,inv=false)=>{if(!v||!b||isNaN(v))return"#1f2937";const r=v/b;if(inv)return r<=0.8?"#15803d":r<=1.2?"#b45309":"#991b1b";return r>=0.9?"#15803d":r>=0.7?"#b45309":"#991b1b";};
const fmtVal=(id,bt)=>{const v=parseFloat(bt[id]);if(isNaN(v)||!bt[id])return"—";return v>=10000?`${(v/1000).toFixed(0)}k`:v>=1000?`${(v/1000).toFixed(1)}k`:String(v);};
const fmtR=(n)=>n>=1000000?`R$${(n/1000000).toFixed(1)}M`:n>=1000?`R$${(n/1000).toFixed(0)}k`:`R$${Math.round(n)}`;
const rates=(bt)=>{const r=(a,b)=>a&&b&&parseFloat(b)>0?((parseFloat(a)/parseFloat(b))*100).toFixed(1):null;return{l_mql:r(bt.mql,bt.leads),mql_sql:r(bt.sql,bt.mql),sql_opp:r(bt.opp,bt.sql),opp_won:r(bt.won,bt.opp)};};

// ── PDF via print nativo ──────────────────────────────────────────────────────
function gerarPDF(cad,M,bt,biz,teaserText){
  const r=rates(bt);
  const html=`<html><head><title>Diagnóstico RevArch</title>
  <style>body{font-family:Arial,sans-serif;color:#1a1a2e;padding:32px;max-width:700px;margin:0 auto}h1{font-size:22px;margin-bottom:4px}h2{font-size:15px;color:#374151;border-bottom:1px solid #e5e7eb;padding-bottom:6px;margin-top:24px}.badge{display:inline-block;background:#ede9fe;color:#5b21b6;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600}.sub{color:#6b7280;font-size:13px;margin-bottom:16px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0}.card{border:1px solid #e5e7eb;border-radius:8px;padding:12px}.card .lbl{font-size:11px;color:#9ca3af;margin-bottom:4px}.card .val{font-size:20px;font-weight:700;color:#1a1a2e}.card .ref{font-size:11px;color:#d1d5db}.analysis{background:#f9fafb;border-radius:8px;padding:16px;margin-top:12px;font-size:13px;line-height:1.7;color:#374151}.footer{margin-top:32px;font-size:11px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:16px}</style></head>
  <body>
  <p style="color:#6b7280;font-size:12px;margin-bottom:4px">LA Consultancy + CIAF — Revenue Architecture</p>
  <h1>${cad.nome||"Empresário"}</h1>
  <p class="sub">${cad.ramo||""} · ${cad.area||""} · <span class="badge">${M?.label||""}</span> · ${new Date().toLocaleDateString("pt-BR")}</p>
  <h2>Métricas Principais</h2>
  <div class="grid">
    <div class="card"><div class="lbl">Retenção (GRR)</div><div class="val">${bt.ret?bt.ret+"%":"—"}</div><div class="ref">ref: ${M?.b?.ret||0}%</div></div>
    <div class="card"><div class="lbl">Perda Mensal de Clientes</div><div class="val">${biz.churn?biz.churn+"%":"—"}</div><div class="ref">ref: ${M?.b?.churn||0}%</div></div>
    <div class="card"><div class="lbl">Proposta → Fechado</div><div class="val">${r.opp_won?r.opp_won+"%":"—"}</div><div class="ref">ref: ${M?.b?.opp_won||0}%</div></div>
    <div class="card"><div class="lbl">Ticket Anual</div><div class="val">${biz.ticket?"R$"+parseFloat(biz.ticket).toLocaleString("pt-BR"):"—"}</div><div class="ref"></div></div>
  </div>
  <h2>O que encontramos no seu negócio</h2>
  <div class="analysis">${(teaserText||"").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>")}</div>
  <div class="footer">Diagnóstico inicial — Revenue Architecture — LA Consultancy + CIAF<br/>O relatório completo será apresentado em uma conversa com o especialista.<br/>${EMAIL_CTT} · +55 35 9 9989-4181</div>
  </body></html>`;
  const win=window.open("","_blank");
  if(!win){alert("Permita pop-ups para baixar o PDF.");return;}
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(()=>win.print(),600);
}

// ── AI call via proxy ─────────────────────────────────────────────────────────
// ── FUNÇÃO 1: substitui callAI ────────────────────────────────────────────────
async function callAI(prompt){
  const SUPA_URL="https://qxbsltxpawgfptppfyqk.supabase.co";
  const SUPA_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YnNsdHhwYXdnZnB0cHBmeXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzk2NDcsImV4cCI6MjA5MTY1NTY0N30.rKLkJA--3Jj2Nsvinqctqvy47iBtmjuZfRgktafVpWw";
  const system=`Você é especialista em Revenue Architecture pela metodologia Winning by Design, adaptada para o varejo brasileiro pela LA Consultancy + CIAF. Responda sempre em português brasileiro, de forma direta e prática.`;
  let res;
  try{
    res=await fetch(`${SUPA_URL}/functions/v1/claude-proxy`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${SUPA_KEY}`},
      body:JSON.stringify({system,max_tokens:1500,messages:[{role:"user",content:prompt}]})
    });
  }catch(networkErr){
    throw new Error("Sem conexão com o servidor. Verifique sua internet e tente novamente.");
  }
  let data;
  try{data=await res.json();}
  catch{throw new Error("Resposta inválida do servidor (código "+res.status+").");}
  if(!res.ok){
    const msg=data?.error?(typeof data.error==="string"?data.error:data.error?.message||JSON.stringify(data.error)):"Erro "+res.status+" no servidor.";
    throw new Error(msg);
  }
  const text=data?.content?.find(c=>c.type==="text")?.text;
  if(!text)throw new Error("A IA não retornou conteúdo. Tente novamente.");
  return text;
}

// ── FUNÇÃO 2: substitui saveToSheets ─────────────────────────────────────────
async function saveToSheets(cad,M,bt,biz,relatorio){
  const SUPA_URL="https://qxbsltxpawgfptppfyqk.supabase.co";
  const SUPA_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YnNsdHhwYXdnZnB0cHBmeXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzk2NDcsImV4cCI6MjA5MTY1NTY0N30.rKLkJA--3Jj2Nsvinqctqvy47iBtmjuZfRgktafVpWw";
  const r=rates(bt);
  const payload={
    timestamp:new Date().toLocaleString("pt-BR"),
    nome:cad.nome||"",email:cad.email||"",tel:cad.tel||"",
    ramo:cad.ramo||"",area:cad.area||"",modelo:M?.label||"",
    nrr:biz.nrr||"",churn:biz.churn||"",ticket:biz.ticket||"",cac:biz.cac||"",
    conv_lead_mql:r.l_mql||"",conv_opp_won:r.opp_won||"",
    ret:bt.ret||"",ado:bt.ado||"",
    relatorio_completo:relatorio||"",
    origem:"revenue-arch-v3"
  };
  try{
    const res=await fetch(`${SUPA_URL}/functions/v1/save-diagnostic`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${SUPA_KEY}`},
      body:JSON.stringify(payload)
    });
    const data=await res.json();
    return data?.success===true;
  }catch{
    return false;
  }
}

// ── Sheets + Email via Apps Script ────────────────────────────────────────────
async function saveToSheets(cad,M,bt,biz,relatorio){
  const r=rates(bt);
  const payload={
    timestamp:new Date().toLocaleString("pt-BR"),
    nome:cad.nome||"",email:cad.email||"",tel:cad.tel||"",
    ramo:cad.ramo||"",area:cad.area||"",modelo:M?.label||"",
    nrr:biz.nrr||"",churn:biz.churn||"",ticket:biz.ticket||"",cac:biz.cac||"",
    conv_lead_mql:r.l_mql||"",conv_opp_won:r.opp_won||"",
    ret:bt.ret||"",ado:bt.ado||"",
    relatorio_completo:relatorio||"",
    origem:"revenue-arch-v3"
  };
  try{
    await fetch(SHEETS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    return true;
  }catch{
    return false; // falha silenciosa — não bloqueia o fluxo
  }
}

// ── Componentes ───────────────────────────────────────────────────────────────
function Popup({field,onClose}){
  const c=POPUPS[field];if(!c)return null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"1rem"}} onClick={onClose}>
      <div style={{background:"#111827",border:"1px solid #374151",borderRadius:16,maxWidth:440,width:"100%",padding:"1.5rem"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1.25rem"}}>
          <span style={{color:"#fff",fontWeight:600,fontSize:15}}>{c.title}</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        {[["📖 O que é","#60a5fa",c.what],["🎯 Por que olhar","#a78bfa",c.why],["⚡ O que acontece se ignorar","#34d399",c.impact]].map(([l,c2,t])=>(
          <div key={l} style={{marginBottom:"1rem"}}>
            <div style={{color:c2,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{l}</div>
            <p style={{color:"#d1d5db",fontSize:13,lineHeight:1.65,margin:0}}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FomoBullets({stageId}){
  const items=FOMO[stageId];if(!items)return null;
  return(
    <div style={{background:"#0f172a",border:"1px solid #1f2937",borderRadius:10,padding:"10px 12px",marginBottom:10}}>
      {items.map((txt,i)=>(
        <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:i<items.length-1?6:0}}>
          <span style={{color:"#f59e0b",fontSize:12,flexShrink:0,marginTop:1}}>→</span>
          <span style={{color:"#6b7280",fontSize:12,lineHeight:1.5}}>{txt}</span>
        </div>
      ))}
    </div>
  );
}

const segClr=(s,bt,mode,activeId,mc,bench)=>{
  if(mode==="input"){if(s.id===activeId)return mc;if(bt[s.id])return mc+"88";return"#1f2937";}
  if(mode==="metrics"){
    if(s.side==="right")return perfClr(parseFloat(bt[s.id]),bench?.[s.id]);
    if(s.id==="leads")return bt.leads?"#374151":"#1f2937";
    return perfClr(parseFloat(bt[s.id])&&parseFloat(bt[PREV[s.id]])>0?(parseFloat(bt[s.id])/parseFloat(bt[PREV[s.id]]))*100:null,bench?.[BKEY[s.id]]);
  }
  return"#1f2937";
};

function BowtieSVG({bt,activeId,onStage,mode,mc,bench}){
  const left=BOWTIE.filter(s=>s.side==="left");
  const right=BOWTIE.filter(s=>s.side==="right");
  const wonClr=()=>{if(mode==="metrics"){const v=parseFloat(bt.won),p=parseFloat(bt.opp);return perfClr(p>0?(v/p)*100:null,bench?.opp_won);}if(activeId==="won")return mc;if(bt.won)return mc+"88";return"#374151";};
  return(
    <div style={{overflowX:"auto"}}>
      <svg viewBox="0 0 640 160" style={{width:"100%",minWidth:320,display:"block"}}>
        {left.map(s=>{const clr=segClr(s,bt,mode,activeId,mc,bench);const cx=s.i*70+35,isA=activeId===s.id;return(<g key={s.id} onClick={()=>onStage?.(s.id)} style={{cursor:onStage?"pointer":"default"}}><polygon points={lPts(s.i)} fill={clr} stroke="#030712" strokeWidth="2.5"/>{isA&&<polygon points={lPts(s.i)} fill="none" stroke={mc} strokeWidth="2" strokeDasharray="4 2"/>}<text x={cx} y={72} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#ffffffaa">{s.short}</text><text x={cx} y={88} textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">{fmtVal(s.id,bt)}</text></g>);})}
        <g onClick={()=>onStage?.("won")} style={{cursor:onStage?"pointer":"default"}}><polygon points={wonPts} fill={wonClr()} stroke="#030712" strokeWidth="2.5"/>{activeId==="won"&&<polygon points={wonPts} fill="none" stroke={mc} strokeWidth="2" strokeDasharray="4 2"/>}<text x={320} y={74} textAnchor="middle" fontSize="7" fontWeight="700" fill="#ffffffaa">FECHADOS</text><text x={320} y={90} textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">{fmtVal("won",bt)}</text></g>
        {right.map(s=>{const clr=segClr(s,bt,mode,activeId,mc,bench);const cx=360+s.ri*56+28,isA=activeId===s.id;return(<g key={s.id} onClick={()=>onStage?.(s.id)} style={{cursor:onStage?"pointer":"default"}}><polygon points={rPts(s.ri)} fill={clr} stroke="#030712" strokeWidth="2.5"/>{isA&&<polygon points={rPts(s.ri)} fill="none" stroke={mc} strokeWidth="2" strokeDasharray="4 2"/>}<text x={cx} y={72} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#ffffffaa">{s.short}</text><text x={cx} y={88} textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">{fmtVal(s.id,bt)}</text></g>);})}
        <text x={140} y={155} textAnchor="middle" fontSize="8" fill="#374151">← CONQUISTAR CLIENTES →</text>
        <text x={504} y={155} textAnchor="middle" fontSize="8" fill="#374151">← MANTER E FAZER CRESCER →</text>
      </svg>
    </div>
  );
}

function StageCard({stage,bt,onVal,onPrev,onNext,onInfo,mc,bench,isLast}){
  const val=bt[stage.id]||"";
  let bi=null;
  if(stage.id!=="leads"&&bench){
    if(stage.side==="right"){const v=parseFloat(val),b=bench[stage.id];if(!isNaN(v)&&b){const d=v-b,g=d>=0;bi={your:`${v}%`,benchStr:`${b}%`,good:g,msg:g?`${d.toFixed(0)}pp acima`:`${Math.abs(d).toFixed(0)}pp abaixo`};}}
    else if(PREV[stage.id]){const v=parseFloat(val),p=parseFloat(bt[PREV[stage.id]]),b=bench[BKEY[stage.id]];if(!isNaN(v)&&!isNaN(p)&&p>0&&b){const rate=v/p*100,d=rate-b,g=d>=0;bi={your:`${rate.toFixed(1)}%`,benchStr:`${b}%`,good:g,msg:g?`${d.toFixed(1)}pp acima`:`${Math.abs(d).toFixed(1)}pp abaixo`};}}
  }
  return(
    <div style={{background:"#111827",border:`1px solid ${mc}44`,borderRadius:16,padding:"1.25rem",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:mc}}/>
        <span style={{color:"#fff",fontWeight:600,fontSize:15}}>{stage.label}</span>
        <button onClick={()=>onInfo(stage.id)} style={{width:18,height:18,borderRadius:"50%",background:"#1f2937",border:"1px solid #374151",color:"#9ca3af",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        {stage.popsicle&&<span style={{fontSize:10,background:"#1a1200",border:"1px solid #713f12",color:"#fbbf24",borderRadius:6,padding:"2px 6px",flexShrink:0}}>Momento Crítico</span>}
      </div>
      <div style={{color:"#4b5563",fontSize:12,marginBottom:8,marginLeft:16}}>{stage.unit}</div>
      <FomoBullets stageId={stage.id}/>
      <input type="number" value={val} onChange={e=>onVal(stage.id,e.target.value)} placeholder={stage.ph} autoFocus
        style={{width:"100%",background:"#0f172a",border:`1px solid ${mc}66`,borderRadius:10,padding:"12px 14px",color:"#fff",fontSize:20,fontWeight:700,outline:"none",boxSizing:"border-box",marginBottom:bi?10:14}}/>
      {bi&&(<div style={{background:bi.good?"#052e16":"#1a0000",borderRadius:10,padding:"10px 12px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><span style={{color:"#fff",fontSize:13,fontWeight:600}}>Você: {bi.your}</span><span style={{color:"#6b7280",fontSize:12,marginLeft:12}}>Ref: {bi.benchStr}</span></div><span style={{color:bi.good?"#34d399":"#f87171",fontSize:12,fontWeight:600}}>{bi.msg}</span></div>)}
      <div style={{display:"flex",gap:8}}>
        {onPrev&&<button onClick={onPrev} style={{flex:1,padding:"10px",borderRadius:10,background:"#1f2937",border:"none",color:"#9ca3af",fontSize:13,cursor:"pointer"}}>← Anterior</button>}
        <button onClick={onNext} style={{flex:2,padding:"10px",borderRadius:10,background:mc,border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>{isLast?"Ver comparação →":"Próxima etapa →"}</button>
      </div>
    </div>
  );
}

function VerticalFunnel({biz,setBiz,onInfo}){
  const [active,setActive]=useState(0);
  const widths=["100%","84%","68%"];
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      {BIZ_LAYERS.map((l,i)=>(
        <div key={l.id} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div onClick={()=>setActive(i)} style={{width:widths[i],background:active===i?l.color+"18":"transparent",border:`1px solid ${l.color}${active===i?"88":"33"}`,borderRadius:12,padding:"12px 16px",cursor:"pointer",marginBottom:active===i?0:3,boxSizing:"border-box"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:l.color,fontSize:22}}>{l.icon}</span>
              <div style={{flex:1}}><div style={{color:"#fff",fontWeight:600,fontSize:14}}>{l.label}</div><div style={{color:"#6b7280",fontSize:12}}>{l.sub}</div></div>
              <span style={{color:l.color,fontSize:12}}>{active===i?"▲":"▼"}</span>
            </div>
          </div>
          {active===i&&(
            <div style={{width:widths[i],boxSizing:"border-box",paddingTop:4,marginBottom:4}}>
              {BIZF.filter(f=>l.fields.includes(f.id)).map(f=>(
                <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,background:"#111827",border:"1px solid #1f2937",borderRadius:10,padding:"10px 12px",marginBottom:4}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      <span style={{color:"#e5e7eb",fontSize:12,fontWeight:500}}>{f.label}</span>
                      {POPUPS[f.id]&&<button onClick={()=>onInfo(f.id)} style={{width:16,height:16,borderRadius:"50%",background:"#1f2937",border:"1px solid #374151",color:"#9ca3af",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>?</button>}
                    </div>
                    <span style={{color:"#4b5563",fontSize:11}}>{f.unit}</span>
                  </div>
                  <input type="number" value={biz[f.id]||""} onChange={e=>setBiz(p=>({...p,[f.id]:e.target.value}))} placeholder={f.ph}
                    style={{width:100,background:"#0f172a",border:"1px solid #374151",borderRadius:8,padding:"6px 10px",color:"#fff",fontSize:13,textAlign:"right",outline:"none"}}/>
                </div>
              ))}
            </div>
          )}
          {i<BIZ_LAYERS.length-1&&<div style={{width:0,height:0,borderLeft:"24px solid transparent",borderRight:"24px solid transparent",borderTop:`12px solid ${l.color}44`,margin:"3px 0"}}/>}
        </div>
      ))}
    </div>
  );
}

function MetricCard({stage,bt,bench,mc,onInfo}){
  if(!stage)return null;
  let yourVal="—",benchStr="—",good=null,pct=0;
  if(stage.side==="right"){const v=parseFloat(bt[stage.id]),b=bench[stage.id];if(!isNaN(v)){yourVal=`${v}%`;benchStr=`${b}%`;good=v>=b*0.9;pct=Math.min((v/b)*100,100);}}
  else if(stage.id==="leads"){yourVal=bt.leads||"—";benchStr="Volume de entrada";}
  else if(PREV[stage.id]){const v=parseFloat(bt[stage.id]),p=parseFloat(bt[PREV[stage.id]]),b=bench[BKEY[stage.id]];if(!isNaN(v)&&!isNaN(p)&&p>0){const rate=(v/p)*100;yourVal=`${rate.toFixed(1)}%`;benchStr=`${b}%`;good=rate>=b*0.9;pct=Math.min((rate/b)*100,100);}}
  const clr=good===null?"#6b7280":good?"#34d399":"#f87171";
  return(
    <div style={{background:"#111827",border:`1px solid ${good===null?"#374151":good?"#15803d44":"#991b1b44"}`,borderRadius:16,padding:"1.25rem",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:mc}}/>
        <span style={{color:"#fff",fontWeight:600,fontSize:15}}>{stage.label}</span>
        <button onClick={()=>onInfo(stage.id)} style={{width:18,height:18,borderRadius:"50%",background:"#1f2937",border:"1px solid #374151",color:"#9ca3af",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        {stage.popsicle&&<span style={{fontSize:10,background:"#1a1200",border:"1px solid #713f12",color:"#fbbf24",borderRadius:6,padding:"2px 6px"}}>Momento Crítico</span>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
        <div><div style={{color:"#6b7280",fontSize:11,marginBottom:2}}>Seu resultado</div><div style={{color:clr,fontSize:28,fontWeight:700}}>{yourVal}</div></div>
        <div style={{textAlign:"right"}}><div style={{color:"#6b7280",fontSize:11,marginBottom:2}}>Referência LA Consultancy</div><div style={{color:"#9ca3af",fontSize:20,fontWeight:600}}>{benchStr}</div></div>
      </div>
      {good!==null&&pct>0&&<div style={{background:"#0f172a",borderRadius:6,height:6,overflow:"hidden",marginBottom:8}}><div style={{height:"100%",width:`${pct}%`,background:clr,borderRadius:6}}/></div>}
      <FomoBullets stageId={stage.id}/>
      {good===false&&<p style={{color:"#f87171",fontSize:12,margin:"8px 0 0"}}>Abaixo da referência — esse ponto merece atenção imediata</p>}
      {good===true&&<p style={{color:"#34d399",fontSize:12,margin:"8px 0 0"}}>Dentro ou acima do esperado</p>}
      {yourVal==="—"&&<p style={{color:"#4b5563",fontSize:12,margin:"8px 0 0",fontStyle:"italic"}}>Dado não informado — ponto cego identificado</p>}
    </div>
  );
}

const buildTeaserPrompt=(cad,M,bt,biz)=>{
  const r=rates(bt);const b=M.b;
  return`Você é consultor da LA Consultancy especializado em Revenue Architecture para o varejo brasileiro.
Empresário: ${cad.nome}, ${cad.area}, ${cad.ramo}, modelo ${M.label}.

OBJETIVO: revelar 40-50% do diagnóstico, gerar curiosidade e FOMO. NÃO use termos: NRR, churn, MQL, SQL, CAC.

Dados do negócio:
- Leads/mês: ${bt.leads||"não informado"} | Clientes novos/mês: ${bt.won||"não informado"}
- Clientes que ficam: ${bt.ret||"não informado"}% (ref: ${b.ret}%) | Ativos: ${bt.ado||"não informado"}% (ref: ${b.ado}%)
- Começaram bem: ${bt.onb||"não informado"}% | Compraram mais: ${bt.exp||"não informado"}% | Indicaram: ${bt.adv||"não informado"}%
- Chegam→potencial: ${r.l_mql||"não calculado"}% (ref: ${b.l_mql}%) | Proposta→Fechado: ${r.opp_won||"não calculado"}% (ref: ${b.opp_won}%)
- Ticket/ano: R$${biz.ticket||"não informado"} | Custo p/ conquistar cliente: R$${biz.cac||"não informado"} | Perda mensal: ${biz.churn||"não informado"}%

Responda com estas 3 seções (títulos em negrito):

**O que já conseguimos enxergar no seu negócio**
2 parágrafos revelando parcialmente. Aponte 1-2 pontos sem explicar como resolver. Deixe a sensação de "tem muito mais aqui".

**O que ainda está escondido nos seus números**
1 parágrafo curto sobre o relatório completo com gargalos em R$ e plano de 90 dias.

**O próximo passo**
1 frase convidando para conversa. Tom: próximo, honesto, sem pressão.`;
};

const buildFullReportPrompt=(cad,M,bt,biz)=>{
  const r=rates(bt);const b=M.b;
  return`Especialista em Revenue Architecture — LA Consultancy + CIAF. Relatório COMPLETO para o consultor.

LEAD: ${cad.nome} | ${cad.ramo} | ${cad.area} | ${M.label} | ${cad.email} | ${cad.tel}
BOWTIE: Leads ${bt.leads||"N/A"} | Pot ${bt.mql||"N/A"} | Pron ${bt.sql||"N/A"} | Prop ${bt.opp||"N/A"} | Won ${bt.won||"N/A"}
Conv: L→P ${r.l_mql||"N/A"}%(b${b.l_mql}) | O→W ${r.opp_won||"N/A"}%(b${b.opp_won})
Onb ${bt.onb||"N/A"}%(b${b.onb}) | Ado ${bt.ado||"N/A"}%(b${b.ado}) | Ret ${bt.ret||"N/A"}%(b${b.ret}) | Exp ${bt.exp||"N/A"}%(b${b.exp})
Ticket R$${biz.ticket||"N/A"}/ano | LTV R$${biz.ltv||"N/A"} | CAC R$${biz.cac||"N/A"} | Churn ${biz.churn||"N/A"}%/mês | Ciclo ${biz.ciclo||"N/A"}d

1. DIAGNÓSTICO EXECUTIVO
2. TOP 3 GARGALOS — impacto em R$, causa, urgência
3. MOMENTOS CRÍTICOS — onde o cliente abandona
4. RECEITA DEIXADA NA MESA — valor em R$
5. PLANO 90 DIAS — semanas 1-4, meses 2-3, KPIs
6. PERFIL COMERCIAL — dor, maturidade, abordagem recomendada`;
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [view,setView]=useState("model");
  const [model,setModel]=useState(null);
  const [popup,setPopup]=useState(null);
  const [cad,setCad]=useState({nome:"",email:"",tel:"",ramo:"",area:""});
  const [lgpd,setLgpd]=useState(false);
  const [cadErr,setCadErr]=useState({});
  const [step,setStep]=useState(1);
  const [activeIdx,setActiveIdx]=useState(0);
  const [activeM3,setActiveM3]=useState(null);
  const [showBench,setShowBench]=useState(false);
  const [bt,setBt]=useState({leads:"",mql:"",sql:"",opp:"",won:"",onb:"",ado:"",ret:"",exp:"",adv:""});
  const [biz,setBiz]=useState({ticket:"",ltv:"",cac:"",midia:"",nrr:"",churn:"",ciclo:"",equipe_cs:"",clientes_cs:""});
  const [teaser,setTeaser]=useState("");
  const [loadingAI,setLoadingAI]=useState(false);
  const [aiError,setAiError]=useState("");
  const [sheetsOk,setSheetsOk]=useState(false);
  const [pdfLoading,setPdfLoading]=useState(false);

  const M=model?MODELS[model]:null;
  const mc=M?.color||"#3B82F6";
  const pct=view==="model"?5:view==="cad"?15:step===1?35:step===2?58:step===3?78:100;
  const filledCount=BOWTIE.filter(s=>bt[s.id]).length;

  const validateCad=()=>{
    const e={};
    if(!cad.nome.trim())e.nome="Nome obrigatório";
    if(!/\S+@\S+\.\S+/.test(cad.email))e.email="Email inválido";
    if(!cad.tel.trim())e.tel="WhatsApp obrigatório";
    if(!cad.ramo)e.ramo="Selecione o ramo";
    if(!cad.area)e.area="Selecione sua área";
    if(!lgpd)e.lgpd="Necessário aceitar para continuar";
    setCadErr(e);return Object.keys(e).length===0;
  };

  const fetchAll=async()=>{
    setLoadingAI(true);setTeaser("");setAiError("");setSheetsOk(false);
    try{
      const [teaserTxt,fullTxt]=await Promise.all([
        callAI(buildTeaserPrompt(cad,M,bt,biz)),
        callAI(buildFullReportPrompt(cad,M,bt,biz))
      ]);
      setTeaser(teaserTxt);
      const saved=await saveToSheets(cad,M,bt,biz,fullTxt);
      setSheetsOk(saved);
    }catch(err){
      setAiError(err.message||"Erro desconhecido. Tente novamente ou entre em contato pelo WhatsApp.");
    }
    setLoadingAI(false);
  };

  const handlePDF=()=>{
    if(!teaser)return;
    setPdfLoading(true);
    try{gerarPDF(cad,M,bt,biz,teaser);}
    catch(e){alert("Erro ao gerar PDF: "+e.message);}
    setPdfLoading(false);
  };

  const reset=()=>{setView("model");setModel(null);setStep(1);setActiveIdx(0);setActiveM3(null);setShowBench(false);setCad({nome:"",email:"",tel:"",ramo:"",area:""});setLgpd(false);setCadErr({});setBt({leads:"",mql:"",sql:"",opp:"",won:"",onb:"",ado:"",ret:"",exp:"",adv:""});setBiz({ticket:"",ltv:"",cac:"",midia:"",nrr:"",churn:"",ciclo:"",equipe_cs:"",clientes_cs:""});setTeaser("");setAiError("");setSheetsOk(false);};

  const inp=(lbl,key,type="text",err)=>(
    <div style={{marginBottom:12}}>
      <label style={{color:"#9ca3af",fontSize:12,display:"block",marginBottom:4}}>{lbl}</label>
      <input type={type} value={cad[key]} onChange={e=>setCad(p=>({...p,[key]:e.target.value}))} onFocus={()=>setCadErr(p=>({...p,[key]:""}))}
        style={{width:"100%",background:"#0f172a",border:`1px solid ${err?"#7f1d1d":"#374151"}`,borderRadius:10,padding:"10px 12px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
      {err&&<span style={{color:"#f87171",fontSize:11}}>{err}</span>}
    </div>
  );
  const sel=(lbl,key,opts,err)=>(
    <div style={{marginBottom:12}}>
      <label style={{color:"#9ca3af",fontSize:12,display:"block",marginBottom:4}}>{lbl}</label>
      <select value={cad[key]} onChange={e=>setCad(p=>({...p,[key]:e.target.value}))}
        style={{width:"100%",background:"#0f172a",border:`1px solid ${err?"#7f1d1d":"#374151"}`,borderRadius:10,padding:"10px 12px",color:cad[key]?"#fff":"#6b7280",fontSize:14,outline:"none",boxSizing:"border-box"}}>
        <option value="">Selecionar...</option>
        {opts.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
      {err&&<span style={{color:"#f87171",fontSize:11}}>{err}</span>}
    </div>
  );

  const curStage=BOWTIE[activeIdx];

  return(
    <div style={{minHeight:"100vh",background:"#030712",padding:"2.5rem 1rem 5rem"}}>
      {popup&&<Popup field={popup} onClose={()=>setPopup(null)}/>}
      <div style={{position:"fixed",top:0,left:0,right:0,height:3,background:"#1f2937",zIndex:100}}>
        <div style={{height:"100%",width:`${pct}%`,background:mc,transition:"width 0.5s ease"}}/>
      </div>
      <div style={{maxWidth:560,margin:"0 auto"}}>

        {view==="model"&&(
          <>
            <div style={{textAlign:"center",marginBottom:"2rem"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#111827",border:"1px solid #1f2937",borderRadius:8,padding:"5px 12px",marginBottom:14}}>
                <span style={{color:"#fff",fontSize:12,fontWeight:700}}>LA Consultancy</span>
                <span style={{color:"#4b5563",fontSize:11}}>+</span>
                <span style={{color:"#6b7280",fontSize:11}}>CIAF</span>
              </div>
              <h1 style={{color:"#fff",fontSize:26,fontWeight:700,margin:"0 0 8px"}}>Como está a saúde do seu negócio?</h1>
              <p style={{color:"#6b7280",fontSize:14,margin:"0 0 16px",lineHeight:1.6}}>Responda algumas perguntas e descubra, em minutos, onde seu negócio está perdendo dinheiro sem perceber.</p>
            </div>
            <p style={{color:"#9ca3af",fontSize:13,fontWeight:500,marginBottom:6}}>Como seus clientes chegam até você?</p>
            {Object.entries(MODELS).map(([k,m])=>(
              <button key={k} onClick={()=>{setModel(k);setView("cad");}} style={{width:"100%",textAlign:"left",background:"#0f172a",border:"1px solid #1f2937",borderRadius:16,padding:"14px 16px",marginBottom:10,cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:m.color,flexShrink:0,marginTop:4}}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{color:"#fff",fontWeight:600,fontSize:14}}>{m.label}</span>
                      <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:"#1f2937",color:"#9ca3af"}}>{m.sub}</span>
                    </div>
                    <p style={{color:"#6b7280",fontSize:12,margin:"0 0 8px",lineHeight:1.5}}>{m.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{m.examples.map(ex=><span key={ex} style={{fontSize:11,background:"#1f2937",color:"#9ca3af",borderRadius:6,padding:"2px 8px"}}>{ex}</span>)}</div>
                  </div>
                  <span style={{color:"#374151",fontSize:18,flexShrink:0}}>→</span>
                </div>
              </button>
            ))}
            <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:"12px 14px",marginTop:8}}>
              <div style={{color:"#6b7280",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Sobre as referências de mercado</div>
              <p style={{color:"#4b5563",fontSize:12,margin:0,lineHeight:1.65}}>{BENCH_NOTE}</p>
            </div>
          </>
        )}

        {view==="cad"&&(
          <>
            <button onClick={()=>setView("model")} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,marginBottom:20,padding:0}}>← Voltar</button>
            <div style={{marginBottom:"1.5rem"}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:6,background:mc+"22",color:mc}}>{M?.label}</span>
              <h2 style={{color:"#fff",fontSize:22,fontWeight:600,margin:"10px 0 6px"}}>Antes de começar</h2>
              <p style={{color:"#6b7280",fontSize:13,margin:0}}>Preencha seus dados para receber o resultado e conversar com um especialista.</p>
            </div>
            {inp("Seu nome","nome","text",cadErr.nome)}
            {inp("Seu email","email","email",cadErr.email)}
            {inp("Seu WhatsApp","tel","tel",cadErr.tel)}
            {sel("Ramo do seu negócio","ramo",RAMOS,cadErr.ramo)}
            {sel("Qual é o seu papel na empresa","area",AREAS,cadErr.area)}
            <div style={{background:"#0f172a",border:"1px solid #1f2937",borderRadius:12,padding:"14px",marginTop:8}}>
              <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setLgpd(!lgpd)}>
                <div style={{width:20,height:20,borderRadius:6,background:lgpd?mc:"transparent",border:`2px solid ${lgpd?mc:"#374151"}`,flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {lgpd&&<span style={{color:"#fff",fontSize:12,fontWeight:700}}>✓</span>}
                </div>
                <span style={{color:"#6b7280",fontSize:12,lineHeight:1.6}}>Concordo com o uso dos meus dados para análise e contato por um especialista, conforme a LGPD.</span>
              </label>
              {cadErr.lgpd&&<p style={{color:"#f87171",fontSize:11,margin:"6px 0 0"}}>{cadErr.lgpd}</p>}
            </div>
            <button onClick={()=>{if(validateCad()){setView("steps");setStep(1);}}} style={{width:"100%",padding:"13px",borderRadius:12,background:mc,border:"none",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",marginTop:16}}>
              Começar o diagnóstico →
            </button>
          </>
        )}

        {view==="steps"&&(
          <>
            {step===1&&(
              <>
                <button onClick={()=>setView("cad")} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,marginBottom:16,padding:0}}>← Voltar</button>
                <div style={{marginBottom:14}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:6,background:mc+"22",color:mc}}>Etapa 1 de 4</span>
                  <h2 style={{color:"#fff",fontSize:20,fontWeight:600,margin:"8px 0 4px"}}>O caminho do cliente no seu negócio</h2>
                  <p style={{color:"#6b7280",fontSize:13,margin:0}}>Olá, {cad.nome.split(" ")[0]}! Clique em cada parte do funil e preencha os números.</p>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
                  {BOWTIE.map((s,i)=>(
                    <div key={s.id} onClick={()=>setActiveIdx(i)} style={{width:24,height:6,borderRadius:3,background:bt[s.id]?mc:i===activeIdx?mc+"66":"#1f2937",cursor:"pointer"}}/>
                  ))}
                  <span style={{color:"#4b5563",fontSize:11,marginLeft:4}}>{filledCount}/10</span>
                </div>
                <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:"1rem",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{color:"#3B82F6",fontSize:11,fontWeight:600}}>← CONQUISTAR CLIENTES</span>
                    <span style={{color:"#10B981",fontSize:11,fontWeight:600}}>MANTER E CRESCER →</span>
                  </div>
                  <BowtieSVG bt={bt} activeId={curStage?.id} onStage={(id)=>setActiveIdx(BOWTIE.findIndex(s=>s.id===id))} mode="input" mc={mc} bench={M?.b}/>
                  <p style={{color:"#4b5563",fontSize:11,margin:"6px 0 0",textAlign:"center"}}>Toque em qualquer etapa para preencher</p>
                </div>
                {curStage&&<StageCard stage={curStage} bt={bt} onVal={(id,v)=>setBt(p=>({...p,[id]:v}))} onPrev={activeIdx>0?()=>setActiveIdx(activeIdx-1):null} onNext={()=>{if(activeIdx<BOWTIE.length-1)setActiveIdx(activeIdx+1);else setShowBench(true);}} onInfo={setPopup} mc={mc} bench={M?.b} isLast={activeIdx===BOWTIE.length-1}/>}
                {showBench&&filledCount>0&&(
                  <div style={{background:"#111827",border:`1px solid ${mc}33`,borderRadius:16,padding:"1.25rem",marginBottom:12}}>
                    <div style={{color:"#9ca3af",fontSize:12,marginBottom:8}}>Seu negócio vs. Referência LA Consultancy + CIAF</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                      {[{l:"Chegam → Potencial",y:rates(bt).l_mql,b:M.b.l_mql},{l:"Potencial → Pronto",y:rates(bt).mql_sql,b:M.b.mql_sql},{l:"Proposta → Fechado",y:rates(bt).opp_won,b:M.b.opp_won},{l:"Clientes que ficam",y:bt.ret,b:M.b.ret},{l:"Clientes ativos",y:bt.ado,b:M.b.ado},{l:"Indicações",y:bt.adv,b:M.b.adv}].map(r=>{
                        const v=parseFloat(r.y),g=!isNaN(v)&&v>=r.b*0.9;
                        return(<div key={r.l} style={{background:"#0f172a",borderRadius:8,padding:"8px 10px"}}><div style={{color:"#6b7280",fontSize:10,marginBottom:2}}>{r.l}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:!isNaN(v)?g?"#34d399":"#f87171":"#374151",fontSize:13,fontWeight:600}}>{!isNaN(v)?`${v.toFixed(1)}%`:"—"}</span><span style={{color:"#374151",fontSize:10}}>ref: {r.b}%</span></div></div>);
                      })}
                    </div>
                  </div>
                )}
                {(showBench||filledCount>0)&&<button onClick={()=>setStep(2)} style={{width:"100%",padding:"13px",borderRadius:12,background:mc,border:"none",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>Avançar para dados financeiros →</button>}
              </>
            )}

            {step===2&&(
              <>
                <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,marginBottom:16,padding:0}}>← Voltar</button>
                <div style={{marginBottom:16}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:6,background:mc+"22",color:mc}}>Etapa 2 de 4</span>
                  <h2 style={{color:"#fff",fontSize:20,fontWeight:600,margin:"8px 0 4px"}}>Os números financeiros do negócio</h2>
                  <p style={{color:"#6b7280",fontSize:13,margin:"0 0 20px"}}>Clique em cada bloco para expandir. Use aproximações.</p>
                  <VerticalFunnel biz={biz} setBiz={setBiz} onInfo={setPopup}/>
                </div>
                <button onClick={()=>setStep(3)} style={{width:"100%",padding:"13px",borderRadius:12,background:mc,border:"none",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>Ver diagnóstico por etapa →</button>
              </>
            )}

            {step===3&&(
              <>
                <button onClick={()=>setStep(2)} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,marginBottom:16,padding:0}}>← Voltar</button>
                <div style={{marginBottom:14}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:6,background:mc+"22",color:mc}}>Etapa 3 de 4</span>
                  <h2 style={{color:"#fff",fontSize:20,fontWeight:600,margin:"8px 0 4px"}}>Como está cada parte do seu negócio</h2>
                  <p style={{color:"#6b7280",fontSize:13,margin:0}}>Toque em qualquer etapa para ver a análise.</p>
                </div>
                <div style={{background:"#1a1200",border:"1px solid #713f12",borderRadius:12,padding:"10px 14px",marginBottom:12,display:"flex",gap:10}}>
                  <span style={{fontSize:16,flexShrink:0}}>🍦</span>
                  <div><div style={{color:"#fbbf24",fontSize:13,fontWeight:600,marginBottom:2}}>Momentos Críticos</div><p style={{color:"#92400e",fontSize:12,margin:0,lineHeight:1.5}}>Etapas em vermelho são os pontos onde seus clientes estão abandonando o negócio sem você perceber.</p></div>
                </div>
                <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:"1rem",marginBottom:12}}>
                  <div style={{display:"flex",gap:10,fontSize:11,marginBottom:10,flexWrap:"wrap"}}>
                    {[["#15803d","Saudável"],["#b45309","Atenção"],["#991b1b","Crítico"],["#1f2937","Sem dado"]].map(([c,l])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:c}}/><span style={{color:"#4b5563"}}>{l}</span></div>
                    ))}
                  </div>
                  <BowtieSVG bt={bt} activeId={activeM3} onStage={id=>setActiveM3(id===activeM3?null:id)} mode="metrics" mc={mc} bench={M?.b}/>
                  <p style={{color:"#4b5563",fontSize:11,textAlign:"center",margin:"8px 0 0"}}>Toque em qualquer etapa para ver a análise</p>
                </div>
                {activeM3&&<MetricCard stage={BOWTIE.find(s=>s.id===activeM3)} bt={bt} bench={M?.b} mc={mc} onInfo={setPopup}/>}
                <button onClick={()=>{setStep(4);fetchAll();}} style={{width:"100%",padding:"13px",borderRadius:12,background:mc,border:"none",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>
                  Ver meu diagnóstico completo →
                </button>
              </>
            )}

            {step===4&&(
              <>
                <button onClick={()=>setStep(3)} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,marginBottom:16,padding:0}}>← Voltar</button>
                <div style={{marginBottom:16}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:6,background:mc+"22",color:mc}}>Etapa 4 de 4</span>
                  <h2 style={{color:"#fff",fontSize:20,fontWeight:600,margin:"8px 0 4px"}}>O que encontramos no seu negócio</h2>
                  <p style={{color:"#6b7280",fontSize:13,margin:0}}>Uma análise honesta baseada nos seus números.</p>
                </div>

                <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:"1rem 1.25rem",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{color:"#4b5563",fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Diagnóstico — LA Consultancy + CIAF</div>
                      <div style={{color:"#fff",fontSize:18,fontWeight:700}}>{cad.nome}</div>
                      <div style={{color:"#6b7280",fontSize:13}}>{cad.ramo} · {cad.area}</div>
                    </div>
                    <div style={{background:mc+"22",border:`1px solid ${mc}44`,borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
                      <div style={{color:mc,fontSize:12,fontWeight:700}}>{M?.label}</div>
                      <div style={{color:"#4b5563",fontSize:10,marginTop:2}}>{new Date().toLocaleDateString("pt-BR")}</div>
                    </div>
                  </div>
                </div>

                <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:"1rem",marginBottom:12}}>
                  <div style={{color:"#9ca3af",fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Mapa do seu funil</div>
                  <div style={{display:"flex",gap:10,fontSize:11,marginBottom:10,flexWrap:"wrap"}}>
                    {[["#15803d","Saudável"],["#b45309","Atenção"],["#991b1b","Crítico"],["#1f2937","Sem dado"]].map(([c,l])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:c}}/><span style={{color:"#4b5563"}}>{l}</span></div>
                    ))}
                  </div>
                  <BowtieSVG bt={bt} activeId={null} onStage={null} mode="metrics" mc={mc} bench={M?.b}/>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  {(()=>{
                    const r=rates(bt);
                    const ltvCac=biz.ltv&&biz.cac&&parseFloat(biz.cac)>0?(parseFloat(biz.ltv)/parseFloat(biz.cac)).toFixed(1):null;
                    return[
                      {l:"Clientes que ficam",v:bt.ret?`${bt.ret}%`:"—",b:`${M.b.ret}%`,g:parseFloat(bt.ret||0)>=M.b.ret*0.9,has:!!bt.ret},
                      {l:"Perda mensal",v:biz.churn?`${biz.churn}%`:"—",b:`${M.b.churn}%`,g:parseFloat(biz.churn||99)<=M.b.churn*1.2,has:!!biz.churn},
                      {l:"Valor por cliente vs. custo",v:ltvCac?`${ltvCac}x`:"—",b:`${M.b.ltv_cac}x`,g:parseFloat(ltvCac||0)>=M.b.ltv_cac,has:!!ltvCac},
                      {l:"Proposta → Fechado",v:r.opp_won?`${r.opp_won}%`:"—",b:`${M.b.opp_won}%`,g:parseFloat(r.opp_won||0)>=M.b.opp_won*0.9,has:!!r.opp_won},
                    ].map(m=>(
                      <div key={m.l} style={{background:!m.has?"#0a0a0a":m.g?"#052e16":"#1a0000",border:`1px solid ${!m.has?"#1f2937":m.g?"#15803d44":"#991b1b44"}`,borderRadius:12,padding:"12px"}}>
                        <div style={{color:"#6b7280",fontSize:11,marginBottom:4}}>{m.l}</div>
                        <div style={{color:!m.has?"#374151":m.g?"#34d399":"#f87171",fontSize:22,fontWeight:700}}>{m.v}</div>
                        <div style={{color:"#374151",fontSize:11}}>ref: {m.b}</div>
                      </div>
                    ));
                  })()}
                </div>

                <div style={{background:"#0c1117",border:"1px solid #1f2937",borderRadius:16,padding:"1.25rem",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:mc}}/>
                    <span style={{color:"#fff",fontWeight:600,fontSize:14}}>O que encontramos</span>
                    {sheetsOk&&<span style={{marginLeft:"auto",background:"#052e16",color:"#34d399",fontSize:10,borderRadius:6,padding:"2px 8px"}}>Salvo ✓</span>}
                  </div>
                  {loadingAI&&(
                    <div style={{display:"flex",alignItems:"center",gap:10,color:"#6b7280",padding:"8px 0"}}>
                      <div style={{width:16,height:16,border:"2px solid #374151",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                      <span style={{fontSize:13}}>Analisando seu negócio...</span>
                      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    </div>
                  )}
                  {aiError&&(
                    <div style={{background:"#1a0000",border:"1px solid #991b1b44",borderRadius:10,padding:"12px 14px"}}>
                      <p style={{color:"#f87171",fontSize:13,fontWeight:600,margin:"0 0 6px"}}>Não foi possível gerar a análise</p>
                      <p style={{color:"#6b7280",fontSize:12,margin:"0 0 10px",lineHeight:1.5}}>{aiError}</p>
                      <button onClick={fetchAll} style={{background:"#991b1b",border:"none",borderRadius:8,padding:"8px 14px",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600}}>Tentar novamente</button>
                    </div>
                  )}
                  {!loadingAI&&!aiError&&teaser&&(
                    <div style={{color:"#d1d5db",fontSize:13,lineHeight:1.8}}>
                      {teaser.split(/(\*\*.*?\*\*)/).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i} style={{color:"#fff",display:"block",marginTop:i>0?14:0,marginBottom:4}}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>)}
                    </div>
                  )}
                </div>

                {!loadingAI&&teaser&&(
                  <>
                    <button onClick={handlePDF} disabled={pdfLoading} style={{width:"100%",padding:"12px",borderRadius:12,background:"#1e3a5f",border:"1px solid #3b82f644",color:"#93c5fd",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:10}}>
                      {pdfLoading?"Gerando...":"⬇ Baixar diagnóstico em PDF"}
                    </button>
                    <div style={{background:"#0a1a0a",border:"1px solid #14532d",borderRadius:16,padding:"1.25rem",marginBottom:10}}>
                      <p style={{color:"#34d399",fontSize:14,fontWeight:600,margin:"0 0 6px"}}>Quer ver o diagnóstico completo?</p>
                      <p style={{color:"#6b7280",fontSize:12,margin:"0 0 14px",lineHeight:1.6}}>O relatório completo — com gargalos detalhados, o dinheiro perdido em R$ e o plano de 90 dias — está pronto para uma conversa sem compromisso.</p>
                      <a href={`https://wa.me/${WA}?text=Olá! Sou ${encodeURIComponent(cad.nome)}, ${encodeURIComponent(cad.area)} de um negócio de ${encodeURIComponent(cad.ramo)}. Fiz o diagnóstico e gostaria de ver o relatório completo.`}
                        target="_blank" rel="noreferrer"
                        style={{display:"block",width:"100%",padding:"13px",borderRadius:10,background:"#16a34a",color:"#fff",fontSize:14,fontWeight:600,textAlign:"center",textDecoration:"none",boxSizing:"border-box"}}>
                        Quero ver o relatório — falar no WhatsApp →
                      </a>
                    </div>
                    <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:"1.25rem",marginBottom:12}}>
                      <p style={{color:"#9ca3af",fontSize:13,fontWeight:600,margin:"0 0 12px"}}>Ou entre em contato pelo canal que preferir:</p>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        <a href={`mailto:${EMAIL_CTT}?subject=Diagnóstico Revenue Architecture — ${encodeURIComponent(cad.nome)}`} style={{display:"flex",alignItems:"center",gap:10,background:"#0f172a",border:"1px solid #374151",borderRadius:10,padding:"10px 14px",textDecoration:"none"}}>
                          <span style={{fontSize:16}}>✉</span><div><div style={{color:"#fff",fontSize:13,fontWeight:500}}>Email</div><div style={{color:"#4b5563",fontSize:11}}>{EMAIL_CTT}</div></div>
                        </a>
                        <a href={INSTA} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:"#0f172a",border:"1px solid #374151",borderRadius:10,padding:"10px 14px",textDecoration:"none"}}>
                          <span style={{fontSize:16}}>◉</span><div><div style={{color:"#fff",fontSize:13,fontWeight:500}}>Instagram</div><div style={{color:"#4b5563",fontSize:11}}>@laconsultancybr</div></div>
                        </a>
                        <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:"#0f172a",border:"1px solid #374151",borderRadius:10,padding:"10px 14px",textDecoration:"none"}}>
                          <span style={{fontSize:16}}>◎</span><div><div style={{color:"#fff",fontSize:13,fontWeight:500}}>WhatsApp</div><div style={{color:"#4b5563",fontSize:11}}>+55 35 9 9989-4181</div></div>
                        </a>
                      </div>
                    </div>
                    <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:"12px 14px",marginBottom:12}}>
                      <p style={{color:"#4b5563",fontSize:12,margin:0,lineHeight:1.6}}><span style={{color:"#6b7280",fontWeight:600}}>Onde fica seu diagnóstico completo?</span><br/>O relatório detalhado foi enviado para a equipe da LA Consultancy. Na sua conversa, você recebe uma cópia com todas as análises e o plano de ação.</p>
                    </div>
                  </>
                )}
                {!loadingAI&&(teaser||aiError)&&<button onClick={reset} style={{width:"100%",padding:"12px",borderRadius:12,background:"#1f2937",border:"none",color:"#9ca3af",fontSize:13,cursor:"pointer"}}>← Novo diagnóstico</button>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
